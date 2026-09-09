import { fetchGames } from '../api/games-api.js';
import { createGameCard } from './game-card.js'
import { refs } from '../refs.js'

async function createPopularCards() {
  try {
    const games = await fetchGames();
    console.log(games);

    const sortGames = [...games]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4);

    const gameCards = sortGames.map(game => createGameCard(game));

    refs.popularGames.innerHTML = gameCards.join('');
  } catch (error) {
    console.log("Game loading error: ", error);
  }
}

createPopularCards();

refs.popularGames.addEventListener('click', (event) => {
  const likeBtn = event.target.closest('.game-card__likeBtn')
  if (!likeBtn) return

  const card = likeBtn.closest('.game-card')
  const gameId = card.dataset.id

  const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

  if (!savedFavorites.includes(gameId)) {
    savedFavorites.push(gameId);
    localStorage.setItem('favorites', JSON.stringify(savedFavorites));
    likeBtn.classList.add('is-active');
  } else {
    const updatedFavorites = savedFavorites.filter(id => id !== gameId);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    likeBtn.classList.remove('is-active');
  }
})