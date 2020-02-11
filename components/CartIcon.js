import { connect } from 'react-redux'
import ReactSVG from 'react-svg'
import _ from 'lodash'

const CartIcon = ({items, ...props}) => {
    const itemCount = _.flatten([...items.map(el => Array(el.qty || 0).fill(0))]).length || 0
    if(itemCount > 0){
        return <span className="c-cart-icon">
            <span className="c-cart-icon__count">
                {itemCount}
            </span>
            <ReactSVG src="/images/cart-icon-active.svg" />
        </span>
    }else{
        return <ReactSVG src="/images/cart-icon-1.svg" />
    }
}

CartIcon.defaultProps = {
    items: []
}
const MapStateToProps = state => ({
    items: state.cart.items
})

export default connect(MapStateToProps)(CartIcon)