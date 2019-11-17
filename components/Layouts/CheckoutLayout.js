import React from 'react'
import Head from 'next/head'
import projectSettings from '../../constants/projectSettings'
import '../styles/app.scss'
import Logo from '../Logo'
import CartDrawer from '../CartDrawer'

const CheckoutLayout = ({title, children}) => (
  <div className="c-checkout-layout container-fluid">
    <Head>
      <title>{title ? title : projectSettings.projectName}</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <div className="c-checkout-layout__row row">
        <div className="col-md-8 c-checkout-layout__main">
            <div className="c-checkout-layout__logo-wrapper">
                <Logo full={true} parentClass="c-checkout-layout" />
            </div>
            {children}
        </div>
        <div className="col-md-4 c-checkout-layout__cart-col">
          <CartDrawer complete={true} />
        </div>
    </div>
  </div>
)

export default CheckoutLayout
