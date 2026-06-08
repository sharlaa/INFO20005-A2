const sportsTrack = document.getElementById("sportsTrack");
const sportsNext = document.getElementById("sportsNext");
const sportsPrev = document.getElementById("sportsPrev");

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

/* initial position */
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

/* recalculate when screen size changes */
window.addEventListener("resize", () => {
  updatePosition(false);
});