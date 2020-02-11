import React, { Component } from "react";
import { connect } from "react-redux";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  DotGroup,
  ImageWithZoom,
  Image
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import classNames from "classnames";
import { Icon } from "react-icons-kit";
import { heart, heartO } from "react-icons-kit/fa/";
class ProductViewSlider extends Component {
  constructor(props) {
    super(props);
    this.renderSlides = this.renderSlides.bind(this);
    this.state = {
      zoom: false,
    };
  }


  renderSlides(arr) {
    return arr
      .map((product, index) => {
        if (product.img)
          return (
            <Slide key={index} index={index}>
              {this.state.zoom ? (
                <ImageWithZoom
                  onClick={() => {
                    this.setState({ zoom: false });
                  }}
                  src={product.img}
                />
              ) : (
                <Image
                  onClick={() => {
                    this.setState({ zoom: true });
                  }}
                  style={{ objectFit: "contain" }}
                  src={product.img}
                />
              )}
            </Slide>
          );
        return null;
      })
      .filter(el => el);
  }
  render() {
    const { productmeta, productid, productDetails, wishList } = this.props;
    return (
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={80}
        totalSlides={this.props.imgArr.length}
        className="product-view"
      >
        <Slider>{this.renderSlides(this.props.imgArr)}</Slider>
        {this.props.imgArr.length > 1 && (
          <div className="slider-navs">
            {/* <ButtonBack>Back</ButtonBack>
            <ButtonNext>Next</ButtonNext> */}
            <DotGroup />
          </div>
        )}

        {/* <div
          className={classNames("toggle-fav", {
            fav: isProductInWishList(productmeta, wishList)
          })}
          onClick={() => {
            this.hartState(productmeta, productid, productDetails);
          }}
        >
          <span>
            <Icon
              icon={isProductInWishList(productmeta, wishList) ? heart : heartO}
            />
          </span>
        </div> */}
      </CarouselProvider>
    );
  }
}
const mapStateToProps = state => ({
  wishList: state.wishList,
  user: state.user
});
export default connect(
  mapStateToProps,
)(ProductViewSlider);
