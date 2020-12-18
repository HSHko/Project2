const { regex } = require("./regex");

exports.isEmpty = (data) => {
  if (data.trim() === "") return true;
  return false;
};

exports.isSignId = (data) => {
  if (data.match(regex.validSignId)) return true;
  return false;
};

exports.isPassword = (data) => {
  if (data.match(regex.validPassword)) return true;
  return false;
};

exports.isEmail = (data) => {
  if (data.match(regex.isEmail)) return true;
  return false;
};

exports.validateSignUpData = (data) => {
  let errors = {};

  if (!isEmpty(data.sign_id)) errors.sign_id = "empty";
  else if (!isSignId(data.sign_id)) errors.sign_id = "invalid format";
  if (!isEmpty(data.email)) errors.email = "empty";
  else if (!isEmail(data.email)) errors.email = "invalid format";
  if (!isEmpty(data.password)) errors.password = "empty";
  else if (!isPassword(data.password)) errors.password = "invalid format";
  if (!isEmpty(data.confirm_password)) errors.confirm_password = "empty";
  else if (data.password !== data.confirm_password)
    errors.confirm_password = "confirm password is not matching";

  return {
    errors,
    isValid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.validateLoginData = (data) => {
  let errors = {};

  if (isEmpty(data.email)) errors.email = "empty";
  if (isEmpty(data.password)) errors.password = "empty";

  return {
    errors,
    isValid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.validateLoginData = (data) => {
  let errors = {};

  if (isEmpty(data.email)) errors.email = "Must not be empty";
  if (isEmpty(data.password)) errors.password = "Must not be empty";

  return {
    errors,
    isValid: Object.keys(errors).length === 0 ? true : false,
  };
};
