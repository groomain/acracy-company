import React from 'react';

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