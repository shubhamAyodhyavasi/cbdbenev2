import React, { Component } from 'react'
import "../payment/Paymnet.scss";
import InputMask from "react-input-mask";
import ReactCardFlip from "react-card-flip";
import { cardNameRegex, getCardDetails } from "../payment/cardRegex";
import { formatCreditCardNumber, frantSvg, backSvg } from "../payment/paymentFun";
class AppointmentShowCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          cardNumber: props.cardNumber,
          cardName: props.name,
          cardDate: props.expDate,
          cardCV: props.cvvNo,
          flip: false,
          cardtype: "",
          maskKey: "9999 9999 9999 9999",
          cardDesingInfo: {
            color: "grey"
          }
        };
      }
      componentDidMount() {
        const { nameOnCard, numberOnCard, expDateOnCard, cvvOnCard } = this.props;
        const formatObjectWithType = formatCreditCardNumber(numberOnCard);
        const nValue =
          formatObjectWithType && formatObjectWithType.val
            ? formatObjectWithType.val
            : numberOnCard;
        const nCardtype =
          formatObjectWithType && formatObjectWithType.type
            ? formatObjectWithType.type
            : "";
        const ncardName = cardNameRegex.find(e => e.cardtype === nCardtype);
        const mask =
          ncardName && ncardName.mask ? ncardName.mask : "9999 9999 9999 9999";
        const cardDesingInfo = getCardDetails(nCardtype);
        this.setState({
          maskKey: mask,
          cardNumber: numberOnCard,
          cardName: nameOnCard,
          cardDate: expDateOnCard,
          cardCV: cvvOnCard,
          cardDesingInfo
        });
      }
      // onChangeVlaue(e) {
      //   const { name, value } = e.target;
      //   const { cardtype } = this.state;
      //   if (name === "cardNumber") {
      //     const formatObjectWithType = formatCreditCardNumber(value);
      //     const nValue =
      //       formatObjectWithType && formatObjectWithType.val
      //         ? formatObjectWithType.val
      //         : value;
      //     const nCardtype =
      //       formatObjectWithType && formatObjectWithType.type
      //         ? formatObjectWithType.type
      //         : cardtype;
      //     const ncardName = cardNameRegex.find(e => e.cardtype === nCardtype);
      //     const mask =
      //       ncardName && ncardName.mask ? ncardName.mask : "9999 9999 9999 9999";
      //     const cardDesingInfo = getCardDetails(nCardtype);
      //     this.setStaonChangeVlauete({
      //       [name]: nValue,
      //       cardtype: nCardtype,
      //       flip: false,
      //       maskKey: mask,
      //       cardDesingInfo
      //     });
      //     this.props.cardResponse({
      //       cardNumber: this.state.cardNumber,
      //       cardName: this.state.cardName,
      //       cardDate: this.state.cardDate,
      //       cardCV: this.state.cardCV
      //     });
      //     return;
      //   }
    
      //   this.setState({
      //     [name]: value,
      //     cardtype
      //   });
    
      //   if (name === "cardCV") {
      //     this.setState({
      //       flip: true
      //     });
      //   } else {
      //     this.setState({
      //       flip: false
      //     });
      //   }
    
      //   this.props.cardResponse({
      //     cardNumber: this.state.cardNumber,
      //     cardName: this.state.cardName,
      //     cardDate: this.state.cardDate,
      //     cardCV: this.state.cardCV
      //   });
      // }
      svgBack = () => {
        const { cardName, cardCV, cardDesingInfo } = this.state;
        const color =
          cardDesingInfo && cardDesingInfo.color ? cardDesingInfo.color : "gray";
        return backSvg(color, cardCV, cardName);
      };
      svgFrant = () => {
        const { cardNumber, cardName, cardDate, cardDesingInfo } = this.state;
        const color =
          cardDesingInfo && cardDesingInfo.color ? cardDesingInfo.color : "gray";
        return frantSvg(color, cardNumber, cardDate, cardName);
      };
      showcarddetail = () => {
          console.log(this.state)
        //   localStorage.setItem('patientcardnumber',this.state.cardNumber)
      }
  render() {
    const {
        cardNumber,
        cardName,
        cardCV,
        flip,
        maskKey,
        cardDesingInfo,
        cardDate
      } = this.state;
      const logo =
        cardDesingInfo && cardDesingInfo.logo ? cardDesingInfo.logo : "";
      const {
        submitText,
        backBtnText,
      } = this.props
    return (
      <>
         <form className="payment-card-wrapper-show">
        <div className="payment-card-wrapper__card">
          <div className="container preload">
            <div className="creditcard ">
              <ReactCardFlip
                flipSpeedBackToFront={1}
                flipSpeedFrontToBack={1}
                // isFlipped={this.state.flip}
                
                flip = {false}
                flipDirection="horizontal"
              >
                <div
                  className="front"
                  key="front"
                  onClick={() => {
                    // this.setState({ flip: !flip });
                    // console.log(this.state)
                    this.showcarddetail()
                  }}
                >
                  <div
                    id="ccsingle"
                    dangerouslySetInnerHTML={{ __html: logo }}
                  ></div>
                  <div
                    dangerouslySetInnerHTML={{ __html: this.svgFrant() }}
                  ></div>
                </div>
                <div
                  className="back"
                  key="back"
                  onClick={() => {
                    this.setState({ flip: !flip });
                  }}
                  dangerouslySetInnerHTML={{ __html: this.svgBack() }}
                ></div>
              </ReactCardFlip>
            </div>
          </div>
        </div>
        
       
      </form>
      </>
    )
  }
}

export default AppointmentShowCard
