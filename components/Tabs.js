import classNames from 'classnames'
import { Tabs as AntTabs } from 'antd';
const Tabs = ({onChange, tabs, defaultActiveKey, versions, parentClass, onNextClick, onPrevClick}) => {
    const componentClass = `c-tabs`
    const versionClass = versions.map(el => (`${componentClass}--${el}`)).join(" ")
    const parent = `${parentClass}__${componentClass.replace("c-", "")}`
    const className = classNames(componentClass, {
        [versionClass]: versions,
        [parent]: parentClass,
    })
    const {
        TabPane
    } = AntTabs
	return (
        <AntTabs className={classNames(className)} defaultActiveKey={defaultActiveKey} onChange={onChange} onNextClick={onNextClick} onPrevClick={onPrevClick} >
            {tabs.map((el, i)=> 
            <TabPane className="c-tabs__pane" tab={el.title} key={`${i}`}>
                {el.content}
            </TabPane>
            )}
        </AntTabs>
    )
};
Tabs.defaultProps = {
    tabs: [],
    defaultActiveKey: "0",
    versions: []
}

export default Tabs