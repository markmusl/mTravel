// Точка входа: единственный файл, который подключён в index.html.
// Остальные подключаются отсюда через import.
import { PATHS } from "./config/paths.js";
import { loadComponent } from "./utils/loader.js";
import { startRouter } from "./router.js";

async function start() {
  // навбар и футер — общие для всех страниц, грузим их одновременно
  await Promise.all([
    loadComponent("#navbar", `${PATHS.components}/navbar.html`),
    loadComponent("#footer", `${PATHS.components}/footer.html`),
  ]);

  startRouter();
}

start();
