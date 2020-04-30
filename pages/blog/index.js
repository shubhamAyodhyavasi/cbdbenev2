import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import _ from "underscore";

import Header from "../../components/blog/Header/Header";
import MainSection from "../../components/blog/MainSection/MainSection";
import Layout from "../../components/Layouts/Layout";

import * as actionCreators from "../../redux/actions/blog";

class BlogPage extends React.Component {
	articleClickHandler = (index) => {
		console.log("i got aclick");
		console.log(index);
		this.props.getArticle(index);
	};
	navClickHandler = (tag) => {
		this.props.get(0, tag);
		console.log("i got aclick in nav");
		console.log(tag);
	};

	componentDidMount = () => {
		console.log("component mounted");
		// const func = this.props.get;
		// func(0, "All")
		// 	.then(() => console.log("ok"))
		// 	.catch((err) => console.log(err));
		this.props
			.get(0, "All")
			.then(() => console.log("ok"))
			.catch((err) => console.log(err));
	};
	render() {
		return (
			<Layout
				title="Home"
				headerTheme="dark"
				homeLogo={false}
				pageClass={"c-home"}
			>
				{!_.isEmpty(this.props.current) ? (
					<div>Blog</div>
				) : (
					<>
						<Header />
						<MainSection
							articleClickHandler={this.articleClickHandler}
							navClickHandler={this.navClickHandler}
						/>
					</>
				)}
			</Layout>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		article: state.blog.article,
		current: state.blog.current,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		get: (pageNo, tag) => dispatch(actionCreators.get(pageNo, tag)),
		getArticle: (index) => dispatch(actionCreators.getArticle(index)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogPage);
