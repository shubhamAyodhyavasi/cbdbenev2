const Banner = ({image, heading, content, imgAlt}) => (
    <div className="c-banner">
        <img className="c-banner__bg" src={image} alt={imgAlt ? imgAlt : "banner"}/>
        <div className="c-banner__content">
            {heading && <h2 className="c-banner__heading">{heading}</h2>}
            {content && <p className="c-banner__text">{content}</p>}
        </div>
    </div>
)

export default Banner