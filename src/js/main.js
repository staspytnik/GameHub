import { initEvents } from './events.js';
import { fetchGames } from './api/games-api.js';
import { createGameCard } from './components/game-card.js'
import { refs } from './refs.js'

// Application entry point.
function init() {
  initEvents();
}

init();

const games = await fetchGames()
console.log(games)

const gameCards = games.map(game => {
  return createGameCard(game)
})

refs.main.innerHTML = gameCards.join('')