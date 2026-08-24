import lodashThrottle from 'lodash/throttle.js';

/**
 * Throttle a function call. Thin wrapper around lodash so consumers
 * don't import lodash directly throughout the app.
 * @param {Function} fn
 * @param {number} wait - delay in ms
 */
export function throttle(fn, wait = 300) {
  return lodashThrottle(fn, wait);
}
