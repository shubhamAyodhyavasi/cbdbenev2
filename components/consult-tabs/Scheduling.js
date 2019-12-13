import React, { Component } from 'react';
import Input from "../form-components/Input"
import { Button } from 'antd';

export default class Scheduling extends Component{

    saveAndContinue = (e) => {
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
            className="c-scheduling" >
            <div className="container-fluid">
                <div className="row">
                
                    <p>The doctor time slot goes here</p>
                    
                    <Button onClick={this.saveAndContinue}>Next </Button>
                    <Button onClick={this.back}>Back </Button>

                </div>
            </div>
        </form>
        )
    }
}

