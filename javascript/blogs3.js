import {
  blogsUrl,
  mediaURL,
  categoriesUrl,
  authorUrl,
  usersUrl,
  blogsUrlPage,
  button1,
  button2,
  nxtButton,
  backButton,
  activeLink,
  link,
  currentValue,
} from "./import.js";

const containerPage2 = document.querySelector(".containerPage2");

function createBlogFilesHTMLPage2(blog) {
  const textContainerBlogs = document.createElement("div");
  textContainerBlogs.classList.add("textContainerBlogs");
  const titleBlog = blog.title;
  const author = blog._links;
  const authorLink = author.author;
  const authorHREF = authorLink[0].href;
  const image = blog.featured_media;
  let authorID = blog.author;

  const blogContainer = document.createElement("div");
  blogContainer.classList.add("blogContainer");
  blogContainer.classList.add("blogCards");
  const button = document.createElement("button");
  button.classList.add("readMore");
  button.innerText = "Read More";

  button.addEventListener("click", function redirectToPage() {
    location.href = `details.html?id=${blog.id}`;
  });

  async function getImage() {
    const responseMedia = await fetch(mediaURL + image);
    const imageMedia = await responseMedia.json();
    return imageMedia;
  }

  function createImageHTML(image) {
    const blogImage = document.createElement("div");
    blogImage.classList.add("blogImage");
    blogImage.style.backgroundImage = `url(${image.guid.rendered})`;
    blogContainer.prepend(blogImage);
  }

  async function main() {
    const blogImage = await getImage();
    createImageHTML(blogImage);
  }
  main();

  containerPage2.append(blogContainer);

  const titleName = document.createElement("h2");
  titleName.innerText = titleBlog.rendered;

  const excerpt = document.createElement("p");
  excerpt.classList.add("excerpt");
  excerpt.innerHTML = blog.excerpt.rendered;

  textContainerBlogs.append(titleName, excerpt);

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
    textContainerBlogs.append(imageCardContent);

    textContainerBlogs.append(button);
  }

  async function mainContent() {
    const content = await getContents();
    createAuthorHtml(content);
  }

  mainContent();

  containerPage2.append(textContainerBlogs);
}

function createBibleBlogsHTMLpage2(blogs) {
  for (let i = 0; i < blogs.length; i++) {
    const bibleBlogs = blogs[i];
    createBlogFilesHTMLPage2(bibleBlogs);
  }
}

async function getBlogsByPage2() {
  const response = await fetch(blogsUrl + blogsUrlPage + 3);
  const blogs = await response.json();
  console.log(response);
  return blogs;
}

async function mainPage2() {
  const bibleVerse = await getBlogsByPage2();
  createBibleBlogsHTMLpage2(bibleVerse);
  return bibleVerse;
}

mainPage2();

// Pagination
link.forEach(function (elem) {
  elem.addEventListener("click", activeLink);
});

nxtButton.addEventListener("click", button2);
backButton.addEventListener("click", button1);

const pageOne = document.querySelector(".page1");
pageOne.addEventListener("click", function redirectToPage() {
  location.href = "blogs.html";
});

const previous = document.querySelector(".button1");
previous.addEventListener("click", function redirectToProduct() {
  location.href = "blogs2.html";
});

const next = document.querySelector(".button2");
next.addEventListener("click", function redirectToProduct() {
  location.href = "blogs4.html";
});

const pageTwo = document.querySelector(".page2");
pageTwo.addEventListener("click", function redirectToPage() {
  location.href = "blogs2.html";
});
const pageFour = document.querySelector(".page4");
pageFour.addEventListener("click", function redirectToPage() {
  location.href = "blogs4.html";
});
const pageFive = document.querySelector(".page5");
pageFive.addEventListener("click", function redirectToPage() {
  location.href = "blogs5.html";
});
