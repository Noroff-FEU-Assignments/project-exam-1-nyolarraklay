import {
  createBlogsHTML,
  getBlogs,
  categoriesUrl,
  authorUrl,
  usersUrl,
  mainAuthor,
} from "./import.js";

async function main() {
  const bibleVerse = await getBlogs();
  createBlogsHTML(bibleVerse);
}

main();

const slider = document.querySelector(".carousel");
const imgContainer = document.querySelector(".blogsContainer");
const pagination = document.querySelectorAll(".pagination span");

console.log(pagination);

function slide(id) {
  imgContainer.style.left = -100 * id + "%";
  pagination.forEach((pag) => {
    pag.classList.remove("active");
  });
  pagination[id].classList.add("active");
}

let interval = setInterval(autoSlide, 4000);
let imgId = 1;

function autoSlide() {
  if (imgId > pagination.length - 1) {
    imgId = 0;
  }
  slide(imgId);
  imgId++;
}

for (let i = 0; i < pagination.length; i++) {
  pagination[i].addEventListener("click", () => {
    clearInterval(interval);

    slide(i);

    imgId = i + 1;

    interval = setInterval(autoSlide, 7000);
  });
}

const categoriesSection = document.querySelector(".categories");
const categoriesContainer = document.createElement("div");
const categoriesImage = document.createElement("div");

const spiritualImage = document.createElement("div");
spiritualImage.classList.add("spiritualImage");
spiritualImage.style.backgroundImage = `url("/image/spiritual image.jpg") `;

categoriesSection.append(categoriesContainer, spiritualImage);

const textContainer = document.createElement("div");
textContainer.classList.add("textContainer");

const categoryTitle = document.createElement("p");
categoryTitle.classList.add("categoryTitle");
categoryTitle.innerText = "UNCOVER CALLING";

const categoryHeading = document.createElement("h1");
categoryHeading.innerText = "Trust in God's Guidance";

const categoryParagraph = document.createElement("p");
categoryParagraph.innerText =
  "Let the bible guide your everyday and eternal life.";

const categoryListContainer = document.createElement("div");
categoryListContainer.classList.add("listContainer");

textContainer.append(
  categoryTitle,
  categoryHeading,
  categoryParagraph,
  categoryListContainer
);
categoriesContainer.append(textContainer);

async function getCategories() {
  const response = await fetch(categoriesUrl);
  const categories = await response.json();

  return categories;
}

function createCategoryHtml(category) {
  const categoryName = document.createElement("a");
  categoryName.href = `categories.html?id=${category.id}`;
  categoryName.classList.add("categoryName");
  categoryName.innerText = category.name;

  categoryListContainer.append(categoryName);
}

function createCategoriesHTML(categories) {
  for (let i = 0; i < categories.length; i++) {
    const categoryList = categories[i];
    createCategoryHtml(categoryList);
  }
}

async function mainCategory() {
  const categories = await getCategories();
  createCategoriesHTML(categories);
}

mainCategory();

mainAuthor();
