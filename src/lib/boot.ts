/**
 * First-load sequencing. The page always opens at the top of the landing page,
 * scrolling is held while the preloader plays, and anything that should start
 * "after the intro" subscribes with onBooted().
 */

let booted = false;
const listeners = new Set<() => void>();

/** Call once, before React renders. */
export function prepareBoot() {
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  // A reload or a deep link with a hash should still open on the landing view.
  if (window.location.hash) history.replaceState(null, "", window.location.pathname + window.location.search);
  window.scrollTo(0, 0);
  document.documentElement.classList.add("is-booting");
}

export const isBooted = () => booted;

/** Mark the intro finished: release scrolling and notify subscribers. */
export function finishBoot() {
  if (booted) return;
  booted = true;
  document.documentElement.classList.remove("is-booting");
  window.scrollTo(0, 0);
  listeners.forEach((fn) => fn());
  listeners.clear();
}

/** Run `fn` once the intro is done (immediately if it already is). Returns an unsubscribe. */
export function onBooted(fn: () => void) {
  if (booted) {
    fn();
    return () => {};
  }
  listeners.add(fn);
  return () => listeners.delete(fn);
}
