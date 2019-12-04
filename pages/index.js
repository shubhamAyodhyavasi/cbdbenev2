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

// import Head from 'next/head'
// import Nav from '../components/nav'
// import Header from '../components/Header'

class Home extends React.Component {
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
    getAllCombos().then(res => {
      console.log({
        res
      })
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
      activeCategory, products
    } = this.state
    // const {
    //   products
    // } = this.props
    console.log({
      props: this.props,
      products
    })
    return (
      <Layout title="Home" >
        <Banner
          image="/images/home-banner.png"
          heading={<span>bene fits <br />your life</span>}
          content={<span>In our own quest to enhance total balance and <br />reduce stress, we set out to understand, what is CBD.</span>}
        >
          <Button parentClass="c-home" theme={'gold'} >Shop all products</Button>
        </Banner>
        {(products && products.length > 0) && <CategoryProducts
          bg="light-2"
          categoryList={categoryList}
          activeCategory={activeCategory}
          onCategoryChange={this.changeCategory}
          products={products}
          heading="Discover the products line" />}
        <LRSection
          heading="bene"
          subHeading="organically grown hemp extract"
          linkText="READ MORE"
          Link="/"
          image="/images/oranic-img.png"
        >
          In our own quest to enhance total balance and reduce stress, we set out to understand, what is CBD. We met manufacturers from across the world. We spoke with doctors.
        </LRSection>
        <HHSection
          heading="Bundles of awesomeness!"
          subHeading="Give our bundles a try with our 60-day, money-back guarantee. The perfect gift. A great way to enjoy premium CBD at an incredible price. All bundles are 20% off."
          linkText="READ MORE"
          Link="/"
          bg="light-2"
          images={[
            "/images/cbd-group.png",
            "/images/oil-group.png"
          ]}
        />
      </Layout>
    )
  }
}

export default connect(state => state, { getProducts })(Home)
