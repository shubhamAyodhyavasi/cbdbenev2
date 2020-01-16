import React, { Component } from 'react';
import Input from "../form-components/Input"
import Radio from "../form-components/Radio"
import  { Button } from 'antd';

export default class PersonalDetails extends Component{

    saveAndContinue = (e) => {
        e.preventDefault()
        const { values } = this.props;
        this.props.nextStep()
    }

    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    render(){
        const { values: {
            weight,
            weight_err,
            age,
            age_err,
            notes,
            notes_err,
        } } = this.props;
        return(
            <form 
            // onSubmit={onSubmit} 
            className="c-personalDetails" >
            <div className="container-fluid">
                <div className="row justify-content-center">                
                    <div className="col-md-5">
                        <Input parentClass="c-address-form" label="Weight" value={weight} onChange={this.props.handleChange('weight')} />
                        {weight_err && <span className="error" >{weight_err}</span>}
                        <Input parentClass="c-address-form" label="Age" value={age} onChange={this.props.handleChange('age')} />
                        {age_err && <span className="error" >{age_err}</span>}
                        <Input parentClass="c-address-form" label="Notes for Doctor" value={notes} onChange={this.props.handleChange('notes')} />
                        {notes_err && <span className="error" >{notes_err}</span>}
                        <div class="c-personalDetails__btn-wrap">
                            {/* <Button className="tab__btn" onClick={this.back} versions={["outline", "block"]}>Back</Button> */}
                            <span />
                            <Button className="tab__btn" onClick={this.saveAndContinue}>Next</Button>
                        </div>                      
                        
                    </div>
                </div>
            </div>
        </form>
        )
    }
}

