import Heading from "./Heading";
import { Rate } from 'antd'
import TitleList from "./TItleList";
import Checkbox from "./form-components/Checkbox";
import Button from "./form-components/Button";
import Quantity from "./form-components/Quantity";

const ProductInfo = ({image, product}) => (
    <div className="c-product-info container">
        <div className="row c-product-info__row">
            <div className="col-md-6 c-product-info__image-col">
                <div className="c-product-info__img-wrapper">
                    <img src={image} alt="product" className="img-fluid c-product-info__img"/>
                    <p className="c-product-info__size">1 oz/30 ml</p>
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
                    <TitleList parentClass="c-product-info" title="What is it?">
                    A safe start to a CBD experience, especially for those who prefer softgel capsules to oil.
                    </TitleList>
                    <TitleList parentClass="c-product-info" title="What is it?">
                    A safe start to a CBD experience, especially for those who prefer softgel capsules to oil.
                    </TitleList>
                </div>
                <div className="c-product-info__subscribe-wrapper">
                    <Checkbox id={product && product._id} label="Subscribe & save 10%" />
                </div>
                <div className="c-product-info__atc-wrapper">
                    <div className="c-product-info__btn-wrapper">
                        <Button parentClass="c-product-info" theme="outline" >Add to cart</Button>
                    </div>
                    <div className="c-product-info__price-wrapper">
                        <p className="c-product-info__price">$45</p>
                    </div>
                    <div className="c-product-info__qty-wrapper">
                        <Quantity parentClass="c-product-info" />
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default ProductInfo