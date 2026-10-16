import { PATHS } from "../config/paths.js";
import { el } from "../utils/dom.js";
import { showOverlay, hideOverlay } from "./overlay.js";

const ICON_UP = `${PATHS.icons}/chevron.up.svg`;
const ICON_DOWN = `${PATHS.icons}/chevron.down.svg`;

// Из обычной ссылки Apple Music делает ссылку для плеера:
// music.apple.com/...  →  embed.music.apple.com/...
function toEmbedLink(playlistLink) {
  return playlistLink.replace("music.apple.com", "embed.music.apple.com");
}

// Создаёт блок «кнопка playlist + окно с плеером».
// playlistLink — обычная ссылка на плейлист (та, что даёт «Поделиться»).
export function createPlayer(playlistLink) {
  const block = el("div", "info-right");

  const button = el("a", "button playlist-button", "playlist");
  const buttonIcon = el("img", "button-icon");
  buttonIcon.src = ICON_UP;
  button.append(buttonIcon);

  const player = el("iframe", "playlist-window is-hidden");
  player.allow = "autoplay *; encrypted-media *";
  player.setAttribute("frameborder", "0");
  player.setAttribute(
    "sandbox",
    "allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation",
  );

  block.append(button, player);

  // показать плеер при наведении
  block.addEventListener("mouseenter", () => {
    // плеер грузим только при первом наведении, а не сразу при открытии страницы
    if (!player.src) player.src = toEmbedLink(playlistLink);

    player.classList.remove("is-hidden");
    button.classList.add("is-active");
    buttonIcon.src = ICON_DOWN;

    showOverlay({ clickThrough: true });
  });

  // спрятать, когда курсор ушёл
  block.addEventListener("mouseleave", () => {
    player.classList.add("is-hidden");
    button.classList.remove("is-active");
    buttonIcon.src = ICON_UP;

    hideOverlay();
  });

  return block;
}
