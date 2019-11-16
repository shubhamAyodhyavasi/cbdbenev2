import {useState} from 'react'
import classNames from 'classnames'
const Quantity = ({min, max, value, onChange, parentClass}) => {
    const parent = `${parentClass}__quantity`
    const [inputValue, setInputValue] = useState(value || 1)
    const onInputChange = (e)=> {
        if(!(e < min || e > max)){
            setInputValue(e)
            if(typeof onChange === "function") onChange(e)
        }
    }
    return (
        <div className={classNames("c-quantity", {
            [parent]: parentClass
        })}>
            <div onClick={()=> {
                onInputChange(inputValue - 1)
            }} className="c-quantity__btn c-quantity__btn--minus">-</div>
            <input className="c-quantity__input" type="number" onChange={onInputChange} min={min} max={max} value={inputValue} />
            <div onClick={()=> {
                onInputChange(inputValue + 1)
            }} className="c-quantity__btn c-quantity__btn--plus">+</div>
        </div>
    )
}
Quantity.defaultProps = {
    inputId: `${Math.random() * new Date().getTime()}`
}
export default Quantity