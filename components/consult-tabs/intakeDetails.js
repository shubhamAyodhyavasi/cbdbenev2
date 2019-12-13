import React, { Component } from 'react';
import { Button } from 'antd';
import Input from "../form-components/Input"

export default class IntakeDetails extends Component{

    next = (e) => {
        e.preventDefault()
        this.props.nextStep()
    }

    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    render(){

        const { values } = this.props;
        
        return(
            
            <form 
            className="c-address-form" >
            <div className="container-fluid">
                <div className="row c-intakeDetails">
                    <p>Intake details go here</p>
                    <Button onClick={this.next}>Next </Button>
                    <Button onClick={this.back}>Back </Button>
                </div>
            </div>
        </form>
        )
    }
}

