import React from 'react';
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
 * @returns {string} - The shortened text, with the middle part replaced with '(...)' 
 */
export const cutoutLongText = text => {
  const cutout = text.slice(4, -4);
  return text.replace(cutout, '(...)');
}

/**
 * Shortens a long text at the specified length, and completes the string with '...' when the text is too long
 * @param {string} text - The text to be shortened 
 * @param {number} length - The number of characters allowed before shortening the text
 * @returns {string} - The new string, completed with '...' if it has been shortened
 */
export const shortenLongText = (text, length) => {
  const andSoOn = text.length >= length ? '...' : '';
  return `${text.substring(0, length)} ${andSoOn}`;
}

/**
 * Takes a date, adds a specified number of days and returns the new date, weekends excluded
 * @param {string} date - The original date, in DD/MM/YYYY format 
 * @param {number} nbOfDaysToAdd - Number of days to be added
 * @returns {string} - The new date with specified number of days added, excluding weekends
 */
export const addTwoWorkingDays = (date, nbOfDaysToAdd) => {
  date = new Date(date);
  let endDate = "", count = 0;
  while (count < nbOfDaysToAdd) {
    endDate = new Date(date.setDate(date.getDate() + 1));
    if (endDate.getDay() !== 0 && endDate.getDay() !== 6) {
      count++;
    }
  }
  return moment(endDate).format('DD/MM/YYYY');
}
