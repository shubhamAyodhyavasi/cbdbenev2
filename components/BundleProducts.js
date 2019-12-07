import {useRef} from 'react'
import Heading from './Heading';
import classNames from 'classnames';
import projectSettings from '../constants/projectSettings';
import Flickity from 'react-flickity-component';
import Link from 'next/link';
import SliderLine from './SliderLine';
import { getProductImage } from '../services/helpers/product';
import ProductCard from './ProductCard';
const BundleProducts = ({ heading, subHeading, categoryList, activeCategory, onCategoryChange, products, bg, pp }) => {
    
    const sliderLine = useRef(null)
	const className = classNames('c-category-products', {
		[`c-category-products--${bg}`]: bg
    });
    let left = 0
    const flickityInit = () => {
        setTimeout(() => {
            if(flkty){
                flkty.on("scroll", progress => {
                    if(!isNaN(progress)){
                        let pos = `${progress * 80}%`;
                        sliderLine.current.style.left = pos
                    }
                });
            }
        }, 200);
    }
    const flResize = () => {
      if(flkty) flkty.resize();
    }
    let flkty = undefined
	return (
		<div className={className}>
			<div className="c-category-products__heading-wrapper">
				<Heading parentClass="c-category-products" versions={[ 'default', 'upper' ]}>
					{heading}
				</Heading>
                {
                    subHeading && <Heading subHeading={true} parentClass="c-category-products" versions={[ 'default', 'lft-br' ]}>
					{subHeading}
				</Heading>
                }
			</div>
			<div className="row c-category-products__product-list">
				<Flickity
					options={{
						initialIndex: 0,
						pageDots: false,
						cellAlign: 'left',
                        contain: true,
                        on: {
                            ready: () => {
                              flickityInit();
                            }
                        }
                    }}
                    flickityRef={c => (flkty = c)}
                    disableImagesLoaded={false}
                    reloadOnUpdate={true}
                    className="c-category-products__slider"
				>
                    {products.map((el, i) => {
                        console.log({
                            el
                        })
                        return (
                        <Link key={i} href={`/shop/${el._id}`}>
                            <div className="col-md-6 c-category-products__product">
                                <ProductCard product={el} versions={["show-price", "full-height"]} title={el.title} subTitle={el.subTitle} image={projectSettings.serverUrl + getProductImage(el)} price={ el.dsaleprice } />
                            </div>
                        </Link>
                    )})}
				</Flickity>
                <SliderLine ref={sliderLine} left={left} />
			</div>
		</div>
	);
};

BundleProducts.defaultProps = {
	categoryList: [],
	products: [],
	activeCategory: '',
	onCategoryChange: () => {}
};

export default BundleProducts;