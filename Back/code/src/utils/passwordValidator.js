// Private functions
const userEmailsIsIncluded = (email, password) => {
  const [userName, domain] = email.split('@');
  return password.includes(userName) || password.includes(domain);
};

// Public functions
const validatePasswordPattern = (email, password) => {
  const errors = [];
  if (email && userEmailsIsIncluded(email, password)) {
    errors.push('passwordIncludeEmail');
  }

  if (password.length < 9) {
    errors.push('minPasswordLength');
  }

  const number = new RegExp(/^(?=.*[0-9]).{1,}$/);
  if (!number.test(password)) {
    errors.push('passwordNotIncludeNumber');
  }

  const lowercase = new RegExp(/^(?=.*[a-z]).{1,}$/);
  if (!lowercase.test(password)) {
    errors.push('passwordNotIncludeLowercase');
  }

  const uppercase = new RegExp(/^(?=.*[A-Z]).{1,}$/);
  if (!uppercase.test(password)) {
    errors.push('passwordNotIncludeUppercase');
  }

  // Supported symbols : [-!$%^&*()_+|~=`{}[]:";'<>?,./]
  // eslint-disable-next-line no-useless-escape
  const symbols = new RegExp(/^(?=.*[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]).{1,}$/);
  if (!symbols.test(password)) {
    errors.push('passwordNotIncludeSymbol');
  }

  if (errors.length > 0) {
    return {
      status: false,
      errors,
    };
  }

  return { status: true };
};

module.exports = {
  validatePasswordPattern,
};
