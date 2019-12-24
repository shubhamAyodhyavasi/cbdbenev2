import { AllCountryObj } from "../../constants/allCountry";

export const encodeUrlFn = url => url.replace(/-/g, "_").replace(/ /g, "-");
export const numberFormat = (nbr) => {
    if (nbr === 0 && nbr === "") {
      return "0.00";
    } else {
      if (nbr) {

        var nr = parseFloat(nbr).toFixed(2);
        nr = nr.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(nr)) nr = nr.replace(pattern, "$1,$2");
        return nr;
      } else {
        return 0.0;
      }
    }
}

export const getParentage = (parValue, totalValue) => ((parseFloat(parValue) * parseFloat(totalValue)) / 100)

export const getSingleElementByMultipleObject = (arrayData, f) => {
  const result = arrayData.reduce(function(r, a) {
    r[a.carrier] = r[a.carrier] || [];
    r[a.carrier].push(a);
    return r;
  }, {});
  return result;
}


export const getCountryName = code => {
  let country = AllCountryObj.map(el => {
    if (el.code === code) {
      return el.name;
    }

    return null;
  });
  return country.join("");
};

export const getCountryCode = countryName => {
  let country = AllCountryObj.map(el => {
    if(countryName){
      if (el.name.trim().toLowerCase() === countryName.trim().toLowerCase()) {
        return el.code;
      }
    }

    return null;
  });
  return country.join("");
};
