const slider = document.querySelectorAll(".cards");
const imgContainer = document.querySelector(".blogsContainer");
const arrow = document.querySelectorAll(".arrow");
const leftArrow = document.querySelector(".arrowLeft");
const rightArrow = document.querySelector(".arrowRight");
let interval = setInterval(4000);

let id = 0;

rightArrow.addEventListener("click", (e) => {
  if (id != 3) {
    id++;
    imgContainer.style.left = -100 * id + "%";
    console.log(id);
  } else {
    imgContainer.style.left = "0%";
    id = 0;
  }
});

leftArrow.addEventListener("click", (e) => {
  if (id === 0) {
    imgContainer.style.left = -100 * id + "%";
  } else {
    id--;
    imgContainer.style.left = -100 * id + "%";
    console.log(id);
  }
});
