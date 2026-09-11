// LocalStorage abstraction for the user's saved game library.

const STORAGE_KEY = 'library';
const LEGACY_STORAGE_KEY = 'GAMEHUB_LIBRARY';

/**
 * Get all games saved in the library.
 * @returns {Array}
 */
export function getLibrary() {
  const raw =
    localStorage.getItem(STORAGE_KEY) ??
    localStorage.getItem(LEGACY_STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    if (parsed && typeof parsed === 'object') return [parsed];
    return [];
  } catch {
    return [];
  }
}

/**
 * Persist the full library array.
 * @param {Array} library
 */
function saveLibrary(library) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(library));
}

/**
 * Check whether a game is already saved in the library.
 * @param {number|string} id
 */
export function isInLibrary(id) {
  return getLibrary().some((game) => String(game.id) === String(id));
}

/**
 * Add a game to the library.
 * @param {Object} game
 * @returns {boolean} true when the game was added
 */
export function addToLibrary(game) {
  const library = getLibrary();
  if (library.some((item) => String(item.id) === String(game.id))) {
    return false;
  }

  saveLibrary([...library, game]);
  return true;
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