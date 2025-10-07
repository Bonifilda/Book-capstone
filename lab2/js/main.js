// ====== FAVORITES STORAGE ======
const FAVORITES_KEY = "book_favorites";

function getFavorites() {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

function addFavorite(book) {
  const favorites = getFavorites();
  if (!favorites.find(f => f.id === book.id)) {
    favorites.push(book);
    saveFavorites(favorites);
    alert(`"${book.title}" added to favorites!`);
  } else {
    alert(`"${book.title}" is already in favorites!`);
  }
}

// ====== ADD TO FAVORITES ======
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".add-favorite-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const book = {
        id: Number(btn.dataset.id),
        title: btn.dataset.title,
        author: btn.dataset.author,
        image: btn.dataset.image
      };
      addFavorite(book);
    });
  });

  // ====== SEARCH FEATURE ======
  const searchInput = document.getElementById("searchInput");
  const books = document.querySelectorAll(".book-item");

  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();

    books.forEach(book => {
      const title = book.querySelector("h3").textContent.toLowerCase();
      const author = book.querySelector("p").textContent.toLowerCase();

      if (title.includes(searchTerm) || author.includes(searchTerm)) {
        book.style.display = "block";
      } else {
        book.style.display = "none";
      }
    });
  });
});


