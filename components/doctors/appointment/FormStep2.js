import React, { Component } from 'react'
import {
    Form,
    Icon,
    Input,
    Button,
    Container,
    Row,
    Col,
    Avatar,
    Steps,
    List,
    Typography,
    Divider,
    Radio,
    Tooltip,
    Cascader,
    Select,
    Checkbox,
    AutoComplete,
    Carousel,
  } from "antd";
import { connect } from 'react-redux'
import classNames from 'classnames'
class FormStep2 extends Component {
  
    constructor() {
        super()
        this.state = {
            value: '',
            phone : ''
          };
        
        

    }
    // handleSubmit = e => {
    //     e.preventDefault();
    //     this.props.form.validateFields((err, values) => {
    //         if (!err) {
    //             console.log('Received values of form: ', values);
    //             const {
    //                 onSubmit
    //             } = this.props
    //             if (typeof onSubmit === "function") {
    //                 onSubmit(values)
    //             }
    //         }
    //     });
    // };
    onChange = async e => {
        console.log('radio checked', e.target.value);
        await this.setState({
          value: e.target.value,
        });
        console.log(this.state.value)
        localStorage.setItem('type',this.state.value)
      };
   componentDidMount() {
     this.setState({
       phone : localStorage.getItem('patientphone')
     })
     
     console.log({
       props: this.props
     })
   }
   phoneChange =  async (e) => {
     e.preventDefault();
     console.log(this.state.phone)
      await this.setState({
       phone : e.target.value
     })
     console.log(this.state.phone)
     localStorage.setItem('patientphone',this.state.phone)
   }
   
    render() {
      let patientInfo = JSON.parse(localStorage.getItem('patient'))
        const { getFieldDecorator } = this.props.form;
        const {phone} = this.state
        return (
            <>
                {/* <Form onSubmit={this.handleSubmit} className="login-form">
                     <Radio.Group name="type" defaultValue='a'>
                        <Radio value="phone" onClick={(e) => { console.log(e.target.value) }}>
                            <Icon type="phone" value='phone' className="second-step-custom-ap__icons" />
                        </Radio>
                        <Radio value="video" onClick={(e) => { console.log(e.target.value) }}>
                            <Icon type="mobile" className="second-step-custom-ap__icons" />
                        </Radio>
                    </Radio.Group>


                </Form> */}
                 <div className="second-step-custom-ap">
          <Row>
            <Col span={24}>
            
              <h2 >Hey {patientInfo.name?patientInfo.name : "John"}, Let's get you taken care of</h2>

            </Col>
          </Row>
          <Row >
            <Col span={24} style={{ textAlign: 'center' }}>
              <p className="visit-type-para-ap">Which type of visit would you like?</p>
            </Col>

            <Col span={24}>
              <center>
              <Radio.Group className="second-step-custom-ap__radio-group" onChange={this.onChange} value={this.state.value}>
              <Radio value="phone" >
                <Icon type="phone" value='phone' className={classNames("second-step-custom-ap__icons", {
                  "second-step-custom-ap__icons--active": "phone" === this.state.value
                })} />
                </Radio>
              <Radio value="video"  >
                <Icon type="mobile"  className={classNames("second-step-custom-ap__icons", {
                  "second-step-custom-ap__icons--active": "video" === this.state.value
                })} />
                </Radio>
              </Radio.Group>
               {/* <FormTwo ref={formTwo} /> */}
              </center>
            </Col>

            {/* <Col xs={{ span: 11, offset: 1 }} lg={{ span: 5, offset: 7 }}>
             
              <Icon type="phone" className="second-step-custom-ap__icons" />
            

            </Col >
            <Col xs={{ span: 11, offset: 1 }} lg={{ span: 10, offset: 2 }}>
            
              <Icon type="mobile" className="second-step-custom-ap__icons" />
              
            </Col> */}
            <Col span={24} align="middle">
              {/* <p className="video-phone-para"><a href="#">Video vs Phone visits. Learn how they work</a></p> */}
            </Col>
          </Row>
          <Row >


            <Divider />
            <Col span={21} offset={3} style={{ textAlign: 'center' }} className="second-step-custom-ap__numbercolsecondform">
              <p className="visit-type-para-ap">What's the best number to reach you during your visit?</p>
              <Form.Item>
          {getFieldDecorator('phone', {
             initialValue: `${phone}`,
          })(
            <Input onChange={(e) => this.phoneChange(e)}/>
          )}
        </Form.Item>
        <Tooltip title="We may reach out if there are changes to your visit." className="second-step-custom-ap__iconhelptooltip">
                <Icon type="question-circle" className="second-step-custom-ap__iconhelp" />
              </Tooltip>
            </Col>
            {/* <Col span={12} >
              <p className="second-step-custom-ap__phone">8562025363</p>
              <Form.Item>
          {getFieldDecorator('phone', {
             initialValue: ['8765058596'],
          })(
            <Input/>
          )}
        </Form.Item>


            </Col>
            <Col span={12}>
              <p className="second-step-custom-ap_why-para_ap">Why do we need this?</p>
              <Tooltip title="We may reach out if there are changes to your visit.">
                <Icon type="question-circle" className="second-step-custom-ap__iconhelp" />
              </Tooltip>,
            </Col> */}

          </Row>
         
          {/* <Row type="flex">
          <Col span={24}>
            <div className="c-appointment-form__steps">
              <div className="c-appointment-form__step">
                <div className="">
                  {addCard ? (
                    <PaymentCard
                      cvvOnCard={""}
                      expDateOnCard={""}
                      numberOnCard={""}
                      nameOnCard={""}
                      cardResponse={response => {
                        console.log("response", { response });
                      }}
                      transactionData={e => {
                        cardDetailsWithNextStep(e);
                      }}
                      saveOptional={true}
                      backButton={() => {
                        toggleCard();
                      }}
                    />
                  ) : (
                      <div className="custom-card-list-ap">
                      
                      
                        <List
                        className="custom-card-list-data-ap"
                          bordered
                          dataSource={cards}
                          renderItem={item => (
                       
                            

                       
                            <List.Item onClick={() => setSavedCardData(item)}>
                                
                               <p className="c-appointment-form__card-number">
                          
                                xxxx xxxx xxxx {item.last4}  
                          <span className="middle-content-date">{item.exp_month}/{item.exp_year}</span>
                                <span className="c-appointment-form__card-icon">
                                  <span style={{fontSize : '18px'}}>{item.brand}</span> - <Icon type="credit-card" />
                                </span>
                              
                              </p> 
                             
                            </List.Item>
                          )}
                        />
                        <Button
                          className="c-appointment-form__card-tgl-btn"
                          onClick={() => {
                            toggleCard();
                          }}
                        >
                          Add New <Icon type="plus" />
                        </Button>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </Col>
        </Row> */}
        </div>
            </>
        )
    }
}
const mapStateToProps = state => ({
  ...state
})
export default Form.create()(connect(mapStateToProps)(FormStep2))
