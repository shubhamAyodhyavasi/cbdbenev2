import CartItem from './CartItem'
import Button from './form-components/Button'
import {connect} from 'react-redux'
import { getProductTitle, getProductShortDesc } from '../services/helpers/product'
import { getGrandTotal } from '../services/helpers/cart'
import { numberFormat } from '../services/helpers/misc'
import { initialCart } from '../constants/reduxInitialStates'
import { modifyItem, removeFromCart } from '../redux/actions/cart'
import Link from 'next/link'
const CartDrawer = ({ complete, cart, modifyItem, removeFromCart })=>  {
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
    const grandTotal = getGrandTotal(
        cart.subTotal,
        cart.taxPercent,
        cart.shippingCharge,
        cart.taxCouponDiscount
    )
    return (
        <div className="c-cart-drawer" >
            {
                cart.items.map((el, i) => <CartItem key={i}
                    title={getProductTitle(el)}
                    subTitle={getProductShortDesc(el)}
                    price={`$${numberFormat(parseFloat(el.saleprice) * el.qty)}`}
                    quantity={el.qty}
                    onRemove={()=> removeFromCart(el)}
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
                    price={`$${cart.shippingCharge}`}
                    total={true}
                    versions={["small", "no-border"]}
                />
            }
            {
                complete && 
                <CartItem
                    small={true}
                    title={"Taxes"}
                    price={`${(cart.taxCountry) ? cart.taxCountry : 0 }`}
                    total={true}
                    versions={["small"]}
                />
            }
            {
                complete && 
                <CartItem
                    title={"Total"}
                    price={grandTotal}
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
            {!complete && <div className="c-cart-drawer__btn-wrapper">
                <Link href="/checkout">
                    <a className="c-btn c-btn--block c-btn--outline-gold" >Proceed to checkout</a>
                </Link>
            </div>}
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
export default connect(mapStateToProps, {modifyItem, removeFromCart})(CartDrawer)