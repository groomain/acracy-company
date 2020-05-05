import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'fr',
    debug: true,
    lng: 'fr',
    resources: {
      en: {
        translation: {
          // APP
          loginPageTitle: 'SignIn',
          email: 'Email',
          password: 'Password',
          confirmPassword: 'Confirm password',
          emailRequired: 'Please enter your email',
          passwordRequired: 'Please enter your password',
          loginSubmit: 'Login',
          signUpSubmit: 'Sign Up',
          signUpPageTitle: 'Sign Up',
          confirmPasswordRequired: 'Please confirm your password',
          passwordMismatch: 'Passwords do not match',
          loginButton: 'Login',
          signUpButton: 'New ? Create an account !',
          logoutButton: 'Logout',
          homePageTitle: 'Home Page',
          requestCodeButton: 'Send',
          emailNotValid: 'Email not valid',
          code: 'Code',
          submitNewPasswordButton: 'Confirm',
          codeRequired: 'Please enter your code',
          forgotPasswordPageTitle: 'Reset your Password',
          forgotPasswordButton: 'Password forgotten ?',
          firstLoginPageTitle: 'Almost there ! We need more informations to complete your subsribtion',
          updateUserError: 'An error occured.',
          firstName: 'Firstname',
          lastName: 'Lastname',
          updateUserSubmit: 'Done',
          firstNameRequired: 'Please enter your Firsname',
          lastNameRequired: 'Please enter your Lastname',
          search: 'Search…',
          refresh: 'Refresh'
        }
      },
      fr: {
        // APP
        translation: {
          loginPageTitle: 'Connexion',
          email: 'Email',
          password: 'Mot de Passe',
          confirmPassword: 'Confirmation mot de passe',
          emailRequired: 'Veuillez saisir votre email',
          passwordRequired: 'Veuillez saisir votre mot de passe',
          loginSubmit: 'Se connecter',
          signUpSubmit: 'S\'inscrire',
          signUpPageTitle: 'Inscription',
          confirmPasswordRequired: 'Veuillez confirmer votre mot de passe',
          passwordMismatch: 'Les mot de passes ne correspondent pas',
          loginButton: 'Se Connecter',
          signUpButton: 'Nouveau ? Créez un compte !',
          logoutButton: 'Se Deconnecter',
          homePageTitle: 'Page d\'acceuil',
          requestCodeButton: 'Envoyer',
          emailNotValid: 'Email non valide',
          code: 'Code',
          submitNewPasswordButton: 'Confirmer',
          codeRequired: 'Veuillez renseigner votre code',
          forgotPasswordPageTitle: 'Reinitialisez votre mot de passe',
          forgotPasswordButton: 'Mot de passe oublié ?',
          firstLoginPageTitle: 'Vous y êtes presque ! Renseignez ces informations pour completer votre inscription',
          updateUserError: 'Une erreur est survenue',
          firstName: 'Prénom',
          lastName: 'Nom',
          updateUserSubmit: 'Terminer',
          firstNameRequired: 'Veuillez saisir votre prénom',
          lastNameRequired: 'Veuillez saisir votre nom',
          search: 'Rechercher…',
          refresh: 'Rafraîchir',
          role: 'Votre Rôle',
          emailPro: 'Email Professionnel',
          phoneNumber: 'Numéro de téléphone',
          companyNameLabel: 'Nom d\'entreprise',
          companyName: 'Votre entreprise',
          companyNameRequired: 'Veuillez saisir le nom de votre entreprise',
          firstNameLabel: 'Votre prénom',
          lastNameLabel: 'Votre nom',
          roleLabel: 'Poste',
          roleRequired: 'Veuillez renseigner votre rôle dans l\'entreprise',
          emailLabel: 'Votre email professionnel',
          phoneNumberLabel: 'Votre téléphone',
          nextButton: 'Suivant',
          createAccount: 'Votre première mission en quelques clics',
          alreadyHaveAccount: 'J\'ai déjà un compte.',
          loginLinkMsg: 'Je me connecte.',
          accountCreation: 'Création de compte',
          personnalInfos: 'Informations Personnelles',
        }
      }
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });


export default i18n;
