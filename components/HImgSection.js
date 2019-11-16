import classNames from 'classnames'

const HImgSection = ({image, children, parentClass, version}) => {
    const parent = `${parentClass}__h-img-section`
    const versionClass = version.map(el => `c-h-img-section--${el}`).join(" ")
    return (
        <div className={classNames("c-h-img-section", {
            [parent]: parentClass,
            [versionClass]: version
        })}>
            <div className="row c-h-img-section__row" >
                <div className="col-md-6 c-h-img-section__content-wrapper">
                    <div className="c-h-img-section__content">
                        {children}
                    </div>
                </div>
                <div className="col-md-6 c-h-img-section__img-wrapper">
                    <img src={image} className="c-h-img-section__img" />
                </div>
            </div>
        </div>
    )

}
HImgSection.defaultProps = {
    version: ["default"]
}
export default HImgSection