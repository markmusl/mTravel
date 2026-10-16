import { countries } from "../config/countries.js";
import { state } from "../state.js";
import { el } from "../utils/dom.js";

// Плавно прокручивает к секции страны (у секции есть метка data-country)
export function scrollToCountry(name) {
  const section = document.querySelector(`[data-country="${name}"]`);
  if (section) section.scrollIntoView({ behavior: "smooth" });
}

// Клик по кнопке страны:
//  — мы уже на галерее → просто прокручиваем к секции
//  — мы на другой странице → запоминаем страну, открываем галерею,
//    и прокрутка произойдёт, когда секции будут созданы (см. pages/galerie.js)
function goToCountry(name) {
  if (state.currentPage === "galerie") {
    scrollToCountry(name);
  } else {
    state.pendingCountry = name;
    location.hash = "#/galerie";
  }
}

// Создаёт кнопку страны внутри container.
// buttonClass — какие классы у кнопки: на галерее "button liquid-button", на главной "button"
function addLocationButton(container, country, buttonClass) {
  const button = el("div", buttonClass, `${country.flag}  ${country.name}`);

  button.addEventListener("click", () => goToCountry(country.name));

  container.append(button);
}

// Создаёт кнопки для ВСЕХ стран. Вызывается и на главной, и на галерее —
// поэтому на каждой странице получается СВОЙ набор кнопок
// (один и тот же элемент нельзя положить в два места сразу).
export function renderLocationButtons(container, buttonClass) {
  countries.forEach((country) => {
    addLocationButton(container, country, buttonClass);
  });
}
