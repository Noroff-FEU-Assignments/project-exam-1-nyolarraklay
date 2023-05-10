const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

console.log(id);

const base = "https://hope4humanity.nyolosorio.no";
const wpBase = "/wp-json/wp/v2";
const postBase = "/posts";
const authorBase = "/users/";
const mediaBase = "/media/";
const categoriesBase = "?categories=";
const featureBase = "?featured=true";
const usersBase = "?author=";

const blogsUrl = base + wpBase + postBase;
const mediaURL = base + wpBase + mediaBase;
const categoriesUrl = base + wpBase + postBase + categoriesBase;
const authorUrl = base + wpBase + authorBase;
const usersUrl = base + wpBase + postBase + usersBase;
const blogsUrlPage = "?per_page=5&page=";

const categories = document.querySelector(".categoriesContainer");

async function getBlogs() {
  const response = await fetch(categoriesUrl + id);
  const blogs = await response.json();
  console.log(blogs);
  return blogs;
}

getBlogs();

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
  const bibleVersePage1 = await getBlogs();
  createBibleBlogsHTML(bibleVersePage1);
  return bibleVersePage1;
}

mainPage1();
