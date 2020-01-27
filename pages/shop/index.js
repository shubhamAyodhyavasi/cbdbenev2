import {useState} from 'react'
import { connect } from "react-redux";
import Layout from "../../components/Layouts/Layout";
import HImgSection from "../../components/HImgSection";
import Heading from "../../components/Heading";
import Logo from "../../components/Logo";
import apiList from "../../services/apis/apiList";
import ProductCard from "../../components/ProductCard";
import { getProductImage, getProductTitle, getProductShortDesc, getBasicPrice, addSlugToProduct, getVisibleProducts } from "../../services/helpers/product";
import projectSettings from "../../constants/projectSettings";
import SearchBox from "../../components/form-components/SearchBox";
import fetch from "isomorphic-unfetch";
const Shop = ({ productList, ...props }) => {
    
    const [searchValue, setSearchValue] = useState("")
    const products = productList.map(el => {
        console.log({
            price:getBasicPrice(el),
            el
        })
        return {
            ...el,
            image: el.productImage? projectSettings.serverUrl + el.productImage : "//via.placeholder.com/300x500",
            title: getProductTitle(el),
            subTitle: getProductShortDesc(el),
            price: getBasicPrice(el),
        }
    }).filter(el => {
        if(searchValue === "") return true
        return el.title.toLowerCase().includes(searchValue.toLowerCase())
    })
    const onSearchChange = e => {
        const {
            value
        } = e.target
        setSearchValue(value)
    }
    return (
        <Layout headerVersions={["bg-dark"]} headerTheme="dark">
            <div className="c-shop-page">
                <div className="container-fluid">
                    <div className="c-shop-page__row c-shop-page__row--light-bg row">
                        <div className="col-md-6">
                            <Heading versions={["lft-br"]} parentClass="c-shop-page" >Discover the whole range of cbd products</Heading>
                        </div>
                        <div className="col-md-6">
                            <div className="c-shop-page__filter-box">
                                <SearchBox onChange={onSearchChange} value={searchValue} parentClass="c-shop-page" />
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="c-shop-page__products-wrapper">
                    <div className="c-shop-page__row row">
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
Shop.getInitialProps = async ({ query }) => {
    const res = await fetch(apiList.getAllProducts)
    const productList = await res.json()
    const visibleProducts = getVisibleProducts(productList.products)
    return {
        category: query.cid,
        productList: visibleProducts.map(el => addSlugToProduct(el))
    }
}
export default connect(null)(Shop)