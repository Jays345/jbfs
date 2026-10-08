document.addEventListener("DOMContentLoaded", () => {
const filterButtons = document.querySelectorAll(".filter-btn");
const galleryCards = document.querySelectorAll(".gallery-card");
const noResults = document.getElementById("noResults");


filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedCategory = button.dataset.filter;
        let visibleCount = 0;

  
        filterButtons.forEach((filterButton) => {
            const isActive = filterButton === button;

            filterButton.classList.toggle("active", isActive);
            filterButton.setAttribute(
                "aria-pressed",
                String(isActive)
            );
        });

        galleryCards.forEach((card) => {
            const category = card.dataset.category;
            const shouldShow =
                selectedCategory === "all" ||
                category === selectedCategory;

            card.hidden = !shouldShow;

            if (shouldShow) {
                visibleCount++;
            }
        });

      
        if (noResults) {
            noResults.hidden = visibleCount > 0;
        }
    });
});

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const closeButton = document.getElementById("lightboxClose");
const previousButton = document.getElementById("lightboxPrev");
const nextButton = document.getElementById("lightboxNext");

if (
    !lightbox ||
    !lightboxImage ||
    !lightboxCaption ||
    !closeButton ||
    !previousButton ||
    !nextButton
) {
    console.error("Gallery lightbox elements are missing.");
    return;
}

let currentIndex = 0;
let visiblePhotos = [];
let previouslyFocusedElement = null;


function getVisiblePhotos() {
    return Array.from(
        document.querySelectorAll(".photo-button")
    ).filter((photo) => {
        // Exclude photos inside filtered-out cards
        const hiddenCard = photo.closest(".gallery-card");

        if (hiddenCard && hiddenCard.hidden) {
            return false;
        }

        return true;
    });
}


function refreshPhotos() {
    visiblePhotos = getVisiblePhotos();

    const multiplePhotos = visiblePhotos.length > 1;

    previousButton.hidden = !multiplePhotos;
    nextButton.hidden = !multiplePhotos;
}


function openLightbox(photo) {
    refreshPhotos();

    currentIndex = visiblePhotos.indexOf(photo);

    if (currentIndex === -1) {
        return;
    }

    previouslyFocusedElement = document.activeElement;

    showCurrentPhoto();

    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");

    closeButton.focus();
}


function showCurrentPhoto() {
    if (!visiblePhotos.length) {
        return;
    }

    const photo = visiblePhotos[currentIndex];
    const image = photo.querySelector("img");

    const imageSource =
        photo.dataset.image ||
        (image ? image.currentSrc || image.src : "");

    const imageTitle =
        photo.dataset.title ||
        (image ? image.alt : "School photograph");

    lightboxImage.src = imageSource;
    lightboxImage.alt = imageTitle;
    lightboxCaption.textContent = imageTitle;

    previousButton.disabled = visiblePhotos.length <= 1;
    nextButton.disabled = visiblePhotos.length <= 1;
}

// Make every featured and gallery photo clickable
document.querySelectorAll(".photo-button").forEach((photo) => {
    photo.addEventListener("click", () => {
        openLightbox(photo);
    });
});

function closeLightbox() {
    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");

    lightboxImage.removeAttribute("src");
    lightboxImage.alt = "";
    lightboxCaption.textContent = "";

    if (
        previouslyFocusedElement &&
        document.contains(previouslyFocusedElement)
    ) {
        previouslyFocusedElement.focus();
    }
}

closeButton.addEventListener("click", closeLightbox);

// Close when clicking the dark background
lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

function showPreviousPhoto() {
    if (visiblePhotos.length <= 1) {
        return;
    }

    currentIndex =
        (currentIndex - 1 + visiblePhotos.length) %
        visiblePhotos.length;

    showCurrentPhoto();
}

function showNextPhoto() {
    if (visiblePhotos.length <= 1) {
        return;
    }

    currentIndex =
        (currentIndex + 1) % visiblePhotos.length;

    showCurrentPhoto();
}

previousButton.addEventListener("click", showPreviousPhoto);
nextButton.addEventListener("click", showNextPhoto);


document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) {
        return;
    }

    if (event.key === "Escape") {
        closeLightbox();
    } else if (event.key === "ArrowLeft") {
        showPreviousPhoto();
    } else if (event.key === "ArrowRight") {
        showNextPhoto();
    }
});

console.log("Gallery functionality initialized successfully.");


});
