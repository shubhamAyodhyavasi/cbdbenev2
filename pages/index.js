import React, { useState } from 'react'
import Layout from '../components/Layouts/Layout'
import Banner from '../components/Banner'
import LRSection from '../components/LRSection'
import HHSection from '../components/HHSection'
import CategoryProducts from '../components/CategoryProducts'
import categoryList from '../constants/categoryList'
// import Head from 'next/head'
// import Nav from '../components/nav'
// import Header from '../components/Header'

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("Featured")
  return (
  <Layout title="Home" >
    <Banner 
      image="/images/home-banner.png"
      heading={<span>bene fits <br />your life</span>} 
      content={<span>In our own quest to enhance total balance and <br />reduce stress, we set out to understand, what is CBD.</span>} 
    />
    <CategoryProducts 
      bg="light-2" 
      categoryList={categoryList}
      activeCategory={activeCategory}
      onCategoryChange={(e)=> {
        setActiveCategory(e.title)
      }}
      products={[
        {
          img: "/images/capsule-img.png"
        },
        {
          img: "/images/cbd-oil.png"
        },
        {
          img: "/images/oil.png"
        },
      ]}
      heading="Discover the products line" />
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

export default Home
