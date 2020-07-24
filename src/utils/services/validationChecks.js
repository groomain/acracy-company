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
