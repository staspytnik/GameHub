// LocalStorage abstraction for the user's saved game library.

const STORAGE_KEY = 'GAMEHUB_LIBRARY';

/**
 * Get all games saved in the library.
 * @returns {Array}
 */
export function getLibrary() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

/**
 * Persist the full library array.
 * @param {Array} library
 */
function saveLibrary(library) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(library));
}

/**
 * Add a game to the library.
 * @param {Object} game
 */
export function addToLibrary(game) {
  // TODO: implement (append game, avoid duplicates).
}

/**
 * Update an existing library entry.
 * @param {number|string} id
 * @param {Object} updates
 */
export function updateLibraryItem(id, updates) {
  // TODO: implement (find by id, merge updates, persist).
}

/**
 * Remove a game from the library.
 * @param {number|string} id
 */
export function removeFromLibrary(id) {
  // TODO: implement (filter out by id, persist).
}

/**
 * Clear the entire library.
 */
export function clearLibrary() {
  localStorage.removeItem(STORAGE_KEY);
}

export { STORAGE_KEY, saveLibrary };
