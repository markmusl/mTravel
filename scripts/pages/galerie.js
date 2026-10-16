import { countries } from "../config/countries.js";
import { state } from "../state.js";
import {
  renderLocationButtons,
  scrollToCountry,
} from "../components/location-buttons.js";
import { sectionCreation } from "../features/gallery.js";

// Запускается после того, как galerie.html появился на странице
export function initGalerie() {
  renderLocationButtons(
    document.querySelector("#locationsList"),
    "button liquid-button",
  );

  const galerieContent = document.querySelector("#galerieContent");
  countries.forEach((country) => {
    sectionCreation(
      galerieContent,
      country.name,
      country.flag,
      country.date,
      country.playlist,
    );
  });

  // пришли с главной по кнопке страны → прокручиваем к ней
  if (state.pendingCountry) {
    scrollToCountry(state.pendingCountry);
    state.pendingCountry = null;
  }
}
