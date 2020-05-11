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
          login: 'Login',
          signUpSubmit: 'Sign Up',
          signUp: 'Sign Up',
          contactUs: 'Contact us',
          signUpPageTitle: 'Sign Up',
          confirmPasswordRequired: 'Please confirm your password',
          passwordMismatch: 'Passwords do not match',
          loginButton: 'Login',
          signUpButton: 'SignUp',
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
          refresh: 'Refresh',
          confirmDelete: 'Yes, delete draft',
          cancel: 'Cancel',
          noDraft: 'No draft pending',
          briefsTitle: 'Briefs',
          newBrief: 'New brief',
          searchbar: {
            placeholder: 'What are you looking for ?',
            noOptions: 'No results.',
            profileLabel: 'Profiles',
            briefsLabel: 'Missions',
            loading: 'Loading...'
          },
          yourEmail: 'Your email',
          yourPassword: 'Your password',
          haveAccount: 'I don\'t have accracy entreprise account'
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
          login: 'Se connecter',
          signUpSubmit: 'S\'inscrire',
          signUp: 'S\'inscrire',
          contactUs: 'Nous contacter',
          signUpPageTitle: 'Inscription',
          confirmPasswordRequired: 'Veuillez confirmer votre mot de passe',
          passwordMismatch: 'Les mot de passes ne correspondent pas',
          loginButton: 'Se Connecter',
          signUpButton: 'Créer mon compte',
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
          firstNameRequired: 'Veuillez entrer votre prénom',
          lastNameRequired: 'Veuillez entrer votre nom',
          search: 'Rechercher…',
          refresh: 'Rafraîchir',
          confirmDelete: 'Confirmer la suppression',
          cancel: 'Annuler',
          noDraft: 'Aucun brief en cours. \nCommencez par rechercher un type de profil ou livrable pour démarrer un brief.',
          briefsTitle: 'Brouillons',
          newBrief: 'Nouveau brief',
          searchbar: {
            placeholder: 'Quel profil ou livrable recherchez-vous ?',
            noOptions: 'Aucun résultat ne correspond à votre recherche.',
            profileLabel: 'Profils',
            briefsLabel: 'Livrables',
            loading: 'Chargement...'
          },
          yourEmail: 'Votre email',
          yourPassword: 'Votre mot de passe',
          haveAccount: 'Je n\'ai pas de compte acracy entreprise'
        }
      }
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });


export default i18n;
