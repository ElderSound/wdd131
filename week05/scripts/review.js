let reviewCount = localStorage.getItem("reviewCount");

reviewCount = Number(reviewCount) || 0;

reviewCount = reviewCount + 1;

localStorage.setItem("reviewCount", reviewCount);

const reviewCountElement = document.querySelector("#review-count");

reviewCountElement.textContent = reviewCount;