import {
  queryString,
  params,
  id,
  usersUrl,
  getAuthorContent,
  authorUrl,
  mediaURL,
} from "./import.js";

const categories = document.querySelector(".categoriesContainer");

function createBlogFilesHTML(blog) {
  const textContainerBlogsPage1 = document.createElement("div");
  textContainerBlogsPage1.classList.add("textContainerBlogs");
  const titleBlog = blog.title;
  const author = blog._links;
  const authorLink = author.author;
  const authorHREF = authorLink[0].href;
  const image = blog.featured_media;
  let authorID = blog.author;

  const button = document.createElement("button");
  button.classList.add("readMore");
  button.innerText = "Read More";

  button.addEventListener("click", function redirectToPage() {
    location.href = `details.html?id=${blog.id}`;
  });

  const blogContainerPage1 = document.createElement("div");
  blogContainerPage1.classList.add("blogContainer");
  blogContainerPage1.classList.add("blogCards");

  async function getImage() {
    try {
      const responseMedia = await fetch(mediaURL + image);
      const imageMedia = await responseMedia.json();
      return imageMedia;
    } catch (error) {
      console.error(error);
      container.innerHTML = message("error", error);
    }
  }

  function createImageHTML(image) {
    const blogImage = document.createElement("img");
    blogImage.classList.add("blogImage");
    blogImage.src = image.guid.rendered;
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

    textContainerBlogsPage1.append(button);
  }

  async function mainContent() {
    const content = await getContents();
    createAuthorHtml(content);
  }

  mainContent();
  categories.append(blogContainerPage1);

  categories.append(textContainerBlogsPage1);
}

function createBibleBlogsHTML(blogs) {
  for (let i = 0; i < blogs.length; i++) {
    const bibleBlogsPage1 = blogs[i];
    createBlogFilesHTML(bibleBlogsPage1);
  }
}

async function mainPage1() {
  const bibleVersePage1 = await getAuthorContent();
  createBibleBlogsHTML(bibleVersePage1);
  return bibleVersePage1;
}

mainPage1();

export { createBibleBlogsHTML };
