import classNames from 'classnames'

import MaskedInput from 'antd-mask-input'
class InputMask extends React.Component {
    render(){
        const {
            value, onChange, parentClass, inputId, label, type,
            versions, mask, formatCharacters
        } = this.props
        const componentClass = "c-input"
        const versionClass = versions.map(el => (`${componentClass}--${el}`)).join(" ")
        const parent = `${parentClass}__${componentClass.replace("c-", "")}`
        const className = classNames(componentClass, {
            [versionClass]: versions,
            [parent]: parentClass,
        })
        return (
            <div className={className}>
                <MaskedInput 
                    onChange={onChange} 
                    // id={inputId} 
                    type={type} 
                    mask={mask}
                    value={value}
                    placeholder={label}
                    formatCharacters={formatCharacters}
                    className="c-input__input"/>
            </div>
        )
    }
}
InputMask.defaultProps = {
    inputId: `${parseInt(Math.random() * new Date().getTime())}`,
    type:  "text",
    versions: ["default"]
}
export default InputMask