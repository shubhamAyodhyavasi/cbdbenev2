import { AiOutlineUser } from 'react-icons/ai'
import { FiShoppingCart } from 'react-icons/fi'
const mobileMenus = [
    {
        label: "Shop",
        link: "/shop",
        action: "link"
    },
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
        label: "Account",
        link: "/account",
        onlyLogin: true,
    },
    {
        label: "logout",
        action: "logout",
        onlyLogin: true,
    },
    {
        label: "Login/reg",
        // icon: <AiOutlineUser />,
        action: "reg",
        onlyLogin: false
    },
    // {
    //     icon: <FiShoppingCart />,
    //     action: "cart"
    // },
]
export default mobileMenus