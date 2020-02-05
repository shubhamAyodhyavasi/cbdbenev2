import { Form, Spin, Icon } from 'antd';
import Heading from "../Heading"
import Input from '../form-components/Input';
import Checkbox from '../form-components/Checkbox';
import { connect } from 'react-redux'
import Button from '../form-components/Button';
import { forgotPassword } from '../../services/api';
import { drawerToDisplay, toggleRegBar } from '../../redux/actions/drawers'
import { setUser } from '../../redux/actions/user'
import regex from '../../services/helpers/regex';
import {sendEmailMsg} from '../../constants/constantMessage'
import reactComponentDebounce from 'react-component-debounce';

const DebounceInput = reactComponentDebounce({
    valuePropName: 'value',
    triggerMs: 1000,
  })(Input);

class ForgetForm extends React.Component{
    constructor(){
        super()
        this.state = {
            isLoading: false,
            error: null,
            isAlreadyUser: false,
            mailSent: false,
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            const {
                email, password
            } = values
            this.setState({
                isLoading: true,
                error: null
            })
            forgotPassword({
                email
            })
            .then(res => {
                this.setState({
                    isLoading: false
                })
                if(res.status === 200){
                    if(res.data.status || res.data.success){
                        this.setState({
                            mailSent: true
                        })
                    }else{
                        this.setState({
                            error: res.data.message || "User not found"
                        })
                    }
                }else{
                    this.setState({
                        error: "User not found"
                    })
                }
            })
            .catch(err=> {
                console.log({err});
                this.setState({
                    isLoading: false,
                    error: "User not found"
                })
            })
          }
        });
    }
    render(){
        const {
            drawerToDisplay, form: {
                getFieldDecorator
            }
        } = this.props
        const {
            isLoading, error, isAlreadyUser, mailSent
        } = this.state

        return (
            <div className="c-registration">
                <Heading parentClass="c-registration" >{
                    mailSent ? sendEmailMsg : "Forgot Your Password?"
                }</Heading>
                {!mailSent && <Heading subHeading={true} versions={["gold"]} parentClass="c-registration" >
                    Enter your email to reset your password
                </Heading>}
                {!mailSent && <Form onSubmit={this.handleSubmit} className="c-ant-from c-registration__form" >
                    <Form.Item>
                        {getFieldDecorator('email', {
                            rules: [
                                {max:40, message:"You can't use more than 40 characters."},
                                { required: true, message: 'Please input your e-mail!' },
                                
                                { 
                                    pattern: regex.email, 
                                    message: 'Please enter a valid E-mail.' 
                                },
                            ],
                        })(
                            <DebounceInput versions={["dark"]} parentClass="c-registration" label="E-mail" />
                        )}
                    </Form.Item>
                    <div>
                        <p className="c-registration__inst">Back to <span 
                            onClick={()=> {
                                drawerToDisplay("login")
                            }}
                            className="c-registration__link">Login</span></p>
                    </div>
                    <div className="c-registration__error-block">
                        {
                            isLoading && <Icon type="loading" className="c-registration__spinner c-spinner" style={{ fontSize: 24 }} spin />
                        }
                        {
                            error && <p className="c-registration__error">{error}</p>
                        }
                    </div>
                    <Button theme='outline-gold' disabled={isLoading} versions={["block"]} >Reset Password</Button>
                </Form>}
                {/* {<div className="c-registration__no-form-wrapper">
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                        <p className="c-registration__inst">Back to <span 
                            onClick={()=> {
                                drawerToDisplay("login")
                            }}
                            className="c-registration__link">Login</span></p>
                </div>} */}
            </div>
        )
    }
}

const ForgetPassword = Form.create({name: 'registration'})(ForgetForm)
const mapActionToProps = ({
    drawerToDisplay, setUser, toggleRegBar
})
export default connect(state => state, mapActionToProps)(ForgetPassword)