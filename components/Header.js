
import React, { useState, useRef, useMemo, Fragment } from 'react'
import Logo from "./Logo";
import Nav from "./nav";
import { useScrollPosition } from "../services/helpers/scroll"
import { Affix } from 'antd'
import classNames from 'classnames'
import mainMenus from '../constants/mainMenus'
import rightMenus from "../constants/rightMenus";
import NavMobile from './navMobile';
import mobileMenus from '../constants/mobileMenus';




const Header = ({bg, theme, versions}) => {
    const versionClass = versions.map(el => (`c-header--${el}`)).join(" ")
    const [isFixed, setIsFixed] = useState(false)
    const [show, setIsShow] = useState(true)
    const [isAtTop, setIsAtTop] = useState(true)
   const [hideOnScroll, setHideOnScroll] = useState(true)

  useScrollPosition(
    ({ prevPos, currPos }) => {
        let showNav = currPos.y > prevPos.y;
        console.log(document.body.getBoundingClientRect().top)
        setIsShow(showNav)
        if(currPos.y === -124){
            setIsAtTop(false)
        } else {
            setIsAtTop(true)
        }
         
        // console.log({show})
        
      const isShow = currPos.y > prevPos.y
      if (isShow !== hideOnScroll) setHideOnScroll(isShow)
    },
    [hideOnScroll],
    false,
    false,
    300
  )

 

    return (
        <Affix className="c-header__affix"  onChange={e => setIsFixed(e)}>
            <div className={classNames("c-header__wrapper", {
                "c-header__wrapper--hidden": !show,
            })}>
                <header onScroll={(e) => {
                }}  className={classNames(" c-header", {
                    "c-header--light": true,
                    "c-header--fixed": true,
                    // "c-header--active": show,
                    // "c-header--top": !isAtTop,
                    // "c-header--black": show,
                    // "c-header--hidden": !show,
                    "c-header--pinned": isFixed || bg,
                    ["c-header--"+theme]: theme,
                    [versionClass]: versions
                })}>
                    {/* <nav className="c-header__nav nav nav--main">
                    left nav
                    </nav> */}
                    
                        <NavMobile parent="c-header" items={mobileMenus} />
                        <Nav parent="c-header" items={mainMenus} />
                        <Logo />
                        <Nav parent="c-header" isRight={true} items={rightMenus} />
                </header>
            </div>
        </Affix>
    )
}

Header.defaultProps = {
    bg: false,
    versions: []
}


export default Header