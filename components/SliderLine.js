import classNames from 'classnames'
const SliderLine = React.forwardRef(({versions, parentClass, width, left }, ref) => {
    
    const componentClass = "c-slider-line"
    const versionClass = versions.map(el => (`${componentClass}--${el}`)).join(" ")
    const parent = `${parentClass}__${componentClass.replace("c-", "")}`
    const className = classNames(componentClass, {
        [versionClass]: versions,
        [parent]: parentClass,
    })
    return (
        <div className={className}>
            <div ref={ref} style={{width: width, left: left}} className="c-slider-line__dragger"></div>
        </div>
    )
})

SliderLine.defaultProps = {
    width: "20%",
    left: 0,
    versions: []
}
export default SliderLine