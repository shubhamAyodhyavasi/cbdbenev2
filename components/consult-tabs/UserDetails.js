import React, { Component } from 'react';
import { Button } from 'antd';
import Input from "../form-components/Input"
import Login from '../../components/popups/Login';
export default class UserDetails extends Component{

    next = (e) => {
        e.preventDefault()
        this.props.nextStep()
    }


    render(){

        const { values } = this.props;
        
        return(
            
            <div>
            <Login consult={true}/>
            <form 
            className="c-address-form" >
            <div className="container-fluid">
                <div className="row c-userDetails">
                
                    {/* <Button className="tab__btn" onClick={this.next}>Next </Button> */}
                </div>
            </div>
        </form>
            </div>
        )
    }
}

