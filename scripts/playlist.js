const overlay = document.getElementById("overlay");

document.querySelectorAll(".info-right").forEach(function (bloco) {
  const botao = bloco.querySelector(".playlist-button");
  const janela = bloco.querySelector(".playlist-window");
  const icone = bloco.querySelector(".button-icon");

  function abrir() {
    if (!janela.src) {
      janela.src = janela.dataset.src;
    }
    janela.classList.remove("is-hidden");
    botao.classList.add("is-active");
    botao.setAttribute("aria-expanded", "true");
    icone.src = "materials/icons/chevron.down.svg";
    overlay.classList.remove("is-hidden");
  }

  function fechar() {
    janela.classList.add("is-hidden");
    botao.classList.remove("is-active");
    botao.setAttribute("aria-expanded", "false");
    icone.src = "materials/icons/chevron.up.svg";
    overlay.classList.add("is-hidden");
  }

  bloco.addEventListener("mouseenter", abrir);
  bloco.addEventListener("mouseleave", fechar);

  botao.addEventListener("click", function () {
    if (botao.getAttribute("aria-expanded") === "true") {
      fechar();
    } else {
      abrir();
    }
  });

  document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape") {
      fechar();
    }
  });
});
