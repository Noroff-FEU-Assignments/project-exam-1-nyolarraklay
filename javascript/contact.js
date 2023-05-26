const message = document.querySelector(".message");
const name = document.querySelector(".name");
const nameError = document.querySelector("#nameError");
const email = document.querySelector(".email");
const emailError = document.querySelector("#emailError");
const subject = document.querySelector(".subject");
const characterCount = document.querySelector(".character-count span");
const button = document.querySelector(".btn");
const success = document.querySelector(".success");
const subjectError = document.querySelector("#subjectError");
const messageError = document.querySelector("#messageError");

message.onkeyup = function () {
  const length = event.target.value.length;
  characterCount.innerHTML = length;
};

function validateForm() {
  event.preventDefault();

  let isInputValid = true;

  if (checkLength(name.value, 5) === true) {
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

  if (checkLength(subject.value, 15) === true) {
    subjectError.style.display = "none";
    subject.style.borderColor = "green";
  } else {
    subjectError.style.display = "block";
    subject.style.borderColor = "red";
    isInputValid = false;
  }

  if (checkLength(message.value, 25) === true) {
    messageError.style.display = "none";
    message.style.borderColor = "green";
  } else {
    messageError.style.display = "block";
    message.style.borderColor = "red";
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
