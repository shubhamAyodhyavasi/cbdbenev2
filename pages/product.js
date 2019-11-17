import Layout from '../components/Layouts/Layout'
import ProductInfo from '../components/ProductInfo'
import { getProductById } from '../services/api'
import HImgSection from '../components/HImgSection'
import {getProductImage, getProductAttributes} from '../services/helpers/product'
import Heading from '../components/Heading'
import TitleList from '../components/TItleList'
// import Tabs from '../components/Tabs'
import ProductDetailsTab from '../components/ProductDetailsTab'
import ProductSlider from '../components/ProductSlider'
// import fetch from 'isomorphic-unfetch';

const product = {
    title: "CBD Isolate 500 mg"
}

class Product extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            productDetails: null,
            productList: [
                {
                    title: "title",
                    subTitle: "sub title",
                    image: "/images/oil.png",
                },
                {
                    title: "lorem",
                    subTitle: "sub title",
                    image: "/images/capsule-img.png",
                },
                {
                    title: "ipsum",
                    subTitle: "sub title",
                    image: "/images/cbd-oil.png",
                },
            ]
        }
    }
    getInitialProps = async context => {
        console.log("start")
        
        const res = await getProductById("5d3c3b29ed89356fe6812348")
        const res1 = fetch("http://localhost:4000/products/api/getbyid/5d3c3b29ed89356fe6812348")
        console.log({res})
        return {
            res1: res
        }
    }
    componentDidMount(){
        getProductById("5d3c3b29ed89356fe6812348")
        .then(res => res.json() )
        .then(res => {
            console.log({res})
            this.setState({
                product_details: res.product_details
            })
        })
        .catch(err=>console.log({err}))
        console.log({
            props: this.props
        })
    }
    render (){
        const {
            product_details: product,
            productList
        } = this.state
        console.log({
            props: this.props
        })
        const productAttr = getProductAttributes(product)
        const image = getProductImage(product, "sectionB") || "/images/cbd-oil.png"
        return (
            <Layout headerTheme="dark">
                <ProductInfo product={product} image="/images/cbd-oil.png">
                </ProductInfo>
                <HImgSection version={["full"]} image={image} >
                    <div>
                        <Heading >CBD Isolate Oil from premium, organically grown hemp, to create the purest CBD.</Heading>
                    </div>
                    <div className="c-product-single__list">
                        {
                            productAttr.map((el, i) => <TitleList parentClass="c-product-single" key={i} title={el.title} >{el.description}</TitleList>)
                        }
                    </div>
                </HImgSection>
                <div className="c-product-single__details-wrapper">
                    <ProductDetailsTab parentClass="c-product-single" />
                </div>
                <div className="c-product-single__related-section">
                    <div className="row">
                        <div className="col-md-6">
                            <Heading versions={["default", "upper"]} >Acompany with</Heading>
                        </div>
                        <div className="col-md-6">
                            <Heading subHeading={true} versions={["default", "lft-br"]} >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.</Heading>
                        </div>
                        <div className="col-12">
                            <ProductSlider parentClass="c-product-single" products={productList} />
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}

export default Product