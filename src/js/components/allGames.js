import { fetchGames, fetchGenres } from "../api/games-api.js";
import { createGameCard } from "./game-card.js";
import { refs } from "../refs.js";

const games = await fetchGames({ page_size: 8 });
console.log(games);

const pageSize = 8;

const totalPages = Math.ceil(games.length / pageSize);
console.log(totalPages);

const gameCards = games.map((game) => {
  return createGameCard(game);
});

refs.gamesList.innerHTML = gameCards.join("");

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

const searchInput = document.querySelector(".games__input");
const gamesGenres = document.querySelector(".games__list--categories");

searchInput.addEventListener("input", async (e) => {
  const search = e.target.value.trim();

  if (search !== "") {
    const games = await fetchGames({ search });

    const gameCards = games.map((game) => {
      return createGameCard(game);
    });

    refs.gamesList.innerHTML = gameCards.join("");
  }
});

gamesGenres.addEventListener("click", async (e) => {
  const genres = e.target.closest("li").textContent.toLowerCase();
  console.log(genres);

  const games = await fetchGames({ genres });
  console.log(games);
});
