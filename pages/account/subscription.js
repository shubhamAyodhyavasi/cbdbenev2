import React, { Component } from "react";
import { Card, CardBody, CardTitle, Alert, Table } from "reactstrap";
import { connect } from "react-redux";
import Link from 'next/link'
import classNames from "classnames";
import BasicFunction from "../../services/extra/basicFunction";

import Layout from '../../components/Layouts/Layout'
import {
  // subscriptionGetApi,
  getOrders,
  getUserDetails
} from "../../services/api";
import { Button, ButtonGroup } from "reactstrap";
import MyAccountSidebar from "../../components/MyAccountSidebar";

import Loader from '../../components/Loader'
import { addSlugToProduct } from "../../services/extra";
import msgStrings from "../../constants/msgStrings";
const basicFunction = new BasicFunction();
class MySubscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subscriptionList: "",
      loginUserId: "",
      SpinnerToggle: true
    };
  }
  componentDidMount() {
    const { user, history, location } = this.props;
    // if (!user._id) {
    //   history.push("/" + location.countryCode + "/login");
    // }

    if (user._id) {
      // let userid = user._id;
      if (user.userMetaId) {
        getOrders(user.userMetaId)
          .then(res => {
            const resJson = res.data
            if (resJson.status) {
              const orderList = resJson.orders.sort(function(a, b) {
                return new Date(b.createdOn) - new Date(a.createdOn);
              });
              const orderList2 = orderList.map(el =>
                el.products.map(el => addSlugToProduct(el))
              );
              const productList = flatten(orderList2);
              const subscriptionList = productList.filter(
                el => el.isSubscribed
              );
              this.setState(
                {
                  subscriptionList,
                  SpinnerToggle: false
                },
                () => {
                  console.log({
                    subscriptionList,
                    orderList2,
                    productList
                  });
                  document.body.scrollTop = document.documentElement.scrollTop = 0;
                }
              );
            } else {
              this.setState(
                {
                  SpinnerToggle: false
                },
                () => {
                  document.body.scrollTop = document.documentElement.scrollTop = 0;
                }
              );
            }
          })
          .catch(err => {
            console.log({ err });

            this.setState(
              {
                SpinnerToggle: false
              },
              () => {
                document.body.scrollTop = document.documentElement.scrollTop = 0;
              }
            );
          });
      } else {
        getUserDetails(user._id)
          .then(resRaw => {
              const res = resRaw.data
            if (res.user && res.user._id) {
                getOrders(user.userMetaId)
                .then(res => {
                  const resJson = res.data
                  if (resJson.status) {
                    const orderList = resJson.orders.sort(function(a, b) {
                      return new Date(b.createdOn) - new Date(a.createdOn);
                    });
                    const orderList2 = orderList.map(el =>
                      el.products.map(el => addSlugToProduct(el))
                    );
                    const productList = flatten(orderList2);
                    const subscriptionList = productList.filter(
                      el => el.isSubscribed
                    );
                    this.setState(
                      {
                        subscriptionList,
                        SpinnerToggle: false
                      },
                      () => {
                        document.body.scrollTop = document.documentElement.scrollTop = 0;
                      }
                    );
                  } else {
                    this.setState(
                      {
                        SpinnerToggle: false
                      },
                      () => {
                        document.body.scrollTop = document.documentElement.scrollTop = 0;
                      }
                    );
                  }
                })
                .catch(err => {
                  console.log({ err });
                  this.setState(
                    {
                      SpinnerToggle: false
                    },
                    () => {
                      document.body.scrollTop = document.documentElement.scrollTop = 0;
                    }
                  );
                });
            }
          });
      }

      // subscriptionGetApi({ userid })
      //   .then(res => res.json())
      //   .then(resJson => {
      //     if (resJson.status) {
      //       this.setState({
      //         subscriptionList: resJson.subscribed,
      //         SpinnerToggle: false
      //       });
      //     }
      //   })
      //   .catch(err => {});

      document.body.scrollTop = document.documentElement.scrollTop = 0;
      this.setState({
        loginUserId: user._id
      });
    }
  }
  componentDidUpdate(prevProps){
    if(prevProps.user !== this.props.user && this.props.user._id){
        const {
            user
        } = this.props
    if (user._id) {
        // let userid = user._id;
        if (user.userMetaId) {
          getOrders(user.userMetaId)
            .then(res => {
                const resJson = res.data
              if (resJson.status) {
                const orderList = resJson.orders.sort(function(a, b) {
                  return new Date(b.createdOn) - new Date(a.createdOn);
                });
                const orderList2 = orderList.map(el =>
                  el.products.map(el => addSlugToProduct(el))
                );
                const productList = flatten(orderList2);
                const subscriptionList = productList.filter(
                  el => el.isSubscribed
                );
                this.setState(
                  {
                    subscriptionList,
                    SpinnerToggle: false
                  },
                  () => {
                    console.log({
                      subscriptionList,
                      orderList2,
                      productList
                    });
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                  }
                );
              } else {
                this.setState(
                  {
                    SpinnerToggle: false
                  },
                  () => {
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                  }
                );
              }
            })
            .catch(err => {
              console.log({ err });
  
              this.setState(
                {
                  SpinnerToggle: false
                },
                () => {
                  document.body.scrollTop = document.documentElement.scrollTop = 0;
                }
              );
            });
        } else {
          getUserDetails(user._id)
            .then(resRaw => {
                const res = resRaw.data
              if (res.user && res.user._id) {
                  getOrders(res.user._id)
                  .then(res => {
                      const resJson = res.data
                    if (resJson.status) {
                      const orderList = resJson.orders.sort(function(a, b) {
                        return new Date(b.createdOn) - new Date(a.createdOn);
                      });
                      const orderList2 = orderList.map(el =>
                        el.products.map(el => addSlugToProduct(el))
                      );
                      const productList = flatten(orderList2);
                      const subscriptionList = productList.filter(
                        el => el.isSubscribed
                      );
                      this.setState(
                        {
                          subscriptionList,
                          SpinnerToggle: false
                        },
                        () => {
                          document.body.scrollTop = document.documentElement.scrollTop = 0;
                        }
                      );
                    } else {
                      this.setState(
                        {
                          SpinnerToggle: false
                        },
                        () => {
                          document.body.scrollTop = document.documentElement.scrollTop = 0;
                        }
                      );
                    }
                  })
                  .catch(err => {
                    console.log({ err });
                    this.setState(
                      {
                        SpinnerToggle: false
                      },
                      () => {
                        document.body.scrollTop = document.documentElement.scrollTop = 0;
                      }
                    );
                  });
              }
            });
        }
  
        // subscriptionGetApi({ userid })
        //   .then(res => res.json())
        //   .then(resJson => {
        //     if (resJson.status) {
        //       this.setState({
        //         subscriptionList: resJson.subscribed,
        //         SpinnerToggle: false
        //       });
        //     }
        //   })
        //   .catch(err => {});
  
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        this.setState({
          loginUserId: user._id
        });
      }
    }
  }
  render() {
    const { location, className } = this.props;
    const { projectName } = msgStrings
    const productLink = subs => {
      // if (subs.productmeta) {
      //   if (subs.productmeta._id) {
      //     return (
      //       <Link to={"/" + location.countryCode + "/shop/" + subs.productSlug}>
      //         {subs.productid && subs.productid.producttitle}
      //       </Link>
      //     );
      //   }
      // }

      // if (subs.comboid) {
      //   if (subs.comboid._id) {
      //     return (
      //       <Link to={"/" + location.countryCode + "/shop/" + subs.productSlug}>
      //         {subs.comboid && subs.comboid.title}
      //       </Link>
      //     );
      //   }
      // }
      if (subs.title)
        return (
          <Link
            href={"/shop/" + subs._id }
          >
            <a className="my-order__t-link">{subs.title}</a>
            
          </Link>
        );

      return "-";
    };
    return (
    <Layout headerVersions={[ 'bg-light' ]} headerTheme="dark" fixed={true}>
      <div
        className={classNames("my-order", {
          [className]: className
        })}
      >
        {/* <Helmet>
          <title>{projectName} | My Subscriptions</title>
        </Helmet> */}
        {this.state.SpinnerToggle && <Loader />}
        <div className="container-fluid">
          <div className="my-order__heading">
            <h3>My order</h3>
          </div>
        </div>
        <div className="my-order__wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-2 ">
              <MyAccountSidebar activeLink="MY SUBSCRIPTION" />
            </div>
            <div className="col-lg-10 ">
              {/* <h1>Your Subscription</h1> */}
              <br />
              <Card className="panel-section my-order__panel">

                <CardBody>
                <div className="my-order__detail">
                <div className="my-order__alert">
                    <Alert color="dark" className="my-order__alert--msg">YOUR SUBSCRIPTION</Alert>
                  </div>
                  <CardTitle >
                    <div className="table-responsive">
                      {this.state.subscriptionList.length > 0 ? (
                        <Table className="new-res-table my-order__table">
                          <thead className="my-order__thead">
                            <tr>
                              <th>S. No.</th>
                              <th>Subscribed On</th>
                              <th>Duration</th>
                              <th>Product</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.subscriptionList.map((subs, index) => (
                              <tr key={index} className="my-order__t-row">
                                <th className="sr-number my-order__t-head my-order__table--sno" scope="row">{index + 1}</th>
                                <td data-label="Product"
                                className="my-order__t-col my-order__table--name ">
                                  {productLink(subs)}
                                </td>
                                <td
                                    data-label="Price"
                                    className="inline-data my-order__t-col my-order__table--price"
                                  >
                                    $12.34  
                                  </td>
                                <td
                                  className="inline-data my-order__t-col my-order__table--date"
                                  data-label="Subscribed On"
                                >
                                  {basicFunction.dateTimeInMonthName(
                                    subs.createdOn
                                  )}
                                </td>

                                <td
                                  className="inline-data my-order__t-col my-order__table--date"
                                  data-label="Subscribed On"
                                >
                                  May 28 2019 
                                </td>
                                <td
                                  className="inline-data my-order__t-col my-order__table--status"
                                  data-label="Duration"
                                >
                                  {subs.subscriptionMeta &&
                                    (subs.subscriptionMeta.duration > 1
                                      ? `${
                                          subs.subscriptionMeta.duration
                                        } Months`
                                      : `${
                                          subs.subscriptionMeta.duration
                                        } Month`)}
                                </td>
                                <td data-label="Action" className="my-order__t-col my-order__table--action">
                                    <ButtonGroup>
                                      <Button
                                        
                                        className="btn9 my-order__t-btn"
                                        onClick={() => this.toggle(order)}
                                      >
                                        {/* <Icon icon={eye} /> */}
                                        View
                                      </Button>
                                      <span style={{ minWidth: "2px" }} />
                                      <Button
                                        
                                        className="btn9 my-order__t-btn"
                                        onClick={() => this.reorder(order)}
                                      >
                                        Reorder
                                      </Button>
                                      <span style={{ minWidth: "2px" }} />                                      
                                    </ButtonGroup>                                    
                                  </td>                                
                                {/* <td>
                                <a className="btn or-btn btn-light-grey">View</a>
                              </td> */}
                                
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      ) : (
                        <h3 className="my-order__msg-title">
                          You currently have not added any items to your
                          subscription list.
                        </h3>
                      )}
                    </div>
                  </CardTitle>
                  </div>
                  <Link
                    href={"/shop"}
                  >
                    <a 
                    className="btn or-btn btn-outline-shopping btn-icon c-btn c-btn--outline my-order__shopping"
                     >Start Shopping</a>
                  </Link>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
      </div>
      </Layout>
    );
  }
}


function flatten(arr) {
    return arr.reduce(function(flat, toFlatten) {
      return flat.concat(
        Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
      );
    }, []);
}
const mapStateToProps = state => ({
  user: state.user,
  location: state.location
});
export default connect(mapStateToProps)(MySubscription);

// subscription page
// 2nd date static
// prize in table
// action button
