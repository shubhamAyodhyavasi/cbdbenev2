import CartItem from './CartItem'
import Button from './form-components/Button'
import {connect} from 'react-redux'
import { getProductTitle, getProductShortDesc } from '../services/helpers/product'
import { numberFormat } from '../services/helpers/misc'
import { initialCart } from '../constants/reduxInitialStates'
import {modifyItem} from '../redux/actions/cart'
const CartDrawer = ({ complete, cart, modifyItem })=>  {
    const qtyChange = (qty, oldItem)=> {
        modifyItem(
            {
              oldItem,
              newItem: {
                ...oldItem,
                qty
              }
            },
          );
    }
    return (
        <div className="c-cart-drawer" >
            {
                cart.items.map((el, i) => <CartItem key={i}
                    title={getProductTitle(el)}
                    subTitle={getProductShortDesc(el)}
                    price={`$${numberFormat(parseFloat(el.saleprice) * el.qty)}`}
                    quantity={el.qty}
                    onQtyChange={(e)=> qtyChange(e, el)}
                />)
            }
            {
                complete && 
                <CartItem
                    small={true}
                    title={"Subtotal"}
                    price={`$${numberFormat(parseFloat(cart.subTotal))}`}
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
                price={`$${numberFormat(parseFloat(cart.subTotal))}`}
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
    complete: false,
    cart: initialCart
}
const mapStateToProps = state => ({
    cart: state.cart
})
export default connect(mapStateToProps, {modifyItem})(CartDrawer)