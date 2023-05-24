import {
  blogsUrl,
  mediaURL,
  categoriesUrl,
  authorUrl,
  usersUrl,
  blogsUrlPage,
  activeLink,
  link,
  currentValue,
} from "./import.js";

const sortFormA = document.querySelector(".atoz");
const sortFormB = document.querySelector(".ztoa");

const loading = document.querySelector(".loading");

const containerPage2 = document.querySelector(".allPagesContainer");

const pageContainerPage3 = document.createElement("div");
pageContainerPage3.classList.add("filesContainer");

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
    const blogImage = document.createElement("img");
    blogImage.classList.add("blogImage");
    blogImage.src = image.guid.rendered;
    blogImage.alt = image.alt_text;
    blogContainer.prepend(blogImage);

    const dialog = document.createElement("dialog");
    dialog.classList.add("modal");
    const modalImage = document.createElement("img");
    modalImage.classList.add("blogImage");
    modalImage.src = image.guid.rendered;
    modalImage.alt = image.alt_text;

    dialog.append(modalImage);
    blogContainer.append(dialog);

    blogImage.addEventListener("click", () => {
      dialog.showModal();
    });

    dialog.addEventListener("click", () => {
      dialog.close();
    });
  }

  async function main() {
    const blogImage = await getImage();
    createImageHTML(blogImage);
    loading.style.display = "none";
  }
  main();

  pageContainerPage3.append(blogContainer);

  const titleName = document.createElement("h2");
  const name = titleBlog.rendered;
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

  blogContainer.append(textContainerBlogs);
  containerPage2.append(pageContainerPage3);
}

function createBibleBlogsHTMLpage2(blogs) {
  for (let i = 0; i < blogs.length; i++) {
    const bibleBlogs = blogs[i];
    createBlogFilesHTMLPage2(bibleBlogs);
  }
}

async function getBlogsByPage3() {
  const response = await fetch(blogsUrl + blogsUrlPage + 3);
  const blogs = await response.json();

  return blogs;
}

async function mainPage3() {
  try {
    const bibleVerse = await getBlogsByPage3();
    createBibleBlogsHTMLpage2(bibleVerse);

    // sort
    sortFormA.addEventListener("click", function () {
      pageContainerPage3.innerHTML = "";
      const sortedProducts = bibleVerse.sort(function (a, b) {
        if (a.date > b.date) {
          return 1;
        } else if (a.date < b.date) {
          return -1;
        } else {
          return 0;
        }
      });
      console.log(sortedProducts);

      createBibleBlogsHTMLpage2(sortedProducts);
    });
    sortFormB.addEventListener("click", function () {
      pageContainerPage3.innerHTML = "";
      const sortedProducts = bibleVerse.sort(function (a, b) {
        if (a.date < b.date) {
          return 1;
        } else if (a.date > b.date) {
          return -1;
        } else {
          return 0;
        }
      });
      console.log(sortedProducts);

      createBibleBlogsHTMLpage2(sortedProducts);
    });

    return bibleVerse;
  } catch (error) {
    console.error(error);
    container.innerHTML = message("error", error);
  }
}

mainPage3();

// page one

const pageContainer = document.createElement("div");
pageContainer.classList.add("showPage1");

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
    const blogImage = document.createElement("img");
    blogImage.classList.add("blogImage");
    const imageHref = image.guid.rendered;
    blogImage.src = image.guid.rendered;
    blogContainerPage1.prepend(blogImage);

    const dialog = document.createElement("dialog");
    dialog.classList.add("modal");
    const modalImage = document.createElement("img");
    modalImage.classList.add("blogImage");
    modalImage.src = image.guid.rendered;
    modalImage.alt = image.alt_text;

    dialog.append(modalImage);
    blogContainerPage1.append(dialog);

    blogImage.addEventListener("click", () => {
      dialog.showModal();
    });

    dialog.addEventListener("click", () => {
      dialog.close();
    });
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

  blogContainerPage1.append(textContainerBlogsPage1);
  pageContainer.append(blogContainerPage1);
  containerPage2.append(pageContainer);
}

async function getBlogsByPage() {
  const response = await fetch(blogsUrl + blogsUrlPage + 1);
  const blogs = await response.json();

  return blogs;
}

function createBibleBlogsHTML(blogs) {
  for (let i = 0; i < blogs.length; i++) {
    const bibleBlogsPage1 = blogs[i];
    createBlogFilesHTML(bibleBlogsPage1);
  }
}

