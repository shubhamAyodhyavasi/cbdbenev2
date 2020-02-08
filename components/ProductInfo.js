import Heading from "./Heading";
import { Rate, Icon, Select,  } from 'antd'
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
import {getProductImageArray, } from '../services/helpers/product'
import projectSettings from '../constants/projectSettings'
import BasicFunction from "../services/extra/basicFunction";
import {addToWishList, deleteWishList} from "../services/api";
import ImageZoom from "./ImageZoom"
import { Collapse, } from 'reactstrap';
const basicFunction = new BasicFunction();
class ProductInfo extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            qty: 1,
            isSubscribed: false,
            subsDuration: "3",
            isAllIngredient: false
        }
    }
    
  hartState = (_id, productmainId, productDetails, productSlug) => {
    const removeIndex = basicFunction.checkProductInWishList(
      this.props.wishList,
      productmainId
    );
    var wishListArray = [...this.props.wishList];
    if (removeIndex || removeIndex === 0) {
      if (this.props.user._id) {
        var id = wishListArray[removeIndex].wishListId;
        deleteWishList({ id })
          .then(resJson => {
            if (resJson.success) {
            }
          })
          .catch();
      }
      wishListArray.splice(removeIndex, 1);
      this.props.setWishList(wishListArray);
      this.setState({
        SpinnerToggle: false
      });
    } else {
      if (this.props.user._id) {
        const userid = this.props.user._id;
        addToWishList(userid, productmainId, _id, productSlug)
          .then(resJson => {
            const resJson2 = resJson.data
            if (resJson2.status) {
              var wishlist = "";
              const wishListRes = resJson2.wishlist;
              if (wishListRes.combo) {
                wishlist = {
                  combo: wishListRes.combo,
                  productid: wishListRes.comboid,
                  productmeta: wishListRes.comboid,
                  userid: userid,
                  wishListId: wishListRes._id,
                  productSlug
                };
              } else {
                wishlist = {
                  combo: wishListRes.combo,
                  productid: wishListRes.productid,
                  productmeta: wishListRes.productmeta,
                  userid: userid,
                  wishListId: wishListRes._id,
                  productSlug
                };
              }

              this.props.setWishList([...wishListArray, wishlist]);
              this.setState({
                SpinnerToggle: false
              });
            }
          })
          .catch(err => {});
      } else {
        const wishListDetails = {
          productmeta: _id,
          productid: productmainId,
          productDetails: productDetails,
          productSlug
        };

        this.props.setWishList([...wishListArray, wishListDetails]);
      }
    }
  };
  
  getAvg = reviews => {
    if(reviews){
        console.log({
            reviews
        })
        const newArr = reviews.map(el => el.overall);
        const sum = newArr.reduce((a, b) => a + b, 0);
        return sum / reviews.length;
    }
    return 0
  };
    render(){
        const {
            qty, isSubscribed, subsDuration, isAllIngredient
        } = this.state
        const {
            image, product, productAttr, addToCart, cart, showCartBar, allProducts
        } = this.props
        const basePrice = getBasicPrice(product)
        const price = parseFloat(basePrice.sale_price || 0) * qty
        const {
            subsPercent
        } = projectSettings
        const cutPrice = basicFunction.getParchantage(parseFloat(subsPercent), basePrice.sale_price);
        const disPrice = ((parseFloat(basePrice.sale_price) - parseFloat(cutPrice)) * qty).toFixed(2)
        const {
            _id: productId,
            combo,
            productid,
            title
        } = product
        const productName = combo === true ? title : (productid ? productid.producttitle : (title || ""));

        const addToCartFn = () =>{
            if(isSubscribed){
                addToCart(directAddToCart({
                    ...product,
                    subscribed: isSubscribed,
                    subscribedTime: subsDuration,
                    subscribedDiscountPersent: subsPercent
                }, qty))
            }else{
                addToCart(directAddToCart({
                    ...product
                }, qty))
            }
            showCartBar()
        }
        const { Option } = Select;
        const gallery = getProductImageArray(product)
        const avgReviews = this.getAvg(this.props.reviews).toFixed(1)
        console.log({"reviews": this.props.reviews})
        console.log({
            product
        })
        const reviewsLength = this.props.reviews ? this.props.reviews.length : 0
        const headingAndReviews = () => <>
            <div className="c-product-info__title-col">
                <Heading versions={["default"]} parentClass="c-product-info">{product && (product.title || (product.productid && product.productid.producttitle))}</Heading>
                <Heading subHeading="true" parentClass="c-product-info">{product && (product.sdescription || (product.productid && product.productid.sdescription))}</Heading>
            </div>
            <div className="c-product-info__rating-wrapper">
                {reviewsLength > 0 && <div className="c-product-info__rate">
                    <Rate 
                        style={{ color: '#000' }}
                        className="c-product-info__stars c-product-info__stars--sm " 
                        disabled value={avgReviews} 
                        allowHalf={true} />
                    <p className="c-product-info__review">{reviewsLength} Reviews({avgReviews})</p>
                </div>}
            </div>
        </>
        return (
            <div className="c-product-info container">
                <div className="row c-product-info__row">
                    <div className="col-md-6 c-product-info__image-col">
                        <div className="c-product-info__mobile-sec">
                            <div className="c-product-info__title-wrap">
                                {headingAndReviews()}
                            </div>
                        </div>
                        <div className="c-product-info__img-wrapper">
                            {gallery && gallery.length > 0 && <ImageZoom images={gallery} />}
                            {gallery && gallery.length <= 0 && <img src={image} alt="product" className="img-fluid c-product-info__img"/>}
                            {/* <p className="c-product-info__size">1 oz/30 ml</p> */}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="c-product-info__title-wrap lg-hide">
                            {headingAndReviews()}
                        </div>
                        <div className="c-product-info__description">
                            <Heading subHeading="true" versions={["default", "lft-br"]} parentClass="c-product-info">{product &&(product.description || (product.productid && product.productid.description))}</Heading>
                        </div>
                        <div className="c-product-info__list">
                            {productAttr.map((el, i)=> (
                                <TitleList parentClass="c-product-info" key={i} title={el.title} >{el.description}</TitleList>
                            ))}
                            {!product.combo && <TitleList onTitleClick={()=> {
                                this.setState(prevState => ({
                                    isAllIngredient: !prevState.isAllIngredient
                                }))
                            }} parentClass="c-product-info" title={<>{isAllIngredient ? "All" : "Key"} Ingredients<br /><Icon type={isAllIngredient ? "minus" : "plus"} /> </>} >
                                <Collapse isOpen={!isAllIngredient}>
                                    {product.keyingredients}
                                </Collapse>
                                <Collapse isOpen={isAllIngredient}>
                                    {product.allingredients}
                                </Collapse>
                            </TitleList>}
                        </div>
                        <div className="c-product-info__subscribe-wrapper d-flex">
                            <Checkbox checked={isSubscribed} onChange={()=> {this.setState(prevState => ({
                                isSubscribed: !prevState.isSubscribed
                            }))}} id={product && product._id} label={`Subscribe & save ${subsPercent}%`} />
                            {
                                isSubscribed && 
                                <div style={{padding: "10px 15px"}}>
                                <Select onChange={(e)=> this.setState({subsDuration: e})} value={subsDuration} >
                                    <Option value="3">3 Months</Option>
                                    <Option value="6">6 Months</Option>
                                    <Option value="12">1 Year</Option>
                                </Select>
                                <br />
                                </div>
                            }
                        </div>
                        
                        <div className="c-product-info__atc-wrapper">
                            <div className="c-product-info__btn-wrapper">
                            <div className="c-product-info__btn-wrap">
                                <Button onClick={addToCartFn} parentClass="c-product-info" theme="outline" >Add to cart</Button>
                            </div>
                            <div className="c-product-info__btn-wrap">
                                <Button 
                                onClick={() => {
                                    this.hartState(
                                    productId,
                                    productid ? productid._id : productId,
                                    {
                                        productName,
                                        image
                                    },
                                    // productSlug
                                    );
                                }} versions={["wishlist"]} parentClass="border-left-0 c-product-info" theme="outline" >
                                    <Icon type="heart" theme="filled" />
                                    {/* <Icon type="heart" /> */}
                                </Button>
                            </div>
                            </div>
                            <div className="c-product-info__price-wrapper">
                                {
                                    isSubscribed ? <p className="c-product-info__price"><strike style={{opacity: 0.7}}>$ {numberFormat(price)}</strike><span> $ {numberFormat(disPrice)}</span></p> :
                                    <p className="c-product-info__price">$ {numberFormat(price)}</p>
                                }
                                
                            </div>
                            <div className="c-product-info__qty-wrapper">
                                <Quantity value={qty} onChange={e => this.setState({qty:e})} min={1} parentClass="c-product-info" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    cart : state.cart,
    wishList: state.wishList,
    user: state.user
})
export default connect(mapStateToProps, {addToCart, showCartBar})(ProductInfo)