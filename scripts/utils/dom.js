// Быстро создаёт элемент: el("h3", "moment-flag", "🇰🇿")
// className может содержать несколько классов через пробел: "button liquid-button"
export function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}
