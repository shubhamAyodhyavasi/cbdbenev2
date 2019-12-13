
import Layout from "../../components/Layouts/Layout";
import Heading from "../../components/Heading";
import AccountInner from "../../components/Layouts/AccountInner";
import TitleList from "../../components/TitleList";
import Button from "../../components/form-components/Button";
import OrderListItem from "../../components/OrderListItem";
import { connect } from 'react-redux'
import { getUserDetails, getOrders } from "../../services/api";

class Subscription extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            orderList: []
        }
    }
    componentDidMount(){
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
    getOrders = (user) => {
        console.log({
            user
        })
        if(user && user._id){
            getUserDetails(user._id)
            .then(res => {
                if(res && res.data && res.data.user){
                    getOrders(res.data.user._id)
                    .then(res => {
                        const resJson = res.data
                        if (resJson.status) {
                            const orderList = resJson.orders.sort(function(a, b) {
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
    render(){
        const {
            orderList
        } = this.state
        return (
            <Layout  headerVersions={["bg-light"]} headerTheme="dark" >
                <div className="c-subscription-page">
                    <AccountInner parentClass="c-subscription-page">
                            <TitleList title="Recent Purchases">
                                { orderList.length < 1 && "You currently don't have any purchases."}
                                {
                                    orderList.length > 0 && <div>
                                        {
                                            orderList.map((el, key) => 
                                                <OrderListItem serial={key+1} key={key} order={el} />)
                                        }
                                    </div>
                                }
                            </TitleList>
                        <TitleList>
                            <p className="c-subscription-page__text-wrapper">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate, praesentium. Nemo vero quo facilis reiciendis repellat similique! Nostrum delectus, saepe fugiat deleniti iusto reiciendis corporis itaque praesentium laborum in accusamus.
                            </p>
                        </TitleList>
                        <Button parentClass="c-subscription-page" versions={["outline"]} >Start Shopping</Button>
                    </AccountInner>
                </div>
            </Layout>
        )
    }
}
const mapStateToProps = state => ({
    user: state.user
})
export default connect(mapStateToProps)(Subscription)