import React from "react";
// import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import AdminLayout from "../../components/Layouts/AdminLayout";
class Header extends React.Component {
	render() {
		console.log(__dirname);
		return <AdminLayout>"Home"</AdminLayout>;
	}
}
// function mapState(state) {
// 	const { alert, headers } = state;
// 	return { alert, headers };
// }

// const actionCreators = {
// 	create: headerActions.create,
// 	getAll: headerActions.getAll,
// };

// const Header = connect(mapState, actionCreators)(HeaderPage);
export default Header;
