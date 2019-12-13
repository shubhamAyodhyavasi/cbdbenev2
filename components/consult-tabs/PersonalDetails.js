import React, { Component } from 'react';
import Input from "../form-components/Input"
import { Button } from 'antd';

export default class PersonalDetails extends Component{

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
            // onSubmit={onSubmit} 
            className="c-personalDetails" >
            <div className="container-fluid">
                <div className="row">
                
                    <div className="col-md-4">
                        <Input parentClass="c-address-form" label="Weight" value={values.weight} onChange={this.props.handleChange('weight')} />
                    </div>
                    <div className="col-md-4">
                        <Input parentClass="c-address-form" label="Age" value={values.age} onChange={this.props.handleChange('age')} />
                    </div>
                    <div className="col-md-4">
                        <Input parentClass="c-address-form" label="Notes for Doctor" value={values.notes} onChange={this.props.handleChange('notes')} />
                    </div>
                    <Button onClick={this.saveAndContinue}>Next </Button>
                    <Button onClick={this.back}>Back </Button>

                </div>
            </div>
        </form>
        )
    }
}

