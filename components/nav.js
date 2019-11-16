import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import { Drawer } from 'antd'
import { FiPlus, FiMinus } from 'react-icons/fi'
import './styles/app.scss'

const Nav = ({parent, items, isRight}) => {
  const [isOpen, setOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const onClick = (e, action)=> {
    if(action === "link"){

    }
    if(action === "cart"){
      setIsCartOpen(!isCartOpen)
    }
  }
  return (
    <nav className={classNames("c-nav", {
      [`${parent}__nav`]: parent,
      [`c-nav--right`]: isRight,
    })}>
      <ul className="c-nav__list">
        {items.map((el, ind)=> <li key={ind} className={classNames("c-nav__list-item", {
          "c-nav__list-item--has-sub-menu": el.subMenus
        })}>
          {
            el.link ?
            <Link href={el.link}>
              <a onClick={(e)=> {
                onClick(e, el.action)
              }} className="c-nav__link">
                {el.label}
                {el.icon}
              </a>
            </Link>
            : 
            <span onClick={(e)=> {
              onClick(e, el.action)
            }} className="c-nav__link">
              {el.label}
              {el.icon}
            </span>
          }
          {
            el.subMenus && <span onClick={()=> setOpen(!isOpen)} className={classNames("c-nav__sub-menu-tgl", {
              "c-nav__sub-menu-tgl--opened": isOpen
            })}>{isOpen ? <FiMinus /> : <FiPlus />}</span>
          }
          {
            el.subMenus && <ul className="c-nav__sub-menu">
              {el.subMenus.map((elx, i)=> <li key={i} className="c-nav__sub-menu-item">
              <Link href={elx.link}>
                <a className="c-nav__link c-nav__link--sub">
                  {elx.label}
                </a>
              </Link>
              </li> )}
            </ul>
          }
        </li>)}
      </ul>
      <Drawer placement="right" onClose={()=> setIsCartOpen(false)} visible={isCartOpen} >
        asf
      </Drawer>
    </nav>
  )
}

Nav.defaultProps = {
  items: []
}

export default Nav
