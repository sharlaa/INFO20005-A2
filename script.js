const sportsTrack = document.getElementById("sportsTrack");
const sportsNext = document.getElementById("sportsNext");
const sportsPrev = document.getElementById("sportsPrev");

const originalCards = [...document.querySelectorAll(".sport-card-img")];

const visibleCards = 3;
const cardWidth = 340;
const gap = 60;
const moveAmount = cardWidth + gap;

/* clone last 3 cards to the front */
originalCards.slice(-visibleCards).forEach(card => {
  const clone = card.cloneNode(true);
  sportsTrack.insertBefore(clone, sportsTrack.firstChild);
});

/* clone first 3 cards to the end */
originalCards.slice(0, visibleCards).forEach(card => {
  const clone = card.cloneNode(true);
  sportsTrack.appendChild(clone);
});

let sportsIndex = visibleCards;

/* start in the real first card position */
sportsTrack.style.transform = `translateX(-${sportsIndex * moveAmount}px)`;

sportsNext.addEventListener("click", () => {
  sportsIndex++;

  sportsTrack.style.transition = "transform 0.45s ease";
  sportsTrack.style.transform = `translateX(-${sportsIndex * moveAmount}px)`;

  if (sportsIndex >= originalCards.length + visibleCards) {
    setTimeout(() => {
      sportsTrack.style.transition = "none";
      sportsIndex = visibleCards;
      sportsTrack.style.transform = `translateX(-${sportsIndex * moveAmount}px)`;
    }, 450);
  }
});

sportsPrev.addEventListener("click", () => {
  sportsIndex--;

  sportsTrack.style.transition = "transform 0.45s ease";
  sportsTrack.style.transform = `translateX(-${sportsIndex * moveAmount}px)`;

  if (sportsIndex < visibleCards) {
    setTimeout(() => {
      sportsTrack.style.transition = "none";
      sportsIndex = originalCards.length + visibleCards - 1;
      sportsTrack.style.transform = `translateX(-${sportsIndex * moveAmount}px)`;
    }, 450);
  }
});