import Layout from "../components/Layouts/Layout"
import Heading from "../components/Heading"

const Favourites = props => {
    return (
    <Layout headerVersions={["bg-light"]} headerTheme="dark">
        <div className="c-favourites-page">
        <div className="c-favourites-page__page-title">
            <Heading versions={["large"]} parentClass="c-favourites-page" >Website accessibility</Heading>
        </div>

        </div>
    </Layout>)
}
export default Favourites