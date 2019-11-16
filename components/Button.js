import Link from 'next/link'
import classNames from 'classnames'
const Button = ({type, value, children, onClick, link, theme}) => {
    const onBtnClick = () => {
        if(typeof onClick === "function") onClick()
    }
    switch (type) {
        case "button":
        case "submit":
            return (
                <button className={classNames("c-btn", {
                    [`c-btn--${theme}`]: theme
                })} type={type} onClick={onBtnClick} >
                    {value}{children}
                </button>
            )
        case "link":
            return (<Link href={link}>
                <a className={classNames("c-btn", {
                    [`c-btn--${theme}`]: theme
                })}  onClick={onBtnClick} >{value}{children}</a>
            </Link>)
        
    
        default:
            return (
                <button className={classNames("c-btn", {
                    [`c-btn--${theme}`]: theme
                })} type={type} onClick={onBtnClick} >
                    {value}{children}
                </button>
            )
    }
}

export default Button