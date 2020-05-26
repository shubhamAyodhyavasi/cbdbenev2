import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import ReactSVG from 'react-svg'
import Heading from '../../components/Heading'
import projectSettings from '../../constants/projectSettings'
import '../styles/app.scss'
import Logo from '../Logo'
import CartDrawer from '../CartDrawer'
import { connect } from 'react-redux'
import Drawer from '../Drawer'
import Registration from '../popups/Registration';
import ForgetPassword from '../popups/ForgetPassword';
import Login from '../popups/Login';
import {toggleRegBar} from '../../redux/actions/drawers'
import { Collapse } from 'reactstrap';


const CheckoutLayout = ({title, children,isRegOpen,
  hasLogin, toggleRegBar, loginDisplay
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState( typeof window !== 'undefined' ? window.innerWidth : 0);
  
  useEffect(()=>{
      window.addEventListener("resize",()=>{
        if( window.innerWidth !== windowWidth){
          setWindowWidth(window.innerWidth)
          resetOpen(windowWidth, isOpen)
        }
      })
      setWindowWidth(window.innerWidth)
      resetOpen(windowWidth, isOpen)
  }, [windowWidth])
  const toggle = () => setIsOpen(!isOpen);
  const resetOpen = (width = 0, isOpen) => {
    if(width < 768){
      if(isOpen)
        setIsOpen(false)
    }else{
      if(!isOpen)
        setIsOpen(true)
    }
  }
  return (
    <div className="c-checkout-layout container-fluid">
      <Head>
        <title>{title ? title : projectSettings.projectName}</title>
      {/* <script src={`https://maps.googleapis.com/maps/api/js?key=${projectSettings.googleApiKey}&libraries=places`} async defer></script> */}
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className="c-checkout-layout__row row">
          <div className="c-checkout-layout__main col-md-8 order-1 order-md-0 ">
              <div className="d-none d-md-block c-checkout-layout__logo-wrapper">
                  <Logo full={true} parentClass="c-checkout-layout" />
              </div>
              {children}
          </div>
          <div className="c-checkout-layout__cart-col col-md-4 order-0 order-md-1">
            <div className="d-block d-md-none">
              <div className="c-checkout-layout__logo-wrapper ">
                  <Logo full={true} parentClass="c-checkout-layout" />
              </div>
              <Heading parentClass="c-heading--gold d-block d-md-none c-checkout " versions={["default", "upper"]}>Checkout</Heading>
              <div className="order-summary">
                <Heading onClick={toggle} parentClass="c-checkout-layout" versions={["small", "white"]} >
                  <span className="d-flex c-checkout-layout__btn "> 
                  <ReactSVG className="c-checkout-layout__cart-icon" src="/images/cart-icon-1.svg" /> Show order summary {isOpen? "-":"+"}
                  </span>
                </Heading>               
              </div>
            </div>          
            <Collapse isOpen={isOpen}>     
            <CartDrawer complete={true} />
            </Collapse>
          </div>
      </div>
      <Drawer onClose={toggleRegBar} title={
        loginDisplay === "register" ? "Registration" :  "Login"
      } visible={isRegOpen} >
        {loginDisplay === "register" && <Registration />}
        {loginDisplay === "login" && <Login />}
        {loginDisplay === "forget" && <ForgetPassword />}
      </Drawer>
    </div>
  )
}

const mapStateToProps = state => ({
  isRegOpen: state.drawers.isRegOpen,
  hasLogin: state.drawers.hasLogin,
  loginDisplay: state.drawers.toDisplay,
  user: state.user
})
export default connect(mapStateToProps, {toggleRegBar})(CheckoutLayout)
