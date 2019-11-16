import classNames from 'classnames'
const Heading = ({versions, children, h, parentClass, subHeading}) => {
    const componentClass = subHeading ? `c-sub-heading` : `c-heading`
    const versionClass = versions.map(el => (`${componentClass}--${el}`)).join(" ")
    const parent = `${parentClass}__${componentClass.replace("c-", "")}`
    const className = classNames(componentClass, {
        [versionClass]: versions,
        [parent]: parentClass,
    })
    switch (h) {
        case 1:
        case "1":
            return (
                <h1 className={className}>
                    {children}
                </h1>
            )
        case 2:
        case "2":
            return (
                <h2 className={className}>
                    {children}
                </h2>
            )
        case 3:
        case "3":
            return (
                <h3 className={className}>
                    {children}
                </h3>
            )
        case 4:
        case "4":
            return (
                <h4 className={className}>
                    {children}
                </h4>
            )
        case 5:
        case "5":
            return (
                <h5 className={className}>
                    {children}
                </h5>
            )
        case 6:
        case "6":
            return (
                <h6 className={className}>
                    {children}
                </h6>
            )
    
        default:
            return (
                <h2 className={className}>
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