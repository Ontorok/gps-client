import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';

export const capitalizeFLetter = string => {
  return string[0].toUpperCase() + string.slice(1);
};

export const isValidEmail = value => {
  return value && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,8}$/i.test(value);
};

export const idGenerator = () => {
  return Math.floor(Math.random() * 100000);
};

export const linkify = inputText => {
  let replacedText, replacePattern1, replacePattern2, replacePattern3;

  //URLs starting with http://, https://, or ftp://
  replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\\/%?=~_|!:,.;]*[-A-Z0-9+&@#\\/%=~_|])/gim;
  replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

  //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
  replacePattern2 = /(^|[^\\/])(www\.[\S]+(\b|$))/gim;
  replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

  //Change email addresses to mailto:: links.
  replacePattern3 = /(([a-zA-Z0-9\-_.])+@[a-zA-Z0-9\\-]+?(\.[a-zA-Z]{2,6})+)/gim;
  replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

  return replacedText;
};

export const geValidUrl = (url, ubSecureUrl = false) => {
  if (!url.match(/^[a-zA-Z]+:\/\//)) {
    if (ubSecureUrl) {
      return 'http://' + url;
    }
    return 'https://' + url;
  }

  return url;
};

export const useDebounce = (value, delay) => {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState('');

  useEffect(
    () => {
      // Set debouncedValue to value (passed in) after the specified delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Return a cleanup function that will be called every time ...
      // ... useEffect is re-called. useEffect will only be re-called ...
      // ... if value changes (see the inputs array below).
      // This is how we prevent debouncedValue from changing if value is ...
      // ... changed within the delay period. Timeout gets cleared and restarted.
      // To put it in context, if the user is typing within our app's ...
      // ... search box, we don't want the debouncedValue to update until ...
      // ... they've stopped typing for more than 500ms.
      return () => {
        clearTimeout(handler);
      };
    },
    // Only re-call effect if value changes
    // You could also add the "delay" var to inputs array if you ...
    // ... need to be able to change that dynamically.
    [value, delay]
  );

  return debouncedValue;
};

export const isValidToken = accessToken => {
  if (!accessToken) {
    return false;
  }

  const decodedToken = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp > currentTime;
};

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Check if the object is empty
 * @param obj
 * @returns {boolean}
 */
export const isObjEmpty = obj => Object.keys(obj).length === 0;

/**
 * Map array to dropdown list
 * @param arr => source array
 * @param label => property name which show the label
 * @param value => property name which holds the value
 * @returns {Array}
 */
export const mapArrayToDropdown = (arr = [], label, value) => {
  return arr.map(item => ({
    ...item,
    label: item[label],
    value: item[value]
  }));
};

/**
 * Convert Second to Hour
 * @param sec => second
 * @returns {Int}
 */
export const convertSecondToHour = sec => (sec === 0 ? 0 : Number((sec / 3600).toFixed(2)));

/**
 * Get Permitted Navigation Menus
 * @param menus => Array
 * @returns {Array}
 */
export const getPermittedNavMenus = menus => {
  const permittedMenus = menus.reduce((previousValue, currentValue) => {
    if (currentValue.hasPermission) {
      previousValue.push({
        ...currentValue,
        children: currentValue.children.filter(({ hasPermission }) => hasPermission)
      });
    }
    return previousValue;
  }, []);

  return permittedMenus;
};
