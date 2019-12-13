import React from 'react'
import Head from 'next/head'
import Header from '../Header'
import projectSettings from '../../constants/projectSettings'
import '../styles/app.scss'
import Footer from '../Footer'
import classNames from 'classnames'

const Layout = ({title, children, isHeaderBg, headerTheme, headerVersions, pageClass, fixed}) => (
  <div className={classNames("c-layout", {
    [pageClass]: pageClass
  })}>
    <Head>
      <title>{title ? title : projectSettings.projectName}</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <Header theme={headerTheme} versions={headerVersions} bg={isHeaderBg} fixed={fixed}/>
    {children}
    <Footer />
  </div>
)

Layout.defaultProps = {
  isHeaderBg: false
}
export default Layout
