import Layout from "../../components/Layouts/Layout"
import Heading from "../../components/Heading"
import { Rate } from 'antd';
import {Form, Radio as AntRadio, Icon  } from 'antd'
import Input from '../../components/form-components/Input';
import Button from '../../components/form-components/Button';
import Checkbox from '../../components/form-components/Checkbox';
import apiList from '../../services/apis/apiList';
import projectSettings from '../../constants/projectSettings';
// import Dropdown from '../../components/form-components/Dropdown';
import {getProductTitle, getProductImage, getProductAttributes, getVisibleProducts, getProductDescription} from '../../services/helpers/product'

// import {Button} from 'antd';

const SubmitReviews = props => {
    return (
        <Layout headerVersions={["bg-light"]} headerTheme="dark">      
            <section className="c-submit-r__item">
                <div className="container">
                    <div className="row c-submit-r__row">
                        <div className="c-submit-r__item-row">
                            <div className="c-submit-r__img-wrap">
                                <img className="img-fluid" src={projectSettings.serverUrl+getProductImage(props.product)} />
                            </div>
                            <div className="c-submit-r__heading">
                                <h3 className="c-submit-r__heading__title" >{getProductTitle(props.product)}</h3>
                            </div>                            
                        </div>                 
                    </div>
                </div>
            </section>
            <section class="c-submit-r__about">
                <div class="container">
                    <div class="row">
                        <div className="mt-auto c-submit-r__about--center" >
                            <Heading>
                                LET'S GET STARTED! <br />WHAT DID YOU THINK ABOUT THIS PROJECT?
                            </Heading>
                        </div>
                    </div>
                </div>
            </section>
          <Rating></Rating>
          <RadioText />
         
          <WrappedNormalLoginForm />
        </Layout>
        )
    }


const Rating = props => {
    return (
        <section class="c-submit-r__rating">
            <div class="c-submit-r__row row justify-content-center">
                <div class="col-lg-6 text-center ">
                    <div class="c-submit-r__rating__wrapper">
                        <div class="c-submit-r__rating--name">
                            <h3 class="c-submit-r__rating--name__small">Overall <br/> rating</h3>
                        </div>
                        <div class="c-submit-r__rating--star">
                            <Rate />
                        </div>
                    </div>
                </div>
            </div>
        </section>            
    )
}

const RadioText = props => {
    return(
        <section class="c-submit-r__rating">
                <div class="c-submit-r__row row justify-content-center">
                    <div class="col-lg-6 text-center">
                    <div class="c-submit-r__rating__wrapper">
                        <div class="c-submit-r__rating--name">
                            <h3 class="c-submit-r__rating--name__small">I WOULD RECOMMEND<br/> THIS PRODUCT</h3>
                        </div>
                        <div class="c-submit-r__rating--star">
                            <div className="radio__wrapper">
                                <AntRadio className="c-contact-form__radio b-border-none" value="Yes">
                                    <b>Yes</b>                                            
                                </AntRadio>
                                <AntRadio className="c-contact-form__radio b-border-none" value="No">
                                    <b>No</b>                                            
                                </AntRadio>                                    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}



class NormalLoginForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        if (!err) {
            console.log('Received values of form: ', values);
        }
        });
    };
    
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
        
        <Form onSubmit={this.handleSubmit} className="login-form">  
            <div class="s-review__form container ">
                <div class="row justify-content-center">
                <div class="col-md-6 s-review__from-wrapper">             
                <Form.Item>
                    {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                    <Input
                        parentClass="c-contact-form"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Your Name"
                        versions={["light"]}
                        label="Your Name"
                    />,
                    )}
                </Form.Item>

                <Form.Item>
                    {getFieldDecorator('title', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                    <Input                            
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Review title"
                        versions={["light"]}
                        label="Review title"
                        parentClass="c-contact-form"
                    />,
                    )}
                </Form.Item>

                <Form.Item>
                    {getFieldDecorator('details', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                    <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Review details"
                        versions={["light"]}
                        label="Review details"
                        parentClass="c-contact-form"
                    />,
                    )}
                </Form.Item>
                </div>
            </div>
        </div>
        <div class="s-review__form container ">
            <div class="row justify-content-center">
            <div class="col-md-12">
                <h3 class="s-review__from-heading">Tell us more about yourself and connect</h3>
            </div>
                <div class="col-md-6 s-review__from-wrapper">
                <Form.Item>
                    {getFieldDecorator('details', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                    <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Review details"
                        versions={["light"]}
                        label="Where are you from?"
                        parentClass="c-contact-form"
                    />,
                    )}
                </Form.Item>

                <Form.Item>
                    {getFieldDecorator('details', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                    <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Review details"
                        versions={["light"]}
                        label="Review details"
                        parentClass="c-contact-form"
                    />,
                    )}
                </Form.Item>

                <Form.Item>
                    {getFieldDecorator('details', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                    <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Review details"
                        versions={["light"]}
                        label="Review details"
                        parentClass="c-contact-form"
                    />,
                    )}
                </Form.Item>
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

                    })(<Checkbox versions={["gold"]} >I agree to recieve e-mail notifiacation about my review</Checkbox>)}
                            <Button theme='outline' type="submit"  versions={["block"]} >Submit</Button>
                    </Form.Item>                    
                </div>
            </div>
        </div>
    </Form>
                
        );
    }
    }
    
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);      
    
SubmitReviews.getInitialProps = async ({query})=> {
    const res           = await fetch(apiList.getProductById+query.pid)
    const productObj    = await res.json()
    const product       = getVisibleProducts([productObj.product_details])
    return {
        product: product.length && product[0],
        query
    }
}
            

export default SubmitReviews