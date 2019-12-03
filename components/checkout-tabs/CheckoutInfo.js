import { connect } from 'react-redux'
import Input from '../form-components/Input'
import Checkbox from '../form-components/Checkbox';
import Button from '../form-components/Button'
import { showRegBar } from '../../redux/actions/drawers'
import TitleList from '../TitleList'
import { Form } from 'antd'
import validator from "../../services/helpers/validator";
import PlacesAutocomplete, {geocodeByAddress, getLatLng } from "react-places-autocomplete";
import projectSettings from '../../constants/projectSettings';
import { searchAddress } from '../../services/api';
import regex from '../../services/helpers/regex';
import { getCountryCode } from '../../services/helpers/misc';

class CheckoutInfo extends React.Component {
    constructor() {
        super()
        this.state = {
            sameShipping: true,
            address: {
                addressStr: "",
                country: "",
                state: "",
                city: "",
                other: "",
                zip: ""
            },
            addressShip: {
                addressStr: "",
                country: "",
                state: "",
                city: "",
                other: "",
                zip: ""
            }
        }
    }

    componentDidMount(){
        const {
            form, oldValues
        } = this.props
        if(oldValues){
            form.setFieldsValue({
                ...oldValues
            })
        }
    }
    handleChange = addressStr => {
        this.changeAddress({addressStr})
    };
   
