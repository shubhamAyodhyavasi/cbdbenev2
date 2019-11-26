import { connect } from "react-redux";
import Layout from "../../components/Layouts/Layout";
import HImgSection from "../../components/HImgSection";
import Heading from "../../components/Heading";
import Logo from "../../components/Logo";
import apiList from "../../services/apis/apiList";
import ProductCard from "../../components/ProductCard";
import { getProductImage, getProductTitle, getProductShortDesc, getBasicPrice, addSlugToProduct, getVisibleProducts } from "../../services/helpers/product";
import projectSettings from "../../constants/projectSettings";
const Category = ({ productList, ...props }) => {
    const products = productList.map(el => {
        console.log({
            price:getBasicPrice(el),
            el
        })
        return {
            image: el.productImage? projectSettings.serverUrl + el.productImage : "//via.placeholder.com/300x500",
            title: getProductTitle(el),
            subTitle: getProductShortDesc(el),
            price: getBasicPrice(el),
            ...el,
        }
    })
    return (
        <Layout headerTheme="dark">
            <div className="c-category-page">
                <HImgSection version={["full", "content-bottom"]} image={"/images/oil-page.jpg"} >
                    <div>
                        <Heading parentClass="c-category-page" versions={['lft-br', 'large']} >{`Buy the highest quality \nCBD Isolate oil online extracted from \norganically grown hemp.`}</Heading>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div>
                        <Logo />
                    </div>
                </HImgSection>
                <div className="c-category-page__products-wrapper">
                    <div className="c-category-page__row row">
                        {
                            products.map(el => (
                                <div key={el._id} className="col-lg-4 col-md-6">
                                    <ProductCard product={el} versions={["show-price", "full-height"]} title={el.title} subTitle={el.subTitle} image={el.image} price={el.price && el.price.sale_price} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}
Category.getInitialProps = async ({ query }) => {
    // const res  = await fetch("http://localhost:4000/products/api/bycategory/"+query.cid)
    // const productObj = await res.json()
    // const product = getVisibleProducts([productObj.product_details])
    
    const res = await fetch(apiList.getAllProducts)
    const productList = await res.json()
    const visibleProducts = getVisibleProducts(productList.products)
    return {
        category: query.cid,
        productList: visibleProducts.map(el => addSlugToProduct(el))
    }
}
export default connect(null)(Category)