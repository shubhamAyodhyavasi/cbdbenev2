import CartItem from './CartItem'
import Button from './form-components/Button'

const CartDrawer = ({ complete })=>  {
    const items = [
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
    return (
        <div className="c-cart-drawer" >
            {
                items.map((el, i) => <CartItem key={i}
                    title={el.title}
                    subTitle={el.subTitle}
                    price={el.price}
                    quantity={el.quantity}
                />)
            }
            {
                complete && 
                <CartItem
                    small={true}
                    title={"Subtotal"}
                    price={"$123"}
                    total={true}
                    versions={["small", "no-border"]}
                />
            }
            {
                complete && 
                <CartItem
                    small={true}
                    title={"Shipping"}
                    price={"$123"}
                    total={true}
                    versions={["small", "no-border"]}
                />
            }
            {
                complete && 
                <CartItem
                    small={true}
                    title={"Taxes"}
                    price={"$123"}
                    total={true}
                    versions={["small"]}
                />
            }
            {
                complete && 
                <CartItem
                    title={"Total"}
                    price={"$123"}
                    total={true}
                    versions={["no-border"]}
                />
            }
            {!complete && <CartItem
                title={"subtotal"}
                price={"$123"}
                total={true}
                versions={["no-border"]}
            />}
            <div className="c-cart-drawer__btn-wrapper">
                <Button versions={["block"]} theme="outline-gold" >Proceed to checkout</Button>
            </div>
        </div>
    )
}

CartDrawer.defaultProps = {
    complete: false
}

export default CartDrawer