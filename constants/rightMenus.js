import { AiOutlineUser } from 'react-icons/ai'
import { FiShoppingCart } from 'react-icons/fi'
const rightMenus = [
    {
        label: "Learn",
        link: "/learn",
    },
    {
        label: "Consult",
        link: "/consult",
    },
    {
        icon: <AiOutlineUser />,
        link: "/user",
    },
    {
        icon: <FiShoppingCart />,
        link: "/cart",
    },
]
export default rightMenus