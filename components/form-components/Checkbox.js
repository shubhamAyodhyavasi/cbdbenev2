import ReactSvg from 'react-svg'
import classNames from 'classnames'
const Checkbox = ({checked, onChange, parentClass, children, inputId, label}) => {
    const parent = `${parentClass}__checkbox`
    return (
        <div className={classNames("c-checkbox", {
            [parent]: parentClass
        })}>
            <label htmlFor={inputId} className="c-checkbox__label">
                <input 
                    onChange={onChange} 
                    checked={checked} 
                    id={inputId} 
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
Checkbox.defaultProps = {
    inputId: `${Math.random() * new Date().getTime()}`
}
export default Checkbox