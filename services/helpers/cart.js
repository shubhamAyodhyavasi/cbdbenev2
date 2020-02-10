import { combineLoop } from "box-dimension-calculator";
import { addSlugToProduct } from "./product";
import _ from 'lodash'
import projectSettings from "../../constants/projectSettings";

export const getItemTotal = item => {
  if (item) {
    if (item.saleprice)
      return parseFloat(item.saleprice) * parseFloat(item.qty);
    else if (item.regularprice)
      return parseFloat(item.regularprice) * parseFloat(item.qty);
  }
  return 0;
};

export const returnSubTotal = items => {
  // amount =
  return items
    .map(el => {
      if (el) {
        if (el.saleprice)
          if (el.subscribed) {
            const totalPrice =
              parseFloat(el.saleprice) * parseFloat(el.qty);
            const disc = (totalPrice * el.subscribedDiscountPersent) / 100;
            return parseFloat(totalPrice) - parseFloat(disc);
          } else {
            return parseFloat(el.saleprice) * parseFloat(el.qty);
          }
        else if (el.regularprice)
          if (el.subscribed) {
            const totalPrice =
              parseFloat(el.regularprice) * parseFloat(el.qty);
            const disc = (totalPrice * el.subscribedDiscountPersent) / 100;
            return parseFloat(totalPrice) - parseFloat(disc);
          } else {
            return parseFloat(el.regularprice) * parseFloat(el.qty);
          }
      }

      return 0;
    })
    .reduce((a, b) => a + b, 0);
};
export const returnUnSubscribeTotal = items => {
  return items
    .filter(el => !el.subscribed)
    .map(el => {
      if (el) {
        if (el.saleprice)
          return parseFloat(el.saleprice) * parseFloat(el.qty);
        else if (el.regularprice)
          return parseFloat(el.regularprice) * parseFloat(el.qty);
      }

      return 0;
    })
    .reduce((a, b) => a + b, 0);
};
export const getTotalWeight = items => {
  return items
    .filter(el => el.weight)
    .map(el => el.weight * parseFloat(el.qty))
    .reduce((a, b) => a + b, 0);
};
export const getTotalVolume = items => {
  // return items
  //   .filter(el => el.shipping_height && el.shipping_length && el.shipping_width)
  //   .map(el => el.shipping_height * el.shipping_length * el.shipping_width)
  //   .reduce((a, b) => a + b, 0);
  return items
    .filter(el => el.volume)
    .map(el => el.volume * parseFloat(el.qty))
    .reduce((a, b) => a + b, 0);
};
export const getTotalVariation = item => {
  if (!item.attributes) return [];

  return item.attributes.map(el => (el ? el.names : null)).filter(el => el);
};
export const variablePriceSet = productItem => {
  if (productItem) {
    let tempVariable = { ...productItem };
    if (productItem.producttype === "variable") {
      // if (productItem.size && productItem.extract_flavor) {
      const notNullVariation = productItem.variation.filter(el => el !== null);
      productItem.attributes.filter(el => el !== null).map(el => el.names);
      const varCheck = productItem.attributes
        .filter(el => el !== null)
        .map(attr => {
          return {
            key: attr.names,
            value: productItem[attr.names]
              ? productItem[attr.names].value
              : productItem[attr.names]
          };
        });
      let matchedVariable = null;
      if (
        !varCheck.some(vEl => vEl.value === null || vEl.value === undefined)
      ) {
        matchedVariable = notNullVariation.find(varEl => {
          let matchArr = [];
          varCheck.map(vEl => {
            matchArr.push(varEl[vEl.key] === vEl.value);
            return null;
          });

          return !matchArr.includes(false);
        });
        if (matchedVariable) {
          tempVariable = {
            ...productItem,
            regularprice: matchedVariable.regular_price,
            saleprice: matchedVariable.sale_price
          };
        } else {
          tempVariable = {
            ...productItem,
            regularprice: productItem.dregularprice,
            saleprice: productItem.dsaleprice
          };
        }
      }
    } else {
      if (productItem.producttype === "simple" || productItem.combo) {
        tempVariable = {
          ...productItem,
          regularprice: productItem.dregularprice,
          saleprice: productItem.dsaleprice
        };
      }
    }

    return tempVariable;
  }
};
export const changeCartItemVariation = (
  varValue,
  names,
  item,
  indexingNo,
  list
) => {
  if (names === "qty") {
    return {
      approve: false,
      update: {
        oldItem: item,
        newItem: { ...item, [names]: varValue },
        remove: null
      }
    };
  } else {
    const totalVariation = getTotalVariation(item);

    const foundItem = list.find((el, index) => {
      const innerFlag = totalVariation
        .map(varEl => {
          if (el[varEl]) {
            if (varEl === names) {
              return el[varEl].value === varValue.value;
            }
            return el[varEl].value === item[varEl].value;
          } else {
            return null;
          }
        })
        .filter(el => el !== null);

      return (
        el.productid._id === item.productid._id &&
        innerFlag.every(el => el) &&
        index !== indexingNo
      );
    });
    if (foundItem !== undefined && foundItem !== null) {
      const totalQty = parseInt(foundItem.qty) + parseInt(item.qty);
      const qty = totalQty;

      if (item.subscribed || foundItem.subscribed) {
        return {
          approve: true,
          update: {
            oldItem: foundItem,
            newItem: {
              ...foundItem,
              [names]: varValue,
              qty,
              subscribed: true,
              subscribedDiscountPersent: item.subscribedDiscountPersent,
              subscribedTime: item.subscribedTime
            },
            remove: item
          }
        };
      } else {
        return {
          approve: false,
          update: {
            oldItem: foundItem,
            newItem: {
              ...foundItem,
              [names]: varValue,
              qty
            },
            remove: item
          }
        };
      }
    } else {
      return {
        approve: false,
        update: {
          oldItem: item,
          newItem: {
            ...item,
            [names]: varValue
          },
          remove: null
        }
      };
    }
  }
};
export const verifyProduct = (productItem, items = []) => {
  const totalVariation = getTotalVariation(productItem);

  const foundItem = items.find(el => {
    const innerFlag = totalVariation
      .map(varEl => {
        if (el[varEl]) {
          return el[varEl].value === productItem[varEl].value;
        } else {
          return null;
        }
      })
      .filter(el => el !== null)
      .every(el => el);

    if (!innerFlag) return innerFlag;

    if (el.combo && productItem.combo) return el._id === productItem._id;

    if (el.combo) return el._id === productItem.productid._id;

    if (productItem.combo) return el.productid._id === productItem._id;

    return el.productid._id === productItem.productid._id;
  });

  if (foundItem !== undefined && foundItem !== null) {
    const totalQty =
      parseInt(foundItem.qty) + parseInt(productItem.qty);
    const qty = totalQty;
    const tempNewItem = {
      ...foundItem,
      subscribed: productItem.subscribed
    };
    if (productItem.subscribed) {
      const {
        subscribed,
        subscribedDiscountPersent,
        subscribedTime
      } = productItem;
      return {
        found: foundItem,
        item: {
          ...foundItem,
          qty: qty,
          subscribed,
          subscribedDiscountPersent,
          subscribedTime
        }
      };
    } else if (foundItem.subscribed) {
      const {
        subscribedDiscountPersent,
        subscribedTime,
        ...newItem
      } = tempNewItem;
      return {
        found: foundItem,
        item: {
          ...newItem
        }
      };
    }
    return {
      found: foundItem,
      item: {
        ...foundItem,
        qty: qty,
        subscribed: productItem.subscribed
      }
    };
  }
  return {
    found: null,
    item: {
      ...productItem
    }
  };
};
export const addItem = (state, newItem) => {
  const { found, item } = verifyProduct(newItem, state.items);

  if (found) {
    return modifyProduct(found, item, state);
  }
  const newItems = [...state.items, newItem];

  return {
    ...state,
    items: newItems,
    subTotal: returnSubTotal(newItems) || 0,
    unSubscribeProductAmount: returnUnSubscribeTotal(newItems) || 0,
    totalWeight: getTotalWeight(newItems),
    totalVolume: getTotalVolume(newItems)
  };
};
export const setSlugInCart = cart => {
  return {
    ...cart,
    items: cart.items ? cart.items.map(el => addSlugToProduct(el)) : []
  };
};
export const modifyProduct = (oldItem, newItem, state) => {
  const NewItems = state.items.map(el => {
    if (el._id === newItem._id) {
      if (el === oldItem) {
        return variablePriceSet(newItem);
      }
    }
    return el;
  });
  if (oldItem !== newItem) {
    return {
      ...state,
      items: [...NewItems],
      subTotal: returnSubTotal(NewItems) || 0,
      unSubscribeProductAmount: returnUnSubscribeTotal(NewItems) || 0,
      totalWeight: getTotalWeight(NewItems),
      totalVolume: getTotalVolume(NewItems)
    };
  }
  return state;
};
export const removeItem = (state, item) => {
  const newItems = [...state.items.filter(el => el !== item)];
  return {
    ...state,
    items: newItems,
    subTotal: returnSubTotal(newItems) || 0,
    unSubscribeProductAmount: returnUnSubscribeTotal(newItems) || 0,
    totalWeight: getTotalWeight(newItems),
    totalVolume: getTotalVolume(newItems)
  };
};
export const getItemsHeightWidth = items => {
  var height = 0;
  var width = 0;
  var length = 0;
  var weight = 0;
  function flatten(arr) {
    return arr.reduce(function (flat, toFlatten) {
      return flat.concat(
        Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
      );
    }, []);
  }
  const item = flatten(
    items.map(el => {
      const qty = el.qty ? parseInt(el.qty) : 1;
      if (qty > 1) return new Array(qty).fill(el);

      return el;
    })
  );
  const getGreater = (a, b) => {
    if (a > b) return a;
    return b;
  };
  if (item.length > 0) {
    item.forEach(itm => {
      weight = weight + itm.weight;
    });
  }
  const itemsB = items.map(el => ({
    h: el.shipping_height,
    l: el.shipping_length,
    w: el.shipping_width,
    qty: el.qty
  }))
  const itemsC = [].concat.apply([], itemsB);
  const itemsC1 = itemsC.map( el => new Array(el.qty).fill(el) ).flat()
  const itemsD = combineLoop(itemsC1)[0]

  return {
    height: itemsD.h,
    width: itemsD.w,
    length: itemsD.l,
    weight
  };
}
export const filterShippingRates = rateArr => {
  if (rateArr.length > 0) {
    const filteredRates = _.uniqBy(rateArr, function (e) {
      return e.service;
    });
    const smallSorted = filteredRates.sort((a, b) => parseFloat(a.rate || 0) - parseFloat(b.rate || 0))
    const Smallest = smallSorted[0];
    const Smallest1 = smallSorted[1];
    const Smallest2 = smallSorted[2];
    const PriorityRaw = filteredRates.find(el => el.service === "Priority");
    const ExpressRaw = filteredRates.find(el => el.service === "Express");
    const {
      shippingExtraRate
    } = projectSettings
    const standard = Smallest && {
      ...Smallest,
      customName: "Standard",
      customRate: parseFloat(Smallest.rate) + shippingExtraRate
    };
    const Priority = Smallest1 && {
      ...Smallest1,
      customName: "Priority",
      customRate: parseFloat(Smallest1.rate) + shippingExtraRate
    };
    const Express = Smallest2 && {
      ...Smallest2,
      customName: "Express",
      customRate: parseFloat(Smallest2.rate) + shippingExtraRate
    };
    return [standard, Priority, Express].filter(el => el);
  }
  return rateArr;

};
// --------------------------

