import { fetchGenres } from "./api/games-api.js";

const genres = await fetchGenres();

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

if (genres) {
  genres.forEach((genre) => {
    createCategory(genre);
  });
} else {
  alert("Something went wrong");
}
