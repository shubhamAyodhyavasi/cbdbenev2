import classNames from "classnames";
import Heading from "./Heading";
import Quantity from "./form-components/Quantity";
import { Icon } from "antd";
const CartItem = ({
	title,
	subTitle,
	price,
	quantity,
	onRemove,
	onQtyChange,
	total,
	parentClass,
	versions,
	isDisabled,
	background,
	...props
}) => {
	console.log("background", background);
	const componentClass = background ? "c-cart-item-dark" : "c-cart-item";
	const versionClass = versions
		.map((el) => `${componentClass}--${el}`)
		.join(" ");
	const parent = `${parentClass}__${componentClass.replace("c-", "")}`;
	const className = classNames(componentClass, {
		[versionClass]: versions,
		[parent]: parentClass,
	});
	console.log("classname", className, props.backgroud);
	const bold = background ? "" : "bold";
	if (total) {
		return (
			<div className={className}>
				<div className="row c-cart-item__row">
					<div className="col c-cart-item__title-wrapper">
						<Heading
							parentClass={componentClass}
							versions={["default", "white", "upper", `${bold}`]}
						>
							{title}
						</Heading>
					</div>
					<div className="col c-cart-item__price-wrapper flex-grow-0">
						<Heading
							parentClass={componentClass}
							versions={["default", "white"]}
							subHeading={true}
						>
							{price}
						</Heading>
					</div>
				</div>
			</div>
		);
	}
	return (
		<div className={className}>
			<div className="row c-cart-item__row">
				<div className="col c-cart-item__title-wrapper">
					<Heading parentClass={componentClass} versions={["default", "white"]}>
						{title}
					</Heading>
					<Heading
						parentClass={componentClass}
						versions={["small", "dark"]}
						subHeading={true}
					>
						{subTitle}
					</Heading>
				</div>
				<div className="col c-cart-item__close-wrapper  flex-grow-0">
					<Icon
						onClick={onRemove}
						className="c-cart-item__close"
						type="close"
					/>
				</div>
			</div>
			<div className="row c-cart-item__row">
				<div className="col c-cart-item__quantity-wrapper">
					<Quantity
						min={1}
						isDisabled={isDisabled}
						onChange={onQtyChange}
						value={quantity}
						parentClass={componentClass}
					/>
				</div>
				<div className="col c-cart-item__price-wrapper flex-grow-0">
					<Heading
						parentClass={componentClass}
						versions={["default", "brand"]}
						subHeading={true}
					>
						{price}
					</Heading>
				</div>
			</div>
		</div>
	);
};

CartItem.defaultProps = {
	versions: [],
	isDisabled: false,
};
export default CartItem;
