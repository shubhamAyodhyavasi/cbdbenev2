import classNames from 'classnames'
import Button from './form-components/Button'
import { connect } from 'react-redux'
import { addToCart } from '../redux/actions/cart'
import { directAddToCart } from '../services/helpers/product'
import Link from 'next/link'
import { showCartBar } from '../redux/actions/drawers'
const ProductCard = ({ versions, parentClass, image, title, subTitle, price, addToCart, product, showCartBar }) => {
    const componentClass = `c-product-card`
    const versionClass = versions.map(el => (`${componentClass}--${el}`)).join(" ")
    const parent = `${parentClass}__${componentClass.replace("c-", "")}`
    const className = classNames(componentClass, {
        [versionClass]: versions,
        [parent]: parentClass,
    })
    const addToCartFn = (product) => {
        if (product) {
            addToCart(directAddToCart(product))
            showCartBar()
        }
    }
    const CardUpper = () => (
        <>
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
        </>
    )
    return (
        <div onClick={() => console.log({
            product
        })} className={className}>
            {
                product && product._id ? 
                <Link href={`/shop/${product._id}`}>
                    <a className={`${componentClass}__overlay-link`}>
                        <CardUpper />
                    </a>
                </Link>
                : 
                <CardUpper />
            }
            <div className={`${componentClass}__btn-wrapper`}>
                <p className={`${componentClass}__price`}>
                    {price}
                </p>
                <Button onClick={() => addToCartFn(product)} parentClass={componentClass} theme="outline" >Add to Cart</Button>
            </div>
        </div>
    )

}
ProductCard.defaultProps = {
    versions: []
}
export default connect(null, { addToCart, showCartBar })(ProductCard)