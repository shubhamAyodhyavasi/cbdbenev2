import Heading from './Heading'
import Link from 'next/link'
import footerMenu from '../constants/footerMenu'
import SubscribeForm from './SubscribeForm'
import Logo from './Logo'
const Footer = () => (
    <div className="c-footer">
        
        <div className="c-footer__inner">
            <div className="c-footer__logo-wrapper">
                <Logo full={true} parentClass="c-footer" />
            </div>
            <div className="row">
                {
                    footerMenu.map((el,i)=> {
                        return (<div key={i} className={`c-footer__col c-footer__col--${i + 1}`}>
                        <Heading h="5" versions={["footer", "upper"]} parentClass ="c-footer">{el.heading}</Heading>
                        <ul className="c-footer__menu-list">

                            {el.menus && el.menus.map((elx, k) => {
                               return  <li key={k} className="c-footer__list-item">
                               <Link href={elx.slug}>
                                   <a className="c-footer__link c-footer__link--menu">{elx.title}</a>
                               </Link>
                               </li>
                            })}
                        </ul>
                        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBXxXfKy5wtHEO9XniOvGEKPME-_ldClVk&libraries=places" async defer></script>

                    </div>)
                    })
                }
                <div className={`c-footer__col c-footer__col--${footerMenu.length + 1}`}>
                    <Heading h="5" versions={["footer", "upper"]} parentClass ="c-footer">Sign up to our mailing list</Heading>
                    <p className="c-footer__text">I would like to receive communications about bené products and services.</p>
                    <SubscribeForm />
                </div>
            </div>
        </div>
    </div>
)

export default Footer