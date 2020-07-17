import React from "react";
import { imageUrl } from "../../../constants/projectSettings";
const ArticleCard = ({ data, ...props }) => {
	
	const tags = data.tags.map((elem, index) => {
		if (index === data.tags.length - 1)
			return (
				<span
					className="articlecard-wrapper-info-small-link"
					onClick={() => props.navClickHandler(elem)}
					key={elem}
				>
					{" "}
					{elem}{" "}
				</span>
			);
		else {
			return (
				<span
					key={elem}
					className="articlecard-wrapper-info-small-link"
					onClick={() => props.navClickHandler(elem)}
				>
					{" "}
					{elem},{" "}
				</span>
			);
		}
	});
	return (
		<div>
			<article className="articlecard ">
				<div className="articlecard-wrapper ">
					<div className="articlecard-wrapper-image">
						<img
							// src={`${imageUrl}/sampleimg.png`}
							src={`${imageUrl}/${data.image}`}
							alt="article"
							className="articlecard-wrapper-image--item"
							// style={{ width: "100%", height: "43rem", objectFit: "cover" }}
						/>
					</div>
					<div className="articlecard-wrapper-info">
						<div className="articlecard-wrapper-info-small">{tags}</div>
						<div
							className="articlecard-wrapper-info-primary"
							onClick={props.onClick}
						>
							{data.heading}
						</div>
						<div className="articlecard-wrapper-info-secondary">
							{data.subHeading}
						</div>
						<div
							className="articlecard-wrapper-info-link"
							onClick={props.onClick}
						>
							READ THIS ARTICLE
							<div className="underline-text"></div>
						</div>
					</div>
				</div>
				<div className="divider-down mb-5"></div>
			</article>
		</div>
	);
};

export default ArticleCard;
