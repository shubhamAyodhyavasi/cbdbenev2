import classNames from 'classnames'
import Tabs from "./Tabs"
import TitleList from './TItleList'
import Heading from './Heading'
const ProductDetailsTab = ({product, versions, parentClass}) => {
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
            title: "REviews",
            content: ""
        },
        {
            title: "FAQ's",
            content: ""
        },
        {
            title: "Quality sheet",
            content: ""
        },
    ]
    return (
        <div className={className}>
            <Tabs tabs={tabs} parentClass={componentClass} />
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