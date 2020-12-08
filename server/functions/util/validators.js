const { regex } = require("./regex");

const isEmpty = (data) => {
  if (data === undefined) return true;
  if (data.trim() === "") return true;
  return false;
};

const isSignId = (data) => {
  if (data.match(regex.validSignId)) return true;
  return false;
};

const isPassword = (data) => {
  if (data.match(regex.validPassword)) return true;
  return false;
};

const isEmail = (data) => {
  if (data.match(regex.isEmail)) return true;
  return false;
};

exports.validateSignUpData = (data) => {
  let errors = {};

  if (isEmpty(data.sign_id)) errors.sign_id = "empty";
  else if (!isSignId(data.sign_id)) errors.sign_id = "invalid";
  if (isEmpty(data.email)) errors.email = "empty";
  else if (!isEmail(data.email)) errors.email = "invalid";
  if (isEmpty(data.password)) errors.password = "empty";
  else if (!isPassword(data.password)) errors.password = "invalid";
  if (isEmpty(data.confirm_password)) errors.confirm_password = "empty";
  else if (data.password !== data.confirm_password)
    errors.confirm_password = "invalid";

  return {
    errors,
    isValid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.validateSignInData = (data) => {
  let errors = {};

  if (isEmpty(data.email)) errors.email = "empty";
  else if (!isEmail(data.email)) errors.email = "invalid";
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