const multiply = (a, b) => {
  return parseFloat(a) * parseFloat(b);
}
const getSelectedAttributes = item => {
  if (item.producttype === "variable")
    return item.attributes
      .map(el => ({
        [el.names]: item[el.names].value
      }))
      .filter(el => el)
      .reduce(
        (a, b) => ({
          ...a,
          ...b
        }),
        {}
      );
  return null;
};
const getDiscount = (discount, subTotal) => {
  return (discount * subTotal) / 100 || 0;
}
const removeEmpty = obj => {
  Object.keys(obj).forEach(key => obj[key] === null && delete obj[key]);
};
const parseOrderProduct = (item) => {
  console.log({ item });
  const isCombo = item.combo ? true : false,
    comboId = item.combo ? item._id : null,
    productId = item.combo ? null : item.productid._id,
    productMeta = item.combo ? null : item._id,
    isSubscribed = item.subscribed ? true : false,
    subscriptionMeta = item.subscribed
      ? {
          duration: item.subscribedTime
        }
      : null,
    itemId = item._id,
    _id = item._id,
    qty = item.qty,
    title = item.combo ? item.title : item.productid.producttitle,
    unitPrice = item.saleprice ? item.saleprice : item.regularprice,
    subTotal = item.saleprice
      ? multiply(item.saleprice, item.qty)
      : multiply(item.regularprice, item.qty),
    attribute = getSelectedAttributes(item),
    height = item.shipping_height,
    width = item.shipping_width,
    length = item.shipping_length,
    volume = item.volume,
    weight = item.weight;

  const order = {
    isCombo,
    comboId,
    productId,
    productMeta,
    isSubscribed,
    subscriptionMeta,
    itemId,
    _id,
    qty,
    unitPrice,
    subTotal,
    attribute,
    width,
    length,
    height,
    title,
    volume,
    weight
  };
  removeEmpty(order);
  return order;
}
const getHeightWeight = (items) => {
  console.log({ items });
  const height = items.map(el => el.height * parseFloat(el.qty));
  const width = items.map(el => el.width * parseFloat(el.qty));
  const length = items.map(el => el.length * parseFloat(el.qty));
  console.log({
    height: height.reduce((a, b) => a + b, 0),
    width,
    length
  });
  const shape = {
    height: height.reduce((a, b) => a + b, 0),
    width: width.reduce((a, b) => a + b, 0),
    length: length.reduce((a, b) => a + b, 0)
  };
  return shape;
}
export const getGrandTotal = (subTotal, taxPercent, shippingCharge, discount) => {
  const amountWithTax = subTotal + (taxPercent || 0) * subTotal + shippingCharge;
  const discountAmount = getDiscount(discount, subTotal);
  const total =
  parseFloat(amountWithTax || 0) - parseFloat(discountAmount || 0);
  console.log({amountWithTax, discountAmount})
  return parseFloat(total.toFixed(2));
}
export const generateOrderObj = ({stateObj,
  referralId,
  cart,
  user,
  confirmShipRes}) => {
    console.log({stateObj,
      referralId,
      cart,
      user,
      confirmShipRes})
    const { service, ...confirmRest } = confirmShipRes;
    const { paymentMethod, address } = stateObj;
    const {
      addressStr,
      ...addressRest
    } = address
    const {
      items,
      shippingCharge,
      subTotal,
      totalWeight,
      totalVolume,
      taxValue,
      taxPercent,
      taxCouponDiscount,
      taxCouponCode
    } = cart;
    const orderProducts = items.map(el => parseOrderProduct(el));
    const {
      height: totalHeight,
      length: totalLength,
      width: totalWidth
    } = getHeightWeight(orderProducts);
    const order = {
      totalVolume,
      totalWeight,
      shippingMethod: service,
      products: orderProducts,
      countryTax: (taxPercent || 0) * 100,
      taxAmount:
        taxValue ||
        parseFloat(cart.subTotal || 0) * parseFloat(taxPercent || 0) ||
        0,
      shippingCharge,
      userDetails: {
        address: addressStr,
        ...addressRest
      },
      orderStatus: projectSettings.defaultOrderStatus,
      paymentMethod: paymentMethod === "stripe" ? "Authorize" : paymentMethod,
      status: projectSettings.defaultStatusInOrder,
      wholeSubtotal: parseFloat(subTotal.toFixed(2)),
      wasReferred: referralId ? true : false,
      referral: referralId ? referralId : null,
      isCoupon: taxCouponCode ? true : false,
      couponId: taxCouponCode,
      couponDisc: taxCouponCode ? taxCouponDiscount : null,
      grandTotal: getGrandTotal(
        subTotal,
        taxPercent,
        shippingCharge,
        taxCouponDiscount
      ),
      isGuest: user._id ? false : true,
      userId: user._id ? user._id : null,
      userMetaId: user.userMetaId ? user.userMetaId : null,
      totalHeight,
      totalWidth,
      totalLength,
      refPercentage: projectSettings.referralPresent,
      ...confirmRest
    };
    removeEmpty(order);
    return order;
}