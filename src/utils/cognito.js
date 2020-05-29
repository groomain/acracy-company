const translateSignUpError = (errorCode) => {
  switch (errorCode) {
    case 'NetworkError':
      return 'Veuillez vérifier votre connection internet.';
    case 'InvalidPasswordException':
    case 'InvalidParameterException':
      return 'Mot de passe invalide.';
    case 'TooManyRequestsException':
      return 'Trop de requêtes effectué.';
    case 'UsernameExistsException':
      return 'Cet email existe déjà';
    default:
      return 'Erreur';
  }
};

const translateConfirmSignUpSuccess = () => {
  return 'Merci pour votre validation. Votre compte est maintenant actif ! 👏'
};

const translateResendCodeSuccess = () => {
  return 'Email renvoyé ! Pensez à vérifier votre dossier spam'
};

const translateResendCodeError = () => {
  return 'Error'
};

const translateConfirmSignUpError = (errorCode) => {
  switch (errorCode) {
    case 'CodeMismatchException':
      return "Le code n'est pas bon"
    case 'ExpiredCodeException':
      return 'Code expiré.';
    case 'InternalErrorException':
      return 'Erreur cognito interne.';
    case 'TooManyFailedAttemptsException':
      return 'Limite de tentative dépassé.';
    default:
      return 'Erreur';
  }
};

const translateSignInError = (errorCode) => {
  switch (errorCode) {
    case 'UserNotFoundException':
      return 'Aucun compte avec cet email n\'existe, veuillez vérifier votre email.';
    case 'NotAuthorizedException':
      return 'Cet e-mail et ce mot de passe ne correspondent pas.';
    case 'FormNotComplete':
      return 'Veuillez saisir votre email et mot de passe.';
    case 'UserNotConfirmedException':
      return 'Merci de saisir votre code de validation reçu par email.';
    default:
      return 'Erreur';
  }
};

const translateForgotPassword = (errorCode) => {
  switch (errorCode) {
    case 'NetworkError':
      return 'Veuillez vérifier votre connection internet.';
    case 'UserNotFoundException':
    case 'InvalidParameterException':
      return "Cet email n'est pas connu ou pas encore validé";
    case 'FormNotComplete':
      return 'Veuillez saisir votre email.';
    case 'LimitExceededException':
    case 'TooManyRequestsException':
      return 'Limite de tentatives dépassé, veuillez reessayer plus tard.';
    default:
      return 'Erreur';
  }
};

const translateConfirmForgotPassword = (errorCode) => {
  switch (errorCode) {
    case 'PasswordDoNotMatch':
      return 'Vos mot de passe ne correspondent pas.';
    case 'CodeMismatchException':
      return 'Code incorrect.';
    case 'ExpiredCodeException':
      return 'Code expiré.';
    case 'NetworkError':
      return 'Veuillez vérifier votre connection internet.';
    case 'FormNotComplete':
      return 'Veuillez completer tous les champs requis.';
    case 'LimitExceededException':
    case 'TooManyRequestsException':
      return 'Limite de tentatives dépassé, veuillez reessayer plus tard.';
    default:
      return 'Erreur';
  }
};

export {
  translateSignUpError,
  translateConfirmSignUpError,
  translateSignInError,
  translateForgotPassword,
  translateConfirmForgotPassword,
  translateConfirmSignUpSuccess,
  translateResendCodeSuccess,
  translateResendCodeError
};
