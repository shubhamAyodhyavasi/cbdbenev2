
import React, { useState, useRef, useMemo, Fragment } from 'react'
import Logo from "./Logo";
import Nav from "./nav";
import { useScrollPosition } from "../services/helpers/scroll"
import { Affix } from 'antd'
import classNames from 'classnames'
import mainMenus from '../constants/mainMenus'
import rightMenus from "../constants/rightMenus";
const Header = ({bg, theme, versions}) => {
    const versionClass = versions.map(el => (`c-header--${el}`)).join(" ")
    const [isFixed, setIsFixed] = useState(false)
   const [hideOnScroll, setHideOnScroll] = useState(true)

  useScrollPosition(
    ({ prevPos, currPos }) => {
        console.log({"prevPos": prevPos.y})
        console.log({"currPos":currPos.y})
      const isShow = currPos.y > prevPos.y
      if (isShow !== hideOnScroll) setHideOnScroll(isShow)
    },
    [hideOnScroll],
    false,
    false,
    300
  )

    
    return (
        // <Affix className="c-header__affix"  onChange={e => setIsFixed(e)}>
            <header className={classNames(" c-header", {
                "c-header--light": true,
                "c-header--fixed": false,
                "c-header--pinned": isFixed || bg,
                ["c-header--"+theme]: theme,
                [versionClass]: versions
            })}>
                {console.log(hideOnScroll)}
                {/* <nav className="c-header__nav nav nav--main">
                left nav
                </nav> */}
                <Nav parent="c-header" items={mainMenus} />
                <Logo />
                <Nav parent="c-header" isRight={true} items={rightMenus} />
            </header>
        //  </Affix>
    )
}

Header.defaultProps = {
    bg: false,
    versions: []
}


export default Header