    handleSelect = addressStr => {
        const arr = addressStr.split(",");
        const size = arr.length;
        const country = arr[size - 1].trim();
        const state = arr[size - 2];
        const city = arr[size - 3];
        const other = arr[0];
        const address = {
            addressStr : addressStr.trim(),
            country : country.trim(),
            state : state.trim(),
            city : city.trim(),
            other : other.trim(),
            zip: ""
        }
        searchAddress(addressStr)
        .then(res => {
            if(res.data && res.data.results){
                const {
                    results 
                } = res.data
                const addStr = results[0].address_components;
                const zipObj = addStr.find(
                    el => el.types && el.types.includes("postal_code")
                );
                if (zipObj && zipObj.short_name) {
                    const zip = zipObj.short_name;
                    this.changeAddress({
                            ...address,
                            zip : zip.trim()
                        })
                }else{
                    this.changeAddress({
                        ...address
                    })
                }
            }else{
                this.changeAddress({
                    ...address
                })
            }
        })
        .catch(err => {
            console.log({err})
            this.changeAddress({
                ...address
            })
        })
    };
    onSubmit = e => {
        e.preventDefault()
        const {
            onSubmit
        } = this.props
        const {
            address, addressShip
        } = this.state
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log({
                    values
                })
                const {
                    country
                } = values
                const aa = getCountryCode(country)
                console.log({
                    aa
                })
                if (typeof onSubmit === "function") {
                    onSubmit(e, values, address, addressShip)
                }
            }
        })
    }
    onSameShippingChange = e => {
        this.setState({
            sameShipping: e.target.checked
        })
    }
    changeAddress = ({...address}, key = "address") => {
        this.setState(prevState => ({
            [key]: {
                ...prevState[key],
                ...address
            }
        }))
    }
    render() {
        const componentClass = "c-checkout-info"
        const {
            showRegBar,
            user, form
        } = this.props
        const {
            sameShipping,
            address
        } = this.state
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = form
        const isLogin = user._id ? true : false
        
        return (
            
            <div className={componentClass}>
                <Form onSubmit={this.onSubmit} >
                <script src={`https://maps.googleapis.com/maps/api/js?key=${projectSettings.googleApiKey}&libraries=places`} async defer></script>

                    <TitleList versions={["sm-border"]} parentClass={componentClass} title="Contact Information" >
                        <Form.Item>
                            {getFieldDecorator('email', {
                                rules: [
                                    { 
                                        required: true, 
                                        message: 'Please input your E-mail!' 
                                    },
                                    { 
                                        pattern: regex.email, 
                                        message: 'Please enter a valid E-mail!' 
                                    },
                                ],
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
                                                rules: [{ required: true, message: 'Please input first name!' },
                                                { 
                                                    pattern: regex.name, 
                                                    message: 'Please enter a valid name!' 
                                                },
                                            ],
                                            })(
                                                <Input parentClass="c-address-form" label="First Name" />
                                            )}
                                        </Form.Item>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Item>
                                            {getFieldDecorator('lastname', {
                                                rules: [{ required: true, message: 'Please input last name!' },
                                                { 
                                                    pattern: regex.name, 
                                                    message: 'Please enter a valid name!' 
                                                },
                                            ],
                                            })(
                                                <Input parentClass="c-address-form" label="Last Name" />
                                            )}
                                        </Form.Item>
                                    </div>
                                    <div className="col-12">
                                        <Form.Item>
                                            {getFieldDecorator('phone', {
                                                rules: [{ required: true, message: 'Please input phone number!' },
                                                { 
                                                    pattern: regex.phone, 
                                                    message: 'Please enter a valid number!' 
                                                },
                                            ],
                                            })(
                                                <Input parentClass="c-address-form" label="Phone Number" />
                                            )}
                                        </Form.Item>
                                    </div>
                                    <div className="col-12">
                                        <PlacesAutocomplete 
                                        value={address.addressStr}
                                        onChange={this.handleChange}
                                        onSelect={this.handleSelect}
                                
                                        >{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                            <div>
                                                <Input {...getInputProps({
                                                        placeholder: 'Search Places ...',
                                                        className: 'location-search-input',
                                                    })} parentClass="c-address-form" label="Search Places ..." />
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
                                    </div>
                                    <div className="col-12">
                                        <Form.Item>
                                            {getFieldDecorator('city', {
                                                rules: [{ required: true, message: 'Please input your city!' }],
                                                setFieldsValue: address.city,
                                                initialValue: address.city
                                            })(
                                                <Input 
                                                    onChange={e=> {
                                                        const city = e.target.value
                                                        this.changeAddress({city})
                                                    }}
                                                    parentClass="c-address-form" 
                                                    label="City" />
                                            )}
                                        </Form.Item>
                                    </div>
                                    <div className="col-12">
                                    </div>
                                    <div className="col-md-4">
                                        <Form.Item>
                                            {getFieldDecorator('country', {
                                                rules: [{ required: true, message: 'Please input your Country!' }],
                                                setFieldsValue: address.country,
                                                initialValue: address.country
                                            })(
                                                <Input 
                                                    onChange={e=> {
                                                        const country = e.target.value
                                                        this.changeAddress({country})
                                                    }}
                                                    parentClass="c-address-form" 
                                                    label="Country" />
                                            )}
                                        </Form.Item>
                                    </div>
                                    <div className="col-md-4">
                                        <Form.Item>
                                            {getFieldDecorator('state', {
                                                rules: [{ required: true, message: 'Please input your state!' }],
                                                setFieldsValue: address.state,
                                                initialValue: address.state
                                            })(
                                                <Input 
                                                    onChange={e=> {
                                                        const country = e.target.value
                                                        this.changeAddress({country})
                                                    }} 
                                                    parentClass="c-address-form" 
                                                    label="state" />
                                            )}
                                        </Form.Item>
                                    </div>
                                    <div className="col-md-4">
                                        <Form.Item>
                                            {getFieldDecorator('zip', {
                                                rules: [{ required: true, message: 'Please input your ZIP code!' }],
                                                setFieldsValue: address.zip,
                                                initialValue: address.zip
                                            })(
                                                <Input 
                                                    onChange={e=> {
                                                        const zip = e.target.value
                                                        this.changeAddress({zip})
                                                    }} 
                                                    parentClass="c-address-form" 
                                                    label="ZIP code" />
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
                                                    rules: [{ required: true, message: 'Please input first name!' },
                                                    { 
                                                        pattern: regex.name, 
                                                        message: 'Please enter a valid name!' 
                                                    },],
                                                })(
                                                    <Input parentClass="c-address-form" label="First Name" />
                                                )}
                                            </Form.Item>
                                        </div>
                                        <div className="col-md-6">
                                            <Form.Item>
                                                {getFieldDecorator('lastname_ship', {
                                                    rules: [{ required: true, message: 'Please input last name!' },
                                                    { 
                                                        pattern: regex.name, 
                                                        message: 'Please enter a valid name!' 
                                                    },],
                                                })(
                                                    <Input parentClass="c-address-form" label="Last Name" />
                                                )}
                                            </Form.Item>
                                        </div>
                                        <div className="col-12">
                                            <Form.Item>
                                                {getFieldDecorator('phone_ship', {
                                                    rules: [{ required: true, message: 'Please input phone number!' },
                                                    { 
                                                        pattern: regex.phone, 
                                                        message: 'Please enter a valid number!' 
                                                    },],
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
