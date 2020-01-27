import React from "react";
import { Form, Icon, Input, Button } from 'antd';


export default class FormStep1 extends React.Component {
    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          const {
            onSubmit
          } = this.props
          if(typeof onSubmit === "function"){
            onSubmit(values)
          }
        }
      });
    };
  
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item label="Reason" >
            {getFieldDecorator('reason', {
              rules: [{ required: true, message: 'Please tell us a reason.' },
              // { min: 5, message: 'Reason must be minimum 5 characters.' }
            ],
            })(
              <Input
                placeholder="Whats the reason for your appointment?"
              />,
            )}
          </Form.Item>
          <Form.Item label="Duration" >
            {getFieldDecorator('duration', {
              rules: [{ max: 20, message: 'Duration must be minimum 20 characters.' }],
            })(
              <Input
                placeholder="When did your problem start?"
              />,
            )}
          </Form.Item>
          <Form.Item label="Notes" >
            {getFieldDecorator('notes', {
              rules: [{ min: 20, message: 'Notes must be minimum 20 characters.' }],
            })(
              <Input.TextArea
                placeholder="Is there any other information you would like to share with the doctor?"
              />,
            )}
          </Form.Item>
          {/* <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item> */}
        </Form>
      );
    }
  }
  