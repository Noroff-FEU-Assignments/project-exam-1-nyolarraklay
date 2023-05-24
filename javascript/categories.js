const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

console.log(id);

const base = "https://hope4humanity.nyolosorio.no";
const wpBase = "/wp-json/wp/v2";
const postBase = "/posts";
const categoriesBase = "?categories=";

const categoriesUrl = base + wpBase + postBase + categoriesBase;

import { createBibleBlogsHTML } from "./authors.js";

async function getBlogs() {
  try {
    const response = await fetch(categoriesUrl + id);
    const blogs = await response.json();
    console.log(blogs);
    return blogs;
  } catch (error) {
    console.error(error);
    container.innerHTML = message("error", error);
  }
}

getBlogs();

async function mainPage1() {
  const bibleVersePage1 = await getBlogs();
  createBibleBlogsHTML(bibleVersePage1);
  return bibleVersePage1;
}

mainPage1();
