import socialLinks from './socialLinks'
const footerMenu = [
    {
        heading: "Customer service",
        menus: [
            {
                slug: "/account",
                title: "My Account"
            },
            {
                slug: "/shipping-returns",
                title: "Shipping & Returns"
            },
            {
                slug: "/learn",
                title: "FAQ"
            },
            {
                slug: "/contact",
                title: "Contact Us"
            },
        ]
    },
    {
        heading: "Company",
        menus: [
            {
                slug: "/track-order",
                title: "Track My Order"
            },
            {
                slug: "/ambassador-portal",
                title: "Affiliate Program"
            },
            
        ]
    },
    {
        heading: "Social",
        menus: [
            {
                slug: socialLinks.facebook || "#",
                title: "Facebook"
            },
            {
                slug: socialLinks.youtube || "#",
                title: "Youtube"
            },
            {
                slug: socialLinks.instagram || "#",
                title: "Instagram"
            },
            {
                slug: socialLinks.twitter || "#",
                title: "Twitter"
            },
        ]
    },
    {
        heading: "Terms",
        menus: [
            {
                slug: "/privacy",
                title: "Privacy and Cookies"
            },
            {
                slug: "/accessibility",
                title: "Accessibility"
            },
        ]
    },
]

export default footerMenu