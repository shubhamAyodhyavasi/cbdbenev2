import {useState} from 'react'
import CheckoutLayout from '../components/Layouts/CheckoutLayout'
import Heading from '../components/Heading'
import TitleList from '../components/TItleList'
import AddressForm from '../components/AddressForm'
import Checkbox from '../components/form-components/Checkbox'
import Button from '../components/form-components/Button'
import Radio from '../components/form-components/Radio'
const Checkout  = () => {
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
    return (
        <CheckoutLayout>
            <div className="c-checkout">
                <Heading parentClass="c-checkout" versions={["default", "upper"]}>Checkout</Heading>
                <div className="c-checkout__nav-wrapper">
                    ----
                </div>
                <TitleList parentClass="c-checkout" title="Contact Information" >
                    <form>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum officia mollitia, reprehenderit molestiae nisi deserunt minus hic eligendi explicabo possimus porro perspiciatis dignissimos distinctio ducimus atque facilis quaerat inventore sed labore exercitationem quo! Voluptatum eos voluptate ut vel quasi, soluta sequi illum labore cupiditate distinctio odit, laboriosam inventore sapiente officiis!
                    </form>
                </TitleList>
                {address.length && <TitleList parentClass="c-checkout" versions={["sm-border"]} title="Shipping Information" >
                    {
                        address.map((el, i)=> <Radio key={i} checked={el.id === activeAddress} onChange={()=>setActiveAddress(el.id)} >{el.address}</Radio>)
                    }
                    
                </TitleList>}
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

export default Checkout