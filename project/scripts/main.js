/* ---------- DOM REFERENCES ---------- */

const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("#primary-navigation");

const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

const faqQuestions = document.querySelectorAll(".faq-question");

/* ---------- FUNCTIONS ---------- */

function toggleMenu() {
  navigation.classList.toggle("open");
  menuButton.classList.toggle("open");

  const isOpen = navigation.classList.contains("open");

  menuButton.setAttribute("aria-expanded", `${isOpen}`);

  menuButton.setAttribute(
    "aria-label",
    `${isOpen ? "Close" : "Open"} navigation menu`,
  );
}

function updateFooter() {
  const today = new Date();

  currentYear.textContent = `${today.getFullYear()}`;

  lastModified.textContent = `Last Modification: ${document.lastModified}`;
}

/* ---------- EVENT LISTENERS ---------- */

menuButton.addEventListener("click", toggleMenu);

faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    const faqItem = question.closest(".faq-item");
    const faqSymbol = question.querySelector(".faq-symbol");

    faqItem.classList.toggle("open");

    const isOpen = faqItem.classList.contains("open");

    question.setAttribute("aria-expanded", `${isOpen}`);
    
    faqSymbol.textContent = `${isOpen ? "−" : "+"}`;
  });
});

/* ---------- INITIALIZATION ---------- */

updateFooter();
