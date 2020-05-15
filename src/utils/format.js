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
 * 
 * @param {string} text - A string to be capitalized
 * @returns {string} - The new capitalized text
 */
export const capitalize = text => {
  return text.charAt(0).toUpperCase() + text.slice(1);
}