// Страница sign up: форма пока работает только в браузере (сервера у сайта нет),
// данные никуда не отправляются и не сохраняются.
export function initRegister() {
  const form = document.querySelector("#registerForm");
  const success = document.querySelector("#registerSuccess");

  // пока в registration.html нет формы — просто ничего не делаем
  if (!form || !success) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // не перезагружать страницу

    const name = document.querySelector("#registerName").value.trim();
    document.querySelector("#registerWelcomeName").textContent = name;

    form.classList.add("hidden");
    success.classList.remove("hidden");
  });
}
