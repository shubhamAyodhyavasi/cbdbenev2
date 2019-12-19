import TitleList from "../TitleList"
import Button from "../form-components/Button"
import { Form, Radio, Collapse, Select  } from "antd"
import { connect } from 'react-redux'
import regex from "../../services/helpers/regex"
import Input from '../form-components/Input'
import Checkbox from '../form-components/Checkbox';
import { showRegBar } from '../../redux/actions/drawers'
import { setLoading } from '../../redux/actions/loading'
import validator from "../../services/helpers/validator";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import projectSettings from '../../constants/projectSettings';
import { searchAddress, getShippingRates, confirmShipment, authorizeCharge, authorizeSubscriptionBank, authorizeSubscriptionProfile, authorizeSubscription, placeOrderNew, authorizeChargeBank, authorizeChargeProfile } from '../../services/api';
import { getItemsHeightWidth, filterShippingRates, generateOrderObj } from "../../services/helpers/cart"
import { getSingleElementByMultipleObject } from "../../services/helpers/misc"
import msgStrings from "../../constants/msgStrings"
import Loader from "../loader"
import {
    setShippingCharge,
    setShippingType
} from '../../redux/actions/cart'
import Cleave from 'cleave.js/react';


import {
    addCardAuthorize, getCards
} from '../../redux/actions/cards'
import InputMask from "../form-components/InputMask"
import reactComponentDebounce from 'react-component-debounce';
const DebounceCreditCard = reactComponentDebounce({
    valuePropName: 'value',
    triggerMs: 1000,
  })(Cleave);
const DebounceInput = reactComponentDebounce({
    valuePropName: 'value',
    triggerMs: 1000,
  })(Input);
