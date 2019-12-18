// import {useState, useEffect} from 'react'
import classNames from 'classnames'

class Quantity extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            inputValue : props.value || 1
        }
    }
    componentDidUpdate(prevProps,){
        if(prevProps.value !== this.props.value){
            this.setState({
                inputValue: this.props.value
            })
        }
    }
    render(){
        const {min, max, value, onChange, parentClass} = this.props
        const {inputValue} = this.state
        const parent = `${parentClass}__quantity`
        // const [inputValue, setInputValue] = useState(value || 1)
        const onInputChange = (e)=> {
            if(!(e < min || e > max)){
                this.setState({
                    inputValue : e
                })
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
                {/* <input className="c-quantity__input" type="number" onChange={onInputChange} min={min} max={max} value={inputValue} /> */}
                <span className="c-quantity__input">
                    {inputValue}
                </span>
                <div onClick={()=> {
                    onInputChange(inputValue + 1)
                }} className="c-quantity__btn c-quantity__btn--plus">+</div>
            </div>
        )
    }
}
// const Quantity = () => {
//     const parent = `${parentClass}__quantity`
//     const [inputValue, setInputValue] = useState(value || 1)
//     const onInputChange = (e)=> {
//         if(!(e < min || e > max)){
//             setInputValue(e)
//             if(typeof onChange === "function") onChange(e)
//         }
//     }
//     return (
//         <div className={classNames("c-quantity", {
//             [parent]: parentClass
//         })}>
//             <div onClick={()=> {
//                 onInputChange(inputValue - 1)
//             }} className="c-quantity__btn c-quantity__btn--minus">-</div>
//             {/* <input className="c-quantity__input" type="number" onChange={onInputChange} min={min} max={max} value={inputValue} /> */}
//             <span className="c-quantity__input">
//                 {inputValue}
//             </span>
//             <div onClick={()=> {
//                 onInputChange(inputValue + 1)
//             }} className="c-quantity__btn c-quantity__btn--plus">+</div>
//         </div>
//     )
// }
Quantity.defaultProps = {
    inputId: `${Math.random() * new Date().getTime()}`
}
export default Quantity