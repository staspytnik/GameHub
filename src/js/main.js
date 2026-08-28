import { initEvents } from "./events.js";
import { fetchGenres } from "./api/games-api.js";
import { forEach } from "lodash";
import { log } from "handlebars";

// Application entry point.
function init() {
  initEvents();
}

init();

//!

const genres = await fetchGenres();
console.log(genres.name);

const list = document.querySelector(".games__list--categories");

const createCategory = function (genre) {
  const categorieItem = document.createElement("li");
  categorieItem.classList.add("games__items--categories");

  const categorieButton = document.createElement("button");
  categorieButton.classList.add("games__buttons");

  categorieButton.innerHTML = genre.name;

  categorieItem.append(categorieButton);
  list.append(categorieItem);
};

genres.forEach((genre) => {
  createCategory(genre);
});
