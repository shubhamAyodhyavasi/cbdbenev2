import classNames from 'classnames'
import Heading from '../Heading'
const AccountInner = props => {
    const {
        versions, parentClass, children, pageHeading
    } = props
    const componentClass = "c-account-inner"
    const versionClass = versions.map(el => (`${componentClass}--${el}`)).join(" ")
    const parent = `${parentClass}__${componentClass.replace("c-", "")}`
    const className = classNames(componentClass, {
        [versionClass]: versions,
        [parent]: parentClass,
    })
    return <div className={className}>
        <div className="c-account-inner__heading-wrapper">
            <Heading>{pageHeading}</Heading>
        </div>
        <div className="c-account-inner__main">
            <div className="c-account-inner__row row">
                <div className="col-lg-3 col-md-4">

                </div>
                <div className="col-lg-9 col-md-8">
                    {children}
                </div>
            </div>
        </div>
    </div>
}
AccountInner.defaultProps = {
    pageHeading: "My Account",
    versions: [],
}
export default AccountInner