import React from 'react'
import Head from 'next/head'
import Header from '../Header'
import projectSettings from '../../constants/projectSettings'
import '../styles/app.scss'
import Footer from '../Footer'
import classNames from 'classnames'
import ChatBot from '../chatBot/ChatBot'

const Layout = ({title, children, isHeaderBg, headerTheme, headerVersions, pageClass, fixed, homeLogo}) => (
  <div className={classNames("c-layout", {
    [pageClass]: pageClass
  })}>
    <Head>
      <title>{title ? title : projectSettings.projectName}</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <Header theme={headerTheme} homeLogo={homeLogo} versions={headerVersions} bg={isHeaderBg} fixed={fixed}/>
    {children}
    <ChatBot />
    <Footer />
  </div>
)

Layout.defaultProps = {
  isHeaderBg: false,
  fixed: true
}
export default Layout
