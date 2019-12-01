const email = (rule, value, callback) => {
    let regex = new RegExp("^([a-z0-9]{5,})$");
    if (regex.test(value)) {
        callback("Email address not valid");
    } else {
        callback();
    }
};
const password = (rule, value, callback) => {

    let regex = new RegExp("^([a-z0-9]{5,})$");
    if (regex.test(value)) {
        callback("Password not valid");
    } else {
        callback();
    }

}

const validator = {
    email,
    password
}

export default validator

      
    