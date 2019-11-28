import {Form, Radio } from 'antd'
class ContactFrom extends React.Component {
    render (){
        const {
            Item
        } = Form
        return (
            <div className="c-contact-form">
                <Form>
                    <div className="row">
                        <div className="col-md-6">
                            <Item>
                                <Radio.Group>
                                    <Radio value="Order Enquiry">

                                    </Radio>
                                    <Radio value="Product Enquiry">

                                    </Radio>
                                    <Radio value="Wholesale Enquiry">

                                    </Radio>
                                    <Radio value="Press and Marketing Enquiry">

                                    </Radio>
                                    <Radio value="General Feedback or Questions">

                                    </Radio>
                                </Radio.Group>
                            </Item>
                        </div>
                        <div className="col-md-6">

                        </div>
                    </div>
                </Form>
            </div>            
        )
    }
}
const Contact = Form.create({name: "contact"})(ContactFrom)

export default Contact