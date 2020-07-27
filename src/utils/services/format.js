import React from 'react';
import areaCodes from "../areaCodes.json";
import * as moment from 'moment';
moment.locale('fr');

/**
 * Formats a text in .json format and creates a new line after each \n
 * @param {string} text - A string to be formatted
 * @returns {string} The new formatted text
 */
export const formatWithLineBreak = text => {
  let newText = text.split('\n').map((item, i) => {
    return <p key={i}>{item}</p>;
  });
  return newText;
};

/** 
 * Capitalizes a given string
* @param {string} text - A string to be capitalized
* @returns {string} - The new capitalized text
*/
export const capitalize = text => {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Shortens a too long text, keeping the first 4 and the last 4 characters to display the file extension
 * @param {string} text - A string too long to be fully displayed in its container
 * @returns  {string} - The shortened text, with the middle part replaced with '(...)' 
 */
export const formatLongText = text => {
  const cutout = text.slice(4, -4);
  return text.replace(cutout, '(...)');
}

/**
 * Formats a phone prefix containing letters and digits to keep the number only
 * @param {string} prefix - A string formatted as "Fr : +33"
 * @returns {string} - New string containing everything after the '+' character to only send the number part
 */
export const getPhonePrefixCode = prefix => {
  const regex = /^(.*?)[+]/;
  return prefix.replace(regex, '');
};

/**
 * Compare the number passed as an argument to the list of area codes and retrieve the corresponding area code
 * @param {number} number - a simple number, previously extracted from the area code using getPhonePrefixCode
 * @returns {string} - A string formatted as "Fr : +33"
 */
export const getAreaCodeFromNumber = (number) => {
  for (let i = 0; i < areaCodes.length; i++) {
    if (number === getPhonePrefixCode(areaCodes[i])) {
      return areaCodes[i];
    }
  }
}

/**
 * Shortens a long text at the specified length, and completes the string with '...' when the text is too long
 * @param {string} text - The text to be shortened
 * @param {number} length - The number of characters allowed before shortening the text
 * @returns {string} - The new string, completed with '...' if it has been shortened
 */
export const shortenLongText = (text, length) => {
  const andSoOn = text?.length >= length ? '...' : '';
  return `${text?.substring(0, length)} ${andSoOn}`;
}

/**
 * Takes a date, adds a specified number of days and returns the new date, weekends excluded
 * @param {string} date - The original date, in DD/MM/YYYY format
 * @param {number} nbOfDaysToAdd - Number of days to be added
 * @returns {string} - The new date with specified number of days added, excluding weekends
 */
export const addTwoWorkingDays = (date, nbOfDaysToAdd) => {
  date = new Date(Math.round(new Date(date).getTime()));
  let endDate = "", count = 0;
  while (count < nbOfDaysToAdd) {
    endDate = new Date(date.setDate(date.getDate() + 1));
    if (endDate.getDay() !== 0 && endDate.getDay() !== 6) {
      count++;
    }
  }
  return moment(endDate).format('DD/MM/YYYY');
}

// Returns timestamps to specified date format
export const formatDate = (date) => {
  return moment(date).format("DD/MM/YYYY");
}

export const dateToTimestamp = (date) => {
  return Math.round(new Date(date).getTime());
};


export const formatType = (val) => {
  switch (val) {
    case 'Peu importe':
      return 'WHATEVER'
    case 'En remote uniquement':
      return 'REMOTE_ONLY'
    case 'Sur place uniquement':
      return 'INPLACE_ONLY'
    case 'En remote et sur place':
      return 'BOTH'
    case 'WHATEVER':
      return 'Peu importe'
    case 'REMOTE_ONLY':
      return 'En remote uniquement'
    case 'INPLACE_ONLY':
      return 'Sur place uniquement'
    case 'BOTH':
      return 'En remote et sur place'
    default:
  }
}

export const formatFrequencyType = (val) => {
  switch (val) {
    case 1:
      return 'Temps partiel (1 jour)'
    case 2:
      return 'Temps partiel (2 jours)'
    case 3:
      return 'Temps partiel (3 jours)'
    case 4:
      return 'Temps partiel (4 jours)'
    case 5:
      return 'Plein temps (5 jours)'
    default:
  }
}

export const formatDurationType = val => {
  switch (val) {
    case 'Jours':
      return 'DAY'
    case 'Semaines':
      return 'WEEK'
    case 'Mois':
      return 'MONTH'
    case 'DAY':
      return 'Jours'
    case 'WEEK':
      return 'Semaines'
    case 'MONTH':
      return 'Mois'
    default:
  }
}

export const formatBudgetType = val => {
  switch (val) {
    case 'TOTAL':
      return 'Budget total'
    case 'DAILY_RATE':
      return 'Taux journalier'
    default:
  }
}

export const formatSeniorityType = seniority => {
  switch (seniority) {
    case 'Junior (1 à 3 ans)':
      return 'JUNIOR'
    case 'Middle (3 à 5 ans)':
      return 'MIDDLE'
    case 'Senior (5 à 7 ans)':
      return 'SENIOR'
    case 'Expert (7 à 10 ans)':
      return 'EXPERT'
    case 'Guru (10 ans et plus)':
      return 'GURU'
    case 'Peu importe':
      return 'WHATEVER'
    case 'JUNIOR':
      return 'Junior (1 à 3 ans)'
    case 'MIDDLE':
      return 'Middle (3 à 5 ans)'
    case 'SENIOR':
      return 'Senior (5 à 7 ans)'
    case 'EXPERT':
      return 'Expert (7 à 10 ans)'
    case 'GURU':
      return 'Guru (10 ans et plus)'
    default:
  }
}

export const formatLanguagesValues = val => {
  switch (val) {
    case 'FLUENT_ENGLISH':
      return 'Anglais courant'
    case 'FLUENT_FRENCH':
      return 'Français courant'
    case 'FLUENT_GERMAN':
      return 'Allemand courant'
    case 'FLUENT_SPANISH':
      return 'Espagnol courant'
    case 'FLUENT_ITALIAN':
      return 'Italien courant'
    case 'NATIVE_ENGLISH':
      return 'Anglais natif'
    case 'NATIVE_FRENCH':
      return 'Français natif'
    case 'NATIVE_GERMAN':
      return 'Allemand natif'
    case 'NATIVE_SPANISH':
      return 'Espagnol natif'
    case 'NATIVE_ITALIAN':
      return 'Italien natif'
    default:
  }
}