import { AiOutlineUser } from 'react-icons/ai'
import { FiShoppingCart } from 'react-icons/fi'
const rightMenus = [
    {
        label: "Learn",
        link: "/learn",
        action: "link"
    },
    {
        label: "Consult",
        link: "/consult",
        action: "link"
    },
    {
        icon: <AiOutlineUser />,
        link: "/user",
        action: "link",
        onlyLogin: true
    },
    {
        icon: <AiOutlineUser />,
        action: "reg",
        onlyLogin: false
    },
    {
        icon: <FiShoppingCart />,
        action: "cart"
    },
]
export default rightMenus