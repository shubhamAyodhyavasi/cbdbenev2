import { connect } from "react-redux";
import Layout from "../../components/Layouts/Layout";
import HImgSection from "../../components/HImgSection";
import Heading from "../../components/Heading";
import Logo from "../../components/Logo";
const Category = (props) => {
    console.log({
        props
    })
    return (
        <Layout headerTheme="dark">
            <div className="c-category-single">
                <HImgSection version={["full", "content-bottom"]} image={"/images/oil-page.jpg"} >
                    <div>
                        <Heading parentClass="c-category-single" versions={['lft-br', 'large']} >{`Buy the highest quality \nCBD Isolate oil online extracted from \norganically grown hemp.`}</Heading>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div>
                        <Logo />
                    </div>
                </HImgSection>
            </div>
        </Layout>
    )
}
Category.getInitialProps = async ({query}) => {
    const res  = await fetch("http://localhost:4000/products/api/bycategory/"+query.cid)
    const productObj = await res.json()
    // const product = getVisibleProducts([productObj.product_details])
    return {
        category: query.cid,
        // productObj
    }
}
export default connect(null)(Category)