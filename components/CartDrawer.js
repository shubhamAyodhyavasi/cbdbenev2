import CartItem from './CartItem'
import Button from './form-components/Button'
import { connect } from 'react-redux'
import { getProductTitle, getProductShortDesc } from '../services/helpers/product'
import { getGrandTotal } from '../services/helpers/cart'
import { numberFormat } from '../services/helpers/misc'
import { initialCart } from '../constants/reduxInitialStates'
import { modifyItem, removeFromCart } from '../redux/actions/cart'
import Link from 'next/link'
import Heading from './Heading'
const CartDrawer = ({ complete, cart, modifyItem, removeFromCart }) => {
    const qtyChange = (qty, oldItem) => {
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
    const hasItems = cart.items.length > 0 ? true : false
    console.log({
        cart
    })
    return (
        <div className="c-cart-drawer" >
            <p style={{color: "#fff"}}>
            </p>
            {
                hasItems && <>
                    {
                        cart.items.map((el, i) => <CartItem key={i}
                            title={getProductTitle(el)}
                            subTitle={getProductShortDesc(el)}
                            price={`$${numberFormat(parseFloat(el.saleprice) * el.qty)}`}
                            quantity={el.qty}
                            onRemove={() => removeFromCart(el)}
                            isDisabled={!cart.isEditable}
                            onQtyChange={(e) => {if(cart.isEditable) qtyChange(e, el)}}
                        />)
                    }
                    <div className="mt-auto"></div>
                    {
                        complete && <>
                            <CartItem
                                small={true}
                                title={"Subtotal"}
                                price={`$${numberFormat(parseFloat(cart.subTotal))}`}
                                total={true}
                                versions={["small", "no-border"]}
                            />
                            <CartItem
                                small={true}
                                title={"Shipping"}
                                price={`$${cart.shippingCharge}`}
                                total={true}
                                versions={["small", "no-border"]}
                            />
                            <CartItem
                                small={true}
                                title={"Taxes"}
                                price={`${(cart.taxPercent) ? cart.taxPercent : 0}`}
                                total={true}
                                versions={["small"]}
                            />
                            <CartItem
                                title={"Total"}
                                price={grandTotal}
                                total={true}
                                versions={["no-border"]}
                            />
                        </>
                    }

                    {!complete && <>
                        <CartItem
                            title={"subtotal"}
                            price={`$${numberFormat(parseFloat(cart.subTotal))}`}
                            total={true}
                            versions={["no-border"]}
                        />
                        <div className="c-cart-drawer__btn-wrapper">
                            <Link href="/checkout">
                                <a className="c-btn c-btn--block c-btn--outline-gold" >Proceed to checkout</a>
                            </Link>
                        </div>
                    </>}
                </>
            }
            {!hasItems && <>
                <Heading parentClass="c-cart-item" versions={["white"]} >0 Items</Heading>
                <Heading parentClass="c-cart-item" versions={["gold", "btm-br"]} >Your bag is empty</Heading>
                <div className="c-cart-drawer__btn-wrapper mt-auto">
                    <Link href="/shop">
                        <a className="c-btn c-btn--block c-btn--outline-gold" >Conrinue shopping</a>
                    </Link>
                </div>
            </>
            }
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
export default connect(mapStateToProps, { modifyItem, removeFromCart })(CartDrawer)