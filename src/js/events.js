// Application event bindings.
// Wires up DOM/user interaction listeners. Handlers are implemented in later tasks.

/**
 * Attach all application-level event listeners.
 */
import { initSuprise } from './components/suprise.js';

export function initEvents() {
  initSuprise();
  // TODO: search, filters, pagination, modal, library events — по мере готовности
}