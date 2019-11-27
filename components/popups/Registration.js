import { Form } from 'antd';
import Heading from "../Heading"
import Input from '../form-components/Input';
import Checkbox from '../form-components/Checkbox';
import { connect } from 'react-redux'
import Button from '../form-components/Button';
import { registerUser } from '../../services/apis/user';

class RegistrationForm extends React.Component{
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            const {
                email, password
            } = values
            registerUser({
                email, password, password2: password,
                firstname: "",
                lastname: "",
                phonenumber: ""
            })
            .then(res => {
                console.log({res})
            })
            .catch(console.log)
          }
        });
    }
    render(){
        const {
            getFieldDecorator 
        } = this.props.form
        return (
            <div className="c-registration">
                <Heading parentClass="c-registration" >Welcome to bene</Heading>
                <p className="c-registration__info">Fill in your details to create an account</p>
    
                <Form onSubmit={this.handleSubmit} className="c-ant-from c-registration__form" >
                    <Form.Item>
                        {getFieldDecorator('email', {
                            rules: [
                                { required: true, message: 'Please input your e-mail!' }
                            ],
                        })(
                            <Input versions={["dark"]} parentClass="c-registration" label="E-mail" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [
                                { required: true, message: 'Please input your password!' }
                            ],
                        })(
                            <Input type="password" parentClass="c-registration" versions={["dark"]} label="Password" />
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
                    </div>
                    <Button theme='outline-gold' versions={["block"]} >Register</Button>
                </Form>
            </div>
        )
    }
}

const Registration = Form.create({name: 'registration'})(RegistrationForm)

export default connect(state => state)(Registration)