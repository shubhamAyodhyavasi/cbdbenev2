import classNames from 'classnames'
import { Input as AntInput } from 'antd';

class Input extends React.Component {
    render(){
        const {
            value, onChange, parentClass, inputId, label, type,
            versions, name
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
                <AntInput 
                    onChange={onChange} 
                    // id={inputId} 
                    name={name}
                    type={type} 
                    value={value}
                    placeholder={label}
                    className="c-input__input"/>
            </div>
        )
    }
}
Input.defaultProps = {
    inputId: `${parseInt(Math.random() * new Date().getTime())}`,
    type:  "text",
    versions: ["default"]
}
export default Input