export const encodeUrlFn = url => url.replace(/-/g, "_").replace(/ /g, "-");
export const numberFormat = (nbr) => {
    if (nbr === 0 && nbr === "") {
      return "0.00";
    } else {
      if (nbr) {
        var nr = nbr.toFixed(2);
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