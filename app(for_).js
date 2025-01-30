// Carousel
const carouselImages = document.querySelectorAll(".carousel img");
let currentImageIndex = 0;

function showNextImage() {
  carouselImages[currentImageIndex].classList.remove("active");
  currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
  carouselImages[currentImageIndex].classList.add("active");
}

setInterval(showNextImage, 3000);
setTimeout(() => {
  document.getElementById("loadingScreen").style.display = "none";
  document.getElementById("content").style.display = "block";
}, 3000); // Simulate loading time (3 seconds)

// Filter Packages
// Live Chat
function openChat() {
  document.getElementById("chatWindow").style.display = "block";
}

function closeChat() {
  document.getElementById("chatWindow").style.display = "none";
}

function sendMessage() {
  const userMessage = document.getElementById("userMessage").value;
  if (userMessage) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("chat-message");
    messageDiv.textContent = userMessage;
    document.querySelector(".chat-content").appendChild(messageDiv);
    document.getElementById("userMessage").value = ""; // clear input
  }
}

// Package Filters
document.getElementById("priceRange").addEventListener("input", function () {
  document.getElementById("priceLabel").textContent = `Up to $${this.value}`;
});

function applyFilters() {
  const price = document.getElementById("priceRange").value;
  const duration = document.getElementById("duration").value;

  // Here you can use JavaScript to filter packages based on the selected options.
  console.log(
    `Filtering packages for price: $${price} and duration: ${duration}`
  );
}

// Reviews
function submitReview() {
  const reviewText = document.getElementById("reviewText").value;
  const rating = document.getElementById("rating").value;

  if (reviewText) {
    const reviewDiv = document.createElement("div");
    reviewDiv.classList.add("review");
    reviewDiv.innerHTML = `<p><strong>You:</strong> ${reviewText}</p><p>Rating: ${"★".repeat(
      rating
    )}${"☆".repeat(5 - rating)}</p>`;
    document.getElementById("reviews").appendChild(reviewDiv);
    document.getElementById("reviewText").value = ""; // clear input
  }
}

// Countdown Timer
function startCountdown(endDate) {
  const countDownDate = new Date(endDate).getTime();
  const timerElement = document.getElementById("timer");

  const interval = setInterval(function () {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    if (distance <= 0) {
      clearInterval(interval);
      timerElement.innerHTML = "Offer Expired";
    } else {
      const hours = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const minutes = Math.floor((distance % (1000 * 60)) / 1000);
      const seconds = Math.floor((distance % 1000) / 100);
      timerElement.innerHTML = `${hours}h ${minutes}m ${seconds}s`;
    }
  }, 1000);
}

startCountdown("2025-02-28T23:59:59"); // Example expiration date
//3
// State Management: Toggle Sections
function showSection(sectionId) {
  document
    .querySelectorAll(".section")
    .forEach((section) => (section.style.display = "none"));
  document.getElementById(sectionId).style.display = "block";
}

// Event Control: Form Validation and Submission
document
  .getElementById("signUpForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (name && email && password) {
      document.getElementById("successMessage").style.display = "block";
      document.getElementById("errorMessage").style.display = "none";
    } else {
      document.getElementById("successMessage").style.display = "none";
      document.getElementById("errorMessage").style.display = "block";
    }
  });

// Loading Control
window.onload = function () {
  document.getElementById("loadingScreen").style.display = "none";
};

// Popup Modal Control
function showPopup() {
  document.getElementById("popupOverlay").style.display = "flex";
}

function closePopup() {
  document.getElementById("popupOverlay").style.display = "none";
}

// Show the popup after 3 seconds
setTimeout(showPopup, 3000);
//4
// Tour Packages
const packages = [
  {
    name: "Beach Getaway",
    price: 300,
    duration: "short",
    description: "Relax on the sunny beaches with crystal-clear waters.",
    image: "../pro_1/img/pickcard1.png",
  },
  {
    name: "Mountain Adventure",
    price: 700,
    duration: "medium",
    description:
      "Explore the majestic mountains and enjoy thrilling activities.",
    image: "../pro_1/img/pickcard1.png",
  },
];

let currentPackage = null;

// Display Packages
function displayPackages(filteredPackages) {
  const packageList = document.getElementById("packageList");
  packageList.innerHTML = "";

  if (filteredPackages.length === 0) {
    packageList.innerHTML = `<p>No packages found matching your criteria.</p>`;
    return;
  }

  filteredPackages.forEach((pkg) => {
    const packageCard = document.createElement("div");
    packageCard.classList.add("package-card");
    packageCard.innerHTML = `
     <h4>${pkg.name}</h4>
     <p>Duration: ${
       pkg.duration === "short"
         ? "1-3 days"
         : pkg.duration === "medium"
         ? "4-7 days"
         : "8+ days"
     }</p>
     <p class="price">$${pkg.price}</p>
   `;
    packageCard.onclick = () => displayPackageDetails(pkg);
    packageList.appendChild(packageCard);
  });
}

// Show Details
function displayPackageDetails(pkg) {
  currentPackage = pkg;

  const packageDetails = document.getElementById("packageDetails");
  document.getElementById("packageImage").src = pkg.image;
  document.getElementById("packageTitle").textContent = pkg.name;
  document.getElementById("packageDescription").textContent = pkg.description;
  document.getElementById("packagePrice").textContent = `Price: $${pkg.price}`;
  document.getElementById("packageDuration").textContent = `Duration: ${
    pkg.duration === "short"
      ? "1-3 days"
      : pkg.duration === "medium"
      ? "4-7 days"
      : "8+ days"
  }`;

  packageDetails.classList.add("active");
  packageDetails.scrollIntoView();
}

// Payment Modal
function openPaymentModal() {
  if (!currentPackage) return;
  document.getElementById("paymentAmount").textContent = currentPackage.price;
  document.getElementById("paymentModal").style.display = "flex";
}

function closePaymentModal() {
  document.getElementById("paymentModal").style.display = "none";
}

document
  .getElementById("paymentForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    alert(
      `Payment of $${currentPackage.price} for "${currentPackage.name}" was successful!`
    );
    closePaymentModal();
  });

// Display all packages on load
displayPackages(packages);
