const footer = document.querySelector(".footer");

const logo = document.createElement("div");
logo.classList.add("logo");
logo.style.backgroundImage = `url("/image/bibleVerseLogo.png")`;

const contactContainer = document.createElement("div");
contactContainer.classList.add("contactContainer");
const contact = document.createElement("h4");
contact.classList.add("contact");
contact.innerText = "Contact and Connect";
const line1 = document.createElement("p");
line1.classList.add("line1");
line1.innerText = "______________";
const contactUs = document.createElement("p");
contactUs.classList.add("contactUs");
contactUs.innerText = "Contact Us";
const newsletter = document.createElement("p");
newsletter.classList.add("newsletter");
newsletter.innerText = "Newsletter - Subscribe";

contactContainer.append(contact, line1, contactUs, newsletter);

const aboutContainer = document.createElement("div");
aboutContainer.classList.add("aboutContainer");
const about = document.createElement("h4");
about.classList.add("about");
about.innerText = "About";
const line2 = document.createElement("p");
line2.classList.add("line2");
line2.innerText = "______________";
const aboutUs = document.createElement("p");
aboutUs.classList.add("aboutUs");
aboutUs.innerText = "About Us";
const faq = document.createElement("p");
faq.classList.add("faq");
faq.innerText = "FAQ";
const belief = document.createElement("p");
belief.classList.add("belief");
belief.innerText = "Our Belief";

aboutContainer.append(about, line2, aboutUs, faq, belief);

const socialContainer = document.createElement("div");
socialContainer.classList.add("socialContainer");
const socialMedia = document.createElement("h4");
socialMedia.classList.add("socialMedia");
socialMedia.innerText = "Social Media";
const line3 = document.createElement("p");
line3.classList.add("line3");
line3.innerText = "______________";
const facebook = document.createElement("p");
facebook.classList.add("facebook");
facebook.innerText = "FaceBook";
const instagram = document.createElement("p");
instagram.classList.add("instagram");
instagram.innerText = "Instagram";
const twitter = document.createElement("p");
twitter.classList.add("twitter");
twitter.innerText = "Twitter";

socialContainer.append(socialMedia, line3, facebook, instagram, twitter);

footer.append(logo, contactContainer, aboutContainer, socialContainer);
