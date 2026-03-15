import { User } from "../Data/User.js";
import { validateEmailWithMessage } from "../Data/util/emailManager.js";
import { validatePasswordWithMessage } from "../Data/util/passwordManager.js";

let nameInput = document.getElementById("name");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let nameValidationSpan = document.getElementById("nameValidation");
let emailValidationSpan = document.getElementById("emailValidation");
let passwordValidationSpan = document.getElementById("passwordValidation");
let form = document.getElementById("form");

nameInput.addEventListener("input", (e) => {
  const isValid = nameInput.value.length >= 3;
  if (!isValid)
    nameValidationSpan.textContent = "Minimum name length is 3 characters";
  else nameValidationSpan.textContent = "";
});

passwordInput.addEventListener("input", (e) => {
  const message = validatePasswordWithMessage(passwordInput.value);

  if (message !== "Valid") passwordValidationSpan.textContent = message;
  else passwordValidationSpan.textContent = "";
});

emailInput.addEventListener("input", (e) => {
  const message = validateEmailWithMessage(emailInput.value);

  if (message !== "Valid") emailValidationSpan.textContent = message;
  else emailValidationSpan.textContent = "";
});

form.addEventListener("submit", (e) => {
  const valid =
    emailValidationSpan.textContent === "" &&
    nameValidationSpan.textContent === "" &&
    passwordValidationSpan.textContent === "";

  if (!valid) return;

  const user = new User(
    -1,
    emailInput.value,
    passwordInput.value,
    nameInput.value,
  );

  const newID = user.addUser();

  if (newID) {
    window.location.href = "/login";
  }

  e.preventDefault();
});
