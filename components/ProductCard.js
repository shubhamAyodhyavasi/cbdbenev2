import classNames from 'classnames'
import Button from './form-components/Button'
const ProductCard = ({versions, parentClass, image, title, subTitle}) => {
    const componentClass = `c-product-card`
    const versionClass = versions.map(el => (`${componentClass}--${el}`)).join(" ")
    const parent = `${parentClass}__${componentClass.replace("c-", "")}`
    const className = classNames(componentClass, {
        [versionClass]: versions,
        [parent]: parentClass,
    })
    return (
        <div className={className}>
            <div className={`${componentClass}__img-wrapper`}>
                <img className={`${componentClass}__img`} src={image} alt={title} />
            </div>
            <div className={`${componentClass}__info`}>
                <p className={`${componentClass}__title`}>
                    {title}
                </p>
                <p className={`${componentClass}__sub-title`}>
                    {subTitle}
                </p>
            </div>
            <div className={`${componentClass}__btn-wrapper`}>
                <Button parentClass={componentClass} theme="outline" >Add to Cart</Button>
            </div>
        </div>
    )

}
ProductCard.defaultProps = {
    versions: []
}
export default ProductCard