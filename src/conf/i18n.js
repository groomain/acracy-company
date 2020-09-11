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
            fieldTitleStarted: "Change my selection",
            fieldTitleNewSelection: "Start my selection",
            button: "Send",
            expertise: {
              label: "Key profile expertise",
              minMaxInfo: "5 maximum, including 3 high priority",
            }
          },
          upload: {
            title: "Shared documents",
            subtitle: "Do you want to add documents ?",
            confidentialityText: "acracy undertakes to respect the confidentiality of shared information, and to sign an NDA if necessary.",
            addDocument: "Add document",
            maxFileSize: "Max file size : 5Mb"
          },
          myProfile: {
            myProfilePageTitle: "My profile",
            personalInformations: "Personal informations",
            password: "Password",
            firstName: "First name",
            firstNamePlaceholder: "First name",
            lastName: "Last name",
            lastNamePlaceholder: "Last name",
            professionalEmail: "Professional email",
            professionalEmailPlaceholder: "address@email.com",
            phoneCode: "Phone prefix",
            phoneNumber: "Phone number",
            phoneNumberPlaceholder: "0611045327",
            role: "Your role",
            rolePlaceholder: "Position",
            save: "Save",
            oldPassword: "Old password",
            oldPasswordPlaceholder: "Enter old password",
            newPassword: "New password",
            newPasswordPlaceholder: "Enter new password",
            confirmNewPassword: "Confirmation of new password",
            confirmNewPasswordPlaceholder: "Confirm new password",
            modifyPassword: "Modify my password"
          }
        }
      },
      fr: {
        // APP
        translation: {
          profileSelection: {
            tjmPopover1: 'Nous incluons dans le TJM des freelances les frais de ',
            tjmPopover2: '% liés à l’affacturage. C’est un système qui leur permet d’être protégés avec un paiement rapide, et qui nous permet de fidéliser les meilleurs freelances.'
          },
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
            role: 'Poste',
            emailPro: 'Email',
            phoneNumber: 'Numéro',
            companyNamePlaceholder: 'Nom de votre entreprise',
            companyName: 'Entreprise',
            companyNameRequired: 'Veuillez saisir le nom de votre entreprise',
            firstNamePlaceholder: 'Votre prénom',
            lastNamePlaceholder: 'Votre nom',
            rolePlaceholder: 'Votre rôle dans votre entreprise',
            roleRequired: 'Veuillez renseigner votre rôle dans l\'entreprise',
            emailPlaceholder: 'Votre email professionnel',
            phoneNumberPlaceholder: 'Votre numéro de téléphone',
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
          collaborators: 'Ils aiment nous briefer',
          searchbar: {
            placeholder: 'Quel profil ou livrable recherchez-vous ?',
            noOptions: 'Aucun résultat ne correspond à votre recherche.',
            profileLabel: 'Profil recherché',
            briefsLabel: 'Livrable : le travail attendu',
            loading: 'Chargement...',
            createMessage: 'Créer',
            newOption: "ne figure pas dans notre liste de profils ou livrables mais nous allons faire notre maximum pour vous aider."
          },
          yourEmail: 'Votre email',
          yourPassword: 'Votre mot de passe',
          haveAccount: 'Je n\'ai pas de compte acracy entreprise',
          tagsList: {
            fieldTitleStarted: "Modifier ma sélection",
            fieldTitleNewSelection: "Démarrer ma sélection",
            expertise: {
              label: "Les expertises-clés du profil",
              minMaxInfo: "5 maximum dont 3 prioritaires",
            },
            sensitivity: {
              label: "Son domaine de prédilection",
              minMaxInfo: "1 maximum"
            }
          },
          incidentMessage: {
            title: 'Envoyer',
            placeholder: 'Un souci sur la mission ? Dites-nous tout.'
          },
          leadCreation: {
            synthesis: 'La synthèse',
            details: 'Les détails',
            missionLabel: 'Donnez un titre à votre mission*',
            missionPlaceholder: 'Il sera partagé avec les freelances, donnez-leur envie. Ex : Nouvelle identité sur nos réseaux sociaux',
            workspaceLabel: 'Quel format de mission souhaitez-vous ?*',
            locationLabel: 'Merci d’indiquer l\'adresse des locaux où la mission aura lieu*',
            locationPlaceholder: '55 Rue du Faubourg Saint-Honoré, 75008 Paris, France',
            frequencyLabel: 'Quel sera le rythme hebdomadaire ?',
            durationLabel: 'Sur quelle durée au total ?',
            durationPlaceholder: 'Indiquez un nombre',
            budgetLabel: 'Les tarifs',
            budgetPlaceholder: 'Votre budget',
            profilesLabel: 'Le nombre de profils (ou teams) recherché *',
            callMe: 'Être rappelé.e.',
            selectDeliverables: 'Travail attendu : sélectionnez jusqu\'à 5 livrables*',
            modifyDeliverables: 'Modifier ma sélection',
            customDeliverablePlaceholder: 'Livrable souhaité',
            customDeliverableLabel: 'Un livrable n\'est pas dans la liste ?*',
            selectProfile: 'Quel profil recherchez-vous pour cette mission ?*',
            calendarLabel: 'Quand démarrera le travail ?*',
            reseachLabel: 'De quoi/qui avez-vous besoin ?',
            finishBrief: 'Finaliser le brief',
            sendBriefButton: 'Déposer mon brief',
            tip1: "Donnez le plus d'informations possible sur la mission et vos attentes, mais aussi sur le contexte du projet (équipe, objectifs, format du travail, deadlines).",
            tip2: "Nos freelances sont très demandés, et souvent très occupés. N'hésitez pas à mentionner les avantages de travailler sur votre projet pour les aider à se décider.",
            discoverTips: "Découvrez nos conseils pour les briefs parfaits",
            // step 2
            profileDetails: "Détails du profil recherché",
            profileexpertises: "Les expertises-clés du profil*",
            profileSensitivity: 'Son domaine de prédilection',
            profileLanguages: 'Quelles langues sont nécessaires ?*',
            profileSeniority: "Et quel niveau de séniorité ?",
            deliverablesDetails: "Précisions sur le travail attendu",
            estimatedAverageDailyRate1: 'Soit un taux journalier de ',
            estimatedAverageDailyRate2: '€, une fois les frais d\'affacturage et la commission acracy ajoutés.',
            estimatedAverageDailyRate3: 'Soit un montant global de ',
            estimatedAverageDailyRate4: '€, une fois déduits les frais d’affacturage et la commission acracy.',
            textarea: {
              missionContext: {
                label: "Contexte et objectifs de la mission*",
                placeholder: "Ex: \"Dans le cadre du lancement de notre nouvelle boisson \"Energy 3000\", nous cherchons un stratège Social Media pour définir un plan d'activation Instagram à destination des 18-25 ans.\""
              },
              deliverablesDetails: {
                label: "Détail des livrables*",
                placeholder: "Donnez-nous le plus d'informations possibles sur le travail attendu (quantité, type, style...). Ex : 10 wireframes (mobile et desktop) sur Sketch / 3 scripts humoristiques pour des 30\" / 2 formats mobiles d'acquisition"
              }
            }
          },
          upload: {
            title: {
              single: "Document partagé",
              multiple: "Documents partagés"
            },
            subtitle: "N'hésitez pas à partager tout document utile (brief, job description, références)",
            confidentialityText: "acracy s’engage à respecter la confidentialité des informations partagées. Nous pouvons évidemment signer un NDA si besoin.",
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
            subtitle: "Nous sommes ravis de vous accueillir sur acracy. Voici votre tableau de bord, pour nous briefer et suivre vos missions",
            missions: {
              name: "Mission",
              missionsTitle: "Mes Missions",
              inProgress: " en cours",
              future: " à venir",
              finished: "Historique",
              profileMatching: "Matching de profil",
              noMission: "Aucune mission en cours.\n Commencez par rechercher un type de profil ou livrable pour démarrer un brief.",
              freelanceInfosModal: 'Coordonnées de votre freelance',
              incidentModalTitle: 'Déclarer un incident',
              day: 'jour',
              week: 'semaine',
              month: 'mois',
              refusedTitle: "Refus",
              refusedByAcracy: "Refusé par acracy"
            }
          },
          profilMenu: {
            profil: 'Mon Profil',
            admin: 'L\'administratif',
            contact: 'Contacter acracy',
            logout: 'Me déconnecter'
          },
          header: {
            login: 'Se connecter',
            signUp: "S'inscrire",
            newBrief: 'Nouveau brief',
            contactUs: 'Nous contacter'
          },
          myProfile: {
            myProfilePageTitle: "Mon profil",
            personalInformations: "Informations personnelles",
            password: "Mot de passe",
            firstName: "Prénom",
            firstNamePlaceholder: "Prénom",
            lastName: "Nom",
            lastNamePlaceholder: "Nom",
            professionalEmail: "Email professionnel",
            professionalEmailPlaceholder: "adresse@email.com",
            phoneCode: "Préfixe",
            phoneNumber: "Numéro de téléphone",
            phoneNumberPlaceholder: "0611045327",
            role: "Votre rôle",
            rolePlaceholder: "Poste",
            save: "Sauvegarder",
            oldPassword: "Ancien mot de passe",
            oldPasswordPlaceholder: "Entrez ancien mot de passe",
            newPassword: "Nouveau mot de passe",
            newPasswordPlaceholder: "Entrez nouveau mot de passe",
            confirmNewPassword: "Confirmation du nouveau mot de passe",
            confirmNewPasswordPlaceholder: "Confirmez nouveau mot de passe",
            modifyPassword: "Modifier mon mot de passe"
          },
          adminPage: {
            companyData: "Données de mon entreprise"
          }
        }
      }
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });

export default i18n;
