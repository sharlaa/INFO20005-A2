/* ========================= */
/* SPORTS SLIDER */
/* ========================= */

const sportsTrack = document.getElementById("sportsTrack");
const sportsNext = document.getElementById("sportsNext");
const sportsPrev = document.getElementById("sportsPrev");

if (sportsTrack && sportsNext && sportsPrev) {

  const originalCards = [...document.querySelectorAll(".sport-card-img")];

  const visibleCards = 3;

  /* clone last cards to front */
  originalCards.slice(-visibleCards).forEach(card => {
    sportsTrack.insertBefore(card.cloneNode(true), sportsTrack.firstChild);
  });

  /* clone first cards to end */
  originalCards.slice(0, visibleCards).forEach(card => {
    sportsTrack.appendChild(card.cloneNode(true));
  });

  function getMoveAmount() {
    const card = document.querySelector(".sport-card-img");

    const cardWidth = card.offsetWidth;

    const styles = window.getComputedStyle(sportsTrack);
    const gap = parseInt(styles.columnGap || styles.gap || 0);

    return cardWidth + gap;
  }

  let sportsIndex = visibleCards;

  function updatePosition(withAnimation = true) {

    const moveAmount = getMoveAmount();

    if (withAnimation) {
      sportsTrack.style.transition = "transform 0.45s ease";
    } else {
      sportsTrack.style.transition = "none";
    }

    sportsTrack.style.transform =
      `translateX(-${sportsIndex * moveAmount}px)`;
  }

  updatePosition(false);

  sportsNext.addEventListener("click", () => {

    sportsIndex++;
    updatePosition(true);

    if (sportsIndex >= originalCards.length + visibleCards) {

      setTimeout(() => {

        sportsIndex = visibleCards;
        updatePosition(false);

      }, 450);

    }
  });

  sportsPrev.addEventListener("click", () => {

    sportsIndex--;
    updatePosition(true);

    if (sportsIndex < visibleCards) {

      setTimeout(() => {

        sportsIndex = originalCards.length + visibleCards - 1;
        updatePosition(false);

      }, 450);

    }
  });

  window.addEventListener("resize", () => {
    updatePosition(false);
  });
}

/* ========================= */
/* MOBILE MENU */
/* ========================= */

const mobileMenuIcon = document.querySelector(".mobile-menu-icon");
const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
const mobileMenuClose = document.getElementById("mobileMenuClose");

if (mobileMenuIcon && mobileMenuOverlay && mobileMenuClose) {

  mobileMenuIcon.addEventListener("click", () => {
    mobileMenuOverlay.classList.add("active");
  });

  mobileMenuClose.addEventListener("click", () => {
    mobileMenuOverlay.classList.remove("active");
  });

  mobileMenuOverlay.addEventListener("click", (e) => {

    if (e.target === mobileMenuOverlay) {
      mobileMenuOverlay.classList.remove("active");
    }

  });

}