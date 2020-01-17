import React, { Component } from "react";
import { connect } from "react-redux";
import Router from 'next/router'
import { Card, CardBody, Button } from "reactstrap";
import { ic_done } from "react-icons-kit/md/";

import Icon from "react-icons-kit";
import { deleteAddress, setDefaultAddress } from "../../redux/actions/address";
class SingleAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  deleteAddress = () => {
    const { user, address, wholeAddress } = this.props;
    this.props.deleteAddress(
      user._id,
      address.id,
      wholeAddress,
      wholeAddress.address
    );
  };
  setDefaultAddress = () => {
    const { user, address, wholeAddress } = this.props;
    this.props.setDefaultAddress(
      user._id,
      address.id,
      wholeAddress,
      wholeAddress.address
    );
  };
  editAddress = () => {
    const {
      history,
      location: { countryCode },
      address: { id }
    } = this.props;

    Router.push(`/account/edit-address/${id}`);
  };
  isSameAddress = address => {
    const {
      country,
      state,
      city,
      other,
      zip,
      addressStr
  } = address
  const addressLine =  `${city}, ${state}, ${country}, ${zip}`.trim()
  return (addressLine.toLowerCase() === addressStr.toLowerCase().trim())
  
  }
  render() {
    const { address } = this.props;
    // console.log({addressSingle : address })
    if (!address) return <div />;
    return (
      <div className="col-md-12">
        <Card className="panel-section my-order__panel">
          <CardBody className="my-order__singleadd">            
            <div className="w-100">
            <p className="l-h">
            {address.firstname + " "}
                {address.lastname  + " "}
              { !this.isSameAddress(address) &&  address.addressStr}  
                {address.city && <span>{address.city}, </span>}
                {address.state && <span>{address.state}, </span>}
                {address.country && <span>{address.country}, </span>}
                {address.zip && <span>{address.zip}. </span>}
                {address.phone && <span>{address.phone}. </span>}
              </p>
            </div>
            {/* <a href="/">+ Add delivery instructions</a> */}
            <div className="w-100">
              <ul className="my-order__address-ul">
                <li>
                  <Button
                    onClick={this.editAddress}
                    color="link"
                    className="my-order__simple-link my-order__t-btn"
                  >
                    Edit
                  </Button>
                </li>
                <li>
                  <Button
                    onClick={this.deleteAddress}
                    color="link"
                    className="my-order__simple-link my-order__t-btn"
                  >
                    Delete
                  </Button>
                </li>
                <li>
                  {address.isDefault && (
                    <Button 
                     color="link"
                     className="my-order__simple-link my-order__t-btn"
                     disabled>
                      <Icon
                        size="20"
                        style={{ color: "green" }}
                        icon={ic_done}
                      />
                    </Button>
                  )}
                  {!address.isDefault && (
                    <Button
                      onClick={this.setDefaultAddress}
                      color="link"
                      className="my-order__simple-link my-order__t-btn"
                    >
                      Set as Default
                    </Button>
                  )}
                </li>
              </ul>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  location: state.location,
  wholeAddress: state.address
});
export default connect(
  mapStateToProps,
  { deleteAddress, setDefaultAddress }
)(SingleAddress);
