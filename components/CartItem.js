import Heading from "./Heading";
import Quantity from './form-components/Quantity'
import {Icon} from 'antd'
const CartItem = ({title, subTitle, price, quantity, onRemove, onQtyChange, total}) => {
    if(total){
        return (
            <div className="c-cart-item c-cart-item--total">
                <div className="row c-cart-item__row">
                    <div className="col c-cart-item__title-wrapper">
                        <Heading parentClass="c-cart-item" versions={["default", "white", "upper"]} >
                            {title}
                        </Heading>
                    </div>
                    <div className="col c-cart-item__price-wrapper flex-grow-0">
                        <Heading parentClass="c-cart-item" versions={["default", "white"]} subHeading={true} >
                            {price}
                        </Heading>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="c-cart-item">
            <div className="row c-cart-item__row">
                <div className="col c-cart-item__title-wrapper">
                    <Heading parentClass="c-cart-item" versions={["default", "white"]} >
                        {title}
                    </Heading>
                    <Heading parentClass="c-cart-item" versions={["small", "gold"]} subHeading={true} >
                        {subTitle}
                    </Heading>
                </div>
                <div className="col c-cart-item__close-wrapper  flex-grow-0">
                    <Icon onClick={onRemove} className="c-cart-item__close" type="close" />
                </div>
            </div>
            <div className="row c-cart-item__row">
                <div className="col c-cart-item__quantity-wrapper">
                    <Quantity min={1} onChange={onQtyChange} value={quantity} parentClass="c-cart-item" />
                </div>
                <div className="col c-cart-item__price-wrapper flex-grow-0">
                    <Heading parentClass="c-cart-item" versions={["default", "white"]} subHeading={true} >
                        {price}
                    </Heading>
                </div>
            </div>
        </div>
    )
}

export default CartItem