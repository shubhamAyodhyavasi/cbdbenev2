
import ReactSVG from 'react-svg'
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
        icon: <ReactSVG src="/images/user-icon.svg" />,
        // link: "/user",
        action: "dropdown",
        onlyLogin: true,
        dropdownMenu: [
            {
                label: "logout",
                action: "logout"
            }
        ]
    },
    {
        icon: <ReactSVG src="/images/user-icon.svg" />,
        action: "reg",
        onlyLogin: false
    },
    {
        icon: <ReactSVG src="/images/cart-icon-1.svg" />,
        action: "cart"
    },
]
export default rightMenus