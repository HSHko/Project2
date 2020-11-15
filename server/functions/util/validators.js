const isEmpty = data => {
  if (data.trim() === "") return true;
  return false;
};

const isSignId = data => {
  if (isEmpty(data)) return false;

  const regax = /^[a-z0-9]{4,20}$/;
  if (data.match(regax)) return true;
  return false;
};

const isPassword = data => {
  if (isEmpty(data)) return false;

  const regax = /^.{4,100}$/;
  if (data.match(regax)) return true;
  return false;
};

const isEmail = data => {
  if (isEmpty(data)) return false;

  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (data.match(regex)) return true;
  return false;
};

exports.validateSignUpData = data => {
  let errors = {};

  if (!isSignId(data.signId)) errors.signId = "Invalid";
  if (!isPassword(data.password)) errors.signId = "Invalid";
  if (!isEmail(data.email)) errors.email = "Invalid";
  if (data.password !== data.confirmPassword) errors.confirmPassword = "Not Match";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.validateLoginData = data => {
  let errors = {};

  if (isEmpty(data.email)) errors.email = "Empty";
  if (isEmpty(data.password)) errors.password = "Empty";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.validateLoginData = data => {
  let errors = {};

  if (isEmpty(data.email)) errors.email = "Must not be empty";
  if (isEmpty(data.password)) errors.password = "Must not be empty";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};
