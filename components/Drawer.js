import { Drawer as AntDrawer, Icon } from 'antd'
import Heading from './Heading'
import Logo from './Logo'

class Drawer extends React.Component {
    constructor({ props }) {
        super(props)
        this.state = {
            width: 800
        }
    }
    componentDidMount() {
        this.setState({
            width: window.innerWidth > 800 ? 800 : window.innerWidth
        })
    }
    render() {
        const {
            width
        } = this.state
        const {
            onClose, visible, title, children
        } = this.props
        return (
            <AntDrawer
                className="c-drawer"
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
                width={width}
                title={<DrawerTitle onClose={onClose} title={title} />}
            >
                {children}
            </AntDrawer>
        )
    }
}
const DrawerTitle = ({ onClose, title }) => (
    <div className="c-drawer-title c-drawer__title">
        <div className="c-drawer-title__go-back-wrapper">
            <Icon className="c-drawer-title__back" type="left" onClick={onClose} />
        </div>
        <div className="c-drawer-title__header">
            <div className="row">
                <div className="col">
                    <Heading parentClass="c-cart-title" versions={["default", "gold", "upper"]} >{title}</Heading>
                </div>
                <div className="col flex-grow-0">
                    <Logo parentClass="c-cart-title" />
                </div>
            </div>
        </div>
    </div>
)

export default Drawer