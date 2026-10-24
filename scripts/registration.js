const user = {
  name: "Mark",
  email: "mark@example.com",
  password: "1234567",
};

const form = document.querySelector("#registerForm");
const stepEmail = form.querySelector(".login-step-1");
const stepPassword = form.querySelector(".login-step-2");
const stepRegister = form.querySelector(".registration-section");
const message = form.querySelector("#formMessage");

let step = "email";

function showStep(name) {
  step = name;
  stepEmail.classList.toggle("hidden", name !== "email");
  stepPassword.classList.toggle("hidden", name !== "password");
  stepRegister.classList.toggle("hidden", name !== "register");
}

function checkEmail() {
  const email = form.querySelector("#emailVerification").value.trim().toLowerCase();

  if (!email) {
    message.textContent = "digita o teu email.";
  } else if (email === user.email) {
    form.querySelector("#welcomeName").textContent = user.name;
    showStep("password");
  } else {
    form.querySelector("#regEmail").value = email;
    showStep("register");
  }
}

function checkPassword() {
  const password = form.querySelector("#loginPassword").value;

  if (password === user.password) {
    message.textContent = "bem-vindo de volta, " + user.name + "!";
  } else {
    message.textContent = "password errada.";
  }
}

function createAccount() {
  const name = form.querySelector("#regName").value.trim();
  const email = form.querySelector("#regEmail").value.trim();
  const password = form.querySelector("#regPassword").value;
  const confirmation = form.querySelector("#regPasswordConfirmation").value;

  if (!name || !email || !password) {
    message.textContent = "preenche todos os campos.";
  } else if (password !== confirmation) {
    message.textContent = "as passwords não coincidem.";
  } else {
    message.textContent = "conta criada, " + name + "!";
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  message.textContent = "";

  if (step === "email") {
    checkEmail();
  } else if (step === "password") {
    checkPassword();
  } else {
    createAccount();
  }
});
