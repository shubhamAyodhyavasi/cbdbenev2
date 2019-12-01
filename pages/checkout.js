import {useState} from 'react'
import CheckoutLayout from '../components/Layouts/CheckoutLayout'
import Heading from '../components/Heading'
import TitleList from '../components/TitleList'
import AddressForm from '../components/AddressForm'
import Checkbox from '../components/form-components/Checkbox'
import Button from '../components/form-components/Button'
import Radio from '../components/form-components/Radio'
import { Steps } from 'antd'
import CheckoutInfo from '../components/checkout-tabs/CheckoutInfo'
import {addAddress} from '../redux/actions/address'
import { connect } from 'react-redux'

const Checkout  = ({
    addAddress, user, ...props
}) => {
    const [activeAddress, setActiveAddress] = useState(1)
    const address = [
        {
            address: "125th St, New York, NY 10027, USA",
            id: 1
        },
        {
            address: "127th St, New York, NY 10027, USA",
            id: 2
        },
        {
            address: "165 Courtland St NE, Atlanta, GA 30303, USA",
            id: 3
        },
    ]
    const onInfoSubmit = (e, values) => {
        console.log({
            e, values
        })
        const {
            city,
            country,
            email,
            firstname,
            lastname,
            phone,
            sameShipping,
            saveaddress,
            state,
            zip,
        } = values
        if(saveaddress){
            console.log("aa")
            const newAddress = {
                city,
                country,
                email,
                firstname,
                lastname,
                phone,
                state,
                zip,
                id: new Date().getTime()
            }
            const allAddresses = props.address.address || []
            const isDuplicate  = checkAddressDuplicate(newAddress, allAddresses)
            console.log({
                isDuplicate
            })
            if(!isDuplicate || allAddresses.length < 1){
                addAddress(user._id, newAddress, props.address, allAddresses)
            }
        }else{
            alert("a")
        }
    }
    return (
        <CheckoutLayout>
            <div className="c-checkout">
                <Heading parentClass="c-checkout" versions={["default", "upper"]}>Checkout</Heading>
                <div className="c-checkout__nav-wrapper">
                    <Steps>
                        <Steps.Step title="first step" />
                        <Steps.Step title="second step" />
                        <Steps.Step title="third step" />
                    </Steps>
                </div>
                <div className="c-checkout__main-wrapper">
                    <CheckoutInfo onSubmit={onInfoSubmit} />
                </div>
                {/* {address.length && <TitleList parentClass="c-checkout" versions={["sm-border"]} title="Shipping Information" >
                    {
                        address.map((el, i)=> <Radio key={i} checked={el.id === activeAddress} onChange={()=>setActiveAddress(el.id)} >{el.address}</Radio>)
                    }
                    
                </TitleList>} */}
                {!address.length && 
                    <>
                        <TitleList parentClass="c-checkout" versions={["sm-border"]} title="Shipping Information" >
                            <AddressForm />
                            <div className="col-12">
                                <Checkbox parentClass="c-checkout" versions={["gold"]} >Ship to the same adress</Checkbox>
                            </div>
                        </TitleList>
                        <TitleList parentClass="c-checkout" versions={["sm-border"]} title="Shipping Information" >
                            <AddressForm />
                        </TitleList>
                    </>
                }
                
                <TitleList parentClass="c-checkout" versions={["sm-border"]} >
                    <div className="col-12">
                        <Button parentClass="c-checkout" theme="outline" versions={["block"]} >Continue to Shipping</Button>
                    </div>
                </TitleList>
            </div>
        </CheckoutLayout>
    )
}

const mapStateToProps = state => ({
    address: state.address,
    user: state.user,
})
const mapActionToProps = {
    addAddress
}

export default connect(mapStateToProps, mapActionToProps)(Checkout)