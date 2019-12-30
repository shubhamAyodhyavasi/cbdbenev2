import classNames from 'classnames'
const Heading = ({versions, children, h, parentClass, subHeading,className, ...props}) => {
    const componentClass = subHeading ? `c-sub-heading` : `c-heading`
    const versionClass = versions.map(el => (`${componentClass}--${el}`)).join(" ")
    const parent = `${parentClass}__${componentClass.replace("c-", "")}`
    const elementClassName = classNames(componentClass, {
        [versionClass]: versions,
        [parent]: parentClass,
        [className]: className
    })
    switch (h) {
        case 1:
        case "1":
            return (
                <h1 className={elementClassName} {...props} >
                    {children}
                </h1>
            )
        case 2:
        case "2":
            return (
                <h2 className={elementClassName} {...props} >
                    {children}
                </h2>
            )
        case 3:
        case "3":
            return (
                <h3 className={elementClassName} {...props} >
                    {children}
                </h3>
            )
        case 4:
        case "4":
            return (
                <h4 className={elementClassName} {...props} >
                    {children}
                </h4>
            )
        case 5:
        case "5":
            return (
                <h5 className={elementClassName} {...props} >
                    {children}
                </h5>
            )
        case 6:
        case "6":
            return (
                <h6 className={elementClassName} {...props} >
                    {children}
                </h6>
            )
    
        default:
            return (
                <h2 className={elementClassName} {...props} >
                    {children}
                </h2>
            )
    }
}

Heading.defaultProps = {
    versions: ["default"],
    h: 2,
    subHeading: false
}

export default Heading