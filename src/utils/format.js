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
 * Shortens a too long text, keeping the first 4 and the last 4 characters to display the file extension
 * @param {string} text - A string too long to be fully displayed in its container
 * @returns  {string} - The shortened text, with the middle part replaced with '(...)' 
 */
export const formatLongText = text => {
  const cutout = text.slice(4, -4);
  return text.replace(cutout, '(...)');
}