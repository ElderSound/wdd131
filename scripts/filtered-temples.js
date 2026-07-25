const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg",
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg",
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg",
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg",
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg",
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg",
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg",
  },
  {
    templeName: "Quito Ecuador",
    location: "Quito, Ecuador",
    dedicated: "2022, November, 20",
    area: 36780,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/quito-ecuador-temple/quito-ecuador-temple-31201.jpg",
  },
  {
    templeName: "Guayaquil Ecuador",
    location: "Guayaquil, Ecuador",
    dedicated: "1999, August, 1",
    area: 45000,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/guayaquil-ecuador-temple/guayaquil-ecuador-temple-2251.jpg",
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41010,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-3548.jpg",
  },
];

const templeGrid = document.querySelector(".temple-grid");
const pageTitle = document.querySelector("main h1");
const menuButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");
const filterLinks = document.querySelectorAll("[data-filter]");
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

function displayTemples(templeList) {
  templeGrid.innerHTML = "";

  templeList.forEach((temple) => {
    const card = document.createElement("section");
    card.classList.add("temple-card");

    const name = document.createElement("h2");
    name.textContent = temple.templeName;

    const location = document.createElement("p");
    const locationLabel = document.createElement("strong");
    locationLabel.textContent = "Location: ";
    location.append(locationLabel, temple.location);

    const dedicated = document.createElement("p");
    const dedicatedLabel = document.createElement("strong");
    dedicatedLabel.textContent = "Dedicated: ";
    dedicated.append(dedicatedLabel, temple.dedicated);

    const area = document.createElement("p");
    const areaLabel = document.createElement("strong");
    areaLabel.textContent = "Area: ";
    area.append(areaLabel, `${temple.area.toLocaleString("en-US")} sq ft`);

    const image = document.createElement("img");
    image.src = temple.imageUrl;
    image.alt = `${temple.templeName} Temple`;
    image.loading = "lazy";
    image.width = 400;
    image.height = 250;

    card.append(name, location, dedicated, area, image);
    templeGrid.appendChild(card);
  });
}

function getDedicatedYear(temple) {
  return Number.parseInt(temple.dedicated.split(",")[0], 10);
}

function filterTemples(filterName) {
  let filteredTemples;
  let heading;

  switch (filterName) {
    case "old":
      filteredTemples = temples.filter(
        (temple) => getDedicatedYear(temple) < 1900,
      );
      heading = "Old Temples";
      break;

    case "new":
      filteredTemples = temples.filter(
        (temple) => getDedicatedYear(temple) > 2000,
      );
      heading = "New Temples";
      break;

    case "large":
      filteredTemples = temples.filter((temple) => temple.area > 90000);
      heading = "Large Temples";
      break;

    case "small":
      filteredTemples = temples.filter((temple) => temple.area < 10000);
      heading = "Small Temples";
      break;

    case "home":
    default:
      filteredTemples = temples;
      heading = "Home";
      break;
  }

  pageTitle.textContent = heading;
  displayTemples(filteredTemples);
}

function closeMobileMenu() {
  navigation.classList.remove("open");
  menuButton.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation menu");
}

menuButton.addEventListener("click", () => {
  navigation.classList.toggle("open");
  menuButton.classList.toggle("open");

  const isOpen = navigation.classList.contains("open");

  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu",
  );
});

filterLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const selectedFilter = link.dataset.filter;

    filterLinks.forEach((item) => {
      item.classList.remove("active");
    });

    link.classList.add("active");

    filterTemples(selectedFilter);
    closeMobileMenu();
  });
});

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modification: ${document.lastModified}`;

displayTemples(temples);
