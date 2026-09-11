import { initEvents } from "./events.js";
import "./components/hero-card.js";
import "./components/featured-card.js";
import "./components/allGames.js";
import { initGameNavigation } from "./game-navigation.js";

import './components/popular-cards.js'

// Application entry point.
function init() {
  initEvents();
  initGameNavigation();

}


init();
