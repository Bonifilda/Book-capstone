// // favorites.js
// const FAVORITES_KEY = "book_favorites";

// // Get all favorites from localStorage
// export function getFavorites() {
//   const stored = localStorage.getItem(FAVORITES_KEY);
//   return stored ? JSON.parse(stored) : [];
// }

// // Save favorites to localStorage
// function saveFavorites(favorites) {
//   localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
// }

// // Add a single book to favorites
// export function addFavorite(book) {
//   const favorites = getFavorites();

//   if (!favorites.find(fav => fav.id === book.id)) {
//     favorites
// .push(book);
//     saveFavorites(favorites);
//     console.log(`${book.title} added to favorites.`);
//   }
// }

// // Remove a book from favorites
// export function removeFavorite(bookId) {
//   const favorites = getFavorites().filter(b => b.id !== bookId);
//   saveFavorites(favorites);
//   console.log(`Book with id ${bookId} removed from favorites.`);
// }
 const FAVORITES_KEY = "book_favorites";

    function getFavorites() {
      const stored = localStorage.getItem(FAVORITES_KEY);
      return stored ? JSON.parse(stored) : [];
    }

    function removeFavorite(bookId) {
      const favorites = getFavorites().filter(b => b.id !== bookId);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      renderFavorites();
    }

    const grid = document.getElementById("favorites-grid");

    function renderFavorites() {
      const favorites = getFavorites();
      if (favorites.length === 0) {
        grid.innerHTML = '<p class="col-span-full text-center text-gray-600">No favorites yet.</p>';
        return;
      }

      grid.innerHTML = favorites.map(book => `
        <div class="bg-white shadow rounded overflow-hidden">
          <img src="${book.image || 'https://via.placeholder.com/200x280?text=No+Image'}" alt="${book.title}" class="w-full h-56 object-cover">
          <div class="p-4">
            <h3 class="font-semibold text-lg mb-2">${book.title}</h3>
            <p class="text-gray-600 text-sm">${book.author}</p>
            <button class="mt-2 bg-red-500 text-white px-3 py-1 rounded remove-btn" data-id="${book.id}">Remove</button>
          </div>
        </div>
      `).join('');

      document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          removeFavorite(Number(btn.dataset.id));
        });
      });
    }

    document.addEventListener("DOMContentLoaded", renderFavorites);