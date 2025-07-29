// Variáveis de estado do jogo
let flippedCards = [];
let matchedPairs = 0;
let attempts = 0;
let isCheckingPair = false;

const cardItems = [
  { id: 1, content: "🐶", matched: false },
  { id: 2, content: "🐶", matched: false },
  { id: 3, content: "🐱", matched: false },
  { id: 4, content: "🐱", matched: false },
  { id: 5, content: "🐭", matched: false },
  { id: 6, content: "🐭", matched: false },
  { id: 7, content: "🐰", matched: false },
  { id: 8, content: "🐰", matched: false },
  { id: 9, content: "🦊", matched: false },
  { id: 10, content: "🦊", matched: false },
  { id: 11, content: "🐻", matched: false },
  { id: 12, content: "🐻", matched: false },
  { id: 13, content: "🐮", matched: false },
  { id: 14, content: "🐮", matched: false },
  { id: 15, content: "🐷", matched: false },
  { id: 16, content: "🐷", matched: false },
];

function shuffleCards(array) {
  // Positivo vai depois, negativo vai antes
  const shuffled = array.sort(() => (Math.random() > 0.5 ? 1 : -1));

  return shuffled;
}

function createCard(card) {
  const cardElement = document.createElement("div");
  cardElement.className = "card";

  const emoji = document.createElement("span");
  emoji.className = "card-emoji";
  emoji.textContent = card.content;
  emoji.style.fontSize = "50px";

  cardElement.appendChild(emoji);

  cardElement.addEventListener("click", () => handleCardClick(cardElement, card));

  return cardElement;
}

function renderCards() {
  const deck = document.getElementById("deck");
  deck.innerHTML = "";

  const cards = shuffleCards(cardItems);

  cards.forEach(item => {
    const cardElement = createCard(item);

    deck.appendChild(cardElement);
  });
}

function handleCardClick(cardElement, card) {
  if (isCheckingPair || cardElement.classList.contains("revealed")) {
    return;
  }

  cardElement.classList.add("revealed");

  flippedCards.push({ cardElement, card });

  if (flippedCards.length === 2) {
    isCheckingPair = true;
    attempts++;

    const [firstCard, secondCard] = flippedCards;
    
    if (firstCard.card.content === secondCard.card.content) {
      matchedPairs++;

      cardItems.forEach(item => {
        if (item.content === firstCard.card.content) {
          item.matched = true;
        }
      });

      flippedCards = [];
      isCheckingPair = false;

      updateStats();

      const toFind = cardItems.find(item => item.matched === false);

      if (!toFind) {
        alert("Parabéns, você venceu o jogo!");
      }
    } else {
      setTimeout(() => {
        firstCard.cardElement.classList.remove("revealed");
        secondCard.cardElement.classList.remove("revealed");

        flippedCards = [];
        isCheckingPair = false;

        updateStats();
      }, 1000);
    }
  }
}

function updateStats() {
  document.getElementById("stats").textContent = `${matchedPairs} acertos de ${attempts} tentativas`;
}

function resetGame() {
  flippedCards = [];
  matchedPairs = 0;
  attempts = 0;
  isCheckingPair = false;

  cardItems.forEach(card => card.matched = false);

  renderCards();
  updateStats();
}

function initGame() {
  renderCards();

  document.getElementById("restart").addEventListener("click", resetGame)
}

initGame();