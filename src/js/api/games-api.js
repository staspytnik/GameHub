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
  const queryParams = new URLSearchParams(params);
  const response = await fetch(
    `${RAWG_BASE_URL}/games?key=${RAWG_API_KEY}&${queryParams.toString()}`,
  );
  const data = await response.json();
  return data.results;
}

/**
 * Fetch a single game by its id.
 * @param {number|string} id
 */

export async function fetchGameById(id) {
  // TODO: implement request to `${RAWG_BASE_URL}/games/${id}`
  const response = await fetch(
    `${RAWG_BASE_URL}/games/${id}?key=${RAWG_API_KEY}`,
  );
  const game = await response.json();
  return game;
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

export async function fetchRandomGame(retries = 3) {
  const countResponse = await fetch(
    `${RAWG_BASE_URL}/games?key=${RAWG_API_KEY}&page_size=1`,
  );
  const { count } = await countResponse.json();

  const randomPage = Math.floor(Math.random() * count) + 1;

  const pageResponse = await fetch(
    `${RAWG_BASE_URL}/games?key=${RAWG_API_KEY}&page_size=1&page=${randomPage}`,
  );
  const { results } = await pageResponse.json();
if (!results.length && retries > 0) {
    return fetchRandomGame(retries - 1);
  }

  return results[0];
}

export { RAWG_BASE_URL, RAWG_API_KEY };
