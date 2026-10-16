import { renderLocationButtons } from "../components/location-buttons.js";

// Запускается после того, как home.html появился на странице
export function initHome() {
  // кнопки стран на главной — внутри блока в секции #main
  renderLocationButtons(document.querySelector("#homeLocations"), "button");
}
