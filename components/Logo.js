import Link from "next/link";
import classNames from 'classnames'
const Logo = ({versions, parentClass, full}) => {
    const componentClass = `c-logo`
    const versionClass = versions.map(el => (`${componentClass}--${el}`)).join(" ")
    const parent = `${parentClass}__${componentClass.replace("c-", "")}`
    const className = classNames(componentClass, {
        [versionClass]: versions,
        [parent]: parentClass,
    })

    return (
        <Link href="/" >
            <a className={className}>
                {!full && <img src="/images/logo-new.svg" className="c-logo__img" alt="bene"/>}
                {full && <img src="/images/logo.svg" className="c-logo__img" alt="bene"/>}
            </a>
        </Link>
    )
}
Logo.defaultProps = {
    versions: [],
    full: false
}
export default Logo