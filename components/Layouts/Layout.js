import React from 'react'
import Head from 'next/head'
import Header from '../Header'
import projectSettings from '../../constants/projectSettings'
import '../styles/app.scss'
import Footer from '../Footer'

const Layout = ({title, children, isHeaderBg, headerTheme}) => (
  <div>
    <Head>
      <title>{title ? title : projectSettings.projectName}</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <Header theme={headerTheme} bg={isHeaderBg} />
    {children}
    <Footer />
  </div>
)

Layout.defaultProps = {
  isHeaderBg: false
}
export default Layout
