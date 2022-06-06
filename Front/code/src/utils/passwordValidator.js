import i18n from '../i18n';

export const userEmailsIsIncluded = (email, password) => {
  const [userName, domain] = email.split('@');
  return password.includes(userName) || password.includes(domain);
};

/**
 * @param {string} password to validate
 * @param {*} context
 * @returns true, in case of pass the password validation
 * @returns  some type of error created through context
 */
export default function validatePassword(password, context) {
  const { email } = context.parent;
  const errors = [];
  if (!password) {
    return this.createError({
      message: i18n.t('registerForm.password.required'),
      path: `password`
    });
  }

  if (email && userEmailsIsIncluded(email.toLowerCase(), password.toLowerCase())) {
    errors.push(i18n.t('registerForm.password.emailIncluded'));
  }

  if (password.length < 9) {
    errors.push(i18n.t('registerForm.password.minLength'));
  }

  const lowercase = new RegExp(/^(?=.*[a-z]).{1,}$/);
  if (!lowercase.test(password)) {
    errors.push(i18n.t('registerForm.password.lowercase'));
  }

  const uppercase = new RegExp(/^(?=.*[A-Z]).{1,}$/);
  if (!uppercase.test(password)) {
    errors.push(i18n.t('registerForm.password.uppercase'));
  }

  const number = new RegExp(/^(?=.*[0-9]).{1,}$/);
  if (!number.test(password)) {
    errors.push(i18n.t('registerForm.password.number'));
  }

  // eslint-disable-next-line no-useless-escape
  const symbols = new RegExp(/^(?=.*[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]).{1,}$/);
  if (!symbols.test(password)) {
    errors.push(i18n.t('registerForm.password.specialCharacter'));
  }

  return errors.length > 0
    ? this.createError({
        message: `${errors.join(', ')}`,
        path: `password`
      })
    : true;
}
