const base = "https://hope4humanity.nyolosorio.no";
const wpBase = "/wp-json/wp/v2";
const postBase = "/posts";
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

const container = document.querySelector(".blogsContainer");
const featuredSection = document.querySelector(".featuredContainer");
const featuredDiv = document.createElement("div");
featuredDiv.classList.add("featured");

const featuredHeading = document.createElement("h2");
featuredHeading.classList.add("featuredHeading");
featuredHeading.innerText = "Featured Authors";

async function getBlogs() {
  const response = await fetch(blogsUrl);
  const blogs = await response.json();

  return blogs;
}

function createBlogsHTML(blogs) {
  for (let i = 0; i < blogs.length; i++) {
    const bibleVerse = blogs[i];
    createBlogHTML(bibleVerse);
  }
}

function createBlogHTML(blog) {
  const description1stLine = document.createElement("div");
  description1stLine.classList.add("firstLineDescription");
  const titleBlog = blog.title;
  const blogContainer = document.createElement("a");
  blogContainer.href = `blogs.html?id=${blog.id}`;
  blogContainer.classList.add("blogContainer");
  blogContainer.classList.add("cards");
  blogContainer.id = blog.id;

  const titleName = document.createElement("h2");
  titleName.innerText = titleBlog.rendered;

  const author = blog._links;
  const authorLink = author.author;
  const authorHREF = authorLink[0].href;
  const image = blog.featured_media;

  const categoriesContainer = blog.categories;
  const categoryID = categoriesContainer[0];

  const description = document.createElement("div");
  description.classList.add("blogDescription");

  async function getCategory() {
    const responseCategory = await fetch(categoriesUrl + categoryID);
    const category = await responseCategory.json();
    return category;
  }

  function createCategoryHTML(category) {
    const categories = document.createElement("p");
    categories.classList.add("category");
    categories.innerText = category.name;
    description1stLine.prepend(categories);
  }

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

    const categories = await getCategory();
    createCategoryHTML(categories);
  }

  const date = document.createElement("date");
  date.classList.add("dateBlog");
  const dateBlog = blog.date;
  date.innerText = dateBlog.slice(0, -9);
  description1stLine.append(date);

  description.append(description1stLine, titleName);
  blogContainer.append(description);
  container.append(blogContainer);
  main();
}

async function getAuthor() {
  const response = await fetch(authorUrl);
  const categories = await response.json();

  return categories;
}

function createAuthorHtml(author) {
  const imageContent = document.createElement("div");
  imageContent.classList.add("imageContent");
  const card = document.createElement("div");
  card.classList.add("cardsFeatured");
  const imageCardContent = document.createElement("div");
  imageCardContent.classList.add("imageCardContent");

  const imageOverlay = document.createElement("span");
  imageOverlay.classList.add("imageOverlay");

  const cardImage = document.createElement("div");
  cardImage.classList.add("cardImage");
  const imageAuthor = document.createElement("img");
  imageAuthor.classList.add("imageAuthor");
  imageAuthor.src = "image/soloPic.avif";
  imageAuthor.alt = "soloImage";
  cardImage.append(imageAuthor);
  imageCardContent.append(imageOverlay, cardImage);

  const cardContent = document.createElement("div");
  cardContent.classList.add("cardContent");
  const cardName = document.createElement("h3");
  cardName.classList.add("cardsName");
  cardName.innerText = author.name;

  let authorID = author.id;

  async function getContents() {
    const response = await fetch(usersUrl + authorID);
    const content = await response.json();

    return content;
  }

  function createContentHtML(content) {
    const cardDescription = document.createElement("p");
    cardDescription.classList.add("cardDescription");
    cardDescription.innerText += content.title.rendered;
    cardContent.append(cardDescription);
  }

  function createContentsHtml(content) {
    for (let i = 0; i < content.length; i++) {
      const element = content[i];
      createContentHtML(element);
    }
  }

  async function mainContent() {
    const content = await getContents();
    createContentsHtml(content);
  }

  mainContent();

  cardContent.append(cardName);

  card.append(imageCardContent, cardContent);
  featuredDiv.append(card);
  featuredSection.append(featuredHeading, featuredDiv);
}

function createAuthorsHTML(author) {
  for (let i = 0; i < author.length; i++) {
    const authorList = author[i];
    createAuthorHtml(authorList);
  }
}

async function mainAuthor() {
  const author = await getAuthor();
  createAuthorsHTML(author);
}

// pagination

function button2() {
  if (currentValue < 5) {
    link.forEach((element) => {
      element.classList.remove("active");
      backButton.style.display = "inline-flex";
    });
  }
  currentValue++;
  link[currentValue - 1].classList.add("active");

  if (currentValue === 5) {
    nxtButton.style.display = "none";
  }
}

const nxtButton = document.querySelector(".button2");

function button1() {
  if ((currentValue > 1) & (currentValue < 6)) {
    link.forEach((element) => {
      element.classList.remove("active");
      nxtButton.style.display = "inline-flex";
    });
  } else if (currentValue === 1) {
    backButton.style.display = "none";
  }
  currentValue--;
  link[currentValue - 1].classList.add("active");
}

const backButton = document.querySelector(".button1");

let link = document.querySelectorAll(".link");
let currentValue = 2;

function activeLink() {
  link.forEach((element) => {
    element.classList.remove("active");
  });
  let pageNumber = 0;
  event.target.classList.add("active");
  currentValue = event.target.value;
  backButton.style.display = "inline-flex";
  nxtButton.style.display = "inline-flex";
}

export {
  createAuthorsHTML,
  createBlogsHTML,
  getBlogs,
  blogsUrl,
  mediaURL,
  categoriesUrl,
  authorUrl,
  usersUrl,
  blogsUrlPage,
  getAuthor,
  mainAuthor,
  button1,
  button2,
  nxtButton,
  backButton,
  activeLink,
  link,
  currentValue,
};
