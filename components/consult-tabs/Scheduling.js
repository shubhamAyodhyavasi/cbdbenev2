import React, { Component } from 'react';
import Input from "../form-components/Input"
import { Button, Radio as AntRadio } from 'antd';

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
                <div className="row justify-content-center">                
                    <div className="col-md-5">
                
                    <p class="c-scheduling__para">How Long do you expect this consultation to go on for?</p>
                    <div className="radio__wrapper">
                                    <AntRadio className="c-contact-form__radio b-border-none " value="15 min">
                                        <b>15 min</b>                                            
                                    </AntRadio>
                                    <AntRadio className="c-contact-form__radio b-border-none" value="30 min">
                                        <b>30 min</b>                                            
                                    </AntRadio>                                    
                                </div>

                    
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

