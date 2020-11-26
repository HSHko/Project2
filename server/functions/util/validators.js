const isEmpty = (data) => {
  if (data.trim() === "") return true;
  return false;
};

const issign_id = (data) => {
  if (isEmpty(data)) return false;

  const regax = /^[a-z0-9]{4,20}$/;
  if (data.match(regax)) return true;
  return false;
};

const isPassword = (data) => {
  if (isEmpty(data)) return false;

  const regax = /^.{4,100}$/;
  if (data.match(regax)) return true;
  return false;
};

const isEmail = (data) => {
  if (isEmpty(data)) return false;

  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (data.match(regex)) return true;
  return false;
};

exports.validateSignUpData = (data) => {
  let errors = {};

  if (!issign_id(data.sign_id)) errors.sign_id = "Invalid";
  if (!isPassword(data.password)) errors.sign_id = "Invalid";
  if (!isEmail(data.email)) errors.email = "Invalid";
  if (data.password !== data.confirm_password)
    errors.confirm_password = "Not Match";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.validateLoginData = (data) => {
  let errors = {};

  if (isEmpty(data.email)) errors.email = "Empty";
  if (isEmpty(data.password)) errors.password = "Empty";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.validateLoginData = (data) => {
  let errors = {};

  if (isEmpty(data.email)) errors.email = "Must not be empty";
  if (isEmpty(data.password)) errors.password = "Must not be empty";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};
