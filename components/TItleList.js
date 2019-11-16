import Heading from './Heading'
import classNames from 'classnames'

const TitleList = ({title, content, children, parentClass}) => {
    const parent = `${parentClass}__title-list`
    return (
        <div className={classNames("c-title-list", {
            [parent]: parentClass
        })}>
            <div className="c-title-list__title-wrap">
                <p className="c-title-list__title">{title}</p>
            </div>
            <div className="c-title-list__detail-wrap">
                <p className="c-title-list__content">{content}{children}</p>
            </div>
        </div>
    )
}

export default TitleList