import lodashDebounce from 'lodash/debounce.js';

/**
 * Debounce a function call. Thin wrapper around lodash so consumers
 * don't import lodash directly throughout the app.
 * @param {Function} fn
 * @param {number} wait - delay in ms
 */
export function debounce(fn, wait = 300) {
  return lodashDebounce(fn, wait);
}
