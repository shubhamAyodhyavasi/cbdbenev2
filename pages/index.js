import { withRedux } from '../redux'
import React, { useState } from 'react'
import Layout from '../components/Layouts/Layout'
import Banner from '../components/Banner'
import LRSection from '../components/LRSection'
import HHSection from '../components/HHSection'
import CategoryProducts from '../components/CategoryProducts'
import categoryList from '../constants/categoryList'
import { getProducts } from '../redux/actions'
import { connect } from 'react-redux'
import Button from '../components/form-components/Button'
import { getAllCombos } from '../services/api'
import BundleProducts from '../components/BundleProducts'
import ScrollAnimation from "react-animate-on-scroll";
import Fade from 'react-reveal/Fade';
// import Head from 'next/head'
// import Nav from '../components/nav'
// import Header from '../components/Header'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeCategory: "Featured",
      allProducts: props.products.products || [],
      products: props.products.featured || [],
      combos: []
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
    getAllCombos().then(res => {
      console.log({
        res
      })
      if(res.data && res.data.combos){
        this.setState({
          combos: res.data.combos
        })
      }
    })
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
  render() {
    const {
      activeCategory, products, combos
    } = this.state
    // const {
    //   products
    // } = this.props
    console.log({
      props: this.props,
      products
    })
    return (
      <Layout title="Home" headerTheme="light" >
        <Banner
          image="/images/bundle.jpg"
          mobileImage="/images/home-banner-mobile.png"
          heading={<span><span style={{fontSize: "1.3em"}}>bené</span> fits <br />your life</span>}
          content={<span>In our own quest to enhance total balance and <br />reduce stress, we set out to understand, what is CBD.</span>}
        >
          <Button parentClass="c-home" theme={'outline-gold'} >Shop all products</Button>
        </Banner>
        {(products && products.length > 0) && 
        <Fade>
            <CategoryProducts
            bg="light-2"
            categoryList={categoryList}
            activeCategory={activeCategory}
            onCategoryChange={this.changeCategory}
            products={products}
            heading="Discover the products line" />  
          </Fade>
          }
        <Fade>
        <LRSection
          heading="bene"
          subHeading="organically grown hemp extract"
          linkText="READ MORE"
          Link="/"
          image="/images/bundle2.jpg"
        >
          In our own quest to enhance total balance and reduce stress, we set out to understand, what is CBD. We met manufacturers from across the world. We spoke with doctors.
        </LRSection>
        </Fade>
        <Fade>
        <HHSection
          heading="Bundles of awesomeness!"
          subHeading="Give our bundles a try with our 60-day, money-back guarantee. The perfect gift. A great way to enjoy premium CBD at an incredible price. All bundles are 20% off."
          linkText="READ MORE"
          Link="/"
          bg="light-2"
          // images={[
          //   "/images/cbd-group.png",
          //   "/images/oil-group.png"
          // ]}
        >
          <BundleProducts versions={["no-padding", "h-auto"]} bg="bggrey" products={combos} />
        </HHSection>
        </Fade>
        <section class="wellness">
          <div class="wellness__heading">
            <h3 class="wellness__heading--text">bené means <b>wellness</b> in Italian<br/>
            And that's what we're all about</h3>
          </div>
          <div class="wellness-wrapper">
            <div class="wellness-wrapper__img">
              <img class="wellness-wrapper__img--img img-fluid" src="/images/consult-image.jpg" />
            </div>          
            <div class="wellness-wrapper__desp">
              <p class="wellness-wrapper__desp--text">Today we're confident that were providing you with the highest quality CBD you can find. Our product line  is a collection, to suit a wide range of tastes and needs. We're dedicated to helping you get the products that suit you,  as well as your pets. That's right, we have CBD products for pets  too.</p>
              <div class="wellness-wrapper__btn">
                <div className="mt-4 mb-4">
                  <Button parentClass="c-home" versions={["btm-br-gold"]} theme={['btm-br']} >READ MORE</Button>
                </div>
              </div>
              <div class="willness-img">
                <img class="img-fluid" src="/images/cbd-wellness.png"></img>
              </div>
            </div>
          </div>
        </section>


      </Layout>
    )
  }
}

export default connect(state => state, { getProducts })(Home)