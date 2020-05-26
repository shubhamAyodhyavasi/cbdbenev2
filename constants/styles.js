const fonts  = {
    mainfont: `'Montserrat', sans-serif`,
    subfont: `'Ovo', serif`,
}
const colors = {
    dark: "#333",
    lightGrey: "#ccc",
    gainsboro: "#dbdbdb",
    romanceAlter: "#dbdbdb" //#eceae2
};
const selectStyle = {
    valueContainer: styles => ({
      ...styles,
      backgroundColor: "transparent",
      padding: 0
    }),
    control: (styles, { isFocused, isSelected }) => ({
      ...styles,
      minHeight: "50px",
      height: "50px",
      border: `1px solid ${colors.lightGrey}`,
      borderRadius: "0",
      backgroundColor: "transparent",
      paddingLeft: "0.8889rem ",
      boxShadow: isFocused ? 0 : 0,
      "&:hover": {
        border: `1px solid ${colors.lightGrey}`
      }
    }),
    input: styles => ({
      ...styles,
      // fontSize: "1.6rem",
      "&:placeholder": {
        color: "rgba(65, 51, 183, 0.5)"
      }
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        fontFamily: fonts.mainfont,
        // fontSize: "1.6rem",
        color: colors.dark,
        backgroundColor: "transparent",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "rgba(197, 192, 240, 0.25)"
        }
      };
    },
    singleValue: styles => ({
      ...styles,
      fontFamily: fonts.mainfont,
      // fontSize: "1.6rem",
      color: colors.dark,
      fontWeight: "normal"
    }),
    placeholder: styles => ({
      ...styles,
      whiteSpace: "nowrap"
    }),
    dropdownIndicator: (styles, {isDisabled}) => ({
      ...styles,
      padding: "2px",
      display :isDisabled ? "none" : "block"
    }),
    indicatorSeparator: styles => ({
      ...styles,
      display: "none"
    }),
    menu: styles => ({
      ...styles,
      borderRadius: "0",
      border: `1px solid ${colors.lightGrey}`,
      marginTop: 0
    }),
    multiValueLabel: styles => ({
      ...styles,
      fontFamily: fonts.mainfont,
      // fontSize: "1.6rem",
      color: colors.dark
    }),
    multiValue: styles => ({
      ...styles,
      border: `1px solid ${colors.lightGrey}`,
      borderRadius: "0",
      backgroundColor: "rgba(197, 192, 240, 0.25)",
      fontFamily: fonts.mainfont,
      // fontSize: "1.6rem",
      color: colors.dark
    }),
    multiValueRemove: styles => ({
      ...styles,
      cursor: "pointer",
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: "transparent",
        color: colors.dark
      }
    })
  };
const selectStyleSmall = {
    ...selectStyle,
    control: (styles, { isFocused, isSelected }) => ({
      ...styles,
      minHeight: "40px",
      height: "40px",
      border: `1px solid ${colors.lightGrey}`,
      borderRadius: "0",
      backgroundColor: "transparent",
      paddingLeft: "0.8889rem ",
      boxShadow: isFocused ? 0 : 0,
      "&:hover": {
        border: `1px solid ${colors.lightGrey}`
      }
    }),
    singleValue: styles => ({
      ...styles,
      fontFamily: fonts.mainfont,
      color: colors.dark,
      fontWeight: "normal",
      lineHeight: "40px",
      fontSize: "14px"
    })
};


const styles = {
    fonts,
    colors,
    selectStyle,
    selectStyleSmall,
}

export default styles