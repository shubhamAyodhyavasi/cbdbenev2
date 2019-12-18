import { Form, Spin, Icon } from 'antd';
import Heading from "../Heading"
import Input from '../form-components/Input';
import Checkbox from '../form-components/Checkbox';
import { connect } from 'react-redux'
import Button from '../form-components/Button';
import { registerUser } from '../../services/api';
import { showHasLogin, toggleRegBar } from '../../redux/actions/drawers'
import { setUser } from '../../redux/actions/user'
import regex from '../../services/helpers/regex';
import reactComponentDebounce from 'react-component-debounce';

const DebounceInput = reactComponentDebounce({
    valuePropName: 'value',
    triggerMs: 1000,
  })(Input);

class RegistrationForm extends React.Component{
    constructor(){
        super()
        this.state = {
            isLoading: false,
            error: null,
            isAlreadyUser: false
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
            registerUser({
                email, password, password2: password,
                firstname: "null",
                lastname: "null",
                phonenumber: "null"
            })
            .then(res => {
                this.setState({
                    isLoading: false
                })
                console.log({res})
                if(res.status === 200){
                    if(res.data.status){
                        this.props.setUser(res.data.user)
                        this.props.toggleRegBar()
                    }else{
                        const {
                            error
                        } = res.data
                        if(error.endsWith("is already taken")){
                            this.setState({
                                isAlreadyUser: true
                            })
                        }else{
                            this.setState({
                                error: res.data.error
                            })
                        }
                    }
                }else{
                    this.setState({
                        error: "something wrong"
                    })
                }
            })
            .catch(err=> {
                console.log({err});
                this.setState({
                    isLoading: false,
                    error: "something wrong"
                })
            })
          }
        });
    }
    render(){
        const {
            showHasLogin, form: {
                getFieldDecorator
            }
        } = this.props
        const {
            isLoading, error, isAlreadyUser
        } = this.state
        return (
            <div className="c-registration">
                <Heading parentClass="c-registration" >{
                    isAlreadyUser ? <span>Looks like you already<br/>have an account</span> : "Welcome to bené"
                }</Heading>
                {!isAlreadyUser && <p className="c-registration__info">Fill in your details to create an account</p>}
    
                {!isAlreadyUser && <Form onSubmit={this.handleSubmit} className="c-ant-from c-registration__form" >
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
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [
                                { required: true, message: 'Please input your password!' },
                                {max:20, message:"You can't use more than 20 characters."}
                            ],
                        })(
                            <DebounceInput type="password" parentClass="c-registration" versions={["dark"]} label="Password" />
                        )}
                    </Form.Item>
                    
                    <div>
                        <Form.Item>
                        {getFieldDecorator('agree', {
                            valuePropName: 'checked',
                            initialValue: true,
                            rules: [
                                { 
                                    required: true, 
                                    message: 'Please agree the terms and conditions.',
                                    transform: value => (value || undefined), 
                                    type: 'boolean',
                                },
                            ],

                        })(<Checkbox versions={["gold"]} >I agree to  Terms and Conditions and Privacy Policy</Checkbox>)}
                        </Form.Item>
                        <p className="c-registration__inst">Already have an account? <span 
                            onClick={showHasLogin}
                            className="c-registration__link">SIGN IN</span></p>
                    </div>
                    <div className="c-registration__error-block">
                        {
                            isLoading && <Icon type="loading" className="c-registration__spinner c-spinner" style={{ fontSize: 24 }} spin />
                        }
                        {
                            error && <p className="c-registration__error">{error}</p>
                        }
                    </div>
                    <Button theme='outline-gold' disabled={isLoading} versions={["block"]} >Register</Button>
                </Form>}
                {isAlreadyUser && <div className="c-registration__no-form-wrapper">
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                        <p className="c-registration__inst">You can login from <span 
                            onClick={showHasLogin}
                            className="c-registration__link">HERE</span></p>
                </div>}
            </div>
        )
    }
}

const Registration = Form.create({name: 'registration'})(RegistrationForm)
const mapActionToProps = ({
    showHasLogin, setUser, toggleRegBar
})
export default connect(state => state, mapActionToProps)(Registration)