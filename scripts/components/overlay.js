// Затемнение поверх страницы (<div id="overlayWindow"> в index.html).
// Другие файлы показывают и прячут его через эти функции.
const overlayWindow = document.querySelector("#overlayWindow");

export function showOverlay({ clickThrough = false } = {}) {
  if (!overlayWindow) return;
  overlayWindow.classList.remove("is-hidden");
  // clickThrough: клики проходят сквозь затемнение (нужно для плеера)
  overlayWindow.style.pointerEvents = clickThrough ? "none" : "";
}

export function hideOverlay() {
  if (!overlayWindow) return;
  overlayWindow.classList.add("is-hidden");
  overlayWindow.style.pointerEvents = "";
}
