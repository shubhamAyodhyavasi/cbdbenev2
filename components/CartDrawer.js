import { Drawer, Icon } from 'antd'
import Heading from './Heading'
import Logo from './Logo'
import CartItem from './CartItem'
import Button from './form-components/Button'

class CartDrawer extends React.Component {
    constructor({ props }) {
        super(props)
        this.state = {
            width: 800,
            items: [
                {
                    title: "lorem ipsum",
                    subTitle: "This is dummy title",
                    price: "$123",
                    quantity: 4
                },
                {
                    title: "lorem ipsum",
                    subTitle: "This is dummy title",
                    price: "$332",
                    quantity: 3
                },
            ]
        }
    }
    componentDidMount() {
        this.setState({
            width: window.innerWidth > 800 ? 800 : window.innerWidth
        })
    }
    render() {
        const {
            width, items
        } = this.state
        const {
            onClose, visible
        } = this.props
        return (
            <Drawer
                className="c-cart-drawer"
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
                width={width}
                title={<CartTitle onClose={onClose} />}
            >
                {
                    items.map((el, i) => <CartItem key={i}
                        title={el.title}
                        subTitle={el.subTitle}
                        price={el.price}
                        quantity={el.quantity}
                    />)
                }
                <CartItem
                    title={"subtotal"}
                    price={"$123"}
                    total={true}
                />
                <div className="c-cart-drawer__btn-wrapper">
                    <Button versions={["block"]} theme="outline-gold" >Proceed to checkout</Button>
                </div>
            </Drawer>
        )
    }
}
const CartTitle = ({ onClose }) => (
    <div className="c-cart-title c-cart-drawer__cart-title">
        <div className="c-cart-title__go-back-wrapper">
            <Icon className="c-cart-title__back" type="left" onClick={onClose} />
        </div>
        <div className="c-cart-title__header">
            <div className="row">
                <div className="col">
                    <Heading parentClass="c-cart-title" versions={["default", "gold", "upper"]} >Cart</Heading>
                </div>
                <div className="col flex-grow-0">
                    <Logo parentClass="c-cart-title" />
                </div>
            </div>
        </div>
    </div>
)

export default CartDrawer