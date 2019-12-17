import Layout from '../components/Layouts/Layout'
import Banner from '../components/Banner'
import { connect } from 'react-redux'
import { getProducts } from '../redux/actions'
import CategoryProducts from '../components/CategoryProducts'
import categoryList from '../constants/categoryList'
import Heading from '../components/Heading'
import ContactFrom from '../components/forms/ContactForm'
import Button from '../components/form-components/Button'

class Contact extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeCategory: "Featured",
            allProducts: props.products.products || [],
            products: props.products.featured || []
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.products.products !== prevState.allProducts) {
        console.log({
          allProducts: nextProps.products.products
        })
        return { 
          allProducts: nextProps.products.products
        };
      }
      else return null;
    }
    componentDidUpdate(prevProps, prevState) {
      if (prevProps.products.products !== this.props.products.products) {
        this.changeCategory({title: this.state.activeCategory})
      }
    }
  
    componentDidMount() {
      this.props.getProducts()
    }
    changeCategory = (activeCategory) => {
      const {
        products
      } = this.props
      console.log({
        activeCategory,
        products
      })
      if (activeCategory.title === "Featured") {
        this.setState({
          products: products.featured,
          activeCategory: activeCategory.title
        })
      } else if (activeCategory.title === "All") {
        this.setState({
          products: products.products,
          activeCategory: activeCategory.title
        })
      } else {
        const activeCategoryArr = products.categories.find(el => el.category.categorytitle === activeCategory.title) || {}
        this.setState({
          products: activeCategoryArr.products,
          activeCategory: activeCategory.title
        })
      }
    }
    render(){
        const {
          activeCategory, products
        } = this.state
        return (
            <Layout className="c-contact" title="Contact">
            <Banner
              image="/images/consult.jpg"
              image2x="/images/contact-banner@2x.jpg"
              heading={<span>consult a certified<br />
                doctor about CBD</span>}
              bottomLogo={true}
              versions={[
                  "hf-content", "align-left",
                  "heading-l-br", "btm-logo", "content","no-overlay","black-heading"
                ]}
                extraButton={
                    <Button versions={["outline"]}>
                        agsd
                    </Button>

                }
              content={<span>Get in touch with our doctors who have experience with CBD</span>}
            >
            </Banner>
            <div className="c-contact__container">
                <div className="row"></div>
                <Heading>
                HOW DOES CBD <br /> CONSULT WORK?
                </Heading>
                <p>Please select a topic below related to your inquiry.</p>
                <ContactFrom />
            </div>
            {(products && products.length > 0) && <CategoryProducts
              bg="light-2"
              categoryList={categoryList}
              activeCategory={activeCategory}
              onCategoryChange={this.changeCategory}
              products={products}
              subHeading="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud."
              heading="Our top products" />}
            </Layout>
        )
    }
}

const mapStateToProps = state => ({
    products: state.products
})
Contact.defaultProps = {
    products: {

    }
}
export default connect(mapStateToProps, { getProducts })(Contact)