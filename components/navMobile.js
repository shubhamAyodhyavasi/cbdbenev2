import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import { Fade } from 'react-reveal';
import classNames from 'classnames'
import { FiPlus, FiMinus } from 'react-icons/fi'
import './styles/app.scss'
import Drawer from './Drawer'
import CartDrawer from './CartDrawer'
import MobileMenus from './MobileMenus'
import { toggleCartBar, hideCartBar, toggleRegBar } from '../redux/actions/drawers'
import { unsetUser } from '../redux/actions/user'
// import { c } from '../redux/actions/cart'
import Registration from './popups/Registration';
import Login from './popups/Login';
import ForgetPassword from './popups/ForgetPassword';
import { Menu, Dropdown, Icon, Collapse } from 'antd';
const NavMobile = ({
  parent, items, isRight, isCartOpen, toggleCartBar, hideCartBar,
  toggleRegBar, isRegOpen, hasLogin, user, unsetUser, onlyCart, loginDisplay
}) => {
  const [isOpen, setOpen] = useState(false)
  // const [isCartOpen, setIsCartOpen] = useState(false)
  const onClick = (e, action) => {
    if (action === "link") {

    }
    if (action === "cart") {
      toggleCartBar();
      // setIsCartOpen(!isCartOpen)
    }
    if (action === "reg") {
      toggleRegBar()
    }
    if (action === "logout") {
      unsetUser()
    }
  }
  if(onlyCart){
    return <div className={classNames("c-nav__icon-menu-wrapper c-nav__icon-menu-wrapper--mobile", {
      [`${parent}__nav`]: parent,
    })}>{
        items.map((el, key) => (
        <span key={key} onClick={(e) => {
          onClick(e, el.action)
        }} className="c-nav__icon c-nav__icon--mobile">
          {el.label}
          {el.icon}
        </span>
      ))}
    </div>
  }
  return (
    <nav className={classNames("c-nav c-nav--mobile", {
      [`${parent}__nav`]: parent,
      [`c-nav--right`]: isRight,
    })}>
      <span onClick={() => setOpen(!isOpen)} className={classNames("c-nav__menu-tgl", {
                "c-nav__menu-tgl--opened": isOpen
      })}></span>
      {/* <Fade left when={isOpen}> */}
     {/* </Fade> */}
      <Drawer onClose={() =>{setOpen(false)}} title="Bene" visible={isOpen} placement="left">
        <MobileMenus items={items} user={user} />
      </Drawer>
      <Drawer onClose={hideCartBar} title="Cart" visible={isCartOpen} >
        <CartDrawer />
      </Drawer>
      <Drawer onClose={toggleRegBar} title={
        loginDisplay === "register" ? "Registration" :  "Login"
      } visible={isRegOpen} >
        {loginDisplay === "register" && <Registration />}
        {loginDisplay === "login" && <Login />}
        {loginDisplay === "forget" && <ForgetPassword />}
      </Drawer>
    </nav>
  )
}


const mapStateToProps = state => ({
  isCartOpen: state.drawers.isCartOpen,
  isRegOpen: state.drawers.isRegOpen,
  hasLogin: state.drawers.hasLogin,
  loginDisplay: state.drawers.toDisplay,
  user: state.user
})
export default connect(mapStateToProps, { toggleCartBar, hideCartBar, toggleRegBar, unsetUser })(NavMobile)
