import { SET_CARDS, SET_ERRORS, CLEAR_ERRORS, SET_USER } from "./type";
import { 
  authorizeAddCard, 
  updateUserDetails, 
  getUserDetails,
  authorizeDeleteCard
} from "../../services/api";
// import {
//   getSingleUserApi,
//   addUpdateUserDetails,
//   addCardDetails,
//   deleteCardDetails
// } from "../services/api";

// import { getUserMetaNoCart, updateUserMeta } from "./";
export const setCards = payload => ({
  type: SET_CARDS,
  payload
});

export const getCards = id => async dispatch => {
  getUserDetails(id)
    .then(resRaw => {
      const res = resRaw.data
      console.log(res);
      const cards = returnCards(res);
      dispatch(setCards(cards));
    })
    .catch(err => console.log({ err }));
};

export const addCardAuthorize = data => dispatch => {
  const { user, card, bank, oldCards } = data;
  const { userMetaId, _id, userMetaObj } = user;
  console.log({
    data, dispatch
  })
  const sendCardDetails = (customData, userId) => {
    console.log({
      customData,
      userId
    });
    authorizeAddCard(customData)
      .then(response => {
        const res = response.data
        const { status, card } = res;
        if (
          status &&
          card &&
          card.paymentProfile &&
          card.messages &&
          card.messages.resultCode === "Ok"
        ) {
        //   if (userId) {
        //     updateUserMeta(userId);
        //   }

          const {
            customerProfileId,
            customerPaymentProfileId,
            payment
          } = card.paymentProfile;

          const newCard = {
            customerProfileId,
            customerPaymentProfileId,
            ...payment
          };
          const allCardsPre = oldCards ? [...oldCards, newCard] : [newCard]
          const defaultCard = allCardsPre.find(el => el.isDefault === true)
          const allCards = allCardsPre.map((el, index)=> {
            if(index === 0 && !defaultCard)
              return ({
                ...el,
                isDefault: true
              })
            return el
          })
          updateUserDetails({
            userid: _id,
            carddetails: {
              cards: allCards
            }
          })
            .then(response => {
              console.log({ response });
              const res = response.data
              const cards = returnCards(res);
              dispatch(setCards(cards));
              // getUserMetaNoCart(userId);
              dispatch({
                type: CLEAR_ERRORS,
                payload: {}
              });
              getUserDetails(userId)
                .then(response => {
                  const res = response.data
                  if (res.user && res.user._id) {
                    console.log("user meta found", res);
                    dispatch({
                      type: SET_USER,
                      payload: {
                        ...res.user.userid,
                        userMetaId: res.user._id,
                        userMetaObj: res.user
                      }
                    });
                  }
                });
            })
            .catch(err => {
              dispatch({
                type: SET_ERRORS,
                payload: {
                  cards: ["Some thing wrong"]
                }
              });

              getUserDetails(userId)
                .then(response => {
                    const res = response.data
                  if (res.user && res.user._id) {
                    console.log("user meta found", res);
                    dispatch({
                      type: SET_USER,
                      payload: {
                        ...res.user.userid,
                        userMetaId: res.user._id,
                        userMetaObj: res.user
                      }
                    });
                  }
                });
              console.log({ err });
            });
          console.log({
            customerProfileId,
            customerPaymentProfileId,
            payment,
            customData
          });
        } else {
          dispatch({
            type: SET_ERRORS,
            payload: {
              cards: ["Some thing wrong"]
            }
          });
        }
      });
  };
  const chooseCardOrBank = (userMetaId, userMetaObj) => {
    const { customerProfile } = userMetaObj;
    console.clear()
    console.log({userMetaObj})
    if (customerProfile) {
      if (card) {
        const { cardnumber, cvc, expmonth, expyear } = card;
        const creditcard = {
          cardNumber: cardnumber.split("-").join(""),
          expirationDate: `20${expyear}-${expmonth}`,
          cardCode: cvc
        };
        sendCardDetails({
          creditcard,
          profileid: customerProfile
        });
      } else if (bank) {
        sendCardDetails({
          bank,
          profileid: customerProfile
        });
      }
    } else {
      if (card) {
        const { cardnumber, cvc, expmonth, expyear } = card;
        const creditcard = {
          cardNumber: cardnumber.split("-").join(""),
          expirationDate: `20${expyear}-${expmonth}`,
          cardCode: cvc
        };
        const userMetaIdId = userMetaId._id ? userMetaId._id : ( typeof userMetaId === "string" && userMetaId ) 
        sendCardDetails(
          {
            creditcard,
            email: userMetaIdId + "@cbdbene.com",
            metaid: userMetaIdId
          },
          _id
        );
      } else if (bank) {
        sendCardDetails(
          {
            bank,
            email: userMetaIdId + "@cbdbene.com",
            metaid: userMetaIdId
          },
          _id
        );
      }
    }
  }
  if (userMetaObj && userMetaId) {
    chooseCardOrBank(userMetaId, userMetaObj, )
  }else if(_id){
    getUserDetails(_id).then(res => {
      console.log({ res });
      const {
        user
      } = res.data
      const userMetaId = user._id;
      const userMetaObj = data.user;
      chooseCardOrBank(userMetaId, userMetaObj, )
    })
  }
};
const returnCards = res => {
  if (res.user) {
    if (res.user.carddetails) {
      return res.user.carddetails;
    }
  }
  return {};
};
export const addCard = (
  userid,
  card,
  oldDetail = {},
  oldCards = []
) => dispatch => {
  console.log({
    userid,
    card
  });
  const found = oldCards.find(el => el.id === card.id);
  console.log({
    found
  });
  if (found) {
    dispatch(editCard(userid, card, oldDetail, oldCards));
  } else {
    
    const allCardsPre = oldCards ? [...oldCards, card] : [card]
    const defaultCard = allCardsPre.find(el => el.isDefault === true)
    const allCards = allCardsPre.map((el, index)=> {
      if(index === 0 && !defaultCard)
        return ({
          ...el,
          isDefault: true
        })
      return el
    })
    updateUserDetails({
      userid,
      carddetails: {
        ...oldDetail,
        cards: allCards
      }
    })
      .then(rep => {
        const res = rep.data
        console.log({ res });
        const cards = returnCards(res);
        dispatch(setCards(cards));
      })
      .catch(err => {
        console.log({ err });
      });
  }
};
export const editCard = (
  userid,
  card,
  oldDetail = {},
  oldCards = []
) => dispatch => {
  const newCard = oldCards.map(el => {
    if (el.id === card.id) return card;

    return el;
  });
  addUpdateUserDetails({
    userid,
    carddetails: {
      ...oldDetail,
      cards: newCard
    }
  })
    .then(res => res.json())
    .then(res => {
      console.log({ res });
      const cards = returnCards(res);
      dispatch(setCards(cards));
    })
    .catch(err => {
      console.log({ err });
    });
};
export const deleteCard = (
  userid,
  card,
  oldDetail = {},
  oldCards = []
) => dispatch => {
  const newCard = oldCards.filter(
    el => el.customerPaymentProfileId !== card.customerPaymentProfileId
  );

  authorizeDeleteCard({
    paymentid: card.customerPaymentProfileId,
    profileid: card.customerProfileId
  })
    .then(rep => {
      const res = rep.data
      console.log({
        res
      });
      if (
        res &&
        res.data &&
        res.data.messages &&
        res.data.messages.resultCode === "Ok"
      ) {
        
        const defaultCard = newCard.find(el => el.isDefault === true)
        const allCards = newCard.map((el, index)=> {
          if(index === 0 && !defaultCard)
            return ({
              ...el,
              isDefault: true
            })
          return el
        })
        updateUserDetails({
          userid,
          carddetails: {
            ...oldDetail,
            cards: allCards
          }
        })
          .then(rep => {
            const res = rep.data
            console.log({ res });
            const cards = returnCards(res);
            dispatch(setCards(cards));
          })
          .catch(err => {
            console.log({ err });
          });
      }
    });
};
export const setDefaultCard = (
  userid,
  id,
  oldDetail = {},
  oldCards = []
) => dispatch => {
  const newCard = oldCards.map(el => {
    return {
      ...el,
      isDefault: el.customerPaymentProfileId === id
    };
  });

  updateUserDetails({
    userid,
    carddetails: {
      ...oldDetail,
      cards: newCard
    }
  })
    .then(rep => {
      const res = rep.data
      console.log({ res });
      const cards = returnCards(res);
      dispatch(setCards(cards));
    })
    .catch(err => {
      console.log({ err });
    });
};
