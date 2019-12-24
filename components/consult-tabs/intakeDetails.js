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
                <div className="row justify-content-center c-intakeDetails">
                <div className="col-md-5">
                    <h5 class="c-intakeDetails__center c-intakeDetails__margin "> Allergies , Medications & Dietary Supplements</h5>
                    <p class="c-intakeDetails__center">Please list the things you are allergic to here . For example: Pollen: Nasal congestion , Peanuts : Anaphylaxis, Strawberries: Hives, Etc.

Please list your medications here. If possible , please provide the dose , and when you take them . Example: Valium , 2 mg at night , 5 mg twice daily

Please list your dietary supplements here . If possible , Please provide the dose , and when you take them . Example : Vitamin D , 400 IU daily, Magnesium 300 mg twice daily
                       
                    </p>

                    <h5 class="c-intakeDetails__center c-intakeDetails__margin"> Current Condition and Medical History  </h5>
                    <p class="c-intakeDetails__center">Please list all the medical conditions, including surgeries and diagnoses, that you 
have experienced in the past or are currently experiencing.                            
                    </p>

                    <div class="c-personalDetails__btn-wrap">
                            <Button className="tab__btn" onClick={this.back} versions={["outline", "block"]}>Back</Button>
                            <Button className="tab__btn" onClick={this.next}>Next</Button>
                        </div>  
                    </div>
                </div>
            </div>
        </form>
        )
    }
}

