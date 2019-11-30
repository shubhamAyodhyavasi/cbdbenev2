import ReactSvg from 'react-svg'
import classNames from 'classnames'
class Checkbox extends React.Component {
    render(){
        const {
            checked, onChange, parentClass, versions, children, inputId, label
        } = this.props
        const componentClass = 'c-checkbox'
        const versionClass = versions.map(el => (`${componentClass}--${el}`)).join(" ")
        const parent = `${parentClass}__${componentClass.replace("c-", "")}`
        const className = classNames(componentClass, {
            [versionClass]: versions,
            [parent]: parentClass,
        })
        return (
            <div className={className}>
                <label className="c-checkbox__label">
                    <input 
                        onChange={onChange} 
                        checked={checked} 
                        type="checkbox" 
                        className="c-checkbox__input"/>
                    <span className="c-checkbox__icon">
                        <ReactSvg src="/images/checkbox-icon.svg" />
                    </span>
                    <span className="c-checkbox__label-text">{label}{children}</span>
                </label>
            </div>
        )
    }
}
Checkbox.defaultProps = {
    // inputId: `${parseInt(Math.random() * new Date().getTime())}`,
    versions: []
}
export default Checkbox