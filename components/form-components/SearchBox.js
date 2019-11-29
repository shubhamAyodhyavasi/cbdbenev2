import Input from "./Input"
import classNames from 'classnames'
import ReactSVG from "react-svg"

const SearchBox = ({value, versions, parentClass, onChange}) => {
    const componentClass = 'c-search-box'
    const versionClass = versions.map(el => (`${componentClass}--${el}`)).join(" ")
    const parent = `${parentClass}__${componentClass.replace("c-", "")}`
    const className = classNames(componentClass, {
        [versionClass]: versions,
        [parent]: parentClass,
    })
    return (
        <div className={className}>
            <Input value={value} onChange={onChange} parentClass={componentClass} />
            <ReactSVG src="/images/search.svg" className={`${componentClass}__search-icon`} />
        </div>
    )
}

SearchBox.defaultProps = {
    versions: [],
    onChange: ()=> {}
}

export default SearchBox