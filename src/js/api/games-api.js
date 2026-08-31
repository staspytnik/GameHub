// RAWG Video Games Database API client.
// https://api.rawg.io/docs/

const RAWG_BASE_URL = 'https://api.rawg.io/api';
const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;

/**
 * Fetch a paginated list of games.
 * @param {Object} [params] - query params (search, page, genres, platforms, etc.)
 */
export async function fetchGames(params = {}) {
  // TODO: implement request to `${RAWG_BASE_URL}/games`
  const response = await fetch(`${RAWG_BASE_URL}/games?key=${RAWG_API_KEY}&dates=2019-09-01,2019-09-30&platforms=18,1,7`)
  const data = await response.json()
  return data.results.map(game => ({
    ...game,
    released: game.released ? game.released.slice(0, 4) : '',
    rating: game.rating ? game.rating.toFixed(1) : '0.0'
  }));
}

/**
 * Fetch a single game by its id.
 * @param {number|string} id
 */
export async function fetchGameById(id) {
  // TODO: implement request to `${RAWG_BASE_URL}/games/${id}`
}

/**
 * Fetch screenshots for a single game.
 * @param {number|string} id
 */
export async function fetchGameScreenshots(id) {
  // TODO: implement request to `${RAWG_BASE_URL}/games/${id}/screenshots`
}

/**
 * Fetch the list of available genres.
 */
export async function fetchGenres() {
  // TODO: implement request to `${RAWG_BASE_URL}/genres`
}

/**
 * Fetch the list of available platforms.
 */
export async function fetchPlatforms() {
  // TODO: implement request to `${RAWG_BASE_URL}/platforms`
}

export { RAWG_BASE_URL, RAWG_API_KEY };
