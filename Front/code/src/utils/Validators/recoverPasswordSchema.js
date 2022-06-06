import * as Yup from 'yup';
import i18n from '../../i18n';
import validatePassword from '../passwordValidator';

const recoverPasswordSchema = Yup.object().shape({
  password: Yup.string().test({
    password: 'validator-custom-password',
    // eslint-disable-next-line object-shorthand
    test: validatePassword
  }),
  confirmPassword: Yup.string().test({
    confirmPassword: 'custom-password-match',
    test: function equalityOfConfirmPassword(confirmPassword, context) {
      console.log(confirmPassword);
      if (!confirmPassword) {
        return context.createError({
          message: i18n.t('recoverPasswordForm.confirmPassword.required'),
          path: `confirmPassword`
        });
      }

      const { password } = context.parent;
      return password !== confirmPassword
        ? context.createError({
            message: i18n.t('recoverPasswordForm.confirmPassword.notMatch'),
            path: `confirmPassword`
          })
        : true;
    }
  }),
  recaptcha: Yup.string().required()
});
export default recoverPasswordSchema;
