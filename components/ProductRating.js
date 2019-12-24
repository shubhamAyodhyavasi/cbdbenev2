import Heading from './Heading';
import { Rate } from 'antd';

const ProductRating = () =>{
    return (
        <div className="pr-rating">
            <div className="row">
                <div className="col-md-9">
                   <div className="pr-rating__left-sec">
                       <div className="pr-rating__wrapper pr-rating__wrapper--left">
                            <div className="pr-rating__rate-wrapper">
                                
                            <Rate 
                                    style={{ color: '#000' }}
                                    className="c-product-info__stars" 
                                    disabled value={3.5} 
                                    allowHalf={true} />
                            </div>
                            <p className="pr-rating__para">(135 reviews)</p>
                            <h1 className="pr-rating__heading">9.7</h1>
                       </div>
                   </div>
                </div>
                <div className="col-md-3">
                    <div className="pr-rating__right-sec">
                        <ul className="pr-rating__list-warpper">
                            <li className="pr-rating__list"> <Rate style={{ color: '#000' }} className="c-product-info__stars" disabled value={5}/> <span className="pr-rating__list--rate">(120)</span></li>
                            <li className="pr-rating__list"> <Rate style={{ color: '#000' }} className="c-product-info__stars" disabled value={4}/> <span className="pr-rating__list--rate">(120)</span></li> 
                            <li className="pr-rating__list"> <Rate style={{ color: '#000' }} className="c-product-info__stars" disabled value={3}/> <span className="pr-rating__list--rate">(120)</span></li>
                            <li className="pr-rating__list"> <Rate style={{ color: '#000' }} className="c-product-info__stars" disabled value={3}/> <span className="pr-rating__list--rate">(120)</span></li>
                            <li className="pr-rating__list"> <Rate style={{ color: '#000' }} className="c-product-info__stars" disabled value={2}/> <span className="pr-rating__list--rate">(120)</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
        
}
export default ProductRating