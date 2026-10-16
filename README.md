# mTravel

Личный сайт-дневник путешествий. Чистые HTML, SCSS и JavaScript, без библиотек.
Запускай через **Live Server** из корня проекта (пути начинаются с `/`).

## Структура

```
mTravel/
├── index.html              ← единственная «настоящая» страница (оболочка): навбар, <main>, футер
├── html/
│   ├── components/         ← куски, общие для всех страниц (navbar, footer, overlay-window)
│   ├── pages/              ← страницы, которые подставляются в <main>: home, galerie, sobre, registration
│   └── experiments/        ← песочница (experiment.html)
├── scripts/                ← JavaScript, разбит на модули (см. ниже)
├── styles/
│   └── scss/               ← SCSS (компилируется в styles/scss/main/styles.css)
│       ├── abstracts/      ← variables/ и mixins/ — только значения и «наборы свойств», CSS не выводят
│       ├── base/           ← reset, шрифты, body, типографика, утилиты
│       ├── components/     ← кнопки, карточки, формы, галерея, регистрация, оверлей
│       ├── layout/         ← навбар, страница, секции, футер
│       └── main/           ← styles.scss (точка входа) и скомпилированный styles.css
└── materials/              ← всё, что не код
    ├── fonts/
    ├── icons/
    └── images/
        ├── backgrounds/
        ├── branding/       ← логотип
        └── countries/<страна>/01.jpeg, 02.jpeg, ...
```

## Как работает переключение страниц

Адрес вида `index.html#/galerie` → роутер (`scripts/router.js`) берёт `galerie`,
находит в таблице `pages` файл `html/pages/galerie.html` и подставляет в `<main id="page">`.
Ссылки в навбаре — обычные `<a href="#/galerie" data-page="galerie">`: JS-кликов не нужно.

**Новая страница:**
1. создай `html/pages/имя.html`;
2. добавь строку в `pages` в `scripts/router.js` (`file`, `title`, при желании `init`);
3. добавь ссылку `<a class="nav-item" href="#/имя" data-page="имя">` в `html/components/navbar.html`.

## JavaScript: модули

Каждый `.js` файл — модуль. Он отдаёт наружу то, что нужно другим (`export`),
и берёт у других то, что нужно ему (`import`).

```
scripts/
├── main.js                 ← точка входа (единственный файл в <script> в index.html)
├── router.js               ← таблица страниц, переключение, подсветка навбара
├── state.js                ← общее состояние (текущая страница и т.п.)
├── config/                 ← данные и настройки: paths.js, countries.js, socials.js
├── utils/                  ← мелкие помощники: dom.js (el), loader.js (loadComponent)
├── components/             ← переиспользуемые куски интерфейса: overlay, playlist-player, location-buttons, cards-overlay
├── features/               ← «большие» возможности: gallery.js
└── pages/                  ← код конкретных страниц: home.js, galerie.js, register.js
```

### Как создать свой файл и подключить

1. Создай файл, например `scripts/utils/format.js`, и **экспортируй** функцию:
   ```js
   export function capitalize(text) {
     return text.charAt(0).toUpperCase() + text.slice(1);
   }
   ```
2. В файле, где она нужна, **импортируй** её. Путь — относительный и **с расширением `.js`**:
   ```js
   import { capitalize } from "../utils/format.js";

   console.log(capitalize("portugal")); // Portugal
   ```
   - `./` — та же папка, `../` — на уровень выше.
3. В `index.html` подключать новый файл **не нужно**: там только `main.js`
   (`<script type="module" src="/scripts/main.js">`). Всё остальное подтягивается через `import`.
   Если файл нужно запускать с самого старта — импортируй его в `main.js`.

Правила:
- `export function ...` — можно импортировать по имени: `import { имя } from "..."`.
- Один файл — одна задача. Не знаешь, куда положить? Данные → `config/`, помощник → `utils/`,
  кусок интерфейса → `components/`, код страницы → `pages/`.
- Файлы-модули работают только через сервер (Live Server), двойным кликом по `index.html` — нет.
- Нельзя, чтобы два файла импортировали друг друга по кругу. Общее состояние — в `state.js`.
