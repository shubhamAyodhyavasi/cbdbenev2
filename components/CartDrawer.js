import CartItem from "./CartItem";
import Button from "./form-components/Button";
import { connect } from "react-redux";
import {
	getProductTitle,
	getProductShortDesc
} from "../services/helpers/product";
import { getGrandTotal } from "../services/helpers/cart";
import { numberFormat } from "../services/helpers/misc";
import { initialCart } from "../constants/reduxInitialStates";
import { modifyItem, removeFromCart, hideCartBar } from "../redux/actions";
import Link from "next/link";
import Heading from "./Heading";
const CartDrawer = ({
	complete,
	cart,
	modifyItem,
	removeFromCart,
	hideCartBar,
	background
}) => {
	console.log("back", background);
	const qtyChange = (qty, oldItem) => {
		modifyItem({
			oldItem,
			newItem: {
				...oldItem,
				qty
			}
		});
	};
	const grandTotal = getGrandTotal(
		cart.subTotal,
		cart.taxPercent,
		cart.shippingCharge,
		cart.taxCouponDiscount
	);
	const hasItems = cart.items.length > 0 ? true : false;
	const taxPrice = cart.taxPercent
		? (cart.taxPercent * cart.subTotal).toFixed(2)
		: 0;
	const shippingCharge = (cart.shippingCharge || 0).toFixed(2) || 0;
	return (
		<div className="c-cart-drawer">
			<p style={{ color: "#fff" }}></p>
			{hasItems && (
				<>
					{cart.items.map((el, i) => (
						<CartItem
							key={i}
							title={getProductTitle(el)}
							subTitle={getProductShortDesc(el)}
							price={`$${numberFormat(parseFloat(el.saleprice) * el.qty)}`}
							quantity={el.qty}
							onRemove={() => removeFromCart(el)}
							isDisabled={!cart.isEditable}
							onQtyChange={e => {
								if (cart.isEditable) qtyChange(e, el);
							}}
							background={background}
						/>
					))}
					<div className="mt-auto"></div>
					{complete && (
						<>
							<CartItem
								small={true}
								title={"Subtotal"}
								price={`$${numberFormat(parseFloat(cart.subTotal))}`}
								total={true}
								versions={["small", "no-border"]}
								background={background}
							/>
							<CartItem
								small={true}
								title={"Shipping"}
								price={`$${shippingCharge}`}
								total={true}
								versions={cart.taxPercent ? ["small", "no-border"] : ["small"]}
								background={background}
							/>
							{taxPrice > 0 && (
								<CartItem
									small={true}
									title={"Taxes"}
									// price={`${(cart.taxPercent) ? cart.taxPercent : 0}`}
									price={`$${taxPrice}`}
									total={true}
									versions={["small"]}
									background={background}
								/>
							)}
							<CartItem
								title={"Total"}
								price={`$${grandTotal}`}
								total={true}
								versions={["no-border"]}
								background={background}
							/>
						</>
					)}

					{!complete && (
						<>
							<CartItem
								title={"subtotal"}
								price={`$${numberFormat(parseFloat(cart.subTotal))}`}
								total={true}
								versions={["no-border"]}
							/>
							<div className="c-cart-drawer__btn-wrapper">
								<Link href="/checkout">
									<a className="c-btn c-btn--block c-btn--brand mt-5">
										Proceed to checkout
									</a>
								</Link>
							</div>
						</>
					)}
				</>
			)}
			{!hasItems && (
				<>
					<Heading parentClass="c-cart-item" versions={["dark"]}>
						0 Items
					</Heading>
					<Heading parentClass="c-cart-item" versions={["gold", "btm-br"]}>
						Your bag is empty
					</Heading>
					<div className="c-cart-drawer__btn-wrapper mt-auto">
						<Link href="/shop">
							<a
								onClick={hideCartBar}
								className="c-btn c-btn--block c-btn--outline-brand"
							>
								Continue shopping
							</a>
						</Link>
					</div>
				</>
			)}
		</div>
	);
};

CartDrawer.defaultProps = {
	complete: false,
	cart: initialCart
};
const mapStateToProps = state => ({
	cart: state.cart
});
export default connect(mapStateToProps, {
	modifyItem,
	removeFromCart,
	hideCartBar
})(CartDrawer);
