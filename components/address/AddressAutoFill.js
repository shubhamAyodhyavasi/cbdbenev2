import React, { Component } from "react";
import classNames from "classnames";
import PlacesAutocomplete from "react-places-autocomplete";
import { ic_search } from "react-icons-kit/md/";
import Icon from "react-icons-kit";
import regExReplace from "../../services/helpers/regexReplace";
import projectSettings from "../../constants/projectSettings"
export default class AddressAutoFill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      fill: false,
      city: "",
      state: "",
      country: "",
      other: "",
      other_err: false,
      city_err: false,
      state_err: false,
      country_err: false
    };
    this.setAllValue = this.setAllValue.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }

  componentDidMount() {}
  onTextChange(e) {
    const { value, id, attributes } = e.target;

    // if (attributes["data-validate"])
    // type = attributes["data-validate"].value

    let pattern = null;
    if (attributes["data-pattern"]) pattern = attributes["data-pattern"].value;

    let newValue = value;

    if (pattern) {
      newValue = value.replace(regExReplace[pattern], "");
    }

    this.setState(
      {
        [id]: newValue,
        [id + "_err"]: true
      },
      () => {
        const { city, state, country, other, zip } = this.state;
        this.props.autofillformresponse({ country, state, city, other, zip });
      }
    );
  }

  handleChange = address => {
    this.setState({ address, fill: true });
  };

  handleSelect = address => {
    const arr = address.split(",");
    const size = arr.length;
    const country = arr[size - 1];
    const state = arr[size - 2];
    const city = arr[size - 3];
    const other = arr[0];
    this.setState({
      country,
      state,
      city,
      other,
      address
    });
    console.log({
      address
    });
    const searchStr = `https://maps.googleapis.com/maps/api/geocode/json?address=${address
      .split(" ")
      .join("+")}&key=${projectSettings.googleApiKey}`;

    fetch(searchStr, {
      headers: {
        "Accept-Encoding": "gzip",
        "User-Agent": "my program (gzip)"
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log({ res });
        if (res.results && res.results.length > 0) {
          const address = res.results[0].address_components;
          const zipObj = address.find(
            el => el.types && el.types.includes("postal_code")
          );
          if (zipObj && zipObj.short_name) {
            const zip = zipObj.short_name;
            this.setState(
              {
                zip
              },
              () => {
                this.props.autofillformresponse({
                  country,
                  state,
                  city,
                  other,
                  zip
                });
              }
            );
          } else {
            this.setState(
              {
                zip: ""
              },
              () => {
                this.props.autofillformresponse({
                  country,
                  state,
                  city,
                  other,
                  zip: ""
                });
              }
            );
          }
        }
      })
      .catch(err => {
        console.log({ err });
        this.setState(
          {
            zip: ""
          },
          () => {
            this.props.autofillformresponse({
              country,
              state,
              city,
              other,
              zip: ""
            });
          }
        );
      });
  };
  setAllValue() {
    const {
      country,
      state,
      city,
      address,
      zip
    } = this.props.autofilladddatatoparent;
    if (country) {
      this.setState({
        country,
        state,
        city,
        fill: true,
        other: address,
        address,
        zip
      });
    }
  }
  render() {
    const { fill, city, state, country, other, zip } = this.state;
    const { address_err, zipErr, colSizeState } = this.props;
    if (this.props.autofilladddatatoparent.country) {
      if (!fill) {
        this.setAllValue();
      }
    }
    const colSize = this.props.colSize || 6;
    return (
      <div>
        <div className="row frm-details m-0">
          <div className={"col-md-" + colSize + " pl-0 pr-0 has-input"}>
            <div
              className={classNames("has-input", {
                "has-error": false
              })}
            >
              <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading
                }) => (
                  <div>
                    {/* <label>Search Your Address </label> */}
                    <div
                      className={classNames(
                        "has-icon-submit has-input search-input inputwrapper",
                        {
                          "has-error":
                            address_err[0] &&
                            address_err[1] &&
                            address_err[2] &&
                            address_err[3]
                        }
                      )}
                    >
                      <div style={{ color: "#d0d2ca" }}>
                        <Icon
                          className=" my-order__search-icon"
                          size={25}
                          icon={ic_search}
                        />
                      </div>
                      <input
                        {...getInputProps({
                          placeholder: "Search Places ...",
                          className: "location-search-input ant-input c-input__input mb-4 my-order__search-icon-input" 
                        })}
                      />
                      {address_err[0] &&
                      address_err[1] &&
                      address_err[2] &&
                      address_err[3] ? (
                        <p className="error">Address is required</p>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="autocomplete-dropdown-container">
                      {loading && <div>Loading...</div>}
                      {suggestions.map(suggestion => {
                        const className = suggestion.active
                          ? "suggestion-item--active"
                          : "suggestion-item";
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? {
                              backgroundColor: "#fafafa",
                              cursor: "pointer",
                              padding: "10px"
                            }
                          : {
                              backgroundColor: "#ffffff",
                              cursor: "pointer",
                              padding: "10px"
                            };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
            </div>
          </div>
          <div className="my-order__address row">
          <div className={"col-md-" + colSize}>
            <div
              className={classNames(" has-input mb-4", {
                "has-error": address_err[0]
              })}
            >
              {/* <label>Address</label> */}
              <input
                value={other}
                type="text"
                id="other"
                onChange={this.onTextChange}
                className="my-account__input ant-input c-input__input"
                placeholder="Address"
              />
              {address_err[0] && <p className="error">Address is required</p>}
            </div>
          </div>
          <div className={"col-md-" +  colSize}>
            <div
              className={classNames(" has-input mb-4", {
                "has-error": address_err[1]
              })}
            >
              {/* <label>City</label> */}
              <input
                value={city}
                type="text"
                id="city"
                onChange={this.onTextChange}
                data-validate={["fullName"]}
                data-pattern="fullName"
                maxLength="30"
                placeholder="City"
                className="my-account__input ant-input c-input__input"
              />
              {address_err[1] && <p className="error">City is required</p>}
            </div>
          </div>
          <div className={"col-md-" + colSizeState || colSize}>
            <div
              className={classNames(" has-input mb-4", {
                "has-error": address_err[2] || address_err[4]
              })}
            >
              {/* <label>Country</label> */}
              <input
                value={country}
                type="text"
                id="country"
                onChange={this.onTextChange}
                data-validate={["fullName"]}
                data-pattern="fullName"
                maxLength="30"
                placeholder="Country"
                className="my-account__input ant-input c-input__input"
              />
              {address_err[2] &&
                !(address_err.length === 5 && address_err[4]) && (
                  <p className="error">Country is required</p>
                )}
              {address_err.length === 5 && address_err[4] && (
                <p className="error">CBD Bené offers shipping to USA only.</p>
              )}
            </div>
          </div>

          <div className={"col-md-" + colSizeState || colSize}>
            <div
              className={classNames(" has-input mb-4", {
                "has-error": address_err[3]
              })}
            >
              {/* <label>State</label> */}
              <input
                type="text"
                value={state}
                id="state"
                onChange={this.onTextChange}
                data-validate={["fullName"]}
                data-pattern="fullName"
                maxLength="30"
                placeholder="State"
                className="my-account__input ant-input c-input__input"
              />
              {address_err[3] && <p className="error">State is required</p>}
            </div>
          </div>         
          <div className={"col-md-" + colSizeState || colSize}>
            <div
              className={classNames(" has-input mb-4", {
                "has-error": zipErr
              })}
            >
              {/* <label>Zip Code</label> */}
              <input
                value={zip}
                type="text"
                id="zip"
                onChange={this.onTextChange}
                data-validate={["zipcode", "required"]}
                data-pattern=""
                maxLength="12"
                placeholder="ZIP"
                className="my-account__input ant-input c-input__input"
              />
              {zipErr && <p className="error">Zip Code is required</p>}
            </div>
          </div>
        
        </div>
        </div>
      </div>
    );
  }
}