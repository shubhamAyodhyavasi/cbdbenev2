import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import _ from "underscore";
import InfiniteScroll from "react-infinite-scroller";

import Header from "../../components/blog/Header/Header";
import MainSection from "../../components/blog/MainSection/MainSection";
import Layout from "../../components/Layouts/Layout";
import Article from "../../components/blog/Article";

import * as actionCreators from "../../redux/actions/blog";

let prev = 0;
let more = true;
class BlogPage extends React.Component {

	state = {
		toggle: false,
	};

	articleClickHandler = (index) => {
		
		this.props.getArticle(index);
		this.setState({
			toggle: true,
		});
	};
	navClickHandler = (tag) => {
		this.props.get(0, tag);
		this.setState({
			toggle: false,
		});
	};
	backHandler = () => {
		this.setState({ toggle: false });
	};

	loadItems = (page) => {
	
		this.props
			.get(page, this.props.tag)
			.then(() => {
				
				if (prev !== this.props.article.length) {
					prev = this.props.article.length;
					more = true;
				} else {
					more = false;
				}
			})
			.catch((err) => console.log(err));
	};

	componentDidMount =  () => {
		if(this.props.isPersist){
			this.props.get(0, this.props.tag)	
		}
	};
	hasmoreHandler = () => {
		console.log("hasmore");
	};
	
	render() {
		
		const loader = <div key={prev}>Loading...</div>;
		return (
			<Layout
				title="Home"
				headerTheme="dark"
				homeLogo={false}
				pageClass={"c-home"}
			>
				{this.state.toggle ? (
					<Article
						data={this.props.current}
						navClickHandler={this.navClickHandler}
						backHandler={this.backHandler}
					/>
				) : (
					<>
						<Header />
						<InfiniteScroll

							pageStart={0}
							loadMore={this.loadItems.bind(this)}
							hasMore={more}
							loader={loader}
							threshold={500}
						>
							<MainSection
								articleClickHandler={this.articleClickHandler}
								navClickHandler={this.navClickHandler}
							/>
						</InfiniteScroll>
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
		tag: state.blog.currentTag,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		get: (pageNo, tag) => dispatch(actionCreators.get(pageNo, tag)),
		getArticle: (index) => dispatch(actionCreators.getArticle(index)),
		back: () => ({ type: CLEAR }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogPage);