async function mainPage() {
  try {
    const bibleVersePage1 = await getBlogsByPage();
    createBibleBlogsHTML(bibleVersePage1);
    // sort
    sortFormA.addEventListener("click", function () {
      pageContainer.innerHTML = "";
      const sortedProducts = bibleVersePage1.sort(function (a, b) {
        if (a.date > b.date) {
          return 1;
        } else if (a.date < b.date) {
          return -1;
        } else {
          return 0;
        }
      });
      console.log(sortedProducts);

      createBibleBlogsHTML(sortedProducts);
    });
    sortFormB.addEventListener("click", function () {
      pageContainer.innerHTML = "";
      const sortedProducts = bibleVersePage1.sort(function (a, b) {
        if (a.date < b.date) {
          return 1;
        } else if (a.date > b.date) {
          return -1;
        } else {
          return 0;
        }
      });
      console.log(sortedProducts);

      createBibleBlogsHTML(sortedProducts);
    });

    return bibleVersePage1;
  } catch (error) {
    console.error(error);
    container.innerHTML = message("error", error);
  }
}

mainPage();

// page two

const pageContainerPage2 = document.createElement("div");
pageContainerPage2.classList.add("showPage2");
function createBlogFilesHTMLPage(blog) {
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
    const blogImage = document.createElement("img");
    blogImage.classList.add("blogImage");
    blogImage.src = image.guid.rendered;
    blogContainer.prepend(blogImage);

    const dialog = document.createElement("dialog");
    dialog.classList.add("modal");
    const modalImage = document.createElement("img");
    modalImage.classList.add("blogImage");
    modalImage.src = image.guid.rendered;
    modalImage.alt = image.alt_text;

    dialog.append(modalImage);
    blogContainer.append(dialog);

    blogImage.addEventListener("click", () => {
      dialog.showModal();
    });

    dialog.addEventListener("click", () => {
      dialog.close();
    });
  }

  async function main() {
    const blogImage = await getImage();
    createImageHTML(blogImage);
  }
  main();

  pageContainerPage2.append(blogContainer);

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

  blogContainer.append(textContainerBlogs);
  containerPage2.append(pageContainerPage2);
}

function createBibleBlogsHTMLpage(blogs) {
  for (let i = 0; i < blogs.length; i++) {
    const bibleBlogs = blogs[i];
    createBlogFilesHTMLPage(bibleBlogs);
  }
}

async function getBlogsByPage2() {
  const response = await fetch(blogsUrl + blogsUrlPage + 2);
  const blogs = await response.json();
  return blogs;
}

async function mainPage2() {
  try {
    const bibleVerse = await getBlogsByPage2();
    createBibleBlogsHTMLpage(bibleVerse);

    // sort
    sortFormA.addEventListener("click", function () {
      pageContainerPage2.innerHTML = "";
      const sortedProducts = bibleVerse.sort(function (a, b) {
        if (a.date > b.date) {
          return 1;
        } else if (a.date < b.date) {
          return -1;
        } else {
          return 0;
        }
      });
      console.log(sortedProducts);

      createBibleBlogsHTMLpage(sortedProducts);
    });
    sortFormB.addEventListener("click", function () {
      pageContainerPage2.innerHTML = "";
      const sortedProducts = bibleVerse.sort(function (a, b) {
        if (a.date < b.date) {
          return 1;
        } else if (a.date > b.date) {
          return -1;
        } else {
          return 0;
        }
      });
      console.log(sortedProducts);

      createBibleBlogsHTMLpage(sortedProducts);
    });
  } catch (error) {
    console.error(error);
    container.innerHTML = message("error", error);
  }
}

mainPage2();

pageContainerPage2.style.display = "none";
pageContainerPage3.style.display = "none";

// Pagination

const pageOne = document.querySelector(".page1");
const pageTwo = document.querySelector(".page2");
const pageThree = document.querySelector(".page3");
const pageFour = document.querySelector(".page4");
const pageFive = document.querySelector(".page5");

link.forEach(function (elem) {
  elem.addEventListener("click", activeLink);
});

pageOne.addEventListener("click", function redirectToPage() {
  pageContainer.style.display = "grid";
  pageContainerPage3.style.display = "none";
  pageContainerPage2.style.display = "none";
});

pageTwo.addEventListener("click", function redirectToPage() {
  pageContainer.style.display = "none";
  pageContainerPage3.style.display = "none";
  pageContainerPage2.style.display = "grid";
});

pageFour.addEventListener("click", function redirectToPage() {});

pageThree.addEventListener("click", function redirectToPage() {
  pageContainer.style.display = "none";
  pageContainerPage3.style.display = "grid";
  pageContainerPage2.style.display = "none";
});

const sort = document.querySelector(".dropbtn");
const dropDown = document.querySelector("#myDropdown");

sort.onclick = function () {
  dropDown.classList.toggle("show");
};

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    dropDown.classList.remove("show");
  }
};
