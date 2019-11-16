import Logo from "./Logo";
import Nav from "./nav";
import mainMenus from '../constants/mainMenus'
import rightMenus from "../constants/rightMenus";
const Header = () => (
    <header className="c-header c-header--fixed  c-header--light">
        {/* <nav className="c-header__nav nav nav--main">
        left nav
        </nav> */}
        <Nav parent="c-header" items={mainMenus} />
        <Logo />
        <Nav parent="c-header" isRight={true} items={rightMenus} />
    </header>
)

export default Header