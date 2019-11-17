// import ReactSvg from 'react-svg'
import classNames from 'classnames'
const Radio = ({checked, onChange, parentClass, versions, children, inputId, label}) => {
    const componentClass = 'c-radio'
    const versionClass = versions.map(el => (`${componentClass}--${el}`)).join(" ")
    const parent = `${parentClass}__${componentClass.replace("c-", "")}`
    const className = classNames(componentClass, {
        [versionClass]: versions,
        [parent]: parentClass,
    })
    return (
        <div className={className}>
            <label className="c-radio__label">
                <input 
                    onChange={onChange} 
                    checked={checked} 
                    type="radio" 
                    className="c-radio__input"/>
                <span className="c-radio__icon">
                    {/* <ReactSvg src="/images/radio-icon.svg" /> */}
                </span>
                <span className="c-radio__label-text">{label}{children}</span>
            </label>
        </div>
    )
}
Radio.defaultProps = {
    inputId: `${parseInt(Math.random() * new Date().getTime())}`,
    versions: []
}
export default Radio