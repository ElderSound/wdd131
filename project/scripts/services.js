/* ---------------- DATA ---------------- */

const services = [
  {
    id: 1,
    name: "Dental Cleaning",
    category: "preventive",
    description:
      "Professional cleaning helps remove plaque and tartar while supporting healthy teeth and gums.",
    image: "images/cleaning-720x480.webp",
    alt: "Patient receiving a professional dental cleaning",
  },
  {
    id: 2,
    name: "Teeth Whitening",
    category: "cosmetic",
    description:
      "Professional whitening treatment can reduce stains and create a brighter, more confident smile.",
    image: "images/whitening-720x480.webp",
    alt: "Dental whitening treatment",
  },
  {
    id: 3,
    name: "Orthodontics",
    category: "orthodontics",
    description:
      "Orthodontic treatment helps improve dental alignment, bite, and long-term oral health.",
    image: "images/orthodontics-720x480.webp",
    alt: "Orthodontic treatment with dental braces",
  },
];

/* ---------- DOM REFERENCES ---------- */

const servicesContainer = document.querySelector("#services-container");

const filterButtons = document.querySelectorAll(".filter-button");

const favoritesSummary = document.querySelector("#favorites-summary");

/* ---------- STATE ---------- */

let favoriteServices =
  JSON.parse(localStorage.getItem("favoriteServices")) || [];

/* ---------- FUNCTIONS ---------- */

function renderServices(category = "all") {
  const filteredServices =
    category === "all"
      ? services
      : services.filter((service) => service.category === category);

  servicesContainer.innerHTML = filteredServices
    .map((service) => {
      const isFavorite = favoriteServices.includes(service.id);

      return `
                <article class="service-card">
                    <img
                        src="${service.image}"
                        alt="${service.alt}"
                        width="720"
                        height="480"
                        loading="lazy">

                    <div class="service-card-content">
                        <p class="service-category">
                            ${service.category}
                        </p>

                        <h3>${service.name}</h3>

                        <p>
                            ${service.description}
                        </p>

                        <button
                            class="favorite-button"
                            type="button"
                            data-service-id="${service.id}"
                            aria-pressed="${isFavorite}">
                            ${
                              isFavorite
                                ? "Remove from Favorites"
                                : "Save as Favorite"
                            }
                        </button>
                    </div>
                </article>
            `;
    })
    .join("");
}

function updateFavoritesSummary() {
  const totalFavorites = favoriteServices.length;

  favoritesSummary.textContent =
    totalFavorites === 0
      ? `You have not saved any favorite services yet.`
      : `You have saved ${totalFavorites} favorite service${totalFavorites === 1 ? "" : "s"}.`;
}

function toggleFavorite(serviceId) {
  const isFavorite = favoriteServices.includes(serviceId);

  if (isFavorite) {
    favoriteServices = favoriteServices.filter((id) => id !== serviceId);
  } else {
    favoriteServices.push(serviceId);
  }

  localStorage.setItem("favoriteServices", JSON.stringify(favoriteServices));

  const activeFilter = document.querySelector(".filter-button.active");

  renderServices(activeFilter.dataset.category);
  updateFavoritesSummary();
}

function changeFilter(selectedButton) {
  filterButtons.forEach((button) => {
    button.classList.remove("active");
  });

  selectedButton.classList.add("active");

  renderServices(selectedButton.dataset.category);
}

/* ---------- EVENT LISTENERS ---------- */

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    changeFilter(button);
  });
});

servicesContainer.addEventListener("click", (event) => {
  const favoriteButton = event.target.closest(".favorite-button");

  if (favoriteButton) {
    const serviceId = Number(favoriteButton.dataset.serviceId);

    toggleFavorite(serviceId);
  }
});

/* ---------- INITIALIZATION ---------- */

renderServices();
updateFavoritesSummary();
