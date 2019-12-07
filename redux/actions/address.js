import { updateUserDetails, getUserDetails } from "../../services/apis/user";

import { SET_ADDRESS } from "./type";
// import { getSingleUserApi, addUpdateUserDetails } from "../services/api";

export const setAddress = payload => ({
  type: SET_ADDRESS,
  payload
});

export const getAddress = id => async dispatch => {
  getUserDetails(id)
    .then(res => {
      console.log(res);
      if (res.data.user) {
        if (res.data.user.shippingdetails) {
          dispatch(setAddress(res.data.user.shippingdetails));
        } else {
          dispatch(setAddress({}));
        }
      } else {
        dispatch(setAddress({}));
      }
    })
    .catch(console.log);
};
const returnAddress = res => {
  if (res.user) {
    if (res.user.shippingdetails) {
      return res.user.shippingdetails;
    }
  }
  return {};
};
export const addAddress = (
  userid,
  address,
  oldDetail = {},
  oldAddress = []
) => dispatch => {
    console.log({
        userid, address
    })
  if (address.constructor === Array) {
    const addressArr = address.filter(el => el);
    const addresses1 = [...oldAddress, ...addressArr].map(elx => elx)
    const hasDefault = addresses1.find(el => el.isDefault === true)
    const addresses2 = addresses1.map((el, index)=> {
      if(index === 0 && !hasDefault){
        return ({
          ...el,
          isDefault: true
        })
      }
      return el
    })
    updateUserDetails({
      userid,
      shippingdetails: {
        ...oldDetail,
        address: addresses2
      }
    })
      .then(res => {
        console.log({ res });
        const address = returnAddress(res.data);
        dispatch(setAddress(address));
      })
      .catch(err => {
        console.log({ err });
      });
  } else {
    const addresses1 = [...oldAddress, address].map(elx => {
      return elx
    })
    const hasDefault = addresses1.find(el => el.isDefault === true)
    const addresses2 = addresses1.map((el, index)=> {
      if(index === 0 && !hasDefault){
        return ({
          ...el,
          isDefault: true
        })
      }
      return el
    })
    updateUserDetails({
      userid,
      shippingdetails: {
        ...oldDetail,
        address: addresses2
      }
    })
      .then(res => {
        console.log({ res });
        const address = returnAddress(res.data);
        dispatch(setAddress(address));
      })
      .catch(err => {
        console.log({ err });
      });
  }
};
// export const deleteAddress = (
//   userid,
//   id,
//   oldDetail = {},
//   oldAddress = []
// ) => dispatch => {
//   const newAddress1 = oldAddress.filter(el => el.id !== id);
//   const defaultAddress = newAddress1.find(el => el.isDefault === true)
//   const newAddress = newAddress1.map((el, index) => {
//     if(index === 0 && !defaultAddress){
//       return ({
//         ...el, isDefault: true
//       })
//     }
//     return el
//   })
//   updateUserDetails({
//     userid,
//     shippingdetails: {
//       ...oldDetail,
//       address: newAddress
//     }
//   })
//     .then(res => res.json())
//     .then(res => {
//       console.log({ res });
//       const address = returnAddress(res);
//       dispatch(setAddress(address));
//     })
//     .catch(err => {
//       console.log({ err });
//     });
// };
// export const setDefaultAddress = (
//   userid,
//   id,
//   oldDetail = {},
//   oldAddress = []
// ) => dispatch => {
//   const newAddress = oldAddress.map(el => {
//     return {
//       ...el,
//       isDefault: el.id === id
//     };
//   });

//   updateUserDetails({
//     userid,
//     shippingdetails: {
//       ...oldDetail,
//       address: newAddress
//     }
//   })
//     .then(res => res.json())
//     .then(res => {
//       console.log({ res });
//       const address = returnAddress(res);
//       dispatch(setAddress(address));
//     })
//     .catch(err => {
//       console.log({ err });
//     });
// };
// export const editAddress = (
//   userid,
//   address,
//   oldDetail = {},
//   oldAddress = []
// ) => dispatch => {
//   const newAddress = oldAddress.map(el => {
//     if (el.id === address.id) return address;

//     return el;
//   });
//   updateUserDetails({
//     userid,
//     shippingdetails: {
//       ...oldDetail,
//       address: newAddress
//     }
//   })
//     .then(res => res.json())
//     .then(res => {
//       console.log({ res });
//       const address = returnAddress(res);
//       dispatch(setAddress(address));
//     })
//     .catch(err => {
//       console.log({ err });
//     });
// };
