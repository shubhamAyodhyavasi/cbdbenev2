import React, { Component } from 'react';
import Input from "../form-components/Input"
import Radio from "../form-components/Radio"
import  { Button } from 'antd';

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
                <div className="row justify-content-center">                
                    <div className="col-md-5">
                        <Input parentClass="c-address-form" label="Weight" value={values.weight} onChange={this.props.handleChange('weight')} />
                    
                        <Input parentClass="c-address-form" label="Age" value={values.age} onChange={this.props.handleChange('age')} />
                   
                        <Input parentClass="c-address-form" label="Notes for Doctor" value={values.notes} onChange={this.props.handleChange('notes')} />
                        <div class="c-personalDetails__btn-wrap">
                            <Button className="tab__btn" onClick={this.back} versions={["outline", "block"]}>Back</Button>
                            <Button className="tab__btn" onClick={this.saveAndContinue}>Next</Button>
                        </div>                      
                        
                    </div>
                </div>
            </div>
        </form>
        )
    }
}

