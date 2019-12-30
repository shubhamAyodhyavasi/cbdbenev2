import Heading from './Heading';
import { Rate } from 'antd';

const ProductRating = ({reviews}) =>{
    const getAvg = reviews => {
      const newArr = reviews.map(el => el.overall);
      const sum = newArr.reduce((a, b) => a + b, 0);
      return sum / reviews.length;
    };
    const countOf = (reviews, rate) => reviews.filter(el => el.overall === rate).length
    const avgReview = getAvg(reviews)
    const total     = reviews.length
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
                                disabled value={avgReview} 
                                allowHalf={true} />
                            </div>
                            <p className="pr-rating__para">({total} reviews)</p>
                            <h1 className="pr-rating__heading">{avgReview}</h1>
                       </div>
                   </div>
                </div>
                <div className="col-md-3">
                    <div className="pr-rating__right-sec">
                        <ul className="pr-rating__list-warpper">
                            <li className="pr-rating__list"> <Rate style={{ color: '#000' }} className="c-product-info__stars" disabled value={5}/> <span className="pr-rating__list--rate">({countOf(reviews, 5)})</span></li>
                            <li className="pr-rating__list"> <Rate style={{ color: '#000' }} className="c-product-info__stars" disabled value={4}/> <span className="pr-rating__list--rate">({countOf(reviews, 4)})</span></li> 
                            <li className="pr-rating__list"> <Rate style={{ color: '#000' }} className="c-product-info__stars" disabled value={3}/> <span className="pr-rating__list--rate">({countOf(reviews, 3)})</span></li>
                            <li className="pr-rating__list"> <Rate style={{ color: '#000' }} className="c-product-info__stars" disabled value={2}/> <span className="pr-rating__list--rate">({countOf(reviews, 2)})</span></li>
                            <li className="pr-rating__list"> <Rate style={{ color: '#000' }} className="c-product-info__stars" disabled value={1}/> <span className="pr-rating__list--rate">({countOf(reviews, 1)})</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
        
}
export default ProductRating