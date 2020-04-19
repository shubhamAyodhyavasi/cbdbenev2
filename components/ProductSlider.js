import { useRef } from "react";
import classNames from "classnames";
import Flickity from "react-flickity-component";
import SliderLine from "./SliderLine";
import ProductCard from "./ProductCard";
import {
	getProductTitle,
	getProductImage,
	getProductShortDesc,
	getBasicPrice,
} from "../services/helpers/product";
import projectSettings from "../constants/projectSettings";
const ProductSlider = ({ products, parentClass, versions }) => {
	const componentClass = `c-product-slider`;
	const versionClass = versions
		.map((el) => `${componentClass}--${el}`)
		.join(" ");
	const parent = `${parentClass}__${componentClass.replace("c-", "")}`;
	const className = classNames(componentClass, {
		[versionClass]: versions,
		[parent]: parentClass,
	});
	const sliderLine = useRef(null);
	let left = 0;
	const flickityInit = () => {
		setTimeout(() => {
			if (flkty) {
				flkty.on("scroll", (progress) => {
					if (!isNaN(progress)) {
						let pos = `${progress * 80}%`;
						sliderLine.current.style.left = pos;
					}
				});
			}
		}, 200);
	};
	const flResize = () => {
		if (flkty) flkty.resize();
	};
	let flkty = undefined;
	return (
		<div className={className}>
			<div className={`${componentClass}__row row`}>
				<Flickity
					options={{
						initialIndex: 0,
						pageDots: false,
						cellAlign: "left",
						contain: true,
						prevNextButtons: true,
						on: {
							ready: () => {
								flickityInit();
							},
						},
					}}
					flickityRef={(c) => (flkty = c)}
					disableImagesLoaded={false}
					reloadOnUpdate={true}
					className="c-category-products__slider"
				>
					{products
						.filter((product) => product.visibilitytype)
						.map((el, i) => {
							const title = getProductTitle(el);
							const image = getProductImage(el);
							const subTitle = getProductShortDesc(el);
							return (
								<div key={i} className="col-md-4">
									<ProductCard
										subTitle={subTitle}
										product={el}
										price={el.dsaleprice}
										image={image && projectSettings.serverUrl + image}
										title={title}
										versions={["show-price", "full-height"]}
										parentClass={componentClass}
									/>
								</div>
							);
						})}
				</Flickity>
				<SliderLine ref={sliderLine} left={left} />
			</div>
		</div>
	);
};

ProductSlider.defaultProps = {
	products: [],
	versions: [],
};
export default ProductSlider;