const { Panel } = Collapse;
class CheckoutPayment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: props.email,
            address: props.address,
            shippingDetail: props.shippingDetail,
            isCard: true,
            collapseKey: ["card"],
            

        }
        this.generateOrder = this.generateOrder.bind(this)
    }
    componentDidMount (){
        const {
            getCards, user
        } = this.props
        if(user && user._id){
            getCards(user._id)
        }
    }
    tglCard = () => {
        this.setState(prevState => {
            this.props.form.setFieldsValue({
                paymentProfile: null
            })
            if(prevState.collapseKey.includes("card")){
                return  ({
                    isCard: false,
                    collapseKey: ["bank"]
                })
            }
            return ({
                isCard: true,
                collapseKey: ["card"]
            })
        })
    }
    onFailed = (res) => {
        console.log({
            res
        })
        const {
            onFailed 
        } = this.props
        if(typeof onFailed === 'function'){
            onFailed()
        }
    } 
    combinePromiseProduct = (promise, el) =>
        new Promise(res => {
            promise
                .then(resX => {
                    if (resX.data.status) {
                        res({
                            ...el,
                            subscriptionFailed: false,
                            subscriptionId: resX.data.subscriptionid
                        });
                    } else {
                        res({
                            ...el,
                            subscriptionFailed: true
                        });
                    }
                })
                .catch(resX => {
                    res({
                        ...el,
                        subscriptionFailed: true
                    });
                });
        });

    generateSubsData = (el, details) => {
        const customAmount = parseFloat(el.subTotal); // + (Math.random() * 100)
        const {
            billto,
            profileid,
            paymentid,
            cardnumber,
            cardcode,
            expiry
        } = details;
        console.log({
            details
        });
        const subsData = {
            amount: parseFloat(customAmount.toFixed(2)),
            name: billto.firstName + billto.lastName,
            schedule: {
                interval: {
                    length: "1",
                    unit: "months"
                },
                startDate: moment().format("YYYY-MM-DD"),
                totalOccurrences: el.subscriptionMeta.duration || "1"
            },
            billto: {
                firstName: billto.firstName,
                lastName: billto.lastName
            }
        };
        if (profileid && paymentid) {
            return {
                ...subsData,
                profileid,
                paymentid
            };
        }
        if (cardnumber && cardcode && expiry)
            return {
                ...subsData,
                cardnumber,
                cardcode,
                expiry
            };
    };

    formatCreditCardNumber = (value) => {
        if (!value) {
          return value
        }
      
        const issuer = Payment.fns.cardType(value)
        const clearValue = clearNumber(value)
        let nextValue
      
        switch (issuer) {
          case 'amex':
            nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
              4,
              10
            )} ${clearValue.slice(10, 15)}`
            break
          case 'dinersclub':
            nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
              4,
              10
            )} ${clearValue.slice(10, 14)}`
            break
          default:
            nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
              4,
              8
            )} ${clearValue.slice(8, 12)} ${clearValue.slice(12, 19)}`
            break
        }
      
        return nextValue.trim()
      }


    makeSubsPromise = (order, details) => {
        return order.products.map(el => {
            if (el.isSubscribed) {
                const subsData = this.generateSubsData(el, details);
                if (subsData.routingNumber) {
                    return this.combinePromiseProduct(
                        authorizeSubscriptionBank(subsData),
                        el
                    );
                }
                if (subsData.profileid) {
                    return this.combinePromiseProduct(
                        authorizeSubscriptionProfile(subsData),
                        el
                    );
                }
                return this.combinePromiseProduct(
                    authorizeSubscription(subsData),
                    el
                );
            } else {
                return new Promise(res => {
                    res(el);
                });
            }
        });
    };
    finalOrderSubmit = orderApi => {
        // this.setState({loading: false})
        // console.log({"loading": this.state.loading})
        orderApi
            .then(res => {
                const resJson = res.data
                if (resJson.status) {
                    this.props.setLoading(false)
                    this.setState(
                        {
                            modalData: "orderPlacedSuccessfully",
                            modalTitle: "orderPlacedModalTitle",
                            modal: true,
                            clearCart: true,
                            SpinnerToggle: false,
                            // loading: false
                        },
                        () => {
                            // this.modalDismiss();
                            const {
                                history,
                                location,
                                user: {
                                    userMetaId
                                }
                            } = this.props
                            //   clearCart();
                            //   history.push({
                            //     pathname:  "/order-success",
                            //     state: {
                            //       order: resJson.data
                            //     }
                            //   })
                        }
                    );
                } else {
                    console.log(resJson);
                    alert("Server Error")
                    this.onFailed(resJson)
                    //   this.setState({
                    //     modalData: someThingWrong,
                    //     modalTitle: wrongModalTitle,
                    //     modal: true,
                    //     SpinnerToggle: false
                    //   });
                }
                console.log({"loading": this.state.loading})
            })
            .catch(err => {
                console.log({
                    err
                });
                this.onFailed(err)
                // this.setState({
                //     modalData: someThingWrong,
                //     modalTitle: wrongModalTitle,
                //     modal: true,
                //     SpinnerToggle: false
                // });
            });
    };
    onSubmit = e => {
       
        e.preventDefault()
        const {
            onSubmit, shippingSendData, address
        } = this.props
        const {
            isCard
        } = this.state
        console.log({
            cart: this.props
        })
        this.props.form.validateFields((err, values) => {
            if (!err) {
                
                // this.state = {loading: true}
                this.props.setLoading(true)
                console.log({"Sssssssssss": this.state.loading})
                console.log({
                    values, 
                    shippingSendData
                })
                confirmShipment({
                    ...shippingSendData
                })
                    .then(res => {
                        if (res.data.status && res.data.data) {
                            this.setState({
                                confirmShipRes: res.data.data
                            }, () => {
                                const order = this.generateOrder()
                                console.log({
                                    order
                                })
                                order.then(order => {
                                    console.log({
                                        isCard, order
                                    })
                                    // this.setState({loading: false})
                                    // this.props.setLoading(false)
                                    console.log({"Sssssssssss-inside": this.state.loading})
                                    if(values.paymentProfile){
                                        this.onProfilePay(order, values)
                                    }else if(isCard){
                                        this.onCardPay(order, values)
                                    }else{
                                        this.onBankPay(order, values)
                                    }
                                })
                            })
                        }else{
                            console.log({
                                res
                            })
                        }
                    })
                    .catch(console.log)
                // if (typeof onSubmit === "function") {
                //     const order = generateOrder()
                //     console.log({
                //         order
                //     })
                //     order.then(res => console.log({res}))
                //     // onSubmit(e, values, address, addressShip)
                // }
            }
        })
    }
    onCardPay = (order, values) => {
        const {
            address
        } = this.props
        console.log({
            order, values
        })
        const {
            cardnumber: cardNumber,
            cvv,
            cardname,
            expiry: expDate
        } = values
        const cardnumber = cardNumber.replace(/ /g, "")
        const expiry = "20" + expDate
            .split("/")
            .reverse()
            .join("-");
        const {
            grandTotal: amount,
            countryTax,
            userDetails,
            shippingCharge,
            products
        } = order;
        const customAmount = amount;
        const {
            addressStr,
            state,
            city,
            zip,
            other,
            email,
            ...addressRest
        } = address
        const data = {
            cardnumber,
            expiry,
            cardcode: cvv,
            amount: parseFloat(customAmount.toFixed(2)),
            tax: {
                amount: countryTax,
                name: `Country Tax - ${userDetails.country}`
            },
            shipping: {
                amount: shippingCharge,
                name: `Ship to - ${userDetails.state}`
            },
            lineItems: products.map(el => ({
                itemId: el.itemId,
                name: el.title,
                description: "-",
                quantity: el.qty,
                unitPrice: el.unitPrice
            })),
            billto: {
                address: addressStr,
            },
            shipTo: {
                address: addressStr,
            }
        };
        authorizeCharge(data)
            .then(res => {
                console.log({ res });
                if (res.data.status) {
                    const transactionId = res.data.transactionid
                    const {
                        savecard
                    } = values
                    console.log({
                        savecard
                    })
                    if(savecard){
                        const bodyData = {
                            cardnumber,
                            expmonth: expDate.split("/")[0],
                            expyear: expDate.split("/")[1],
                            cvc: cvv,
                            userid: this.props.userId || this.props.user._id
                        };
                        this.props.addCardAuthorize({
                            user: this.props.user,
                            oldCards: this.props.cards,
                            card: bodyData
                        })
                    }
                    Promise.all(this.makeSubsPromise(order, data)).then(res => {
                        console.log({ res });
                        const sendAbleOrder = {
                            ...order,
                            products: res,
                            transactionId
                        };
                        this.finalOrderSubmit(placeOrderNew(sendAbleOrder));
                    });
                } else {
                    this.onFailed(res)
                }
            })
            .catch(err => {
                console.log({ err })
                this.onFailed(err)
            })
    }
    onBankPay = (order, values) => {
        const {
            address
        } = this.props
        const {
            account_type,
            bank_routing_number,
            bank_checking_number,
        } = values
        const {
            grandTotal: amount,
            countryTax,
            userDetails,
            shippingCharge,
            products
        } = order;
        const customAmount = amount;
        const {
            addressStr,
            state,
            city,
            zip,
            other,
            email,
            ...addressRest
        } = address
        const data = {
            accountType: account_type,
            routingNumber: bank_routing_number,
            accountNumber: bank_checking_number,
            amount: parseFloat(customAmount.toFixed(2)),
            tax: {
                amount: countryTax,
                name: `Country Tax - ${userDetails.country}`
            },
            shipping: {
                amount: shippingCharge,
                name: `Ship to - ${userDetails.state}`
            },
            lineItems: products.map(el => ({
                itemId: el.itemId,
                name: el.title,
                description: "-",
                quantity: el.qty,
                unitPrice: el.unitPrice
            })),
            billto: {
                address: addressStr,
                company: "",
                firstName: "",
                lastName: "",
                ...addressRest
            },
            shipTo: {
                address: addressStr,
                ...addressRest
            }
        };
        authorizeChargeBank(data)
            .then(res => {
                console.log({ res });
                if (res.data.status) {
                    const transactionId = res.data.transactionid
                    Promise.all(this.makeSubsPromise(order, data)).then(res => {
                        console.log({ res });
                        const sendAbleOrder = {
                            ...order,
                            products: res,
                            transactionId
                        };
                        this.finalOrderSubmit(placeOrderNew(sendAbleOrder));
                    });
                } else {
                    this.onFailed(res)
                }
            })
            .catch(err => {
                console.log({ err })
                this.onFailed(err)
            })
    }
    onProfilePay = (order, values) => {
        const {
            address
        } = this.props
        const {
            account_type,
            bank_routing_number,
            bank_checking_number,
            paymentProfile
        } = values
        const {
            grandTotal: amount,
            countryTax,
            userDetails,
            shippingCharge,
            products
        } = order;
        const customAmount = amount;
        const {
            addressStr,
            state,
            city,
            zip,
            other,
            email,
            ...addressRest
        } = address
        const data = {
            paymentid: paymentProfile.customerPaymentProfileId,
            profileid: paymentProfile.customerProfileId,
            amount: parseFloat(customAmount.toFixed(2))
        };
        authorizeChargeProfile(data)
            .then(res => {
                console.log({ res });
                if (res.data.status) {
                    const transactionId = res.data.transactionid
                    Promise.all(this.makeSubsPromise(order, data)).then(res => {
                        console.log({ res });
                        const sendAbleOrder = {
                            ...order,
                            products: res,
                            transactionId
                        };
                        this.finalOrderSubmit(placeOrderNew(sendAbleOrder));
                    });
                } else {
                    this.onFailed(res)
                }
            })
            .catch(err => {
                console.log({ err })
                this.onFailed(err)
            })
    }
    async generateOrder(paymentResponse, isFirst = true) {
        let confirmShipRes = this.state.confirmShipRes;
        const { shippingSendData, cart, user, referrer,
            address
        } = this.props;
        // if(isFirst){
        //     await confirmShipment({
        //         ...shippingSendData
        //     })
        //     .then(res => {
        //         if(res.data.status && res.data.data){
        //             this.setState({
        //                 confirmShipRes: res.data.data
        //             })
        //         }
        //     })
        //     .catch(console.log)
        // }
        const refId = referrer && referrer.referralUrlId;
        const {
            id: shipmentid,
            selected_rate,
            postage_label,
            tracking_code: trackingcode,
            tracker,
            fees
        } = confirmShipRes || {};
        console.log({
            confirmShipRes
        })
        const shippingDetails = {
            ...confirmShipRes,
            shipmentid,
            rateid: selected_rate && selected_rate.id,
            rate: selected_rate && selected_rate.rate,
            label: postage_label && postage_label.label_url,
            trackingcode,
            trackerid: tracker && tracker.id,
            fees,
            service: selected_rate && selected_rate.service,
            carrier: (selected_rate && selected_rate.carrier) || "shipment_failed",
        };
        const order = generateOrderObj({
            referralId: null,
            cart, user, confirmShipRes: shippingDetails,
            stateObj: {
                paymentMethod: "Authorize",
                address
            }
        })
        return order
    }
    render() {
        const componentClass = "c-checkout-payment"
        const {
            form, user, cards
        } = this.props
        const isLogin = user._id ? true : false
        console.log({user, cards})
        const {
            email, address, shippingDetail, collapseKey, isCard,
        } = this.state
        const { getFieldDecorator, getFieldValue } = form
        const profileValue = getFieldValue("paymentProfile")
        return (
           
            <div className={componentClass}>
                <Form onSubmit={this.onSubmit} >
                    <TitleList versions={["sm-border"]} parentClass={componentClass} title="Contact" >
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
                                initialValue: email
                            })(
                                <DebounceInput label="E-mail" />,
                            )}
                        </Form.Item>
                    </TitleList>
                    <TitleList versions={["sm-border"]} parentClass={componentClass} title="Method" >
                        <Form.Item>
                            {getFieldDecorator('address', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your Address!'
                                    },
                                ],
                                initialValue: address.addressStr
                            })(
                                <DebounceInput label="address" />,
                            )}
                        </Form.Item>
                    </TitleList>
                    {isLogin && cards && cards.length > 0 &&
                        <TitleList parentClass={componentClass} title={<span onClick={this.tglCard} >Pay with saved cards or account </span>} >
                            
                            <Form.Item>
                                {getFieldDecorator('paymentProfile', {
                                    initialValue: cards.find(el => el.isDefault) || cards[0]
                                })(
                                    <Radio.Group
                                        className="bordered"
                                        onChange={(e) => {
                                            const {
                                                value
                                            } = e.target
                                            if (value !== null) {
                                                // setFieldsValue({
                                                //     newAddress: false
                                                // })
                                                this.setState({
                                                    collapseKey: null
                                                })
                                            }
                                        }}
                                    >
                                        {
                                            cards.map((el, i) => {
                                                if(el.creditCard){
                                                    return <Radio key={i} value={el}>{el.creditCard.cardNumber}</Radio>
                                                }else if(el.bank){
                                                    return <Radio key={i} value={el}>bank</Radio>
                                                }
                                                return null
                                            })
                                        }
                                    </Radio.Group>
                                )}
                            </Form.Item>
                        </TitleList>
                    }
                    
                    <TitleList parentClass={componentClass} title={<span onClick={this.tglCard} >Pay with card </span>} >
                        <Collapse destroyInactivePanel={true} bordered={false} activeKey={collapseKey} >
                            <Panel header={null} key="card">

                                <>
                                    <Form.Item>
                                        {getFieldDecorator('cardnumber', {
                                            rules: isCard && !profileValue && [
                                                {
                                                    required: true,
                                                    message: "Please enter your card number!"
                                                },
                                                {
                                                    min: 19,
                                                    message: "Please enter valid card number!"
                                                },
                                            ]
                                        })(
                                            // <InputMask 
                                            //     label="Card Number" 
                                            //     mask="9999-9999-9999-9999"
                                            // />
                                            
  <DebounceCreditCard
    className='c-input c-input__input'
    placeholder="XXXX XXXX XXXX XXXX"
    options={{creditCard: true}}
    onChange={(key,value) => { console.log({key}) }}
  />

                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        {getFieldDecorator('cardname', {
                                            rules: isCard && !profileValue && [{
                                                required: true,
                                                message: "Please enter cardholder name!"
                                            }]
                                        })(
                                            <DebounceInput label="Cardholder Name" />,
                                        )}
                                    </Form.Item>
                                    <div className="container-fluid p-0">
                                        <div className="row">
                                            <div className="col-8">
                                                <Form.Item>
                                                    {getFieldDecorator('expiry', {
                                                        rules: isCard && !profileValue && [{
                                                            required: true,
                                                            message: "Please enter expiration date!"
                                                        }]
                                                    })(
                                                        <Cleave
    className='c-input c-input__input'
    options={{date: true, datePattern: ['m', 'y']}}
    placeholder="Expiry Date" 
    onChange={event => { console.log(event.target.rawValue, event.target.value) }}
  />
                                                    )}
                                                </Form.Item>
                                            </div>
                                            <div className="col-4">
                                                <Form.Item>
                                                    {getFieldDecorator('cvv', {
                                                        rules: isCard && !profileValue && [{
                                                            required: true,
                                                            message: "Please enter cvv number!"
                                                        }]
                                                    })(
                                                        <DebounceInput label="CVV Code" />,
                                                    )}
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>

                                    <Form.Item>
                                        {getFieldDecorator('savecard', {
                                            valuePropName: 'checked',
                                            initialValue: false,
                                        })(<Checkbox versions={["gold"]} >Save this card for next time</Checkbox>)}
                                    </Form.Item>
                                </>
                            </Panel>
                        </Collapse>
                    </TitleList>
                    <TitleList versions={["sm-border"]} parentClass={componentClass} title={<span onClick={this.tglCard} >Pay with account</span>} >
                        <Collapse destroyInactivePanel={true} bordered={false} activeKey={collapseKey} >
                            <Panel header={null} key="bank">
                                <>
                                    <Form.Item>
                                        {getFieldDecorator('name_acc', {
                                            rules: !isCard && !profileValue && [{
                                                required: true,
                                                message: "Please enter your name!"
                                            }]
                                        })(
                                            <DebounceInput label="Name on Account" />,
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        {getFieldDecorator('bank_routing_number', {
                                            rules: !isCard && !profileValue && [{
                                                required: true,
                                                message: "Please enter routing number!"
                                            }]
                                        })(
                                            <DebounceInput label="Bank Routing Number*" />,
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        {getFieldDecorator('bank_checking_number', {
                                            rules: !isCard && !profileValue && [
                                                {
                                                    required: true,
                                                    message: "Please enter checking account number!"
                                                },
                                                {
                                                    min: 13,
                                                    message: "checking number must have 13 digits"
                                                },
                                                {
                                                    max: 13,
                                                    message: "checking number must have 13 digits"
                                                },
                                                {
                                                    pattern: /\d+/,
                                                    message: "checking number must have only digits"
                                                },
                                            ]
                                        })(
                                            <DebounceInput label="Checking Account Number*" />,
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        {getFieldDecorator('account_type', {
                                            initialValue:"checking"
                                            // rules: !isCard && [{
                                            //     required: true,
                                            //     message: "Please enter account type!"
                                            // }]
                                        })(
                                            <Select>
                                                <Option value="checking">Checking</Option>
                                                <Option value="savings">Savings</Option>
                                                <Option value="businessChecking">Business Checking</Option>
                                            </Select>
                                        )}
                                    </Form.Item>

                                    <Form.Item>
                                        {getFieldDecorator('savecard', {
                                            valuePropName: 'checked',
                                            initialValue: false,
                                        })(<Checkbox versions={["gold"]} >Save this account for next time</Checkbox>)}
                                    </Form.Item>
                                </>
                            </Panel>
                        </Collapse>
                    </TitleList>
                    <TitleList versions={["sm-border"]}>
                        <Button parentClass="c-checkout" theme="outline" versions={["block"]} >Place order</Button>
                    </TitleList>

                </Form>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    cart: state.cart,
    cards: state.cards.cards,

})
const mapActionToProps = {
    addCardAuthorize,
    getCards,
    setLoading
}

export default connect(mapStateToProps, mapActionToProps)(Form.create({ name: "CheckoutPayment" })(CheckoutPayment))