import { connect } from 'react-redux'
import Input from '../form-components/Input'
import Checkbox from '../form-components/Checkbox';
import Button from '../form-components/Button'
import { showRegBar, drawerToDisplay } from '../../redux/actions/drawers'
import { getAddress } from '../../redux/actions/address'
import TitleList from '../TItleList'
import { Form, Radio } from 'antd'
import validator from "../../services/helpers/validator";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import projectSettings from '../../constants/projectSettings';
import { searchAddress } from '../../services/api';
import regex from '../../services/helpers/regex';
import { getCountryCode } from '../../services/helpers/misc';
import reactComponentDebounce from 'react-component-debounce';

const DebounceInput = reactComponentDebounce({
    valuePropName: 'value',
    triggerMs: 1000,
  })(Input);

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
            },
            newAddress: false
        }
    }

    componentDidMount() {

        const {
            form, oldValues
        } = this.props
        if (oldValues) {
            form.setFieldsValue({
                ...oldValues
            })
            const {
                city,
                state,
                country,
                zip,
                "city-ship": cityShip,
                "state-ship": stateShip,
                "country-ship": countryShip,
                "zip-ship": zipShip,
            } = oldValues
            this.setState(prevState => ({
                address: {
                    ...prevState.address,
                    city: city || prevState.address.city,
                    state: state || prevState.address.state,
                    country: country || prevState.address.country,
                    zip: zip || prevState.address.zip,
                    addressStr: prevState.address.addressStr
                },
                addressShip: {
                    ...prevState.addressShip,
                    city: cityShip || prevState.addressShip.city,
                    state: stateShip || prevState.addressShip.state,
                    country: countryShip || prevState.addressShip.country,
                    zip: zipShip || prevState.addressShip.zip,
                    addressStr: prevState.addressShip.addressStr
                }
            }))
        }
        // console.log({
        //     props: this.props
        // })
        setTimeout(() => {
            if (this.props.user._id) {
                this.props.getAddress(this.props.user._id)
            }
        }, 100);
    }
    componentDidUpdate(prevProps){
        if(prevProps.addresses !== this.props.addresses){
            const {
                addresses, form
            } = this.props
            if(addresses.length > 0){
                const address = addresses.find(el => el.isDefault) || addresses[0]
                if(address){
                    form.setFieldsValue({
                        email: address.email
                    })
                }
            }
        }
    }
    generateAddStr = address => {
        const {
            country,
            state,
            city,
            other,
            zip,
        } = address
        return `${city}, ${state}, ${country}, ${zip}`.trim()
    }
    handleChange = (addressStr, key = "address") => {
        this.changeAddress({ addressStr }, key)
    };

    handleSelect = (addressStr, key = "address") => {
        const arr = addressStr.split(",");
        const size = arr.length;
        const country = arr[size - 1].trim();
        const state = arr[size - 2];
        const city = arr[size - 3];
        const other = arr[0];
        const address = {
            addressStr: addressStr && addressStr.trim(),
            country: country && country.trim(),
            state: state && state.trim(),
            city: city && city.trim(),
            other: other && other.trim(),
            zip: ""
        }
        searchAddress(addressStr)
            .then(res => {
                if (res.data && res.data.results) {
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
                            zip: zip.trim()
                        }, key)
                    } else {
                        this.changeAddress({
                            ...address
                        }, key)
                    }
                } else {
                    this.changeAddress({
                        ...address
                    }, key)
                }
            })
            .catch(err => {
                console.log({ err })
                this.changeAddress({
                    ...address
                }, key)
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
                    country,
                    firstname,
                    lastname,
                    firstname_ship,
                    lastname_ship
                } = values
                const aa = getCountryCode(country)
                console.log({
                    aa
                })
                if (typeof onSubmit === "function") {
                    onSubmit(e, values, {
                        ...address,
                        firstname,
                        lastname,
                        addressStr: address.addressStr.trim() === "" ? this.generateAddStr(address) : address.addressStr
                    }, {
                        ...addressShip,
                        firstname: firstname_ship,
                        lastname: lastname_ship,
                        addressStr: addressShip.addressStr.trim() === "" ? this.generateAddStr(addressShip) : addressShip.addressStr
                    })
                }
            }
        })
    }
    onSameShippingChange = e => {
        this.setState({
            sameShipping: e.target.checked
        })}
    changeAddress = ({ ...address }, key = "address", search = true) => {
        const {
            city,
            state,
            country,
            zip,
        } = address
        if (key === "address") {
            const {
                address
            } = this.state
            this.props.form.setFieldsValue({
                city: city,
                state: state,
                country: country,
                zip: zip,
            })
        } else if (key === "addressShip") {
            const {
                addressShip: address
            } = this.state
            this.props.form.setFieldsValue({
                "city-ship": city,
                "state-ship": state,
                "country-ship": country,
                "zip-ship": zip
            })
        }
        if (search) {
            this.setState(prevState => ({
                [key]: {
                    ...prevState[key],
                    ...address
                }
            }))
        } else {
            this.setState({
                [key]: {
                    ...address
                }
            })
        }
    }
    returnAddressStr = address =>{
        const {
            country,
            state,
            city,
            other,
            zip,
            addressStr
          } = address
        if(!addressStr){
            const addressLine =  `${city}, ${state}, ${country}, ${zip}`.trim()
            const trimmedLine = addressLine.trim().replace(/^,/g, "").trim().replace(/^,/g, "").trim().replace(/^,/g, "").trim();
            return trimmedLine
        }
        return addressStr
    }
    render() {
        const componentClass = "c-checkout-info"
        const {
            showRegBar, drawerToDisplay, 
            user, form, addresses
        } = this.props
        const {
            sameShipping,
            address, addressShip
        } = this.state
        const { getFieldDecorator, getFieldValue, setFieldsValue, isFieldTouched, getFieldsValue } = form
        const isLogin = user._id ? true : false
        console.log({
            form
        })
        return (

            <div className={componentClass}>
                <Form onSubmit={this.onSubmit} >
                    {/* <script src={`https://maps.googleapis.com/maps/api/js?key=${projectSettings.googleApiKey}&libraries=places`} async defer></script> */}

                    <TitleList versions={["sm-border"]} parentClass={componentClass} title="Contact Information" >
                        <Form.Item>
                            {getFieldDecorator('email', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your E-mail'
                                    },
                                    {
                                        pattern: regex.email,
                                        message: 'Please enter a valid E-mail!'
                                    },
                                ],
                                initialValue: user.email
                            })(
                                <DebounceInput label="E-mail" />,
                            )}
                        </Form.Item>
                        {!isLogin && <div className={componentClass + "__login-wrapper"}>
                            Already have an account? <span
                                onClick={()=> {
                                    drawerToDisplay("login")
                                    showRegBar()
                                }}
                                className={componentClass + "__login-btn cursor-pointer"}>SIGN IN</span>
                        </div>}
                    </TitleList>
                    <TitleList versions={["sm-border"]} parentClass={componentClass} title="Shipping Information" >
                        {isLogin && addresses && addresses.length > 0 && <div className={componentClass + "__login-wrapper"}>
                            <Form.Item>
                                {getFieldDecorator('addressSelect', {
                                    initialValue: addresses.find(el => el.isDefault) || addresses[0]
                                })(
                                    <Radio.Group
                                        className="bordered"
                                        onChange={(e) => {
                                            const {
                                                value
                                            } = e.target
                                            if (value !== null) {
                                                setFieldsValue({
                                                    newAddress: false,
                                                    email: value.email
                                                })
                                            }
                                        }}
                                    >
                                        {
                                            addresses.map((el, i) => <Radio key={i} value={el}>{this.returnAddressStr(el)}</Radio>)
                                        }
                                    </Radio.Group>
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('newAddress', {
                                    valuePropName: 'checked',
                                    initialValue: false,
                                    onChange: (e) => {
                                        const {
                                            checked
                                        } = e.target
                                        setFieldsValue({
                                            addressSelect: checked ? null : addresses.find(el => el.isDefault) || addresses[0]
                                        })
                                    }
                                })(<Checkbox versions={["gold"]} >add new address</Checkbox>)}
                            </Form.Item>
                        </div>}
                        {(!isLogin || getFieldValue("newAddress") || !(addresses && addresses.length) ) && <div>
                            <div className="container-fluid p-0">
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Item>
                                            {getFieldDecorator('firstname', {
                                                rules: [
                                                    { required: true, message: 'Please input first name!' },
                                                    {
                                                        pattern: regex.name,
                                                        message: 'Please enter a valid name!'
                                                    },
                                                    { max: 12, message: 'Please enter a valid name!' },
                                                ],
                                            })(
                                                <DebounceInput parentClass="c-address-form" name="firstname" label="First Name" />
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
                                                { max: 12, message: 'Please enter a valid name!' },
                                                ],
                                            })(
                                                <DebounceInput parentClass="c-address-form" name="lastname" label="Last Name" />
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
                                                {
                                                    max: 15,
                                                    message: 'Please enter a valid number!'
                                                },
                                                ],
                                            })(
                                                <DebounceInput type="number" parentClass="c-address-form" name="number" label="Phone Number" />
                                            )}
                                        </Form.Item>
                                    </div>
                                    <div className="col-12">
                                        <PlacesAutocomplete
                                            value={address.addressStr} onChange={(e) => {
                                                this.handleChange(e, "address")
                                            }}
                                            onSelect={(e) => {
                                                this.handleSelect(e, "address")
                                            }}

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
                                                initialValue: address.city
                                            })(
                                                <DebounceInput
                                                    onChange={(key,value) => {
                                                        const city = key
                                                        let container = document.getElementsByClassName("c-input c-input--default c-address-form__input");
                                                        //  let input = container.getElementsByTagName('input')
                                                        // container[3].value=""
                                                         console.log({"ddd":container[3].firstChild.value })
                                                         container[3].firstChild.value = ""
                                                        
                                                        this.changeAddress({ ...address, city }, "address")
                                                    }}
                                                    name="city"
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
                                                initialValue: address.country
                                            })(
                                                <DebounceInput
                                                    onChange={(key,value) => {
                                                        const country = key
                                                        this.changeAddress({ ...address, country }, "address")
                                                    }}
                                                    parentClass="c-address-form"
                                                    name="country"
                                                    label="Country" />
                                            )}
                                        </Form.Item>
                                    </div>
                                    <div className="col-md-4">
                                        <Form.Item>
                                            {getFieldDecorator('state', {
                                                rules: [{ required: true, message: 'Please input your state!' }],
                                                initialValue: address.state
                                            })(
                                                <DebounceInput
                                                    onChange={(key,value) => {
                                                        const state = key
                                                        this.changeAddress({ ...address, state }, "address")
                                                    }}
                                                    parentClass="c-address-form"
                                                    name="state"
                                                    label="state" />
                                            )}
                                        </Form.Item>
                                    </div>
                                    <div className="col-md-4">
                                        <Form.Item>
                                            {getFieldDecorator('zip', {
                                                rules: [
                                                    { required: true, message: 'Please input your ZIP code!' },
                                                    {pattern: /^\d{5}$|^\d{5}-\d{4}$/, message:"Please enter a valid zipcode!"},
                                                    { max: 8, message: 'Please input your ZIP code!' },
                                                ],
                                                initialValue: address.zip
                                            })(
                                                <DebounceInput
                                                    onChange={(key, value) => {
                                                       
                                                            const zip = key
                                                        this.changeAddress({ ...address, zip }, "address")
                                                        
                                                        
                                                    }}
                                                    name="zipcode"
                                                    parentClass="c-address-form"
                                                    label="ZIP code" />
                                            )}
                                        </Form.Item>
                                    </div>
                                    {isLogin && <div className="col-12">
                                        <Form.Item>
                                            {getFieldDecorator('saveaddress', {
                                                valuePropName: 'checked',
                                                initialValue: true,
                                            })(<Checkbox versions={["gold"]} >Save this information for next time</Checkbox>)}
                                        </Form.Item>
                                    </div>}

                                </div>
                            </div>
                        </div>}

                        <Form.Item>
                            {getFieldDecorator('sameShipping', {
                                valuePropName: 'checked',
                                initialValue: true,
                                setFieldsValue: sameShipping
                            })(<Checkbox onChange={this.onSameShippingChange} versions={["gold"]} >Bill to the same address</Checkbox>)}
                        </Form.Item>
                        {
                            !sameShipping &&
                            <div className="row">
                                <div className="col-12">
                                    {isLogin && addresses && addresses.length > 0 && <div className={componentClass + "__login-wrapper"}>
                                        <Form.Item>
                                            {getFieldDecorator('addressSelect_ship', {
                                                initialValue: addresses.find(el => el.isDefault) || addresses[0]
                                            })(
                                                <Radio.Group
                                                    className="bordered"
                                                    onChange={(e) => {
                                                        const {
                                                            value
                                                        } = e.target
                                                        if (value !== null) {
                                                            setFieldsValue({
                                                                newAddress_ship: false
                                                            })
                                                        }
                                                    }}
                                                >
                                                    {
                                                        addresses.map((el, i) => <Radio key={i} value={el}>{this.returnAddressStr(el)}</Radio>)
                                                    }
                                                </Radio.Group>
                                            )}
                                        </Form.Item>
                                        <Form.Item>
                                            {getFieldDecorator('newAddress_ship', {
                                                valuePropName: 'checked',
                                                initialValue: false,
                                                onChange: (e) => {
                                                    const {
                                                        checked
                                                    } = e.target
                                                    setFieldsValue({
                                                        addressSelect_ship: checked ? null : addresses.find(el => el.isDefault) || addresses[0]
                                                    })
                                                }
                                            })(<Checkbox versions={["gold"]} >add new address</Checkbox>)}
                                        </Form.Item>
                                    </div>}

                                </div>
                                {
                                    (!isLogin || getFieldValue("newAddress_ship")) && 
                                    <>
                                        <div className="col-md-6">
                                            <Form.Item>
                                                {getFieldDecorator('firstname_ship', {
                                                    rules: [{ required: true, message: 'Please input first name!' },
                                                    {
                                                        pattern: regex.name,
                                                        message: 'Please enter a valid name!'
                                                    },
                                                    { max: 12, message: 'Please enter a valid name!' },
                                                ],
                                                })(
                                                    <DebounceInput parentClass="c-address-form" name="firstname_ship" label="First Name" />
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
                                                    },
                                                    { max: 12, message: 'Please enter a valid name!' },
                                                ],
                                                })(
                                                    <DebounceInput parentClass="c-address-form" name="lastname_ship" label="Last Name" />
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
                                                    },
                                                    {
                                                        max: 15,
                                                        message: 'Please enter a valid number!'
                                                    },
                                                    ],
                                                })(
                                                    <DebounceInput type="number" parentClass="c-address-form" name="phonenumber_ship" label="Phone Number" />
                                                )}
                                            </Form.Item>
                                        </div>
                                        <div className="col-12">
                                            <PlacesAutocomplete
                                                value={addressShip.addressStr}
                                                onChange={(e) => {
                                                    this.handleChange(e, "addressShip")
                                                }}
                                                onSelect={(e) => {
                                                    this.handleSelect(e, "addressShip")
                                                }}

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
                                                {getFieldDecorator('city-ship', {
                                                    rules: [
                                                        { required: true, message: 'Please input your city!' },
                                                    ],
                                                })(
                                                    <DebounceInput onChange={(key,value) => {
                                                        const city = key
                                                        this.changeAddress({ ...addressShip, city }, "addressShip")
                                                    }} parentClass="c-address-form" name="ship-city" label="City" />
                                                )}
                                            </Form.Item>
                                        </div>
                                        <div className="col-12">
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Item>
                                                {getFieldDecorator('country-ship', {
                                                    rules: [{ required: true, message: 'Please input your Country!' }],
                                                })(
                                                    <DebounceInput onChange={(key,value) => {
                                                        const country = key
                                                        this.changeAddress({ ...addressShip, country }, "addressShip")
                                                    }} parentClass="c-address-form" name="ship-country" label="Country" />
                                                )}
                                            </Form.Item>
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Item>
                                                {getFieldDecorator('state-ship', {
                                                    rules: [{ required: true, message: 'Please input your state!' }],
                                                })(
                                                    <DebounceInput onChange={(key,value) => {
                                                        const state = key
                                                        this.changeAddress({ ...addressShip, state }, "addressShip")
                                                    }} parentClass="c-address-form" name="ship-state" label="state" />
                                                )}
                                            </Form.Item>
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Item>
                                                {getFieldDecorator('zip-ship', {
                                                    rules: [
                                                        { required: true, message: 'Please input your ZIP code!' },
                                                        { max: 8, message: 'Please input your ZIP code!' },
                                                    ],
                                                })(
                                                    <DebounceInput onChange={(key,value) => {
                                                        const zip = key
                                                        this.changeAddress({ ...addressShip, zip }, "addressShip")
                                                    }} parentClass="c-address-form" name="ship-zip" label="ZIP code" />
                                                )}
                                            </Form.Item>
                                        </div>
                                        {isLogin && <div className="col-12">
                                            <Form.Item>
                                                {getFieldDecorator('saveaddress_ship', {
                                                    valuePropName: 'checked',
                                                    initialValue: true,
                                                })(<Checkbox versions={["gold"]} >Save this information for next time</Checkbox>)}
                                            </Form.Item>
                                        </div>}
                                    </>
                                }
                            </div>
                        }
                        <Button parentClass="c-checkout" theme="outline" versions={["block"]} >Continue to Shipping</Button>
                    </TitleList>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    addresses: state.address && state.address.address || [],
    state
})
const mapActionToProps = {
    showRegBar, getAddress, drawerToDisplay
}
export default connect(mapStateToProps, mapActionToProps)(Form.create({ name: "checkoutInfo" })(CheckoutInfo))
