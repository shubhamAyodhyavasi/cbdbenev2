import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import { Fade } from 'react-reveal';
import classNames from 'classnames'
import { FiPlus, FiMinus } from 'react-icons/fi'
import './styles/app.scss'
import Drawer from './Drawer'
import CartDrawer from './CartDrawer'
import { toggleCartBar, hideCartBar, toggleRegBar } from '../redux/actions/drawers'
import { unsetUser } from '../redux/actions/user'
// import { c } from '../redux/actions/cart'
import Registration from './popups/Registration';
import Login from './popups/Login';
import { Menu, Dropdown, Icon, Collapse } from 'antd';
const NavMobile = ({
  parent, items, isRight, isCartOpen, toggleCartBar, hideCartBar,
  toggleRegBar, isRegOpen, hasLogin, user, unsetUser, onlyCart
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
        items.map(el => (
        <span onClick={(e) => {
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
      <Fade left when={isOpen}>
      <ul className="c-nav__list">
        {items.filter(el => {
          if (user._id) {
            return el.onlyLogin !== false
          } else {
            return el.onlyLogin !== true
          }
        }).map((el, ind) => <li key={ind} className={classNames("c-nav__list-item", {
          "c-nav__list-item--has-sub-menu": el.subMenus
        })}>
          <div className="c-nav__list-item-inner">
            {
              el.link ?
                <Link as={el.as || el.link} href={el.link}>
                  <a onClick={(e) => {
                    onClick(e, el.action)
                  }} className="c-nav__link">
                    {el.label}
                    {el.icon}
                  </a>
                </Link>
                : (
                  <span onClick={(e) => {
                      onClick(e, el.action)
                    }} className="c-nav__link">
                      {el.label}
                      {el.icon}
                    </span>)
            }  
            {/* {
              el.subMenus && <span onClick={() => setOpen(!isOpen)} className={classNames("c-nav__sub-menu-tgl", {
                "c-nav__sub-menu-tgl--opened": isOpen
              })}>{isOpen ? <FiMinus /> : <FiPlus />}</span>
            } */}
          </div>
          {
            el.subMenus && <ul className="c-nav__sub-menu">
              {el.subMenus.map((elx, i) =>
                  <li key={i} className="c-nav__sub-menu-item">
                    <Link as={elx.as || elx.link} href={elx.link}>
                      <a className="c-nav__link c-nav__link--sub">
                        {elx.label}
                      </a>
                    </Link>
                  </li>
              )}
            </ul>
          }
        </li>)}
      </ul>
      </Fade>
      <Drawer onClose={hideCartBar} title="Cart" visible={isCartOpen} >
        <CartDrawer />
      </Drawer>
      <Drawer onClose={toggleRegBar} title={
        hasLogin ? "Login" : "Registration"
      } visible={isRegOpen} >
        {!hasLogin && <Registration />}
        {hasLogin && <Login />}
      </Drawer>
    </nav>
  )
}

NavMobile.defaultProps = {
  items: []
}
const mapStateToProps = state => ({
  isCartOpen: state.drawers.isCartOpen,
  isRegOpen: state.drawers.isRegOpen,
  hasLogin: state.drawers.hasLogin,
  user: state.user
})
export default connect(mapStateToProps, { toggleCartBar, hideCartBar, toggleRegBar, unsetUser })(NavMobile)
