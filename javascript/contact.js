const message = document.querySelector(".message");
const name = document.querySelector(".name");
const nameError = document.querySelector("#nameError");
const email = document.querySelector(".email");
const emailError = document.querySelector("#emailError");
const phone = document.querySelector(".phone");
const characterCount = document.querySelector(".character-count span");
const button = document.querySelector(".btn");
const success = document.querySelector(".success");

message.onkeyup = function () {
  const length = event.target.value.length;
  characterCount.innerHTML = length;
};

function validateForm() {
  event.preventDefault();

  let isInputValid = true;

  if (checkLength(name.value, 3) === true) {
    nameError.style.display = "none";
    name.style.borderColor = "green";
  } else {
    nameError.style.display = "block";
    name.style.borderColor = "red";
    isInputValid = false;
  }

  if (validateEmail(email.value) === true) {
    emailError.style.display = "none";
    email.style.borderColor = "green";
  } else {
    emailError.style.display = "block";
    email.style.borderColor = "red";
    isInputValid = false;
  }

  if (isInputValid === true) {
    console.dir("success");
    success.innerText = "Thank you for your Message!";
  } else {
    console.log("failure");
    success.innerHTML = "Oops. there is something wrong ";
  }
}

button.addEventListener("click", validateForm);

function checkLength(value, len) {
  if (value.trim().length >= len) {
    return true;
  } else {
    return false;
  }
}

function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}
