import {useState} from 'react'
import Logo from "./Logo";
import Nav from "./nav";
import { Affix } from 'antd'
import classNames from 'classnames'
import mainMenus from '../constants/mainMenus'
import rightMenus from "../constants/rightMenus";
const Header = ({bg, theme, versions}) => {
    const versionClass = versions.map(el => (`c-header--${el}`)).join(" ")
    const [isFixed, setIsFixed] = useState(false)
    return (
        <Affix className="c-header__affix" offsetTop={0} onChange={e => setIsFixed(e)}>
            <header className={classNames(" c-header", {
                "c-header--light": true,
                "c-header--fixed": false,
                "c-header--pinned": isFixed || bg,
                ["c-header--"+theme]: theme,
                [versionClass]: versions
            })}>
                {/* <nav className="c-header__nav nav nav--main">
                left nav
                </nav> */}
                <Nav parent="c-header" items={mainMenus} />
                <Logo />
                <Nav parent="c-header" isRight={true} items={rightMenus} />
            </header>
        </Affix>
    )
}

Header.defaultProps = {
    bg: false,
    versions: []
}


export default Header