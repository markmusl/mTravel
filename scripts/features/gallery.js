import { PATHS } from "../config/paths.js";
import { el } from "../utils/dom.js";
import { createPlayer } from "../components/playlist-player.js";

// Форматы фото, которые пробуем по очереди (у России .jpg, у Казахстана .jpeg)
const PHOTO_EXTENSIONS = ["jpeg", "jpg", "png", "webp"];

// Добавляет в container фото из папки countries/<location>/01, 02, ...
// Пробует по очереди: загрузилось — добавляем и пробуем следующий номер;
// не нашли файл ни в одном формате — стоп.
// Формат, который сработал для первой фото, дальше пробуется первым (меньше лишних запросов).
function loadPhotos(location, container, i = 1, formats = PHOTO_EXTENSIONS) {
  const index = String(i).padStart(2, "0");
  const [extension, ...otherFormats] = formats;

  const img = el("img", "galerie-photo");
  img.alt = `${location} ${index}`;

  img.onload = () => {
    container.append(img);
    // следующий номер; формат, который сработал, ставим первым
    const next = [
      extension,
      ...PHOTO_EXTENSIONS.filter((f) => f !== extension),
    ];
    loadPhotos(location, container, i + 1, next);
  };

  img.onerror = () => {
    if (otherFormats.length > 0) {
      loadPhotos(location, container, i, otherFormats); // тот же номер, другой формат
    } else {
      console.log(`${location}: остановились на ${index}, файла нет`);
    }
  };

  img.src = `${PATHS.countries}/${location}/${index}.${extension}`;
}

// Создаёт целую секцию страны и кладёт её в container.
// locationName — и название на странице, и имя папки с фото (countries/<locationName>/)
export function sectionCreation(
  container,
  locationName,
  locationFlag,
  locationDate,
  playlistLink,
) {
  const section = el("section", "galerie-container");
  section.dataset.country = locationName; // метка, по ней находим секцию при клике на кнопку

  // data
  const data = el("div", "moment-data");
  const dataLeft = el("div", "info-left");

  dataLeft.append(
    el("h3", "moment-flag", locationFlag),
    el("h3", "moment-location", locationName),
    el("h4", "moment-date", locationDate),
  );

  data.append(dataLeft);
  if (playlistLink) data.append(createPlayer(playlistLink));

  // photos
  const photos = el("div", "photos-container");
  loadPhotos(locationName, photos);

  section.append(data, photos);
  container.append(section);
}
