import Heading from './Heading'
import classNames from 'classnames'

const TitleList = ({title, content, children, parentClass, versions, serial, onTitleClick}) => {
    const componentClass = 'c-title-list'
    const versionClass = versions.map(el => (`${componentClass}--${el}`)).join(" ")
    const parent = `${parentClass}__${componentClass.replace("c-", "")}`
    const className = classNames(componentClass, {
        [versionClass]: versions,
        [parent]: parentClass,
    })
    return (
        <div className={className}>
            {serial && <div className="c-title-list__key">
                {serial}
            </div>}
            <div onClick={()=> {
                if(typeof onTitleClick === "function"){
                    onTitleClick();
                }
            }} className={classNames("c-title-list__title-wrap", {
                "cursor-pointer" : typeof onTitleClick === "function"
            })}>
                <p className="c-title-list__title">{title}</p>
            </div>
            <div className="c-title-list__detail-wrap">
                <div className="c-title-list__content">{content}{children}</div>
            </div>
        </div>
    )
}
TitleList.defaultProps = {
    versions: []
}
export default TitleList