import {
  createBlogsHTML,
  getBlogs,
  categoriesUrl,
  authorUrl,
  usersUrl,
  mainAuthor,
} from "./import.js";

const loading = document.querySelector(".loading");
async function main() {
  const bibleVerse = await getBlogs();
  createBlogsHTML(bibleVerse);
  loading.style.display = "none";
}

main();

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
  "The bible, the real Influencer. Let the bible influence your everyday and eternal life.";

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

  if (category.name === "Uncategorized") {
    categoryName.classList.add("uncategorized");
  }

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
