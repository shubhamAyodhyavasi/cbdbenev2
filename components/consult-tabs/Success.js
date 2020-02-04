import React, { Component } from 'react';
import { Button } from 'antd';
import {connect} from 'react-redux'
import Router from 'next/router'
import moment from 'moment'
class Success extends Component{
    constructor(){
        super();
        this.state = {
            isConfirmed: false
        }
    }
    saveAndContinue = (e) => {
        e.preventDefault();
        this.setState({
            isConfirmed: true
        })
        // this.props.nextStep()
        //@shubham Do the api call here
    }

    back  = (e) => {
        e.preventDefault();
        if(typeof this.props.prevStep === "function")        
            this.props.prevStep();
    }

    goToShop = () => {
        Router.push("/shop")
    }

    render(){
        const {
            isConfirmed
        } = this.state
        const {values: { firstName, lastName, phoneNumber, zipCode, state, weight, age, notes }} = this.props;
        const time = moment(this.props.currentAppointment.bookedFor).format("MMM DD, hh:mm:a")
        return(
            <div className="c-confirmation">
                <div className="container-fluid">
                    <div className="consult-success-wrapper">
                        <h1 className="c-confirmation__center c-confirmation__center--heading">
                            {
                                !isConfirmed ? "Confirm your Appointment" : "Your Appointment has been confirmed!"
                            }
                        </h1>
                        {!isConfirmed && <p className="c-confirmation__center">Your Appointment with <b>{this.props.currentAppointment.doctorName}</b>, scheduled for <b>{time}</b> is waiting for a confirmation.</p>}
                        {!isConfirmed && <p className="c-confirmation__center">
                            Thank you for choosing Bené
                        </p>}
                        {!isConfirmed && <>
                            { firstName}
                            {lastName} 
                            {phoneNumber}
                            { zipCode}
                            <div className="c-personalDetails__btn-wrap">
                                <Button className="tab__btn" onClick={this.back}>Back</Button>
                                <Button className="tab__btn" onClick={this.saveAndContinue}>Confirm Appointment</Button>
                            </div>
                        </>}
                        {
                            isConfirmed &&
                            <div className="c-personalDetails__btn-wrap justify-content-around">
                                <Button className="tab__btn" onClick={this.goToShop}>Continue Shopping</Button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentAppointment: state.appointment.currentAppointment
})
export default connect(mapStateToProps)(Success)