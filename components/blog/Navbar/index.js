import React, { Component } from "react";
import NavLeft from "./navLeft";
import NavRight from "./navRight";
export default class Navbar extends Component {
	render() {
		return (
			<div className="navbar navbar-blue navbar-fixed">
				<NavLeft />
				<div>hims</div>
				<NavRight />
			</div>
		);
	}
}
