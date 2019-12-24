import React, { Component } from 'react';
import { Button } from 'antd';

export default class Success extends Component{
    saveAndContinue = (e) => {
        e.preventDefault();
        //@shubham Do the api call here
    }

    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    render(){
        const {values: { firstName, lastName, phoneNumber, zipCode, state, weight, age, notes }} = this.props;

        return(
            <div class="c-confirmation">
                <div class="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                    <h1 className="c-confirmation__center">Confirm your Appointment</h1>
                    <p className="c-confirmation__center">Your Appointment with Dr. Eric Wood, scheduled for Sep 05, 10:15 AM is waiting for a confirmation.</p>
                    <p className="c-confirmation__center">Thank you for choosing Bené</p>
                    { firstName}
                    {lastName} 
                    {phoneNumber}
                    { zipCode}

                        <div class="c-personalDetails__btn-wrap">
                            <Button className="tab__btn" onClick={this.back}>Back</Button>
                            <Button className="tab__btn" onClick={this.saveAndContinue}>Confirm Appointment</Button>
                        </div>                     
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

