import classNames from 'classnames'
import Tabs from "./Tabs"
import TitleList from './TItleList'
import Heading from './Heading'
import { Rate } from 'antd';
import Router from 'next/router'
import projectSettings from '../constants/projectSettings'
const ProductDetailsTab = ({product, versions, parentClass, reviews}) => {
    const componentClass = `c-product-details-tab`
    const versionClass = versions.map(el => (`${componentClass}--${el}`)).join(" ")
    const parent = `${parentClass}__${componentClass.replace("c-", "")}`
    const className = classNames(componentClass, {
        [versionClass]: versions,
        [parent]: parentClass,
    })
    const {
        totalcbdmg, cbdperunitmg, servings, servingsize,
        direction
    } = product
    const getAvg = reviews => {
        if(reviews){
            const newArr = reviews.map(el => el.overall);
            const sum = newArr.reduce((a, b) => a + b, 0);
            return (sum / reviews.length).toFixed(1);
        }
        return 0
    };
    const avgReview     = getAvg(reviews)
    const totalReview   = reviews && reviews.length || 0
    const tabs = [
        {
            title: "Details",
            content: <TabContainer>
                <div className="col-lg-4 col-md-6 c-product-details-tab__contain-col">
                    <TitleList title="Total Cbd" >
                        {`${totalcbdmg} mg`}
                    </TitleList>
                    <TitleList title={"Cbd per unit"} >
                        {cbdperunitmg}
                    </TitleList>
                </div>
                <div className="col-lg-4 col-md-6 c-product-details-tab__contain-col">
                    <TitleList title="Total Servings" >
                        {servings}
                    </TitleList>
                    <TitleList title="Servings Size" >
                        {servingsize}
                    </TitleList>
                </div>
            </TabContainer>
        },
        {
            title: "How to use",
            content: <TabContainer>
                <div className="col-12 c-product-details-tab__contain-col text-center">
                    <Heading parentClass={componentClass} h="4" subHeading={true} >Suggested Use</Heading>
                    <p className={`${componentClass}__text`} >{direction}</p>
                </div>
            </TabContainer>
        },
        {
            title: "Reviews",
            content: <TabContainer>
            <div className="col-12 c-product-details-tab__contain-col text-center">
                {/* <Heading parentClass={componentClass} h="4" subHeading={true} >Suggested Use</Heading>
                <p className={`${componentClass}__text`} >{direction}</p> */}
                <div className="row">
                    <div className="col-lg-8 col-md-9">
                        {reviews && reviews.map((el, key)=> <TitleList key={key} title={el.title} >
                            {el.content}
                        </TitleList>)}
                    </div>
                    <div className="col-lg-4 col-md-3">
                        <Rate 
                            style={{ color: '#000' }}
                            className="c-product-details-tab__stars" 
                            disabled value={avgReview} 
                            allowHalf={true} />
                        <p className="c-product-details-tab__review-para">({totalReview} reviews)</p>
                        <h1 className="c-product-details-tab__review-heading">{avgReview}</h1>
                    </div>
                </div>
            </div>
        </TabContainer>
        },
        {
            title: "FAQ's",
            content: <TabContainer>
            <div className="col-12 c-product-details-tab__contain-col text-center">
                <div className="row">
                    <div className="col-lg-8 col-md-9">
                        {product.faqcontent.map((el, key)=> <TitleList key={key} title={el.title} >
                            {el.description}
                        </TitleList>)}
                    </div>
                </div>
            </div>
        </TabContainer>
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
            <Tabs tabs={allTabs} onChange={(e, a)=> {
                if(e === "4"){
                    if(typeof window !== "undefined"){
                        window.location.href = `${projectSettings.labSheetPath}${product.labsheet}`
                    }
                }
            }} parentClass={componentClass} />
        </div>
    )
}

const TabContainer = ({children}) => {
    return <div className="c-product-details-tab__contain">
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