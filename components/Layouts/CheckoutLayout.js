import React from 'react'
import Head from 'next/head'
import projectSettings from '../../constants/projectSettings'
import '../styles/app.scss'
import Logo from '../Logo'
import CartDrawer from '../CartDrawer'
import { connect } from 'react-redux'
import Drawer from '../Drawer'
import Registration from '../popups/Registration';
import Login from '../popups/Login';
import {toggleRegBar} from '../../redux/actions/drawers'

const CheckoutLayout = ({title, children,isRegOpen,
  hasLogin, toggleRegBar
}) => (
  <div className="c-checkout-layout container-fluid">
    <Head>
      <title>{title ? title : projectSettings.projectName}</title>
      
    {/* <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBXxXfKy5wtHEO9XniOvGEKPME-_ldClVk&libraries=places" async defer></script> */}
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
    <Drawer onClose={toggleRegBar} title={
      hasLogin? "Login" : "Registration"
      } visible={isRegOpen} >
        {!hasLogin && <Registration />}
        {hasLogin && <Login />}
    </Drawer>
  </div>
)

const mapStateToProps = state => ({
  isRegOpen: state.drawers.isRegOpen,
  hasLogin: state.drawers.hasLogin,
  user: state.user
})
export default connect(mapStateToProps, {toggleRegBar})(CheckoutLayout)
