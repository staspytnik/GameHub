// RAWG Video Games Database API client.
// https://api.rawg.io/docs/

const RAWG_BASE_URL = "https://api.rawg.io/api";
const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;

/**
 * Fetch a paginated list of games.
 * @param {Object} [params] - query params (search, page, genres, platforms, etc.)
 */

export async function fetchGames(params = {}) {
  try {
    const quaryParams = new URLSearchParams(params);
    const response = await fetch(
      `${RAWG_BASE_URL}/games?key=${RAWG_API_KEY}&${quaryParams.toString()}`
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }

    const data = await response.json();
    const results = data.results.map((game) => ({
      ...game,
      released: game.released ? game.released.slice(0, 4) : "",
      rating: game.rating ? game.rating.toFixed(1) : "0.0",
    }));
    if (params.page_size !== undefined) {
      return { ...data, results };
    }
    return results;
  } catch (error) {
    console.error("Помилка під час завантаження", error);
    return [];
  }
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
  try {
    const response = await fetch(`${RAWG_BASE_URL}/genres?key=${RAWG_API_KEY}`);
    const genre = await response.json();
    return genre.results;
  } catch (error) {
    alert(error);
  }
}

/**
 * Fetch the list of available platforms.
 */
export async function fetchPlatforms() {
  // TODO: implement request to `${RAWG_BASE_URL}/platforms`
}

export async function fetchRandomGame() {
  const pageSize = 20;
  const maxPage = 50;
  const randomPage = Math.floor(Math.random() * maxPage) + 1;
  const data = await fetchGames({ page: randomPage, page_size: pageSize });
  const games = Array.isArray(data) ? data : data?.results ?? [];

  if (!games.length) {
    throw new Error('No games returned');
  }

  return games[Math.floor(Math.random() * games.length)];
}

export { RAWG_BASE_URL, RAWG_API_KEY };
