import React, { Component } from "react";
import { ic_error_outline } from "react-icons-kit/md/";
import Icon from "react-icons-kit";
import { Modal, ModalHeader } from "reactstrap";
import { confirmLogout } from "../../constants/constantMessage";
import { projectName } from "../../constants/projectSettings";
export default class LogoutConfirmModel extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.confirmLogout = this.confirmLogout.bind(this);
		this.cancelLogout = this.cancelLogout.bind(this);
	}
	confirmLogout() {
		this.props.confirmLogout();
	}
	cancelLogout() {
		this.props.cancelLogout();
	}
	render() {
		const { confirmLogoutstats } = this.props;
		return (
			<div>
				<Modal
					isOpen={confirmLogoutstats}
					toggle={this.cancelLogout}
					className={"full-modal"}
				>
					<ModalHeader toggle={this.cancelLogout}>
						<div className="modal__logo-wrapper">
							<a className="c-logo  modal-footer__logo" href="/">
								<img
									src="/images/logo-new.png"
									className="modal__logo-img"
									alt={projectName}
								/>
							</a>
							<div className="modal__heading">
								<h2 className="modal__heading-text">{confirmLogout}</h2>
							</div>
						</div>
					</ModalHeader>
					<div className="Modal-body center-modal">
						<div className="modal-inner">
							<div className="modal-content p-5">
								<Icon
									icon={ic_error_outline}
									className="text-center"
									size="64"
								/>
								<br />
								<p className="text-center title-80">
									Do you really want to logout?
								</p>
								<div className="row mt-4">
									<div className="col-6 text-center">
										<button
											className="c-btn c-btn--outline modal__button"
											onClick={this.confirmLogout}
										>
											Yes
										</button>
									</div>
									<div className="col-6 text-center">
										<button
											className="c-btn c-btn--outline modal__button"
											onClick={this.cancelLogout}
										>
											No
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Modal>
			</div>
		);
	}
}
