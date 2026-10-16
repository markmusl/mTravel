import { showOverlay } from "./overlay.js";

// Клик по карточке (.card) открывает окно с её названием и описанием.
// Карточек на страницах пока нет, но когда появятся — достаточно
// вызвать initCardsOverlay() после того, как страница нарисована (это делает router.js).

function informationGrabbler(clickedItem) {
  const title = clickedItem.querySelector("#cardTitle")?.textContent ?? "";
  const text = clickedItem.querySelector("#cardDescription")?.textContent ?? "";
  return [title, text];
}

export function initCardsOverlay() {
  const cards = document.querySelectorAll(".card");
  const heading = document.querySelector("#windowHeading");
  const text = document.querySelector("#windowText");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      showOverlay();

      const [cardTitle, cardText] = informationGrabbler(card);
      if (heading) heading.textContent = cardTitle;
      if (text) text.textContent = cardText;
    });
  });
}
