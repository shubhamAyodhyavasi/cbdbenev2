import Link from 'next/link'
import classNames from 'classnames'
const Button = ({type, value, children, onClick, link, theme, parentClass, versions, disabled}) => {
    const parent = `${parentClass}__btn`
    const versionClass = versions.map(el => (`c-btn--${el}`)).join(" ")

    const onBtnClick = () => {
        if(typeof onClick === "function") onClick()
    }
    const className = classNames("c-btn", {
        [`c-btn--${theme}`]: theme,
        [parent]: parentClass,
        [versionClass]: versions
    })
    switch (type) {
        case "button":
        case "submit":
            return (
                <button disabled={disabled} className={className} type={type} onClick={onBtnClick} >
                    {value}{children}
                </button>
            )
        case "link":
            return (<Link href={link}>
                <a className={className}  onClick={onBtnClick} >{value}{children}</a>
            </Link>)
        
    
        default:
            return (
                <button disabled={disabled} className={className} type={type} onClick={onBtnClick} >
                    {value}{children}
                </button>
            )
    }
}

Button.defaultProps = {
    versions: [],
    disabled: false
}
export default Button