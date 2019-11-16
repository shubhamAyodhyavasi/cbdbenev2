import Heading from "./Heading"
import classNames from 'classnames'
const CategoryProducts = ({heading, categoryList, activeCategory, onCategoryChange, products, bg}) => {
    const className = classNames("c-category-products", {
        [`c-category-products--${bg}`]: bg
    })
    return (
        <div className={className}>
            <div className="c-category-products__heading-wrapper">
                <Heading parentClass="c-category-products" versions={["default", "upper"]} >{heading}</Heading>
            </div>
            <div className="c-category-products__list">
                {
                    categoryList.map((el, i)=> <span 
                        onClick={()=> {
                            onCategoryChange(el)
                        }} 
                        className={classNames("c-category-products__list-item",{
                        "c-category-products__list-item--active": activeCategory === el.title
                    })} key={i}>{el.title}</span>)
                }
            </div>
            <div className="row c-category-products__product-list">
                {
                    products.map((el, i)=> <div key={i} className="col-lg-4 c-category-products__product">
                    <img src={el.img} alt={el.title} className="c-category-products__img img-fluid"/>
                </div>)
                }
            </div>
        </div>
    )
}

CategoryProducts.defaultProps = {
    categoryList: [],
    products: [],
    activeCategory: "",
    onCategoryChange: ()=> {}
}

export default CategoryProducts