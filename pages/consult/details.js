import React, { Component } from 'react';
import UserDetails from '../../components/consult-tabs/UserDetails';
import PersonalDetails from '../../components/consult-tabs/PersonalDetails';
import Success from '../../components/consult-tabs/Success';
import Layout from '../../components/Layouts/Layout';
import Loader from '../../components/Loader';
import { connect } from 'react-redux'
import {  showRegBar, hideRegBar } from '../../redux/actions'

import Scheduling from "../../components/consult-tabs/Scheduling";
import IntakeDetails from "../../components/consult-tabs/intakeDetails"
import { Tabs } from 'antd';

const { TabPane } = Tabs;

function callback(key) {
	console.log(key);
}

class MainForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			step: props.user._id ? 2 : 1,
			firstName: '',
			lastName: '',
			email: '',
			dob: '',
			country: '',
			state: '',
			phoneNumber: '',
			zipCode: '',
			weight: '',
			age: '',
			notes: '',
			weight_err: '',
			age_err: '',
			notes_err: '',
			scheduling: 15
		}
	}

	componentDidMount(){
		console.clear()
		console.log({
			props: this.props
		})
		if(this.props.isPersist && !this.props.user._id){
			this.props.showRegBar();
		}
	}
	componentDidUpdate(prevProps){
		if(this.props.isPersist !== prevProps.isPersist){
			this.props.showRegBar();
		}
		if(this.props.user !== prevProps.user){
			this.setState({
				step: this.props.user._id ? 2 : 1
			})
		}
	}
	nextStep = (values = []) => {
		const { step } = this.state;
		const isValid = values.every(el => el && el.trim() !== "")
		if(isValid){
			this.setState({
				step: step + 1
			});
		}
	};

	prevStep = () => {
		const { step } = this.state;
		this.setState({
			step: step - 1
		});
	};
	detailNext = () => {
		const {
			weight,
			age,
			notes
		} = this.state
		const fields = this.validateDetails()
		const allValid = Object.values(fields).every(el => el === "");
		console.log({
			fields
		})
		this.setState({
			...fields
		})
		if(allValid){
			this.nextStep()
		}
	}
	validateDetails = () => {
		const {
			weight,
			age,
			notes
		} = this.state
		const weight_err = weight.trim() !== "" ? '' : 'Please enter weight';
		const age_err = age.trim() !== "" ? '' : 'Please enter age';
		const notes_err = notes.trim() !== "" ? '' : 'Please enter notes';
		return ({
			weight_err,
			age_err,
			notes_err,
		})
	}
	handleChange = (input) => (event) => {
		this.setState({
			[input]: event.target.value,
			[`${input}_err`]: '',
		});
	};
	radioChange = (ev, name) => {
		const {
			value
		} = ev.target
		console.log({
			value, name
		})
		this.setState({
			[name]: value,
		})
	}
	render() {
		const { step } = this.state;
		console.log({ step });
		const {
			isPersist
		} = this.props
		const { 
			firstName, 
			lastName, 
			phoneNumber, 
			zipCode, 
			state, 
			weight, 
			weight_err, 
			age, 
			age_err, 
			notes, 
			notes_err,
			scheduling,
		} = this.state;
		const values = { 
			firstName, 
			lastName, 
			phoneNumber, 
			zipCode, 
			state, 
			weight, 
			weight_err, 
			age, 
			age_err, 
			notes,
			notes_err,
			scheduling,
		};
		return (
			<Layout headerVersions={[ 'bg-light' ]} headerTheme="dark" fixed={true}>
				{
					!isPersist && <Loader />
				}
				<Tabs className="c-consultTabs" activeKey={step.toString()} defaultActiveKey={step} onChange={callback}>
					<TabPane tab="Login" key="1">
						<div className="c-privacy__page-title" >
							<UserDetails nextStep={this.nextStep} handleChange={this.handleChange} values={values} />
            			</div>
					</TabPane>
					<TabPane tab="Personal Details" key="2">
						<div className="c-privacy__page-title" />
						<PersonalDetails
							nextStep={this.detailNext}
							prevStep={this.prevStep}
							handleChange={this.handleChange}
							values={values}
						/>  
					</TabPane>
					<TabPane tab="Scheduling" key="3">
					<Scheduling
							nextStep={this.nextStep}
							prevStep={this.prevStep}
							handleChange={this.handleChange}
							radioChange={this.radioChange}
							values={values}
						/>  
					</TabPane>
					<TabPane tab="Intake Details" key="4">
          				<IntakeDetails
							nextStep={this.nextStep}
							prevStep={this.prevStep}
							handleChange={this.handleChange}
							values={values}
						/> 
					</TabPane>
					<TabPane tab="Confirmation" key="5">
						<Success nextStep={()=> {
							console.log({
								state: this.state
							})
						}} values={values}/>
					</TabPane>
				</Tabs>
			</Layout>
		);

		
	}
}
const mapStateToProps = state => ({
	user: state.user
})
const mapActionsToProps = {
	showRegBar, hideRegBar
}
export default connect(mapStateToProps, mapActionsToProps)(MainForm);
