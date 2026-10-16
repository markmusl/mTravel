// Загружает HTML-файл и вставляет его в элемент страницы.
// Возвращает true, если получилось, и false, если файла нет.
export async function loadComponent(selector, file) {
  const target = document.querySelector(selector);
  if (!target) {
    console.error(`loadComponent: на странице нет элемента ${selector}`);
    return false;
  }

  const response = await fetch(file);

  if (!response.ok) {
    console.error(`Не загрузилось: ${file} (${response.status})`);
    return false;
  }

  target.innerHTML = await response.text();
  return true;
}
