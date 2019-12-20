import Layout from "../components/Layouts/Layout"
import Heading from "../components/Heading"
import Button from '../components/form-components/Button'
import { Rate } from 'antd';
import { Form, Radio } from 'antd'

const Favourites = props => {
    return (
        <Layout headerVersions={["bg-light"]} headerTheme="dark">      
            <section className="c-submit-r__item">
                <div className="container">
                    <div className="row c-submit-r__row">
                        <div className="c-submit-r__item-row">
                            <div className="c-submit-r__img-wrap">
                                <img className="img-fluid" src="images/cbd-oil.png" />
                            </div>
                            <div className="c-submit-r__heading">
                                <h3 className="c-submit-r__heading__title" >CBD ISOLATE 500MG</h3>
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
          <section class="c-submit-r__rating">
                    <div class="c-submit-r__row row justify-content-center">
                        <div class="col-lg-6 text-center">
                        <div class="c-submit-r__rating__wrapper">
                            <div class="c-submit-r__rating--name">
                                <h3>I WOULD RECOMMEND<br/> THIS PRODUCT</h3>
                            </div>
                            <div class="c-submit-r__rating--star">
                                <div className="col-md-12">
                                    <Radio className="c-contact-form__radio" value="Yes">
                                        <b>Yes</b>                                            
                                    </Radio><Radio className="c-contact-form__radio" value="No">
                                        <b>No</b>                                            
                                    </Radio>                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
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
                                <h3>Overall <br/> rating</h3>
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
   
            



export default Favourites