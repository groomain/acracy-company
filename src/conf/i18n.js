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
            minMaxInfo: "5 maximum, including 3 high priority"
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
          submitNewPasswordButton: 'Confirmer changement',
          codeRequired: 'Veuillez renseigner votre code',
          forgotPassword: {
            forgotPasswordPageTitle: 'Mot de passe oublié',
            forgotPasswordButton: 'Mot de passe oublié ?',
            forgotPasswordSubtitle: 'Saisissez l’email associé à votre compte afin que nous puissions vous envoyer un code de réinitialisation de votre mot de passe.',
            newPasswordTitle: 'Nouveau mot de passe',
            newPasswordSubtitle: "Un code de vérification à 6 chiffres vient de vous être envoyé à l'adresse suivante : ",
            newPasswordPlaceholder: 'Entrez un mot de passe',
            confirmPasswordLabel: 'Confirmation du nouveau mot de passe',
            confirmPasswordPlaceholder: 'Confirmez votre nouveau mot de passe',
            resendVerificationCodeButton: 'Renvoyer un code de vérification'
          },
          firstLoginPageTitle: 'Vous y êtes presque ! Renseignez ces informations pour completer votre inscription',
          updateUserError: 'Une erreur est survenue',
          firstName: 'Prénom',
          lastName: 'Nom',
          updateUserSubmit: 'Terminer',
          firstNameRequired: 'Veuillez saisir votre prénom',
          lastNameRequired: 'Veuillez saisir votre nom',
          search: 'Rechercher…',
          refresh: 'Rafraîchir',
          saveAndClose: 'Sauvegarder et fermer',
          draft: {
            confirmDelete: 'Confirmer la suppression',
            cancel: 'Annuler',
            noDraft: 'Aucun brief en cours. \nCommencez par rechercher un type de profil ou livrable pour démarrer un brief.',
            briefsTitle: 'Brouillons',
            newBrief: 'Nouveau brief',
            firstBriefTitle: 'Créez votre premier \nbrief',
            firstBriefButton: "C'est parti !",
            newBriefTitle: "Votre nouveau brief vous attend !",
            startBrief: "Démarrer brief",
            finalizeBrief: "Brief à finaliser",
            getCalled: "En attente de rappel"
          },
          signup: {
            conditions1: "J'ai lu et j'accepte les ",
            termsAndConditions: 'conditions générales',
            conditions2: " du site et des missions acracy",
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
            createAccount: 'Votre première mission en quelques clics',
            alreadyHaveAccount: 'J\'ai déjà un compte.',
            loginLinkMsg: 'Je me connecte.',
            accountCreation: 'Création de compte',
            personnalInfos: 'Informations Personnelles',
            yourPassword: 'Votre mot de passe',
            passwordPlaceholder: 'Entrez un mot de passe',
            confirmPasswordPlaceholder: 'Confirmez votre mot de passe',
            createAccountButton: 'Créer mon compte',
          },
          savedResearch: 'Votre recherche a bien été sauvegardée',
          collaborators: 'Ils collaborent déjà avec nous',
          searchbar: {
            placeholder: 'Quel profil ou livrable recherchez-vous ?',
            noOptions: 'Aucun résultat ne correspond à votre recherche.',
            profileLabel: 'Profil recherché',
            briefsLabel: 'Livrable recherché',
            loading: 'Chargement...',
            createMessage: 'Créer',
            newOption: "ne figure pas dans notre liste de profils ou livrables mais nous allons faire notre maximum pour vous aider."
          },
          yourEmail: 'Votre email',
          yourPassword: 'Votre mot de passe',
          haveAccount: 'Je n\'ai pas de compte acracy entreprise',
          tagsList: {
            label: "Expertises clés du profil",
            fieldTitleStarted: "Modifier ma sélection",
            fieldTitleNewSelection: "Démarrer ma sélection",
            minMaxInfo: "5 maximum dont 3 prioritaires"
          },
          leadCreation: {
            synthesis: 'Synthèse Brief',
            details: 'Détails Brief',
            missionLabel: 'Donnez un titre à votre mission*',
            missionPlaceholder: 'Ex: Motion design pour stories Instagram',
            workspaceLabel: 'Format souhaité*',
            locationLabel: 'Merci d’indiquer l\'adresse des locaux où la mission aura lieu*',
            locationPlaceholder: '133 avenue des Champs Elysées - 75008 Paris',
            frequencyLabel: 'Rythme hebdomadaire',
            durationLabel: 'Durée de la mission',
            durationPlaceholder: 'Indiquez nombre',
            budgetLabel: 'Budget',
            budgetPlaceholder: 'Votre budget',
            profilesLabel: 'Nombre de profils ou teams*',
            callMe: 'Être rappelé.e.',
            selectDeliverables: 'Sélectionner jusqu\'à 5 livrables souhaités*',
            modifyDeliverables: 'Modifier ma sélection',
            customDeliverablePlaceholder: 'Livrable souhaité',
            customDeliverableLabel: 'Précisez la nature du livrable qui ne figure pas dans la liste*',
            selectProfile: 'Sélectionnez un profil souhaité pour la mission*',
            calendarLabel: 'Date de démarrage*',
            reseachLabel: 'Précisez votre recherche',
            finishBrief: 'Finaliser le brief',
            tip1: "Donnez le plus d\'informations possible sur la mission et vos attentes, mais aussi sur le contexte du projet (équipe, objectifs, format du travail, deadlines).",
            tip2: "Nos freelances sont très demandés, et souvent très occupés. N'hésitez pas à mentionner les avantages de travailler sur votre projet pour les aider à se décider.",
            discoverTips: "Découvrez nos conseils pour les briefs parfaits",
            // step 2
            profileDetails: "Détails du profil recherché",
          },
          upload: {
            title: "Documents partagés",
            subtitle: "N'hésitez pas à partager tout document utile (brief, job description, références)",
            confidentialityText: "Acracy s’engage à respecter la confidentialité des informations partagées. Tum dicere exorsus est consecutus? laudem et via procedat oratio quaerimus igitur, quid.",
            addDocument: "Ajouter un document",
            maxFileSize: "Taille de fichier maximum : 5 Mo"
          },
          confirmSignupPage: {
            title: "Il ne reste plus qu'à confirmer votre email",
            subtitle: "Un code d'activation à 6 chiffres vient de vous être envoyé à l'adresse suivante :",
            label: "Entrez le code ci-dessous*",
            placeholder: "000000",
            buttonTitle: "Valider code",
            notReceived: "Vous n'avez rien reçu ?",
            resendButton: "Renvoyer un code d'activation",
            resendCodeMessage: "Vous n'avez rien reçu ?",
            resendCodeButton: "Renvoyer un code d'activation"
          },
          characters: 'caractères',
          buttonTitles: {
            nextButton: 'Suivant',
            backButton: 'Retour',
            validate: 'Valider'
          },
          dashboard: {
            welcome: "Bonjour, ",
            subtitle: "Merci d’avoir rejoint acracy ! Ceci est votre tableau de bord. Vous y trouverez toute l’information nécessaire pour gérer vos missions.",
            missions: {
              name: "Mission",
              missionsTitle: "Mes Missions",
              inProgress: " en cours",
              future: " à venir",
              finished: "Historique",
              profileMatching: "Matching de profil",
              noMission: "Aucune mission en cours.\n Quand vous aurez finalisé votre brief et validé un ou plusieurs profils, la mission apparaîtra ici",
              freelanceInfosModal: 'Voir coordonnées freelance',
              incidentModalTitle: 'Déclarer un incident'
            }
          }
        }
      }
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });


export default i18n;
