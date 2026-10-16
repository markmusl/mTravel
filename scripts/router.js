import { PATHS } from "./config/paths.js";
import { state } from "./state.js";
import { loadComponent } from "./utils/loader.js";
import { initCardsOverlay } from "./components/cards-overlay.js";
import { initHome } from "./pages/home.js";
import { initGalerie } from "./pages/galerie.js";
import { initRegister } from "./pages/register.js";

// ─────────────────────────────────────────────────────────────────────────────
// Таблица страниц. Ключ — то, что пишется в адресе после "#/":
//   index.html#/galerie  →  "galerie"
// file  — HTML-файл страницы (лежит в html/pages/)
// title — заголовок вкладки браузера
// init  — (необязательно) функция, которая запускается ПОСЛЕ показа страницы
//
// Чтобы добавить страницу: положи файл в html/pages/, добавь строку сюда
// и ссылку <a href="#/имя" data-page="имя"> в html/components/navbar.html
// ─────────────────────────────────────────────────────────────────────────────

const branding = "mTravel |";

const pages = {
  home: {
    file: `${PATHS.pages}/home.html`,
    title: "mTravel",
    init: initHome,
  },
  galerie: {
    file: `${PATHS.pages}/galerie.html`,
    title: `${branding} galerie`,
    init: initGalerie,
  },
  sobre: {
    file: `${PATHS.pages}/sobre.html`,
    title: `${branding} sobre`,
  },
  register: {
    file: `${PATHS.pages}/registration.html`,
    title: `${branding} registrartion`,
    init: initRegister,
  },
};

const DEFAULT_PAGE = "home";

// Адрес вида  index.html#/galerie  →  "galerie". Пустой или неизвестный → home.
function getPageFromHash() {
  const name = location.hash.replace(/^#\/?/, "").split("/")[0];
  return pages[name] ? name : DEFAULT_PAGE;
}

// Подсвечивает пункт навбара текущей страницы (у ссылок есть data-page)
function updateActiveNavbarItem() {
  document.querySelectorAll(".nav-center .nav-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.page === state.currentPage);
  });
}

// Пауза на заданное число миллисекунд: await wait(300)
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Сколько длится плавный переход — берём прямо из CSS (.page { transition }),
// чтобы время не пришлось менять в двух местах.
function getFadeDuration(element) {
  const seconds = parseFloat(getComputedStyle(element).transitionDuration);
  return (seconds || 0) * 1000;
}

async function showPage(name) {
  state.currentPage = name;
  const page = pages[name];
  const pageElement = document.querySelector("#page");

  // 1. старая страница плавно исчезает, а новая в это время загружается
  pageElement.classList.add("is-leaving");
  const [loaded] = await Promise.all([
    loadComponent("#page", page.file),
    wait(getFadeDuration(pageElement)),
  ]);

  // пока грузилась страница, пользователь мог кликнуть дальше — тогда эта уже не нужна
  if (name !== state.currentPage) return;

  // 2. под невидимой страницей спокойно меняем всё остальное
  document.title = page.title;
  window.scrollTo(0, 0);

  if (loaded && page.init) {
    try {
      page.init();
    } catch (error) {
      // ошибка внутри страницы не должна ломать навбар и переключение
      console.error(`Ошибка на странице "${name}":`, error);
    }
  }

  initCardsOverlay();
  updateActiveNavbarItem();

  // 3. новая страница плавно появляется: убираем класс, и CSS-transition
  // плавно возвращает прозрачность с 0 до 1.
  // Строка с offsetHeight заставляет браузер «зафиксировать» невидимое состояние перед этим.
  void pageElement.offsetHeight;
  pageElement.classList.remove("is-leaving");
}

export function startRouter() {
  // клик по ссылке <a href="#/galerie"> меняет адрес → браузер сам шлёт hashchange
  window.addEventListener("hashchange", () => showPage(getPageFromHash()));

  showPage(getPageFromHash());
}
