import React from "react";
import { connect } from "react-redux";
import BlogNav from "../BlogNav/BlogNav";
import ArticleCard from "../ArticleCard/ArticleCard";

const MainSection = (props) => {
	return (
		<>
			<main role="main" className="main-section">
				<div className="main-section-small">
					Discover more about mens health
				</div>
				<div className="main-section-heading-primary">
					Explore the hims journal
				</div>
				<BlogNav navClickHandler={props.navClickHandler} />

				{props.article.map((elem, index) => {
					return (
						<ArticleCard
							key={index}
							data={elem}
							onClick={(e) => props.articleClickHandler(index)}
							navClickHandler={props.navClickHandler}
						/>
					);
				})}
			</main>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		article: state.blog.article,
	};
};
export default connect(mapStateToProps)(MainSection);
