// Game card component: renders a single game as an HTML card.
// Full markup/data mapping is implemented in a later task.

import { renderTemplate } from "../templates/compile-template.js";
import { fetchGames, fetchGameById } from "../api/games-api.js";
import { refs } from "../refs.js";

/**
 * Build a game card's HTML markup from game data.
 * @param {Object} game
 * @returns {string}
 */
export function createGameCard(game) {
  return renderTemplate("featuredCard", game);
}

const games = await fetchGames({ page_size: 1 });

console.log(games);
const randomIndex = Math.floor(Math.random() * games.length);
const randomGame = games[randomIndex];
const gameCard = await fetchGameById(randomGame.id);

// const gameCards = games.map((game) => {
//   return createGameCard(game);
// });
console.log(gameCard);
const renderGame = createGameCard(gameCard);

refs.featuredList.innerHTML = renderGame;
