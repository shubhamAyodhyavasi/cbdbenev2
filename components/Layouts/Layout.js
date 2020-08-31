import React from "react";
import Head from "next/head";
import Header from "../Header";
import projectSettings, {
	topBarText,
	projectName,
} from "../../constants/projectSettings";
import "../styles/app.scss";
import Footer from "../Footer";
import classNames from "classnames";
import ChatBot from "../chatBot/ChatBot";
import TopAlert from "../TopAlert";
import { FullModal } from "../modal";
import Icon from "react-icons-kit";
import { ic_clear, ic_error_outline } from "react-icons-kit/md/";
import { connect } from "react-redux";
import { setEntryMsg } from "../../redux/actions";

const Layout = ({
	title,
	description,
	keywords,
	children,
	isHeaderBg,
	headerTheme,
	headerVersions,
	pageClass,
	fixed,
	homeLogo,
	isEntryMsg,
	setEntryMsg,
}) => {
	return (
		<>
			{topBarText && <TopAlert>{topBarText}</TopAlert>}
			<div
				className={classNames("c-layout", {
					[pageClass]: pageClass,
				})}
			>
				<Head>
					<title>{title ? title : projectSettings.projectName}</title>
					<meta property="og:title" content={title ? title : projectSettings.projectName} key="title" />
					<meta property="og:description" content={title ? title : projectSettings.projectName} key="description" />
					<meta name="description" content={description ? description : projectSettings.projectName} />
					<meta name="keywords" content={keywords ? keywords : projectSettings.projectName} />
					<meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1"/>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Header
					theme={headerTheme}
					homeLogo={homeLogo}
					versions={headerVersions}
					bg={isHeaderBg}
					fixed={fixed}
				/>
				{children}
				<FullModal isOpen={isEntryMsg} toggle={() => setEntryMsg(false)}>
					<div className="modal__logo-wrapper w-100">
						<a className="c-logo  modal-footer__logo" href="/">
							<img
								src="/images/logo-new.png"
								className="modal__logo-img"
								alt={projectName}
							/>
						</a>
						<div className="modal__heading">
							<h2 className="modal__heading-text">Warning :-</h2>
						</div>
						<div className="modal-dismiss" onClick={() => setEntryMsg(false)}>
							<Icon icon={ic_clear} size={"32"} />
						</div>
					</div>
					<div className="c-susbmit-r__wrapper justify-content-center">
						<Icon
							icon={ic_error_outline}
							className="text-center mr-4 clr-red"
							size="64"
						/>
						<h3>{"You must be over 18 years to visit this site."}</h3>
					</div>
				</FullModal>
				<ChatBot />
				<Footer />
			</div>
		</>
	);
};

Layout.defaultProps = {
	isHeaderBg: false,
	fixed: true,
};
const mapStateToProps = (state) => ({
	isEntryMsg: state.firstSetting.entryMsg,
});
export default connect(mapStateToProps, {
	setEntryMsg,
})(Layout);
