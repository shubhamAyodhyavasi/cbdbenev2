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
            <div>
                <h1 className="">Confirm your Appointment</h1>
                <p>Click Confirm if the following details have been correctly entered</p>
                { firstName}
                 {lastName} 
                 {phoneNumber}
                 { zipCode}

                <Button onClick={this.back}>Back</Button>
                <Button onClick={this.saveAndContinue}>Confirm Appointment</Button>
            </div>
        )
    }
}

