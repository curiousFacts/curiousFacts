const factContainer = document.getElementById("fact-container");
const favoritesList = document.getElementById("favorites-list");

const favoritesArray = [];

function fetchFact() {
  return fetch("https://uselessfacts.jsph.pl/random.json?language=en")
    .then((response) => response.json());
}

function createFactElement(data) {
  const factElement = document.createElement("div");
  factElement.classList.add("fact");
  factElement.innerHTML = `
    <p>${data.text}<img class="favorite" src="./img/star.png" alt="Agregar a favoritos" onclick="addToFavorites(event)"></p>
  `;
  return factElement;
}

function displayFact(factElement) {
  factContainer.innerHTML = "";
  factContainer.appendChild(factElement);
}

function getFact() {
  fetchFact()
    .then((data) => {
      const factElement = createFactElement(data);
      displayFact(factElement);
    })
    .catch((error) => {
      console.log(error);
    });
}

function addToFavorites(event) {
  const factElement = event.target.parentNode;
  const favoriteText = factElement.innerText;

  if (favoritesArray.includes(favoriteText)) {
    showPopup("This fact already exists in your favorite list.");
    return;
  }

  favoritesArray.push(favoriteText);

  const favoriteElement = document.createElement("li");
  favoriteElement.innerHTML = favoriteText;

  favoritesList.appendChild(favoriteElement);
}

function showPopup(message) {
  const modalElement = document.createElement("div");
  modalElement.classList.add("modal");
  modalElement.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <p>${message}</p>
    </div>
  `;

  const closeButton = modalElement.querySelector(".close");
  closeButton.addEventListener("click", () => {
    modalElement.remove();
  });

  document.body.appendChild(modalElement);
}
 module.exports = { getFact, addToFavorites, displayFact, createFactElement, fetchFact };
