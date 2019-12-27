import React, { Component } from "react";
import { connect } from "react-redux";
// import { filePath } from "../Constants";
import projectSettings from "../constants/projectSettings.js"
import ProductViewSlider from "./ProductViewSlider";

const {
    filePath
} = projectSettings
class ImageZoom extends Component {
  render() {
    // let productImageArr = [];
    // const {
    //   featureimage,
    //   title,
    //   combo,
    //   productid,
    //   galleryimgdetails,
    //   _id: productId
    // } = this.props.products.product;
    // let mainImage = undefined;
    // let productName = combo === true ? title : productid.producttitle;
    
    // if (combo === true) {
    //   mainImage = featureimage;
    //   if (mainImage) productImageArr.push({ img: filePath + mainImage });
    // } else {
    //   mainImage = productid.featurefilepath;
    //   if (mainImage) {
    //     productImageArr.push({ img: filePath + mainImage });
    //   }
    // }
    // if (galleryimgdetails) {
    //   if (galleryimgdetails.constructor === Array) {
    //     galleryimgdetails.map(img => {
    //       productImageArr.push({ img: filePath + img });
    //       return null;
    //     });
    //   }
    // }
    // const productDetails = {
    //   productName,
    //   mainImage
    // };
    const {
        images
    } = this.props
    return (
      <div className="display-product-wrapper">
        <div className="display-product-inner">
          <div className="image-view text-center">
            <div>
                <ProductViewSlider
                //   productid={productId}
                //   productmeta={productId}
                  imgArr={images.map(e => ({img: filePath+e}))}
                //   productDetails={productDetails}
                />
              {/* {combo === true && (
                <ProductViewSlider
                //   productid={productId}
                //   productmeta={productId}
                  imgArr={images}
                //   productDetails={productDetails}
                />
              )} */}
              {/* {combo !== true && (
                <ProductViewSlider
                //   productid={productid._id}
                //   productmeta={productId}
                  imgArr={images}
                //   productDetails={productDetails}
                />
              )} */}
              {/* {this.props.Flavor && (
                <p>
                  {this.props.Flavor.label && (
                    <span className="d-block mt-2 text-center">
                      {this.props.Flavor.label}
                    </span>
                  )}
                </p>
              )} */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  products: state.products
});
export default connect(mapStateToProps)(ImageZoom);
