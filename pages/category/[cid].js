import { connect } from "react-redux";
import Layout from "../../components/Layouts/Layout";
import HImgSection from "../../components/HImgSection";
import HHSection from "../../components/HHSection";
import BundleProducts from "../../components/BundleProducts";
import Heading from "../../components/Heading";
import Logo from "../../components/Logo";
import apiList from "../../services/apis/apiList";
import ProductCard from "../../components/ProductCard";
import {
	getProductImage,
	getProductTitle,
	getProductShortDesc,
	getBasicPrice,
	addSlugToProduct,
	getVisibleProducts
} from "../../services/helpers/product";
import projectSettings from "../../constants/projectSettings";
import fetch from "isomorphic-unfetch";
import { category as categoryData } from "../../site-content";
import parse from "html-react-parser";
const Category = ({ productList, combos, ...props }) => {
	const products = productList.map(el => {
		console.log({
			price: getBasicPrice(el),
			el
		});
		return {
			image: el.productImage
				? projectSettings.serverUrl + el.productImage
				: "//via.placeholder.com/300x500",
			title: getProductTitle(el),
			subTitle: getProductShortDesc(el),
			price: getBasicPrice(el),
			...el
		};
	});
	const currentCategory = categoryData[props.category] || categoryData;

	const bannerTitle = currentCategory.bannerTitle;
	const title = currentCategory.title;
	const content = currentCategory.content;
	const bundleTitle = currentCategory.bundleTitle;
	const bundleContent = currentCategory.bundleContent;
	return (
		<Layout headerVersions={["bg-light"]} fixed={true} headerTheme="dark">
			{/* <Layout headerVersions={["bg-dark"]} className="c-consult-page" title="Category">  */}
			<div className="c-category-page">
				<HImgSection
					parentClass="c-category-page"
					version={["full", "content-bottom"]}
					image={"/images/oil-page.png"}
				>
					<div>
						<Heading
							parentClass="c-category-page"
							versions={["lft-br", "large", "brand"]}
						>
							{parse(bannerTitle)}
						</Heading>
					</div>
					<br />
					<br />
					<br />
					<div>
						<Logo />
					</div>
				</HImgSection>
				<div className="c-category-page__products-wrapper">
					<div className="c-category-page__row row">
						<div className="col-lg-4 col-md-6 d-flex justify-content-center">
							<div className="c-category-page__heading-wrapper">
								<Heading parentClass="c-category-page" versions={["large"]}>
									{/* Discover
                                    <br />
                                    {`our ${props.category} line`} */}
									{parse(title)}
								</Heading>
								{parse(content)}
								<hr />
							</div>
						</div>
						{products.map(el => (
							<div key={el._id} className="col-lg-4 col-md-6">
								<ProductCard
									product={el}
									versions={["show-price", "full-height"]}
									title={el.title}
									subTitle={el.subTitle}
									image={el.image}
									price={el.price && el.price.sale_price}
								/>
							</div>
						))}
					</div>
				</div>
				{combos && combos.length > 1 && (
					<div className="c-category-page__combos-wrapper">
						<div className="c-category-page__row row">
							<div className="col-md-6 col-lg-4 offset-lg-1 mb-md-0 mb-3">
								<Heading parentClass="c-category-page" versions={["large"]}>
									{/* TRY THE BUNDLES */}
									{parse(bundleTitle)}
								</Heading>
							</div>
							<div className="col-md-6">
								<Heading
									parentClass="c-category-page"
									subHeading={true}
									versions={["lft-br"]}
								>
									{/* Give our bundles a try with our 60-day, money-back guarantee. The perfect gift. A great way to enjoy premium CBD at an incredible price. All bundles are 20% off. */}
									{parse(bundleContent)}
								</Heading>
							</div>
							<div className="col-12">
								{/* <BundleProducts versions={["no-padding", "h-auto"]} bg="bggrey" products={combos} />  */}
								<BundleProducts
									versions={["no-padding", "h-auto"]}
									products={combos}
								/>
							</div>
						</div>
					</div>
				)}
			</div>
		</Layout>
	);
};
Category.getInitialProps = async ({ query }) => {
	if (query.cid.toLowerCase() === "bundles") {
		const res = await fetch(apiList.getAllCombos);
		const productList = await res.json();
		const visibleProducts = getVisibleProducts(productList.combos);

		return {
			category: query.cid,
			productList: visibleProducts.map(el => addSlugToProduct(el)),
			combos: []
		};
	} else {
		const res = await fetch(apiList.getAllProducts);
		const productList = await res.json();
		const visibleProducts = getVisibleProducts(productList.products);

		const comboRes = await fetch(apiList.getAllCombos);
		const comboList = await comboRes.json();
		const visibleCombo = getVisibleProducts(comboList.combos);

		const categoryProduct = visibleProducts.filter(el => {
			if (el.categoryid) {
				if (el.categoryid.constructor === Array) {
					return el.categoryid.some(
						elx =>
							elx.categorytitle &&
							elx.categorytitle.toLowerCase() === query.cid.toLowerCase()
					);
				} else if (el.categoryid.categorytitle) {
					return (
						el.categoryid.categorytitle.toLowerCase() ===
						query.cid.toLowerCase()
					);
				}
			}
			return false;
		});
		return {
			category: query.cid,
			productList: categoryProduct.map(el => addSlugToProduct(el)),
			combos: visibleCombo.map(el => addSlugToProduct(el))
		};
	}
};
export default connect(null)(Category);
