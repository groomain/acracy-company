/**
 * @param {string} text - A given string
 * @param {number} length - A specified number
 * @returns true when the given string is greater than the specified number
 */
export const checkLength = (text, length) => {
  if (text?.trim().length > length) {
    return true;
  }
  return false;
};

/**
 * Goes through a complex object (with nested objects) to check for empty values
 * @param {object} obj - The complex object to check for empty values 
 * @param {string} path - The base string to be concatenated with the path of the missing values
 * @returns {array} - A list of all missing values, the path of the key being represented as a string separated by '.' (ex : obj.draft.status)
 */
export const getPath = (obj, path) => {
  var props = [];
  for (var key in obj) {
    if (obj[key] === "" || obj[key]?.length === 0) {
      props.push(path + '.' + key);
    }
    if (obj[key] instanceof Object) {
      props.push.apply(props, getPath(obj[key], path + '.' + key));
    }
  }
  return props;
};

export const checkSiretValidity = (siret) => {
  let isValid;
  if ((siret.length != 14) || (isNaN(siret)))
    isValid = false;
  else {
    // Donc le SIRET est un numérique à 14 chiffres
    // Les 9 premiers chiffres sont ceux du SIREN (ou RCS), les 4 suivants
    // correspondent au numéro d'établissement
    // et enfin le dernier chiffre est une clef de LUHN. 
    let sum = 0;
    let tmp;
    for (let cpt = 0; cpt < siret.length; cpt++) {
      if ((cpt % 2) == 0) { // Les positions impaires : 1er, 3è, 5è, etc... 
        tmp = siret.charAt(cpt) * 2; // On le multiplie par 2
        if (tmp > 9)
          tmp -= 9;	// Si le résultat est supérieur à 9, on lui soustrait 9
      }
      else
        tmp = siret.charAt(cpt);
      sum += parseInt(tmp);
    }
    if ((sum % 10) == 0)
      isValid = true; // Si la somme est un multiple de 10 alors le SIRET est valide 
    else
      isValid = false;
  }
  return isValid;
}