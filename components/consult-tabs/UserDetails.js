import React, { Component } from 'react';
import { Button } from 'antd';
import Input from "../form-components/Input"

export default class UserDetails extends Component{

    next = (e) => {
        e.preventDefault()
        this.props.nextStep()
    }


    render(){

        const { values } = this.props;
        
        return(
            
            <form 
            className="c-address-form" >
            <div className="container-fluid">
                <div className="row c-userDetails">
                    <div className="col-md-12">
                        <Input parentClass="c-address-form" label="First Name" value={values.firstName} onChange={this.props.handleChange('firstName')} />
                    </div>
                    <div className="col-md-12">
                        <Input parentClass="c-address-form" label="Last Name" value={values.lastName} onChange={this.props.handleChange('lastName')}/>
                    </div>
                    <div className="col-md-12">
                        <Input parentClass="c-address-form" label="Phone Number" value={values.phoneNumber} onChange={this.props.handleChange('phoneNumber')}/>
                    </div>
                    <div className="col-md-12">
                        <Input parentClass="c-address-form" label="state" value={values.state} onChange={this.props.handleChange('state')} />
                    </div>
                    <div className="col-md-12">
                        <Input parentClass="c-address-form" label="ZIP code" value={values.zipCode} onChange={this.props.handleChange('zipCode')} />
                    </div>
                    <Button onClick={this.next}>Next </Button>
                </div>
            </div>
        </form>
        )
    }
}

