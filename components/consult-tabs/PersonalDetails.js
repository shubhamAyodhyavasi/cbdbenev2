import React, { Component } from 'react';
import Input from "../form-components/Input"
import Radio from "../form-components/Radio"
import  { Button, Radio as AntRadio } from 'antd';

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
            name,
            name_err,
            gender,
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
                <div className="consult-form">
                    <Input parentClass="c-address-form" label="Name" value={name} onChange={this.props.handleChange('name')} />
                    {name_err && <span className="error" style={{marginTop: "-1em", display: "block", marginBottom: "1em"}} >{name_err}</span>}
                    <div className="radio__wrapper">
                        <AntRadio.Group onChange={(e)=> {
                            this.props.radioChange(e, "gender")
                        }} value={gender}>
                            <AntRadio className="c-contact-form__radio b-border-none" value={"male"}>
                                <b>Male</b>
                            </AntRadio>
                            <AntRadio className="c-contact-form__radio b-border-none" value={"female"}>
                                <b>Female</b>
                            </AntRadio>
                        </AntRadio.Group>
                        {/* <AntRadio className="c-contact-form__radio b-border-none " value="15">
                            <b>15 min</b>                                            
                        </AntRadio>
                        <AntRadio className="c-contact-form__radio b-border-none" value="30">
                            <b>30 min</b>                                            
                        </AntRadio>                                     */}
                    </div>
                    <div className="c-address-form__radio-wrapper">
                        {/* <Radio.Group
                            value={gender}
                            // className="bordered"
                            onChange={(e) => {
                                const {
                                    value
                                } = e.target
                                this.props.radioChange(e,"gender")
                            }}
                        > */}
                            {/* <Radio name="gender" onChange={(e) => {
                                const {
                                    value
                                } = e.target
                                this.props.radioChange(e,"gender")
                            }} value={"male"}>Male</Radio>
                            <Radio name="gender" onChange={(e) => {
                                const {
                                    value
                                } = e.target
                                this.props.radioChange(e,"gender")
                            }} value={"female"}>Female</Radio> */}
                        {/* </Radio.Group> */}
                    </div>
                    <Input type="number" max="999" min="20" parentClass="c-address-form" label="Weight" value={weight} onChange={this.props.handleChange('weight')} />
                    {weight_err && <span className="error" style={{marginTop: "-1em", display: "block", marginBottom: "1em"}} >{weight_err}</span>}
                    <Input type="number" max="150" min="18" parentClass="c-address-form" label="Age" value={age} onChange={this.props.handleChange('age')} />
                    {age_err && <span className="error" style={{marginTop: "-1em", display: "block", marginBottom: "1em"}} >{age_err}</span>}
                    <Input parentClass="c-address-form" label="Notes for Doctor" value={notes} onChange={this.props.handleChange('notes')} />
                    {notes_err && <span className="error" style={{marginTop: "-1em", display: "block", marginBottom: "1em"}} >{notes_err}</span>}
                    <div className="c-personalDetails__btn-wrap">
                        {/* <Button className="tab__btn" onClick={this.back} versions={["outline", "block"]}>Back</Button> */}
                        <span />
                        <Button className="tab__btn" onClick={this.saveAndContinue}>Next</Button>
                    </div>                      
                    
                </div>
            </div>
        </form>
        )
    }
}

