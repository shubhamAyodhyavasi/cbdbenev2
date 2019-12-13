
import Layout from "../../components/Layouts/Layout";
import Heading from "../../components/Heading";
import AccountInner from "../../components/Layouts/AccountInner";
import TitleList from "../../components/TitleList";
import Button from "../../components/form-components/Button";
import OrderListItem from "../../components/OrderListItem";
import { connect } from 'react-redux'
import { getUserDetails, getOrders, getProductById } from "../../services/api";

class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderList: [],
            isLoading: false
        }
    }
    componentDidMount() {
        const {
            user
        } = this.props
        this.getOrders(user)
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.user !== this.props.user) {
            this.getOrders(this.props.user)
        }
    }

    reorder = (order) => {
        this.setState({
            isLoading: true
        });
        order.products.map((itm, index) => {
            console.log({
                itm
            });
            getProductById(itm.productMeta || itm.comboId)
                .then(res => {
                    const resJson = res.data
                    if (resJson.product_details.producttype === "variable") {
                        const product = resJson.product_details;
                        var productItem = { ...product };
                        const qty = { label: itm.qty, value: itm.qty };
                        productItem.qty = qty;
                        resJson.product_details.attributes.map((key, index) => {
                            const attribute = key.names;

                            const labelValue = {
                                label: itm.attribute[attribute],
                                value: itm.attribute[attribute]
                            };
                            productItem = { ...productItem, [attribute]: labelValue };
                            return null;
                        });
                        console.log({
                            productItem
                        })
                        // this.props.addToCart(
                        //     variablePriceSet(productItem),
                        //     this.props.cart,
                        //     this.props.user.userMetaId
                        // );
                    } else {
                        const product = resJson.product_details;
                        productItem = { ...product, qty: itm.qty };
                        
                        console.log({
                            productItem
                        })
                        // this.props.addToCart(
                        //     variablePriceSet(productItem),
                        //     this.props.cart,
                        //     this.props.user.userMetaId
                        // );
                    }
                })
                .catch(err => { });
            return null;
        });
        // setTimeout(() => {
        //     this.props.history.push("/" + this.props.location.countryCode + "/cart");
        // }, 1000);
    }
    getOrders = (user) => {
        console.log({
            user
        })
        if (user && user._id) {
            getUserDetails(user._id)
                .then(res => {
                    if (res && res.data && res.data.user) {
                        getOrders(res.data.user._id)
                            .then(res => {
                                const resJson = res.data
                                if (resJson.status) {
                                    const orderList = resJson.orders.sort(function (a, b) {
                                        return new Date(b.createdOn) - new Date(a.createdOn);
                                    });
                                    this.setState({
                                        orderList
                                    })
                                }
                            })
                    }
                })
                .catch(console.log)
        }
    }
    render() {
        const {
            orderList
        } = this.state
        return (
            <Layout headerVersions={["bg-light"]} headerTheme="dark" >
                <div className="c-account-page">
                    <AccountInner parentClass="c-account-page">
                        <TitleList title="Recent Purchases">
                            {orderList.length < 1 && "You currently don't have any purchases."}
                            {
                                orderList.length > 0 && <div>
                                    {
                                        orderList.map((el, key) =>
                                            <OrderListItem 
                                                serial={key + 1} 
                                                key={key} 
                                                reorder={this.reorder}
                                                order={el} />)
                                    }
                                </div>
                            }
                        </TitleList>
                        <TitleList>
                            <p className="c-account-page__text-wrapper">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate, praesentium. Nemo vero quo facilis reiciendis repellat similique! Nostrum delectus, saepe fugiat deleniti iusto reiciendis corporis itaque praesentium laborum in accusamus.
                            </p>
                        </TitleList>
                        <Button parentClass="c-account-page" versions={["outline"]} >Start Shopping</Button>
                    </AccountInner>
                </div>
            </Layout>
        )
    }
}
const mapStateToProps = state => ({
    user: state.user
})
export default connect(mapStateToProps)(Account)