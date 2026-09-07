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

const games = await fetchGames();
const randomIndex = Math.floor(Math.random() * games.length);
const randomGame = games[randomIndex];

console.log(randomGame);

const gameCard = createGameCard(randomGame);

refs.featuredList.innerHTML = gameCard;
