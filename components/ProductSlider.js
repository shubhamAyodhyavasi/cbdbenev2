import classNames from 'classnames'
import ProductCard from './ProductCard'
const ProductSlider = ({products, parentClass, versions}) => {
    const componentClass = `c-product-slider`
    const versionClass = versions.map(el => (`${componentClass}--${el}`)).join(" ")
    const parent = `${parentClass}__${componentClass.replace("c-", "")}`
    const className = classNames(componentClass, {
        [versionClass]: versions,
        [parent]: parentClass,
    })
    return (
        <div className={className}>
            <div className={`${componentClass}__row row`}>
                {
                    products.map((el, i)=> (
                        <div key={i} className="col-md-4">
                            <ProductCard  
                                subTitle={el.subTitle}
                                image={el.image}
                                title={el.title}
                                parentClass={componentClass} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

ProductSlider.defaultProps = {
    products: [],
    versions: []
}
export default ProductSlider