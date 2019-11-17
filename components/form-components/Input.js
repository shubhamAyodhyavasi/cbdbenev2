import classNames from 'classnames'
import { Input as AntInput } from 'antd';
const Input = ({value, onChange, parentClass, inputId, label, type}) => {
    const parent = `${parentClass}__input`
    return (
        <div className={classNames("c-input", {
            [parent]: parentClass
        })}>
            <AntInput 
                onChange={onChange} 
                id={inputId} 
                type={type} 
                value={value}
                placeholder={label}
                className="c-input__input"/>
        </div>
    )
}
Input.defaultProps = {
    inputId: `${parseInt(Math.random() * new Date().getTime())}`,
    type:  "text"
}
export default Input