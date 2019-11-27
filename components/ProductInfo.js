import Heading from "./Heading";
import { Rate } from 'antd'
import TitleList from "./TItleList";
import Checkbox from "./form-components/Checkbox";
import Button from "./form-components/Button";
import Quantity from "./form-components/Quantity";
import { useState } from "react";
import { getBasicPrice, directAddToCart } from "../services/helpers/product";
import { numberFormat } from "../services/helpers/misc";
import { addToCart } from '../redux/actions/cart'
import { showCartBar } from '../redux/actions/drawers'
import {connect} from 'react-redux'
const ProductInfo = ({image, product, productAttr, addToCart, cart, showCartBar}) => {
    // const size = ("");
    const [qty, setQty] = useState(1)
    const [isSubscribed, setIsSubscribed] = useState(false)
    const basePrice = getBasicPrice(product)
    const price = parseFloat(basePrice.sale_price || 0) * qty
    const addToCartFn = () =>{
        addToCart(directAddToCart(product, qty))
        showCartBar()
    }
    return (
        <div className="c-product-info container">
            <div className="row c-product-info__row">
                <div className="col-md-6 c-product-info__image-col">
                    <div className="c-product-info__img-wrapper">
                        <img src={image} alt="product" className="img-fluid c-product-info__img"/>
                        {/* <p className="c-product-info__size">1 oz/30 ml</p> */}
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="c-product-info__title-wrap">
                        <div className="c-product-info__title-col">
                            <Heading versions={["default", "light"]} parentClass="c-product-info">{product && product.productid && product.productid.producttitle}</Heading>
                            <Heading subHeading="true" parentClass="c-product-info">{product && product.productid && product.productid.sdescription}</Heading>
                        </div>
                        <div className="c-product-info__rating-wrapper">
                            <div className="c-product-info__rate">
                                <Rate 
                                    style={{ color: '#000' }}
                                    className="c-product-info__stars" 
                                    disabled value={3.5} 
                                    allowHalf={true} />
                                <p className="c-product-info__review">12 reviews(9.7)</p>
                            </div>
                        </div>
                    </div>
                    <div className="c-product-info__description">
                        <Heading subHeading="true" versions={["default", "lft-br"]} parentClass="c-product-info">{product && product.productid && product.productid.description}</Heading>
                    </div>
                    <div className="c-product-info__list">
                        {productAttr.map((el, i)=> (
                            <TitleList parentClass="c-product-info" key={i} title={el.title} >{el.description}</TitleList>
                        ))}
                    </div>
                    <div className="c-product-info__subscribe-wrapper">
                        <Checkbox checked={isSubscribed} onChange={()=> {setIsSubscribed(!isSubscribed)}} id={product && product._id} label="Subscribe & save 10%" />
                    </div>
                    <div className="c-product-info__atc-wrapper">
                        <div className="c-product-info__btn-wrapper">
                            <Button onClick={addToCartFn} parentClass="c-product-info" theme="outline" >Add to cart</Button>
                        </div>
                        <div className="c-product-info__price-wrapper">
                            <p className="c-product-info__price">$ {numberFormat(price)}</p>
                        </div>
                        <div className="c-product-info__qty-wrapper">
                            <Quantity value={qty} onChange={e => setQty(e)} min={1} parentClass="c-product-info" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = state => ({
    cart : state.cart
})
export default connect(mapStateToProps, {addToCart, showCartBar})(ProductInfo)