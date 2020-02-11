import React, { Component } from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { getProductsByCategory } from "../../services/extra/productHelpers";
import { getVisibleProducts } from "../../services/helpers/product";
import {getAllProducts} from '../../services/api'

class ChatProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: getProductsByCategory(
        props.products,
        props.steps.categoryList.value
      ),
      isLoading: true,
      selected: null
    };
  }

  componentDidMount() {
    getAllProducts().then(res => {
      const products = getProductsByCategory((res.data.products || []), this.props.steps.categoryList.value)
      this.setState({
        products: getVisibleProducts(products),
        isLoading: false
      })
    })
  }
  triggerNext = e => {
    this.setState({ trigger: true }, () => {
      this.props.triggerNextStep(e);
    });
  };
  render() {
    const { selected, isLoading, products } = this.state;
    return (
      <div>
        {isLoading && "..."}
        {!isLoading &&
          products.map((el, index) => {
            const productTitle = el.title
              ? el.title
              : el.productid && el.productid.producttitle;
            return (
              <p
                onClick={() => {
                  if (!selected) {
                    this.setState(
                      {
                        selected: productTitle,
                        products: [el]
                      },
                      () => {
                        this.triggerNext({
                          value: {
                            ...el,
                            productTitle
                          }
                        });
                      }
                    );
                  }
                }}
                className={classNames("chat-custom-option w-100", {
                  selected: selected === productTitle
                })}
                key={index}
              >
                {productTitle}
              </p>
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products.products
});

export default connect(mapStateToProps)(ChatProductList);
