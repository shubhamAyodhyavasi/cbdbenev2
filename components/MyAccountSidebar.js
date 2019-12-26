import React, { Component } from "react";
import { connect } from "react-redux";
import { Nav, NavItem } from "reactstrap";
import Link from 'next/link'
import Icon from "react-icons-kit";
import classNames from "classnames";
import ListToggler from "./ListToggler";
import {
  shoppingCart,
  heart,
  user,
  infoCircle,
  barChart,
  money,
  mapMarker
} from "react-icons-kit/fa/";
import {ic_playlist_add_check} from 'react-icons-kit/md/'

class MyAccountSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { location, activeLink } = this.props;
    return (
      <div className="my-account-sidebar">
        <ListToggler 
        // max={992}
        max={1}
        >
          <Nav vertical>
            <hr />
            {/* <p>YOUR ORDER</p> */}
            <NavItem
              className={classNames("my-accountLink", {
                active: activeLink === "MY ACCOUNT"
              })}
            >
              <Link href={"/account"}>
                <a className="my-accountLink__link"><Icon icon={shoppingCart} className="sidebar-icon" />
                MY ORDER
                    </a>
              </Link>
            </NavItem>
            <NavItem
              className={classNames("my-accountLink", {
                active: activeLink === "MY SUBSCRIPTION"
              })}
            >
              <Link href={"/account/subscription"}>
                  <a className="my-accountLink__link">
                <Icon size={20} icon={ic_playlist_add_check} className="sidebar-icon" />
                MY SUBSCRIPTION
                </a>
              </Link>
            </NavItem>

            <NavItem
              className={classNames("my-accountLink", {
                active: activeLink === "FAVOURITES"
              })}
            >
              <Link href={"/account/favourites"}>
                  <a className="my-accountLink__link">
                <Icon icon={heart} className="sidebar-icon" />
                FAVOURITES
                </a>
              </Link>
            </NavItem>

            <hr />
            {/* <p>YOUR ACCOUNT</p> */}
            <NavItem
              className={classNames("my-accountLink", {
                active: activeLink === "changePassword"
              })}
            >
              <Link href={"/account/change-password"}>
                  <a className="my-accountLink__link">
                <Icon icon={user} className="sidebar-icon" />
                CHANGE PASSWORD
                </a>
              </Link>
            </NavItem>
            {/* <NavItem
              className={classNames("my-accountLink", {
                active: activeLink === "PROFILE"
              })}
            >
              <Link href={"/" + location.countryCode + "/my-profile"}>
                <Icon icon={user} className="sidebar-icon" />
                MY PROFILE
              </Link>
            </NavItem> */}
            <NavItem
              className={classNames("my-accountLink", {
                active: activeLink === "PAYMENT METHOD"
              })}
            >
              <Link href={"/account/address"}>
                  <a className="my-accountLink__link">
                <Icon icon={mapMarker} className="sidebar-icon" />
                MY ADDRESS
                </a>
              </Link>
            </NavItem>
            <NavItem
              className={classNames("my-accountLink", {
                active: activeLink === "CARD METHOD"
              })}
            >
              <Link href={"/account/cards"}>
                  <a className="my-accountLink__link">
                <Icon icon={money} className="sidebar-icon" />
                PAYMENT METHOD
                </a>
              </Link>
            </NavItem>
            {/* <NavItem
              className={classNames("my-accountLink", {
                active: activeLink === "NOTIFICATION"
              })}
            >
              <Link href={"/" + location.countryCode + "/my-notification"}>
                <Icon icon={infoCircle} className="sidebar-icon" />
                NOTIFICATION
              </Link>
            </NavItem> */}
          </Nav>
        </ListToggler>
        <br />
        <br />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  location: state.location
});
export default connect(mapStateToProps)(MyAccountSidebar);
