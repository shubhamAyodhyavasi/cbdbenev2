import React from "react";
import { Form, Icon, Input, Button, Row, Col, Divider, Checkbox, Modal, message } from "antd";
import Firstmodel from "./Firstmodel";
import Secondmodal from "./SecondModal";
import axios from 'axios'
import Moment from 'react-moment';
import moment from 'moment'
export default class AppointmentPayReview extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: false,
      secondvisible: false,

      checked: true,
      disabled: false,
      informedconsent: false,
      privacypolicy: false,
      success: false,
      today: '',
      durationdata: '',
      appointmentbookstatus: false,
      formatnewdatestate : '',
      formattimestate : ''

    }

  }

  componentDidMount() {
    // var today = new Date();
    // var dd = String(today.getDate()).padStart(2, '0');
    // var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    // var yyyy = today.getFullYear();

    // today = mm + '/' + dd + '/' + yyyy;
    let today = moment(new Date()).format("MM/DD/YYYY");
    console.log('today', today)
   
    this.setState({
      today: today
    })
  }

  onChange = e => {
    console.log('checked = ', e.target.checked);
    this.setState({
      checked: e.target.checked,
    });
  };
  informedchange = () => {
    this.setState({
      informedconsent: !this.state.informedconsent
    })
  }

  policychange = () => {
    this.setState({
      privacypolicy: !this.state.privacypolicy
    })
  }
  showModal2 = () => {
    this.setState({
      secondvisible: true,

    });
  }
  showModal = () => {
    this.setState({
      visible: true,

    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
      secondvisible: false

    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
      secondvisible: false
    });
  };
  handleSubmit = e => {
    console.log('durationtype', localStorage.getItem('duration'))
    if (localStorage.getItem('duration') == 'undefined') {
      console.log(true)
    }
    else {
      console.log(false)
    }
    let notesdata, durationdata;
    if (localStorage.getItem('notes') == 'undefined') {
      notesdata = 'NO DATA'
    }
    else {
      notesdata = localStorage.getItem('notes')
    }
    if (localStorage.getItem('duration') != 'undefined') {
      durationdata = localStorage.getItem('duration')
      this.setState({
        durationdata: localStorage.getItem('duration')
      })
      // durationdata = 'NO DATA'
    }
    else {
      durationdata = 'NO DATA'
      this.setState({
        durationdata: 'NO DATA'
      })
    }

    e.preventDefault();
    console.log('form submit')
    let newformatdate = new Date(localStorage.getItem('manualbookedfor'))
    let formatdate = moment(newformatdate).format('LL')
    let formattime = moment(newformatdate).format('LT');
  this.setState({
    formattimestate : formattime
  })
    this.setState({
      formatnewdatestate : formatdate
    })
    let body = {
      bookedOn: this.state.today,
      patient: localStorage.getItem('patientid'),
      doctor: localStorage.getItem('doctorid'),
      bookedFor: localStorage.getItem('manualbookedfor'),
      // bookedFor : '2019-11-27',
      transactionId: 'test',
      availabilitySelected: 'speciality',
      paid: true,
      // duration : localStorage.getItem('duration'),
      duration: `${durationdata}`,
      // duration : this.state.durationdata || 'NO DATA',

      booked: true,
      amount: localStorage.getItem('doctorfee'),
      reasonForVisit: localStorage.getItem('reason'),
      description: `${notesdata}`,
      type: localStorage.getItem('type'),
      timeSlot: localStorage.getItem('timeslotid'),
      number: localStorage.getItem('patientphone')
    }
    console.log(body)
    console.log('Congratulations, Your Appointment Has Been Booked for ', this.state.formatnewdatestate, ' at ' ,this.state.formattimestate)
    axios
      .post(
        'http://localhost:3001/appointment/book', body

      )
      .then(response => {
        console.log('payreview', response);
        if (response.data.status == true) {

          // alert(response.data.message)
          this.setState({
            appointmentbookstatus: true
          })
          setTimeout(function(){
            window.location.reload();
         }, 5000);
          // localStorage.removeItem('patientid', 'doctorid', 'manualbookedfor', 'doctorfee', 'reason', 'type', 'timeslotid')
          // this.setState({
          //   success : true
          // })
          // const success = () => {
          //   message.success('This is a success message');
          // };
        }
        //  this.state.prodbatch = response.data.data.items

        //  this.forceUpdate();
        //  if (response.data.data.description == "Item deleted successfully") {
        //      alert("Product deleted successfully");
        //      this.forceUpdate();
        //      this.handleClick();
        //  }
      })
      .catch(e => {
        console.log('error', e);
      });
  };

  render() {
    if (this.state.success) {
      const success = () => {
        message.success('This is a success message');
      };
    }
    let confirmbtn;
    if (this.state.informedconsent && this.state.privacypolicy) {
      confirmbtn = (
        <div>
          <Button type="primary" className="ap-appointment-details-btn"
            onClick={(e) => this.handleSubmit(e)}>Confirm</Button>
        </div>
      )
    }
    else {
      confirmbtn = (
        <div> <Button type="primary" disabled>Confirm</Button></div>
      )
    }

    const { getFieldDecorator } = this.props.form;
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const { firstFormData, cardDetails } = this.props;
    let appointmentdataholder;
    if (this.state.appointmentbookstatus) {
      appointmentdataholder = (
        <div className="appointment_booked_ap">
          <Row>
            <Col span={24}>
              <center>
              <Icon type="check-circle" />
      <h3> Congratulations, Your Appointment Has Been Booked for <strong>{this.state.formatnewdatestate}</strong> at <strong>{this.state.formattimestate}</strong> </h3>
             
              </center>
            </Col>
          </Row>

        </div>
      )
    }
    else {
      appointmentdataholder = (
        <div>
          <Row>
            <Col span={12}>
              <h2>Appointment Details</h2>

              <div classame="review-custom-section-ap__visit-details">
                <p><strong>Consultation Method : </strong>{localStorage.getItem('type') || '--'} </p>
                <p><strong>Reason for visit :</strong> {localStorage.getItem('reason') || '--'}</p>
                <p><strong>Duration : </strong>{this.state.durationdata || 'No Duration Data Given'}</p>
                <p><strong>Consultation Cost : </strong>{localStorage.getItem('doctorfee')}</p>
                <p><strong>Appointment Time : </strong>{localStorage.getItem('manualtime') || '--'}</p>
                <p><strong>Specialty : </strong>Primary Care Doctor</p>
              </div>
            </Col>

            <Col span={12}>
              <h2>Payment Method</h2>


              <p>Visa ending in : {localStorage.getItem('last4')}</p>
              {/* <p>Visa Number : {localStorage.getItem('patientcardnumber')}</p> */}

              <h2>Insurance</h2>


              <p>No Insurance Addedd</p>
              {/* <h2>Primary Care Physician</h2> */}


              {/* <p>No Data Yet.</p> */}


            </Col>
          </Row>
          <Divider />
          <Row>
            <div className="review-custom-section-ap__checkbox-ap">
              <Col span={24}>

                <Checkbox
                  checked={this.state.informedconsent}
                  onChange={() => this.informedchange()}

                >
                  I certify that I have read and accept the terms of <span onClick={this.showModal} style={{ color: '#82bbe9' }}>Doc Mz's Informed Consent</span>.
            </Checkbox>

                <Checkbox
                  checked={this.state.privacypolicy}
                  onChange={() => this.policychange()}
                >
                  I have read <span onClick={this.showModal2} style={{ color: '#82bbe9' }}>Doc Mz's Informed Consent</span> and I acknowledge that I have the ability to print a hard copy of Privacy Policy for my records.
            </Checkbox>

              </Col>

              <Col span={24}>
                <center>
                  {/* <Button type="primary">Primary</Button> */}
                  {/* {confirmbtn} */}
                  <div>
                    <Button type="primary" disabled={!(this.state.informedconsent && this.state.privacypolicy)} className="ap-appointment-details-btn"
                      onClick={(e) => {
                        if(this.state.informedconsent && this.state.privacypolicy){
                          this.handleSubmit(e)
                        }
                      }}>Confirm</Button>
                  </div>
                </center>
              </Col>
            </div>
          </Row>
          <Row>
            <Modal
              title="Informed Consent for DocMz"
              width={1024}
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <Firstmodel />
            </Modal>

            <Modal
              title="Privacy and policy terms of DocMz"
              width={1024}
              visible={this.state.secondvisible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <Secondmodal />
            </Modal>
          </Row>
        </div>
      )
    }

    return (
      <div className="review-custom-section-ap">
        {appointmentdataholder}


      </div>
      // <Row type="flex" justify="space-around" align="middle">
      //   <Col span={24} className="left-side-content-review-ap">
      //     <h3>Your appointment will be schedule for <strong>Toothache</strong> on <strong>2<sup>nd</sup> December 2020</strong> at <span>10:00 AM - 10:30 AM</span></h3>
      //     <p>Consultation cost : <b>$30.00</b> </p>
      //     <Divider/>
      //    <center>
      //    <Button type="info">Confirm Booking</Button>
      //    </center> 


      //   </Col>


      // </Row>
    );
  }
}
