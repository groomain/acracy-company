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
          draft: {
            confirmDelete: 'Yes, delete draft',
            cancel: 'Cancel',
            noDraft: 'No draft pending',
            briefsTitle: 'Briefs',
            newBrief: 'New brief',
            firstBriefTitle: 'Create your first brief !',
            firstBriefButton: 'Go !',
            newBriefTitle: "You have a new brief !"
          },
          searchbar: {
            placeholder: 'What are you looking for ?',
            noOptions: 'No results.',
            profileLabel: 'Profiles',
            briefsLabel: 'Missions',
            loading: 'Loading...'
          },
          yourEmail: 'Your email',
          yourPassword: 'Your password',
          haveAccount: 'I don\'t have accracy entreprise account',
          tagsList: {
            label: "Key profile expertise",
            fieldTitleStarted: "Change my selection",
            fieldTitleNewSelection: "Start my selection",
            minMaxInfo: "5 maximum, including 3 high priority",
            button: "Send"
          },
          upload: {
            title: "Shared documents",
            subtitle: "Do you want to add documents ?",
            confidentialityText: "We respect your privacy",
            addDocument: "Add document",
            maxFileSize: "Max file size : 5Mb"
          }
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
          firstNameRequired: 'Veuillez saisir votre prénom',
          lastNameRequired: 'Veuillez saisir votre nom',
          search: 'Rechercher…',
          refresh: 'Rafraîchir',
          draft: {
            confirmDelete: 'Confirmer la suppression',
            cancel: 'Annuler',
            noDraft: 'Aucun brief en cours. \nCommencez par rechercher un type de profil ou livrable pour démarrer un brief.',
            briefsTitle: 'Brouillons',
            newBrief: 'Nouveau brief',
            firstBriefTitle: 'Créez votre premier \nbrief',
            firstBriefButton: "C'est parti !",
            newBriefTitle: "Votre nouveau brief vous attend !"
          },
          role: 'Votre Rôle',
          emailPro: 'Email Professionnel',
          phoneNumber: 'Numéro de téléphone',
          companyNamePlaceholder: 'Nom d\'entreprise',
          companyName: 'Votre entreprise',
          companyNameRequired: 'Veuillez saisir le nom de votre entreprise',
          firstNamePlaceholder: 'Votre prénom',
          lastNamePlaceholder: 'Votre nom',
          rolePlaceholder: 'Poste',
          roleRequired: 'Veuillez renseigner votre rôle dans l\'entreprise',
          emailPlaceholder: 'Votre email professionnel',
          phoneNumberPlaceholder: 'Votre téléphone',
          nextButton: 'Suivant',
          createAccount: 'Votre première mission en quelques clics',
          alreadyHaveAccount: 'J\'ai déjà un compte.',
          loginLinkMsg: 'Je me connecte.',
          accountCreation: 'Création de compte',
          personnalInfos: 'Informations Personnelles',
          yourPassword: 'Votre mot de passe',
          passwordPlaceholder: 'Entrez un mot de passe',
          confirmPasswordPlaceholder: 'Confirmez votre mot de passe',
          backButton: 'Retour',
          createAccountButton: 'Créer mon compte',
          termsAndConditions: 'conditions générales',
          savedResearch: 'Votre recherche a bien été sauvegardée',
          collaborators: 'Ils collaborent déjà avec nous',
          searchbar: {
            placeholder: 'Quel profil ou livrable recherchez-vous ?',
            noOptions: 'Aucun résultat ne correspond à votre recherche.',
            profileLabel: 'Profils',
            briefsLabel: 'Livrables',
            loading: 'Chargement...',
            createMessage: 'Créer',
            newOption: "n'existe pas"
          },
          yourEmail: 'Votre email',
          haveAccount: 'Je n\'ai pas de compte acracy entreprise',
          tagsList: {
            label: "Expertises clés du profil",
            fieldTitleStarted: "Modifier ma sélection",
            fieldTitleNewSelection: "Démarrer ma sélection",
            minMaxInfo: "5 maximum dont 3 prioritaires",
            button: "Valider"
          },
          upload: {
            title: "Documents partagés",
            subtitle: "N'hésitez pas à partager tout document utile (brief, job description, références)",
            confidentialityText: "Acracy s’engage à respecter la confidentialité des informations partagées. Tum dicere exorsus est consecutus? laudem et via procedat oratio quaerimus igitur, quid.",
            addDocument: "Ajouter un document",
            maxFileSize: "Taille de fichier maximum : 5 Mo"
          },
          welcomeMessage: "Merci pour votre validation. Votre compte est maintenant actif ! 👏",
          characters: 'caractères'
        }
      }
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });


export default i18n;
