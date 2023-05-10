const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

console.log(id);

const base = "https://hope4humanity.nyolosorio.no";
const wpBase = "/wp-json/wp/v2";
const postBase = "/posts/";
const authorBase = "/users/";
const mediaBase = "/media/";
const categoriesBase = "/categories/";
const featureBase = "?featured=true";
const usersBase = "?author=";

const blogsUrl = base + wpBase + postBase;
const mediaURL = base + wpBase + mediaBase;
const categoriesUrl = base + wpBase + categoriesBase;
const authorUrl = base + wpBase + authorBase;
const usersUrl = base + wpBase + postBase + usersBase;
const blogsUrlPage = "?per_page=5&page=";

const details = document.querySelector(".detailsContainer");
const titleBlogs = document.querySelector("title");

async function getBlogs() {
  const response = await fetch(blogsUrl + id);
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

  titleBlogs.innerText = `Blogs | ${titleBlog.rendered}`;

  const blogContainerPage1 = document.createElement("div");
  blogContainerPage1.classList.add("blogContainer");
  blogContainerPage1.classList.add("blogCards");
  blogContainerPage1.classList.add("detailsCards");

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
  details.append(titleName);

  const excerpt = document.createElement("p");
  excerpt.classList.add("excerpt");
  excerpt.innerHTML = blog.content.rendered;

  textContainerBlogsPage1.append(excerpt);

  async function getContents() {
    const response = await fetch(authorUrl + authorID);
    const content = await response.json();

    return content;
  }

  function createAuthorHtml(author) {
    const authorSection = document.createElement("div");
    authorSection.classList.add("authorSection");

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
    authorSection.append(imageCardContent);

    const button = document.createElement("button");
    button.classList.add("readMore");
    button.innerText = "ALL POSTS";

    button.addEventListener("click", function redirectPage() {
      location.href = `authors.html?id=${author.id}`;
    });

    authorSection.append(button);
    textContainerBlogsPage1.append(authorSection);
  }

  async function mainContent() {
    const content = await getContents();
    createAuthorHtml(content);
  }

  mainContent();
  details.append(blogContainerPage1);

  details.append(textContainerBlogsPage1);
}

async function mainPage1() {
  const bibleVersePage1 = await getBlogs();
  createBlogFilesHTML(bibleVersePage1);
  return bibleVersePage1;
}

mainPage1();
