import React from "react";

const navs = [
	"All",
	"Groom",
	"Lifestyle",
	"Skin",
	"Hair",
	"Science",
	"Top Posts",
	"Well-Being",
];
const BlogNav = (props) => {
	return (
		<>
			<section className="blognav">
				<div className="blognav-wrapper">
					{navs.map((elem, index) => {
						return (
							<div
								key={index}
								onClick={() => props.navClickHandler(elem)}
								className="blognav-wrapper-items"
							>
								{elem}
							</div>
						);
					})}
					{/* <div className="blognav-wrapper-items">All</div>
          <div className="blognav-wrapper-items">Groom</div>
          <div className="blognav-wrapper-items">Lifestyle</div>
          <div className="blognav-wrapper-items">Skin</div>
          <div className="blognav-wrapper-items">Hair</div>
          <div className="blognav-wrapper-items">Science</div>
          <div className="blognav-wrapper-items">Top Posts</div>
          <div className="blognav-wrapper-items">Well-Being</div> */}
				</div>
				<div className="divider-down"></div>
			</section>
		</>
	);
};

export default BlogNav;
