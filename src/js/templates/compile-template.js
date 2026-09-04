import Handlebars from 'handlebars';
import gameCardSource from './game-card.hbs?raw';
import gameFeaturedCard from './featured-card.hbs?raw';

// Precompiled Handlebars templates, keyed by name.
const templates = {
  gameCard: Handlebars.compile(gameCardSource),
  featuredCard: Handlebars.compile(gameFeaturedCard),
};

/**
 * Render a named Handlebars template with the given data.
 * @param {keyof typeof templates} name
 * @param {Object} data
 * @returns {string} HTML string
 */
export function renderTemplate(name, data) {
  const template = templates[name];
  if (!template) {
    throw new Error(`Unknown template: ${name}`);
  }
  return template(data);
}
