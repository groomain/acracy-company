/**
 * 
 * @param {string} text - A given string
 * @param {number} length - A specified number
 * @returns true when the given string is greater than the specified number
 */
export const checkLength = (text, length) => {
  if (text?.length > length) {
    return true;
  }
  return false;
};
