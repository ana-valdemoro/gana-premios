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
                label: '??Password changed!',
                signUpMessage: 'Try to log in'
              }
            },
            serverConflicts: {
              unreachable: 'Server with problems'
            },
            createClient: {
              success: {
                label: 'Client created!'
              }
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
            submit: 'Submit',
            addClient: 'Add client',
            create: 'Create'
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
            //   short: '??Muy corto!',
            //   long: '??Muy largo!',
            //   required: 'El nombre completo es requerido'
            // },
            // email: {
            //   label: 'Email',
            //   validFormat: 'El email debe ser una direcci??n de email v??lido',
            //   required: 'El email es requerido'
            // },
            password: {
              label: 'New password',
              emailIncluded: 'El email no puede estar contenido',
              minLength: 'Debe contener al menos 9 caracteres',
              lowercase: 'Una min??scula',
              uppercase: 'Una may??scula',
              number: 'Un n??mero',
              specialCharacter: 'Un car??cter especial de entre -;!$%^&*()_+|~=`{}[]:"\'<>?,./',
              required: 'La contrase??a es requerida'
            },
            repitNewPassword: {
              label: 'Repit the new password',
              notSame: 'Both fields are noth the same',
              required: 'This field is required to change the password'
            }
          },
          clientForm: {
            name: {
              label: 'Name',
              required: 'Client name is required',
              minLength: 'Must contain at least 20 characters',
              maxLength: 'Must contain less than 100 characters'
            },
            manager: {
              label: 'Manager',
              required: 'Manager is required',
              minLength: 'Must contain at least 20 characters',
              maxLength: 'Must contain less than 250 characters'
            },
            numberPromotionsActive: {
              label: 'Number of active promotions',
              required: 'Number of active promotions is required',
              permissibleNumber: 'Must have between 1 and 10 promotions',
              integer: 'Must be an integer value'
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
          signUpAuthLayout: '??Tienes una cuenta? <1>Inicia sesi??n</1>',
          signUpSideMessage: 'Apuntante a las mejores promociones con WinPrize',
          signUpMainTitle: 'Empieza absolutamente gratis',
          signUpSecondaryTitle: 'Gratis para siempre. Sin necesidad de tarjetas',
          registerForm: {
            name: {
              label: 'Nombre completo',
              short: '??Muy corto!',
              long: '??Muy largo!',
              required: 'El nombre completo es requerido'
            },
            email: {
              label: 'Email',
              validFormat: 'El email debe ser una direcci??n de email v??lido',
              required: 'El email es requerido'
            },
            password: {
              label: 'Contrase??a',
              emailIncluded: 'El email no puede estar contenido',
              minLength: 'Debe contener al menos 9 caracteres',
              lowercase: 'Una min??scula',
              uppercase: 'Una may??scula',
              number: 'Un n??mero',
              specialCharacter: 'Un car??cter especial de entre -;!$%^&*()_+|~=`{}[]:"\'<>?,./',
              required: 'La contrase??a es requerido'
            }
          },
          registerButton: 'Reg??strate',
          signInAuthLayout: '??No tienes una cuenta? <1>Reg??strate</1>',
          signInSideMessage: 'Hola, Bienvenido de nuevo',
          signInMainTitle: 'Inicia sesi??n en WinPrize.',
          signInSecondaryTitle: 'Introduce tus credenciales',
          rememberMe: 'Recordar cuenta',
          signInButton: 'Iniciar sesi??n',
          signInForm: {
            email: {
              label: 'Email',
              validFormat: 'El email debe ser una direcci??n de email v??lido',
              required: 'El email es requerido'
            },
            password: {
              label: 'Contrase??a',
              required: 'La contrase??a es requerida'
            }
          },
          recoverPasswordForm: {
            confirmPassword: {
              label: 'Confirmar contrase??a',
              required: 'La confirmaci??n de contrase??a es requerida',
              notMatch: 'La confirmaci??n de contrase??a no coincide con la contrase??a'
            }
          },
          alert: {
            success: {
              label: '??Hurra!',
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
                label: '??Email enviado!',
                signUpMessage: 'Revisa tu bandeja de correo'
              }
            },
            recoverPassword: {
              success: {
                label: '??Contrase??a modificada!',
                signUpMessage: 'Intenta loguearte'
              }
            },
            serverConflicts: {
              unreachable: 'Servidor con problemas'
            },
            createClient: {
              success: {
                label: '??Cliente creado!'
              }
            }
          },
          buttons: {
            download: 'Descargar',
            upload: 'Subir',
            goIn: 'Entra',
            logout: 'Cerrar sesi??n',
            downloadSignedLopd: 'Descarga LOPD firmada',
            saveDetails: 'Guardar datos',
            skip: 'Saltar',
            register: 'Registrarse',
            signIn: 'Iniciar sesi??n',
            submit: 'Enviar',
            addClient: 'A??adir cliente'
          },
          welcomeToTheApp: 'Bienvenido a la aplicaci??n',
          lopd: {
            mainTitle: 'Ahora es el momento de subir la LOPD',
            secondaryTitle: 'Desc??rgalo, f??rmalo y s??belo.',
            validateMessage: 'El documento firmado debe ser pdf'
          },
          profileEditingForm: {
            mainTitle: 'Informaci??n personal',
            secondaryTitle: 'Esta informaci??n puede ser modificada',
            // name: {
            //   label: 'Nombre completo',
            //   short: '??Muy corto!',
            //   long: '??Muy largo!',
            //   required: 'El nombre completo es requerido'
            // },
            // email: {
            //   label: 'Email',
            //   validFormat: 'El email debe ser una direcci??n de email v??lido',
            //   required: 'El email es requerido'
            // },
            password: {
              label: 'Nueva contrase??a',
              emailIncluded: 'El email no puede estar contenido',
              minLength: 'Debe contener al menos 9 caracteres',
              lowercase: 'Una min??scula',
              uppercase: 'Una may??scula',
              number: 'Un n??mero',
              specialCharacter: 'Un car??cter especial de entre -;!$%^&*()_+|~=`{}[]:"\'<>?,./'
            },
            repitNewPassword: {
              label: 'Repite la nueva contrase??a',
              notSame: 'No coinciden ambos campos',
              required: 'Este campo es obligatorio para cambiar la contrase??a'
            }
          },
          clientForm: {
            name: {
              label: 'Nombre',
              required: 'Nombre es requerido',
              minLength: 'Debe tener al menos 20 caracteres',
              maxLength: 'Debe tener menos de 100 caracteres'
            },
            manager: {
              label: 'Responsable',
              required: 'Manager is required',
              minLength: 'Debe tener al menos 20 caracteres',
              maxLength: 'Debe tener menos de 250 caracteres'
            },
            numberPromotionsActive: {
              label: 'N??mero de promociones activas',
              required: 'Este campo es requerido',
              permissibleNumber: 'Debe tener entre 1 y 10 promociones',
              integer: 'Debe ser un n??mero entero'
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
              mainTitle: '??Enhorabuena!',
              secondaryTitle: 'Ahora ya eres un usuario de pies a cabeza.'
            },
            failure: {
              sideMessage: 'Opps, ha habido alg??n problema',
              serverUnreachable: 'No se ha podido alcanzar el servidor',
              alreadyActivate: 'Este usuario ya posee la cuenta activa'
            }
          },
          unblockAccount: {
            success: {
              mainTitle: '??Cuenta desbloqueada!',
              secondaryTitle: 'Inicia sesi??n nuevamente'
            },
            failure: {
              mainTitle: 'Opps, ha habido alg??n problema',
              serverUnreachable: 'No se ha podido alcanzar el servidor',
              alreadyActivate: 'Este usuario ya posee tiene la cuenta desbloqueada'
            }
          },
          forgotPassword: {
            mainTitle: '??Olvidaste tu contrase??a?',
            secondaryTitle: 'Por favor, introduzca su correo electr??nico'
          },
          recoverPassword: {
            mainTitle: 'Recupera tu contrase??a',
            secondaryTitle: 'Por favor, introduzca una nueva contrase??a'
          }
        }
      }
    }
  });

export default i18n;
