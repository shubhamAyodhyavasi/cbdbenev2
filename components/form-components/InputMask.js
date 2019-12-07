import classNames from 'classnames'

import ReactInputMask from "react-input-mask";
import { Input } from 'antd';
class InputMask extends React.Component {
    render(){
        const {
            value, onChange, parentClass, inputId, label, type,
            versions, mask, formatCharacters, disabled
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
                <ReactInputMask {...this.props}>
                    {inputProps => {
                        const {
                            defaultValue, ...rest
                        } = inputProps
                        return (
                            <Input
                            {...rest}
                            placeholder={label}
                            className="c-input__input"
                            disabled={disabled ? disabled : null}
                            />
                        )
                    }}
                </ReactInputMask> 
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

// https://codesandbox.io/s/example-drawer-form-input-mask-n64ko