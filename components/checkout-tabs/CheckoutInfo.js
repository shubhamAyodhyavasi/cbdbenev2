import { connect } from 'react-redux'
import Input from '../form-components/Input'
import Checkbox from '../form-components/Checkbox';
import Button from '../form-components/Button'
import { showRegBar } from '../../redux/actions/drawers'
import TitleList from '../TitleList'
import { Form } from 'antd'
import validator from "../../services/helpers/validator";
import PlacesAutocomplete from "react-places-autocomplete";

class CheckoutInfo extends React.Component {
    constructor() {
        super()
        this.state = {
            sameShipping: true,
            address: ''
        }
    }

    
    handleChange = address => {
      this.setState({ address });
    };
   
    handleSelect = address => {
      geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(latLng => console.log('Success', latLng))
        .catch(error => console.error('Error', error));
    };
    onSubmit = e => {
        e.preventDefault()
        const {
            onSubmit
        } = this.props
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log({
                    values
                })
                if (typeof onSubmit === "function") {
                    onSubmit(e, values)
                }
            }
        })
    }
    onSameShippingChange = e => {
        this.setState({
            sameShipping: e.target.checked
        })
    }
    render() {
        const componentClass = "c-checkout-info"
        const {
            showRegBar,
            user, form
        } = this.props
        const {
            sameShipping
        } = this.state
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = form
        const isLogin = user._id ? true : false
        
       
    


        return (
            
            <div className={componentClass}>
                <Form onSubmit={this.onSubmit} >
                <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBXxXfKy5wtHEO9XniOvGEKPME-_ldClVk&libraries=places" async defer></script>

                    <TitleList versions={["sm-border"]} parentClass={componentClass} title="Contact Information" >
                        <Form.Item>
                            {getFieldDecorator('email', {
                                rules: [{ required: true, message: 'Please input your Password!' },  { validator: validator.email }],
                              
                                initialValue: user.email
                            })(
                                <Input label="E-mail" />,
                            )}
                        </Form.Item>
                        {!isLogin && <div className={componentClass + "__login-wrapper"}>
                            Already have an account? <span
                                onClick={showRegBar}
                                className={componentClass + "__login-btn"}>SIGN IN</span>
                        </div>}
                    </TitleList>
                  
                    <TitleList versions={["sm-border"]} parentClass={componentClass} title="Shipping Information" >
                        {/* {isLogin && <div className={componentClass + "__login-wrapper"}>
                            ----
                        </div>} */}
                        {(!isLogin || true) && <div>
                            <div className="container-fluid p-0">
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Item>
                                            {getFieldDecorator('firstname', {
                                                rules: [{ required: true, message: 'Please input first name!' }],
                                            })(
                                                <Input parentClass="c-address-form" label="First Name" />
                                            )}
                                        </Form.Item>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Item>
                                            {getFieldDecorator('lastname', {
                                                rules: [{ required: true, message: 'Please input last name!' }],
                                            })(
                                                <Input parentClass="c-address-form" label="Last Name" />
                                            )}
                                        </Form.Item>
                                    </div>
                                    <div className="col-12">
                                        <Form.Item>
                                            {getFieldDecorator('phone', {
                                                rules: [{ required: true, message: 'Please input phone number!' }],
                                            })(
                                                <Input parentClass="c-address-form" label="Phone Number" />
                                            )}
                                        </Form.Item>
                                    </div>
                                    <div className="col-12">
                                        <PlacesAutocomplete 
                                        value={this.state.address}
                                        onChange={this.handleChange}
                                        onSelect={this.handleSelect}
                                
                                        >{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                            <div>
                                                <input
                                                    {...getInputProps({
                                                        placeholder: 'Search Places ...',
                                                        className: 'location-search-input',
                                                    })}
                                                />
                                                <div className="autocomplete-dropdown-container">
                                                    {loading && <div>Loading...</div>}
                                                    {suggestions.map(suggestion => {
                                                        const className = suggestion.active
                                                            ? 'suggestion-item--active'
                                                            : 'suggestion-item';
                                                        // inline style for demonstration purpose
                                                        const style = suggestion.active
                                                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                        return (
                                                            <div
                                                                {...getSuggestionItemProps(suggestion, {
                                                                    className,
                                                                    style,
                                                                })}
                                                            >
                                                                <span>{suggestion.description}</span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                        </PlacesAutocomplete>
                                        <Input parentClass="c-address-form" label="Search Your Address" />
                                    </div>
                                    <div className="col-12">
                                        <Form.Item>
                                            {getFieldDecorator('city', {
                                                rules: [{ required: true, message: 'Please input your city!' }],
                                            })(
                                                <Input parentClass="c-address-form" label="City" />
                                            )}
                                        </Form.Item>
                                    </div>
                                    <div className="col-12">
                                    </div>
                                    <div className="col-md-4">
                                        <Form.Item>
                                            {getFieldDecorator('country', {
                                                rules: [{ required: true, message: 'Please input your Country!' }],
                                            })(
                                                <Input parentClass="c-address-form" label="Country" />
                                            )}
                                        </Form.Item>
                                    </div>
                                    <div className="col-md-4">
                                        <Form.Item>
                                            {getFieldDecorator('state', {
                                                rules: [{ required: true, message: 'Please input your state!' }],
                                            })(
                                                <Input parentClass="c-address-form" label="state" />
                                            )}
                                        </Form.Item>
                                    </div>
                                    <div className="col-md-4">
                                        <Form.Item>
                                            {getFieldDecorator('zip', {
                                                rules: [{ required: true, message: 'Please input your ZIP code!' }],
                                            })(
                                                <Input parentClass="c-address-form" label="ZIP code" />
                                            )}
                                        </Form.Item>
                                    </div>
                                    <div className="col-12">
                                        <Form.Item>
                                            {getFieldDecorator('saveaddress', {
                                                valuePropName: 'checked',
                                                initialValue: true,
                                            })(<Checkbox versions={["gold"]} >Save this information for next time</Checkbox>)}
                                        </Form.Item>
                                    </div>
                                    <div className="col-12">
                                        <Form.Item>
                                            {getFieldDecorator('sameShipping', {
                                                valuePropName: 'checked',
                                                initialValue: true,
                                                setFieldsValue: sameShipping
                                            })(<Checkbox onChange={this.onSameShippingChange} versions={["gold"]} >Ship to the same address</Checkbox>)}
                                        </Form.Item>
                                    </div>
                                </div>
                                {
                                    !sameShipping &&
                                    <div className="row">
                                        <div className="col-md-6">
                                            <Form.Item>
                                                {getFieldDecorator('firstname_ship', {
                                                    rules: [{ required: true, message: 'Please input first name!' }],
                                                })(
                                                    <Input parentClass="c-address-form" label="First Name" />
                                                )}
                                            </Form.Item>
                                        </div>
                                        <div className="col-md-6">
                                            <Form.Item>
                                                {getFieldDecorator('lastname_ship', {
                                                    rules: [{ required: true, message: 'Please input last name!' }],
                                                })(
                                                    <Input parentClass="c-address-form" label="Last Name" />
                                                )}
                                            </Form.Item>
                                        </div>
                                        <div className="col-12">
                                            <Form.Item>
                                                {getFieldDecorator('phone_ship', {
                                                    rules: [{ required: true, message: 'Please input phone number!' }],
                                                })(
                                                    <Input parentClass="c-address-form" label="Phone Number" />
                                                )}
                                            </Form.Item>
                                        </div>
                                        <div className="col-12">
                                            <Input parentClass="c-address-form" label="Search Your Address" />
                                        </div>
                                        <div className="col-12">
                                            <Form.Item>
                                                {getFieldDecorator('city_ship', {
                                                    rules: [{ required: true, message: 'Please input your city!' }],
                                                })(
                                                    <Input parentClass="c-address-form" label="City" />
                                                )}
                                            </Form.Item>
                                        </div>
                                        <div className="col-12">
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Item>
                                                {getFieldDecorator('country_ship', {
                                                    rules: [{ required: true, message: 'Please input your Country!' }],
                                                })(
                                                    <Input parentClass="c-address-form" label="Country" />
                                                )}
                                            </Form.Item>
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Item>
                                                {getFieldDecorator('state_ship', {
                                                    rules: [{ required: true, message: 'Please input your state!' }],
                                                })(
                                                    <Input parentClass="c-address-form" label="state" />
                                                )}
                                            </Form.Item>
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Item>
                                                {getFieldDecorator('zip_ship', {
                                                    rules: [{ required: true, message: 'Please input your ZIP code!' }],
                                                })(
                                                    <Input parentClass="c-address-form" label="ZIP code" />
                                                )}
                                            </Form.Item>
                                        </div>
                                        <div className="col-12">
                                            <Form.Item>
                                                {getFieldDecorator('saveaddress_ship', {
                                                    valuePropName: 'checked',
                                                    initialValue: true,
                                                })(<Checkbox versions={["gold"]} >Save this information for next time</Checkbox>)}
                                            </Form.Item>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>}
                        <Button parentClass="c-checkout" theme="outline" versions={["block"]} >Continue to Shipping</Button>
                    </TitleList>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})
const mapActionToProps = {
    showRegBar
}
export default connect(mapStateToProps, mapActionToProps)(Form.create({ name: "checkoutInfo" })(CheckoutInfo))
