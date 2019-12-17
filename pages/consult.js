import Layout from '../components/Layouts/Layout'
import Banner from '../components/Banner'
import { connect } from 'react-redux'
import { getProducts } from '../redux/actions'
import CategoryProducts from '../components/CategoryProducts'
import categoryList from '../constants/categoryList'
import Heading from '../components/Heading'
import ContactFrom from '../components/forms/ContactForm'
import Button from '../components/form-components/Button'
import TitleList from '../components/TitleList'

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
                <div className="row">
                  <div className="col-md-8">
                    <Heading>
                    HOW DOES CBD <br /> CONSULT WORK?
                    </Heading>
                    {/* <p>Please select a topic below related to your inquiry.</p> */}
                    <TitleList serial="1." versions={["wide-title"]} title="Select a doctor and request an appointment">
                      Select a doctor licensed to practice in your state. Schedule your appointment and pay for your visit.
                    </TitleList>
                    <TitleList serial="2." versions={["wide-title"]} title="Prepare for the appointment">
                      Enter your medical history privately and securely.
                    </TitleList>
                    <TitleList serial="3." versions={["wide-title"]} title="Consult online or by phone">
                      Visit your doctor online or on the phone to discuss your individual needs and how they can be met.
                    </TitleList>
                    <div className="text-md-right">

                    </div>
                  </div>
                  <div className="col-md-4">

                  </div>
                </div>
            </div>
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