import React from "react";
// import "../../../node_modules/bootstrap/scss/bootstrap.scss";
import { Row } from "react-bootstrap";
const menu_items = [
	{
		icon: "",
		path: "",
		title: "Dashbaord",
	},
	{
		icon: "",
		path: "",
		title: "Home",
	},
	{
		icon: "",
		path: "",
		title: "Cart",
	},
	{
		icon: "",
		path: "",
		title: "Shop",
	},
	{
		icon: "",
		path: "",
		title: "Footer",
	},
];

export default function Sidebar() {
	let data = menu_items.map((elem, index) => {
		return <Row key={index}>{elem.title}</Row>;
	});
	return <div className="c-sidebar">{data}</div>;
}
