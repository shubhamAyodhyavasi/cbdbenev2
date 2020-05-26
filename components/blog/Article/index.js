import React, { Component } from "react";
import parse from "html-react-parser";
import { imageUrl } from "../../../constants/projectSettings";
export default class index extends Component {
	render() {
		let values = this.props.data;
		const tags = values.tags.map((elem, index) => {
			if (index === values.tags.length - 1)
				return (
					<span
						// className="articlecard-wrapper-info-small-link"
						onClick={() => this.props.navClickHandler(elem)}
						key={elem}
					>
						{elem}
					</span>
				);
			else {
				return (
					<span
						// className="articlecard-wrapper-info-small-link"
						onClick={() => this.props.navClickHandler(elem)}
						key={elem}
					>
						{elem}
						{","}
					</span>
				);
			}
		});
		return (
			<div className="article">
				<div className="article-nav">
					<div className="article-nav-tag article-nav-tag--left">{tags}</div>
					<div
						className="article-nav-tag article-nav-tag--right"
						onClick={() => this.props.backHandler()}
					>
						Back to blog
					</div>
				</div>
				<div className="article-heading">{values.heading}</div>
				<div className="article-image-wrapper">
					<img
						src={`${imageUrl}/bundle.jpg`}
						className="article-image-wrapper--image"
						alt="Article image"
					/>
				</div>
				<div className="article-review-wrapper">
					<img
						src={`${imageUrl}/bundle.jpg`}
						className="article-review-wrapper--image"
						alt="Article image"
					/>

					<div>
						<div
							className="article-review-wrapper--item"
							// style={{ fontSize: "12px" }}
						>
							Medically reviewed by{" "}
							<span className="highlight">Patrick Carroll, MD</span>
						</div>
						<div
							className="article-review-wrapper--item"
							// style={{ fontSize: "12px" }}
						>
							Written by Our Editorial Team
						</div>
						<div
							className="article-review-wrapper--item"
							// style={{ fontSize: "12px" }}
						>
							Published 3/13/2020
						</div>
					</div>
				</div>
				<div className="article-content">{parse(values.content)}</div>
				<div className="article-footer">
					This article is for informational purposes only and does not
					constitute medical advice. The information contained herein is not a
					substitute for and should never be relied upon for professional
					medical advice. Always talk to your doctor about the risks and
					benefits of any treatment.
				</div>
			</div>
		);
	}
}
