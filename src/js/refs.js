// Centralized DOM element references, shared across modules.

export const refs = {
  header: document.querySelector("#header"),
  popularGames: document.querySelector('#popular-cards'),
  main: document.querySelector("#main"),
  gamesList: document.querySelector(".games__list"),
  heroList: document.querySelector(".hero__games"),
  featuredList: document.querySelector("#featured"),
  surpriseBtn: document.querySelector('#surpriseBtn'),
  surpriseResult: document.querySelector('#surpriseResult'),
  
  footer: document.querySelector("#footer"),
};