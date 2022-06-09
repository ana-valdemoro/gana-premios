import * as Yup from 'yup';
import i18n from '../../i18n';

const createClientSchema = Yup.object().shape({
  name: Yup.string()
    .test({
      name: 'custom-name-test',
      test: function checkClientName(name, context) {
        if (!name) {
          return context.createError({
            message: i18n.t('clientForm.name.required'),
            path: `name`
          });
        }

        if (name.length < 20) {
          return context.createError({
            message: i18n.t('clientForm.name.minLength'),
            path: `name`
          });
        }

        if (name.length > 100) {
          return context.createError({
            message: i18n.t('clientForm.name.maxLength'),
            path: `name`
          });
        }

        return true;
      }
    })
    .required(i18n.t('clientForm.name.required')),
  manager: Yup.string()
    .test({
      name: 'custom-manager-test',
      test: function checkClientManager(manager, context) {
        if (!manager) {
          return context.createError({
            message: i18n.t('clientForm.manager.required'),
            path: `manager`
          });
        }

        if (manager.length < 20) {
          return context.createError({
            message: i18n.t('clientForm.manager.minLength'),
            path: `manager`
          });
        }

        if (manager.length > 100) {
          return context.createError({
            message: i18n.t('clientForm.manager.maxLength'),
            path: `manager`
          });
        }

        return true;
      }
    })
    .required(i18n.t('clientForm.manager.required')),
  numberPromotionsActive: Yup.number().test({
    name: 'custom-number-of-active-promotions-test',
    test: function checkNumberPromotionsActive(numberPromotionsActive, context) {
      if (numberPromotionsActive == null) {
        return context.createError({
          message: i18n.t('clientForm.numberPromotionsActive.required'),
          path: `numberPromotionsActive`
        });
      }

      if (!Number.isInteger(numberPromotionsActive)) {
        return context.createError({
          message: i18n.t('clientForm.numberPromotionsActive.integer'),
          path: `numberPromotionsActive`
        });
      }

      if (numberPromotionsActive < 1 || numberPromotionsActive > 10) {
        return context.createError({
          message: i18n.t('clientForm.numberPromotionsActive.permissibleNumber'),
          path: `numberPromotionsActive`
        });
      }

      return true;
    }
  })
});

export default createClientSchema;
