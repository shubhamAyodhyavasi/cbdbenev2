import { AiOutlineUser } from 'react-icons/ai'
import { FiShoppingCart } from 'react-icons/fi'
const mobileMenus = [
    {
        label: "Shop",
        link: "/shop",
        action: "link",
        
        subMenus: [
            {
                label: "Topicals",
                link: "/category/?cid=topicals",
                action: "link",
                as: "/category/topicals",
            },
            {
                label: "Pets",
                link: "/category/?cid=pets",
                action: "link",
                as: "/category/pets",
            },
            {
                label: "Edibles",
                link: "/category/?cid=edibles",
                action: "link",
                as: "/category/edibles",
            },
            {
                label: "Capsules",
                link: "/category/?cid=capsules",
                action: "link",
                as: "/category/capsules",
            },
            {
                label: "Oils",
                link: "/category/?cid=oils",
                action: "link",
                as: "/category/oils",
            },
            {
                label: "Bundles",
                link: "/category/?cid=bundles",
                action: "link",
                as: "/category/bundles",
            },
        ]
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
        label: "Login",
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