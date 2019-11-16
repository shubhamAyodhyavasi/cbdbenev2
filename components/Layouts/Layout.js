import React from 'react'
import Head from 'next/head'
import Header from '../Header'
import projectSettings from '../../constants/projectSettings'
import '../styles/app.scss'
import Footer from '../Footer'

const Layout = ({title, children}) => (
  <div>
    <Head>
      <title>{title ? title : projectSettings.projectName}</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <Header />
    {children}
    <Footer />
  </div>
)

export default Layout
