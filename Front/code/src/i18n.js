import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const DETECTION_OPTIONS = {
  order: ['querystring', 'navigator']
};

i18n
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  .init({
    detection: DETECTION_OPTIONS,
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          signUpSideMessage: 'Subscribe for the best promotions with WinPriz',
          signUpMainTitle: 'Get started absolutely free.',
          signUpSecondaryTitle: 'Free forever. No credit card needed.',
          registerForm: {
            name: {
              label: 'Full name',
              short: 'Too short!',
              long: 'Too long!',
              required: 'Full name is required'
            },
            email: {
              label: 'Email address',
              validFormat: 'Email must be a valid email address',
              required: 'Email is required'
            },
            password: {
              label: 'Password',
              emailIncluded: 'Email cannot be included in password',
              minLength: 'Must contain at least 9 characters',
              lowercase: 'One lowercase',
              uppercase: 'One uppercase',
              number: 'One number',
              specialCharacter: 'One Special Case Character of -;!$%^&*()_+|~=`{}[]:"\'<>?,./',
              required: 'Password is required'
            }
          },
          registerButton: 'Sign up',
          signInSideMessage: 'Hi, Welcome back',
          signInMainTitle: 'Sign in to WinPrize',
          signInSecondaryTitle: 'Enter your details below.',
          rememberMe: 'Remember me',
          signInButton: 'Login',
          signInForm: {
            email: {
              label: 'Email address',
              validFormat: 'Email must be a valid email address',
              required: 'Email is required'
            },
            password: {
              label: 'Password',
              required: 'Password is required'
            }
          },
          recoverPasswordForm: {
            confirmPassword: {
              label: 'Confirm password',
              required: 'Confirm password is required',
              notMatch: 'Confirm password do not match with password'
            }
          },
          alert: {
            success: {
              label: 'Success',
              signUpMessage: 'Sign up Successfully',
              lopdMessage: 'Upload it successfully',
              updateProfileMessage: 'Profile updated successfully'
            },
            failure: {
              label: 'Error',
              signUpMessage: 'Sign up fails',
              lopdMessage: 'Failure to save',
              updateProfileMessage: 'Failure to update profile'
            },
            forgotPassword: {
              success: {
                label: 'Email sended!',
                signUpMessage: 'Check your mailbox.'
              }
            },
            recoverPassword: {
              success: {
                label: '¡Password changed!',
                signUpMessage: 'Try to log in'
              }
            },
            serverConflicts: {
              unreachable: 'Server with problems'
            }
          },
          buttons: {
            download: 'Download',
            upload: 'Upload',
            goIn: 'Go in',
            logout: 'Logout',
            downloadSignedLopd: 'Download signed LOPD',
            saveDetails: 'Save details',
            skip: 'Skip',
            register: 'register',
            signIn: 'Sign In',
            submit: 'Submit'
          },
          welcomeToTheApp: 'Welcome to the App',
          lopd: {
            mainTitle: "Now it's the time to upload LOPD",
            secondaryTitle: 'Download, sign and upload it!',
            validateMessage: 'The signed document must be a pdf'
          },
          profileEditingForm: {
            mainTitle: 'Personal Information',
            secondaryTitle: 'The information can be edited',
            // name: {
            //   label: 'Nombre completo',
            //   short: '¡Muy corto!',
            //   long: '¡Muy largo!',
            //   required: 'El nombre completo es requerido'
            // },
            // email: {
            //   label: 'Email',
            //   validFormat: 'El email debe ser una dirección de email válido',
            //   required: 'El email es requerido'
            // },
            password: {
              label: 'New password',
              emailIncluded: 'El email no puede estar contenido',
              minLength: 'Debe contener al menos 9 caracteres',
              lowercase: 'Una minúscula',
              uppercase: 'Una mayúscula',
              number: 'Un número',
              specialCharacter: 'Un carácter especial de entre -;!$%^&*()_+|~=`{}[]:"\'<>?,./',
              required: 'La contraseña es requerida'
            },
            repitNewPassword: {
              label: 'Repit the new password',
              notSame: 'Both fields are noth the same',
              required: 'This field is required to change the password'
            }
          },
          accountPopover: {
            menuOptions: {
              home: 'Home',
              profile: 'Profile',
              settings: 'Settings'
            }
          },
          sideBarNav: {
            profile: 'profile',
            clients: 'clients'
          },
          acctivateAccount: {
            success: {
              sideMessage: 'Account activated',
              mainTitle: 'Congratulations!',
              secondaryTitle: 'You are now a user through and through.'
            },
            failure: {
              sideMessage: 'Opps, there was a problem',
              serverUnreachable: 'Server does not respond',
              alreadyActivate: 'This user already has an activated account'
            }
          },
          unblockAccount: {
            success: {
              mainTitle: 'Account unblocked!',
              secondaryTitle: 'Log in again'
            },
            failure: {
              mainTitle: 'Opps, there was a problem',
              serverUnreachable: 'Server does not respond',
              alreadyActivate: 'This user has already unblocked his account'
            }
          },
          forgotPassword: {
            mainTitle: 'Forgot password?',
            secondaryTitle: 'Please enter your email address below'
          },
          recoverPassword: {
            mainTitle: 'Recover your password',
            secondaryTitle: 'Please enter a new password below'
          }
        }
      },
      es: {
        translation: {
          signUpAuthLayout: '¿Tienes una cuenta? <1>Inicia sesión</1>',
          signUpSideMessage: 'Apuntante a las mejores promociones con WinPrize',
          signUpMainTitle: 'Empieza absolutamente gratis',
          signUpSecondaryTitle: 'Gratis para siempre. Sin necesidad de tarjetas',
          registerForm: {
            name: {
              label: 'Nombre completo',
              short: '¡Muy corto!',
              long: '¡Muy largo!',
              required: 'El nombre completo es requerido'
            },
            email: {
              label: 'Email',
              validFormat: 'El email debe ser una dirección de email válido',
              required: 'El email es requerido'
            },
            password: {
              label: 'Contraseña',
              emailIncluded: 'El email no puede estar contenido',
              minLength: 'Debe contener al menos 9 caracteres',
              lowercase: 'Una minúscula',
              uppercase: 'Una mayúscula',
              number: 'Un número',
              specialCharacter: 'Un carácter especial de entre -;!$%^&*()_+|~=`{}[]:"\'<>?,./',
              required: 'La contraseña es requerido'
            }
          },
          registerButton: 'Regístrate',
          signInAuthLayout: '¿No tienes una cuenta? <1>Regístrate</1>',
          signInSideMessage: 'Hola, Bienvenido de nuevo',
          signInMainTitle: 'Inicia sesión en WinPrize.',
          signInSecondaryTitle: 'Introduce tus credenciales',
          rememberMe: 'Recordar cuenta',
          signInButton: 'Iniciar sesión',
          signInForm: {
            email: {
              label: 'Email',
              validFormat: 'El email debe ser una dirección de email válido',
              required: 'El email es requerido'
            },
            password: {
              label: 'Contraseña',
              required: 'La contraseña es requerida'
            }
          },
          recoverPasswordForm: {
            confirmPassword: {
              label: 'Confirmar contraseña',
              required: 'La confirmación de contraseña es requerida',
              notMatch: 'La confirmación de contraseña no coincide con la contraseña'
            }
          },
          alert: {
            success: {
              label: '¡Hurra!',
              signUpMessage: 'Registro exitoso',
              lopdMessage: 'LOPD guarda correctamente',
              updateProfileMessage: 'Perfil actualizado correctamente'
            },
            failure: {
              label: 'Error',
              signUpMessage: 'Error en el registro',
              lopdMessage: 'Fallo al guardar LOPD',
              updateProfileMessage: 'Fallo al actualizar los datos'
            },
            forgotPassword: {
              success: {
                label: '¡Email enviado!',
                signUpMessage: 'Revisa tu bandeja de correo'
              }
            },
            recoverPassword: {
              success: {
                label: '¡Contraseña modificada!',
                signUpMessage: 'Intenta loguearte'
              }
            },
            serverConflicts: {
              unreachable: 'Servidor con problemas'
            }
          },
          buttons: {
            download: 'Descargar',
            upload: 'Subir',
            goIn: 'Entra',
            logout: 'Cerrar sesión',
            downloadSignedLopd: 'Descarga LOPD firmada',
            saveDetails: 'Guardar datos',
            skip: 'Saltar',
            register: 'Registrarse',
            signIn: 'Iniciar sesión',
            submit: 'Enviar'
          },
          welcomeToTheApp: 'Bienvenido a la aplicación',
          lopd: {
            mainTitle: 'Ahora es el momento de subir la LOPD',
            secondaryTitle: 'Descárgalo, fírmalo y súbelo.',
            validateMessage: 'El documento firmado debe ser pdf'
          },
          profileEditingForm: {
            mainTitle: 'Información personal',
            secondaryTitle: 'Esta información puede ser modificada',
            // name: {
            //   label: 'Nombre completo',
            //   short: '¡Muy corto!',
            //   long: '¡Muy largo!',
            //   required: 'El nombre completo es requerido'
            // },
            // email: {
            //   label: 'Email',
            //   validFormat: 'El email debe ser una dirección de email válido',
            //   required: 'El email es requerido'
            // },
            password: {
              label: 'Nueva contraseña',
              emailIncluded: 'El email no puede estar contenido',
              minLength: 'Debe contener al menos 9 caracteres',
              lowercase: 'Una minúscula',
              uppercase: 'Una mayúscula',
              number: 'Un número',
              specialCharacter: 'Un carácter especial de entre -;!$%^&*()_+|~=`{}[]:"\'<>?,./'
            },
            repitNewPassword: {
              label: 'Repite la nueva contraseña',
              notSame: 'No coinciden ambos campos',
              required: 'Este campo es obligatorio para cambiar la contraseña'
            }
          },
          accountPopover: {
            menuOptions: {
              home: 'Home',
              profile: 'Perfil',
              settings: 'Ajustes'
            }
          },
          sideBarNav: {
            profile: 'perfil',
            clients: 'clientes'
          },
          acctivateAccount: {
            success: {
              sideMessage: 'Cuenta activada',
              mainTitle: '¡Enhorabuena!',
              secondaryTitle: 'Ahora ya eres un usuario de pies a cabeza.'
            },
            failure: {
              sideMessage: 'Opps, ha habido algún problema',
              serverUnreachable: 'No se ha podido alcanzar el servidor',
              alreadyActivate: 'Este usuario ya posee la cuenta activa'
            }
          },
          unblockAccount: {
            success: {
              mainTitle: '¡Cuenta desbloqueada!',
              secondaryTitle: 'Inicia sesión nuevamente'
            },
            failure: {
              mainTitle: 'Opps, ha habido algún problema',
              serverUnreachable: 'No se ha podido alcanzar el servidor',
              alreadyActivate: 'Este usuario ya posee tiene la cuenta desbloqueada'
            }
          },
          forgotPassword: {
            mainTitle: '¿Olvidaste tu contraseña?',
            secondaryTitle: 'Por favor, introduzca su correo electrónico'
          },
          recoverPassword: {
            mainTitle: 'Recupera tu contraseña',
            secondaryTitle: 'Por favor, introduzca una nueva contraseña'
          }
        }
      }
    }
  });

export default i18n;
