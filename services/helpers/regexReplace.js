const regexReplace = {
    name: /[^a-zA-Z]/g,
    fullName: /[^a-zA-Z ]/g,
    onlyNumber: /[^0-9]/g,
    email: /\s/g,
    zipcode: /[^a-zA-Z0-9 ]/g,
    fullname: /[^a-zA-Z ]/g
};
export default regexReplace