const isEmail = email => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  return false;
};

const isEmpty = string => {
  if (string.trim() === "") return true;
  return false;
};

exports.validateSignUpData = data => {
  let errors = {};

  if (isEmpty(data.email)) errors.email = "Empty";
  else if (!isEmail(data.email)) errors.email = "Invalid Email";
  if (isEmpty(data.password)) errors.password = "Empty";
  if (data.password !== data.confirmPassword) errors.confirmPassword = "Not Match";
  if (isEmpty(data.handle)) errors.handle = "Empty";

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
