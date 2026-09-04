import { initEvents } from './events.js';
import { fetchGames } from './api/games-api.js';

// Application entry point.
function init() {
  initEvents();
  fetchGames();
}

init();
