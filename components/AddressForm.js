import Input from "./form-components/Input"
import Checkbox from "./form-components/Checkbox"

class AddressForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }
    render(){
        const {
            onSubmit
        } = this.props
        return (
            <form onSubmit={onSubmit} className="c-address-form" >
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <Input parentClass="c-address-form" label="First Name" />
                        </div>
                        <div className="col-md-6">
                            <Input parentClass="c-address-form" label="Last Name" />
                        </div>
                        <div className="col-12">
                            <Input parentClass="c-address-form" label="Phone Number" />
                        </div>
                        <div className="col-12">
                            <Input parentClass="c-address-form" label="Search Your Address" />
                        </div>
                        <div className="col-12">
                            <Input parentClass="c-address-form" label="City" />
                        </div>
                        <div className="col-12">
                        </div>
                        <div className="col-md-4">
                            <Input parentClass="c-address-form" label="Country" />
                        </div>
                        <div className="col-md-4">
                            <Input parentClass="c-address-form" label="state" />
                        </div>
                        <div className="col-md-4">
                            <Input parentClass="c-address-form" label="ZIP code" />
                        </div>
                        <div className="col-12">
                            <Checkbox versions={["gold"]} >Save this information for next time</Checkbox>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

export default AddressForm