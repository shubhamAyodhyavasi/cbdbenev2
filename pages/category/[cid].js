import { connect } from "react-redux";
import Layout from "../../components/Layouts/Layout";
import HImgSection from "../../components/HImgSection";
import Heading from "../../components/Heading";
import Logo from "../../components/Logo";
import apiList from "../../services/apis/apiList";
import ProductCard from "../../components/ProductCard";
import { getProductImage, getProductTitle, getProductShortDesc, getBasicPrice, addSlugToProduct, getVisibleProducts } from "../../services/helpers/product";
import projectSettings from "../../constants/projectSettings";
import fetch from 'isomorphic-unfetch'
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
        <Layout headerTheme="dark" fixed={true}>
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
    if(query.cid.toLowerCase() === "bundles"){
        const res = await fetch(apiList.getAllCombos)
        const productList = await res.json()
        const visibleProducts = getVisibleProducts(productList.combos)
            
        return {
            category: query.cid,
            productList: visibleProducts.map(el => addSlugToProduct(el))
        }
    }else{
        const res = await fetch(apiList.getAllProducts)
        const productList = await res.json()
        const visibleProducts = getVisibleProducts(productList.products)
        const categoryProduct = visibleProducts.filter(el => {
            if(el.categoryid ){
                if(el.categoryid.constructor === Array){
                    return el.categoryid.some(elx => elx.categorytitle && elx.categorytitle.toLowerCase() === query.cid.toLowerCase())
                } else if(el.categoryid.categorytitle){
                    return el.categoryid.categorytitle.toLowerCase() === query.cid.toLowerCase()
                }
            }
            return false
        })
        return {
            category: query.cid,
            productList: categoryProduct.map(el => addSlugToProduct(el))
        }
    }
}
export default connect(null)(Category)