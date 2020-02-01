import { useState } from 'react'
import classNames from 'classnames'
import Tabs from "./Tabs"
import TitleList from './TItleList'
import Heading from './Heading'
import { Rate } from 'antd';
import Router from 'next/router'
import projectSettings from '../constants/projectSettings'
import FadeTransition from "../services/extra/FadeTransition";
import Fade from 'react-reveal/Fade';
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
const ProductDetailsTab = ({product, versions, parentClass, reviews}) => {
    const componentClass = `c-product-details-tab`
    const versionClass = versions.map(el => (`${componentClass}--${el}`)).join(" ")
    const parent = `${parentClass}__${componentClass.replace("c-", "")}`
    const [currentTab, setCurrentTab] = useState("0")
    const className = classNames(componentClass,"text-left", {
        [versionClass]: versions,
        [parent]: parentClass,
    })
    const {
        totalcbdmg, cbdperunitmg, servings, servingsize,
        direction, warning, storage, indication, warranty, use
    } = product
    const getAvg = reviews => {
        if(reviews){
            const newArr = reviews.map(el => el.overall);
            const sum = newArr.reduce((a, b) => a + b, 0);
            return (sum / reviews.length).toFixed(1);
        }
        return 0
    };
    const avgReview     = isNaN(getAvg(reviews)) ? 0 : getAvg(reviews)
    const totalReview   = reviews && reviews.length || 0
    const productFaq    = product.faqcontent && product.faqcontent.filter(faq => faq.title !== "" && faq.description !== "")
    const tabs = [
        {
            title: "Details",
            content: "",
            // content: <TabContainer>
            //     <div className="col-lg-4 col-md-6 c-product-details-tab__contain-col">
            //         <TitleList parentClass="c-product-details-tab" title="Total Cbd" >
            //             {`${totalcbdmg} mg`}
            //         </TitleList>
            //         <TitleList parentClass="c-product-details-tab" title={"Cbd per unit"} >
            //             {cbdperunitmg}
            //         </TitleList>
            //     </div>
            //     <div className="col-lg-4 col-md-6 c-product-details-tab__contain-col">
            //         <TitleList parentClass="c-product-details-tab" title="Total Servings" >
            //             {servings}
            //         </TitleList>
            //         <TitleList parentClass="c-product-details-tab" title="Servings Size" >
            //             {servingsize}
            //         </TitleList>
            //     </div>
            // </TabContainer>
        },
        {
            title: "How to use",
            content: "",
            // content: <TabContainer>
            //     <div className="col-12 c-product-details-tab__contain-col text-center">
            //         <Heading parentClass={componentClass} h="4" subHeading={true} >Suggested Use</Heading>
            //         <p className={`${componentClass}__text`} >{direction}</p>
            //     </div>
            // </TabContainer>
        },
        {
            title: "Reviews",
            content: "",
        //     content: <TabContainer>
        //     <div className="col-12 c-product-details-tab__contain-col text-center">
        //         {/* <Heading parentClass={componentClass} h="4" subHeading={true} >Suggested Use</Heading>
        //         <p className={`${componentClass}__text`} >{direction}</p> */}
        //         <div className="row">
        //             <div className="col-lg-8 col-md-9">
        //                 {reviews && reviews.map((el, key)=> <TitleList key={key} title={el.title} >
        //                     {el.content}
        //                 </TitleList>)}
        //             </div>
        //             <div className="col-lg-4 col-md-3">
        //                 <Rate 
        //                     style={{ color: '#000' }}
        //                     className="c-product-details-tab__stars" 
        //                     disabled value={avgReview} 
        //                     allowHalf={true} />
        //                 <p className="c-product-details-tab__review-para">({totalReview} reviews)</p>
        //                 <h1 className="c-product-details-tab__review-heading">{avgReview}</h1>
        //             </div>
        //         </div>
        //     </div>
        // </TabContainer>
        },
        {
            title: "FAQ's",
            content: "",
        //     content: <TabContainer>
        //     <div className="col-12 c-product-details-tab__contain-col text-center">
        //         <div className="row">
        //             <div className="col-lg-8 col-md-9">
        //                 {product.faqcontent && product.faqcontent.map((el, key)=> <TitleList key={key} title={el.title} >
        //                     {el.description}
        //                 </TitleList>)}
        //             </div>
        //         </div>
        //     </div>
        // </TabContainer>
        },
    ]
    const allTabs = product.labsheet ? [
        ...tabs,
        {
            title: "Quality sheet",
            content: ""
        },
    ] : tabs
    return (
        <div className={className}>
            <Tabs tabs={allTabs} activeKey={currentTab} 
                onNextClick={(e)=> {
                    setCurrentTab(`${parseInt(currentTab)+1}`);
                }}
                onPrevClick={(e)=> {
                    setCurrentTab(`${parseInt(currentTab)-1}`);
                }}
                onChange={(e, a)=> {
                    setCurrentTab(e);
                    if(e === "4"){
                        if(typeof window !== "undefined"){
                            window.location.href = `${projectSettings.labSheetPath}${product.labsheet}`
                        }
                    }
                }
            } parentClass={componentClass} />
            <TabContent activeTab={currentTab} >
                <TabPane tabId="0">
                    <TabContainer isActive={currentTab === "0"} >
                        <div className="col-lg-2 col-md-6 c-product-details-tab__contain-col">
                            <TitleList parentClass="c-product-details-tab" title="Total Cbd" >
                                {`${totalcbdmg} mg`}
                            </TitleList>
                            <TitleList parentClass="c-product-details-tab" title={"Cbd per unit"} >
                                {cbdperunitmg}
                            </TitleList>
                        </div>
                        <div className="col-lg-2 offset-lg-1 col-md-6 c-product-details-tab__contain-col">
                            <TitleList parentClass="c-product-details-tab" title="Total Servings" >
                                {servings}
                            </TitleList>
                            <TitleList parentClass="c-product-details-tab" title="Servings Size" >
                                {servingsize}
                            </TitleList>
                        </div>
                    </TabContainer>
                </TabPane>
                <TabPane tabId="1">
                    <TabContainer isActive={currentTab === "1"} >
                        <div className="col-12 c-product-details-tab__contain-col">
                            {/* <Heading parentClass={componentClass} h="4" subHeading={true} >Suggested Use</Heading>
                            <p className={`${componentClass}__text`} >{direction}</p> */}
                            {use && <TitleList parentClass="c-product-details-tab" title={"Suggested Use"} >
                                {use}
                            </TitleList>}
                            {direction && <TitleList parentClass="c-product-details-tab" title={"Direction"} >
                                {direction}
                            </TitleList>}
                            {storage && <TitleList parentClass="c-product-details-tab" title={"Storage"} >
                                {storage}
                            </TitleList>}
                            {warning && <TitleList parentClass="c-product-details-tab" title={"Warning"} >
                                {warning}
                            </TitleList>}
                            {indication && <TitleList parentClass="c-product-details-tab" title={"Indication"} >
                                {indication}
                            </TitleList>}
                            {warranty && <TitleList parentClass="c-product-details-tab" title={"Warranty"} >
                                {warranty}
                            </TitleList>}
                        </div>
                    </TabContainer>
                </TabPane>
                <TabPane tabId="2">
                    <TabContainer isActive={currentTab === "2"} >
                        <div className="col-12 c-product-details-tab__contain-col">
                            {/* <Heading parentClass={componentClass} h="4" subHeading={true} >Suggested Use</Heading>
                            <p className={`${componentClass}__text`} >{direction}</p> */}
                            {totalReview > 0 ? <div className="row">
                                <div className="col-lg-8 col-md-9">
                                    {reviews && reviews.map((el, key)=> <TitleList key={key} title={el.title} >
                                        {el.content}
                                    </TitleList>)}
                                </div>
                                <div className="col-lg-4 col-md-3 text-right">
                                    <Rate 
                                        style={{ color: '#000' }}
                                        className="c-product-details-tab__stars" 
                                        disabled value={avgReview} 
                                        allowHalf={true} />
                                    <p className="c-product-details-tab__review-para">{totalReview} reviews</p>
                                    <h1 className="c-product-details-tab__review-heading">{avgReview}</h1>
                                </div>
                            </div> 
                            :
                            <div className="row pt-5">
                                <div className="col-md-10 offset-md-1 text-center">
                                    <Heading parentClass={componentClass} h="4" subHeading={true} >We don't have any reviews for this product.</Heading>
                                </div>
                            </div>
                            }
                        </div>
                    </TabContainer>
                </TabPane>
                <TabPane tabId="3">
                    <TabContainer isActive={currentTab === "3"} >
                        <div className="col-12 c-product-details-tab__contain-col text-center">
                            <div className="row ">
                                {
                                    (productFaq && productFaq.length > 0) ? <div className="col-12 col-md-10 text-left pt-5">
                                        {productFaq.map((el, key)=> <TitleList key={key} versions={["faq"]} title={el.title} >
                                            {el.description}
                                        </TitleList>)}
                                    </div>
                                    : 
                                    <div className="col-md-10 offset-md-1 text-center">
                                        <Heading parentClass={componentClass} h="4" subHeading={true} >We don't have any faq's for this product.</Heading>
                                    </div>
                                }
                            </div>
                        </div>
                    </TabContainer>
                </TabPane>
            </TabContent>
        </div>
    )
}

const TabContainer = ({children, isActive}) => {
    return <div className={classNames("c-product-details-tab__contain animated",{
        "fadeIn": isActive
    })}>
        <div className="row c-product-details-tab__contain-row">
            {children}
        </div>
    </div>
}

ProductDetailsTab.defaultProps = {
    versions: [],
    product: {}
}

export default ProductDetailsTab