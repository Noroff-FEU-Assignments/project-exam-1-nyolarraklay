import {
  getBlogs,
  mediaURL,
  blogsUrl,
  getAuthor,
  authorUrl,
  button1,
  button2,
  nxtButton,
  backButton,
  activeLink,
  link,
  currentValue,
} from "./import.js";

const containerPage1 = document.querySelector(".filesContainer");

const blogsUrlPage = "?per_page=5&page=";

function createBlogFilesHTML(blog) {
  const textContainerBlogsPage1 = document.createElement("div");
  textContainerBlogsPage1.classList.add("textContainerBlogs");
  const titleBlog = blog.title;
  const author = blog._links;
  const authorLink = author.author;
  const authorHREF = authorLink[0].href;
  const image = blog.featured_media;
  let authorID = blog.author;

  const blogContainerPage1 = document.createElement("div");
  blogContainerPage1.classList.add("blogContainer");
  blogContainerPage1.classList.add("blogCards");

  async function getImage() {
    const responseMedia = await fetch(mediaURL + image);
    const imageMedia = await responseMedia.json();
    return imageMedia;
  }

  function createImageHTML(image) {
    const blogImage = document.createElement("div");
    blogImage.classList.add("blogImage");
    blogImage.style.backgroundImage = `url(${image.guid.rendered})`;
    blogContainerPage1.prepend(blogImage);
  }

  async function main() {
    const blogImage = await getImage();
    createImageHTML(blogImage);
  }
  main();

  const titleName = document.createElement("h2");
  titleName.innerText = titleBlog.rendered;

  const excerpt = document.createElement("p");
  excerpt.classList.add("excerpt");
  excerpt.innerHTML = blog.excerpt.rendered;

  textContainerBlogsPage1.append(titleName, excerpt);

  async function getContents() {
    const response = await fetch(authorUrl + authorID);
    const content = await response.json();

    return content;
  }

  function createAuthorHtml(author) {
    const imageContent = document.createElement("div");
    imageContent.classList.add("imageContent");
    const card = document.createElement("div");
    card.classList.add("cardsFeatured");
    const imageCardContent = document.createElement("div");
    imageCardContent.classList.add("imageCircleContent");

    const cardImage = document.createElement("div");
    cardImage.classList.add("imgCircle");
    const imageAuthor = document.createElement("img");
    imageAuthor.classList.add("imgAuthor");
    imageAuthor.src = "image/soloPic.avif";
    imageAuthor.alt = "soloImage";
    cardImage.append(imageAuthor);
    imageCardContent.append(cardImage);

    const cardName = document.createElement("h3");
    cardName.classList.add("cardsName");
    cardName.innerText = author.name;
    imageCardContent.append(cardName);
    textContainerBlogsPage1.append(imageCardContent);

    const button = document.createElement("button");
    button.classList.add("readMore");
    button.innerText = "Read More";

    textContainerBlogsPage1.append(button);
  }

  async function mainContent() {
    const content = await getContents();
    createAuthorHtml(content);
  }

  mainContent();
  containerPage1.append(blogContainerPage1);

  containerPage1.append(textContainerBlogsPage1);
}

function createBibleBlogsHTML(blogs) {
  for (let i = 0; i < blogs.length; i++) {
    const bibleBlogsPage1 = blogs[i];
    createBlogFilesHTML(bibleBlogsPage1);
  }
}

let pageNumber = 1;
async function getBlogsByPage() {
  const response = await fetch(blogsUrl + blogsUrlPage + pageNumber);
  const blogs = await response.json();

  return blogs;
}

async function mainPage1() {
  const bibleVersePage1 = await getBlogsByPage();
  createBibleBlogsHTML(bibleVersePage1);
  return bibleVersePage1;
}

mainPage1();

// pagination

link.forEach(function (elem) {
  elem.addEventListener("click", activeLink);
});

backButton.style.display = "none";

nxtButton.addEventListener("click", button2);
backButton.addEventListener("click", button1);

const pageTwo = document.querySelector(".page2");
pageTwo.addEventListener("click", function redirectToProduct() {
  location.href = "blogs2.html";
});

const next = document.querySelector(".button2");
next.addEventListener("click", function redirectToProduct() {
  location.href = "blogs2.html";
});
const pageThree = document.querySelector(".page3");
pageThree.addEventListener("click", function redirectToPage() {
  location.href = "blogs3.html";
});
const pageFour = document.querySelector(".page4");
pageFour.addEventListener("click", function redirectToPage() {
  location.href = "blogs4.html";
});
const pageFive = document.querySelector(".page5");
pageFive.addEventListener("click", function redirectToPage() {
  location.href = "blogs5.html";
});
