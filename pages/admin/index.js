import React from "react";
// import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import AdminLayout from "../../components/Layouts/AdminLayout";
import { Card } from "antd";
import editJsonFile from "edit-json-file";
let file = editJsonFile(__dirname + "/public/PageJson/Banner.json");
const tabListNoTitle = [
	{
		key: "Banner Text",
		tab: "Banner Text",
	},
	{
		key: "app",
		tab: "app",
	},
	{
		key: "project",
		tab: "project",
	},
];
const tabList = [
	{
		key: "tab1",
		tab: "tab1",
	},
	{
		key: "tab2",
		tab: "tab2",
	},
];
const contentListNoTitle = {
	article: <p>article content</p>,
	app: <p>app content</p>,
	project: <p>project content</p>,
};

class Header extends React.Component {
	state = {
		key: "tab1",
		noTitleKey: "app",
	};
	onTabChange = (key, type) => {
		console.log(key, type);
		this.setState({ [type]: key });
	};
	render() {
		console.log(file.get());
		return (
			<AdminLayout>
				<Card
					// style={{ width: "100%" }}
					tabList={tabListNoTitle}
					activeTabKey={this.state.noTitleKey}
					onTabChange={(key) => {
						this.onTabChange(key, "noTitleKey");
					}}
				>
					{contentListNoTitle[this.state.noTitleKey]}
				</Card>
			</AdminLayout>
		);
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
