// favorites.js
// favorites.js

const FAVORITES_KEY = "book_favorites";

// Load favorites from localStorage (if any)
export function getFavorites() {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

// Save favorites to localStorage
function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

// Add a book to favorites
export function addFavorite(book) {
  const favorites = getFavorites();

  // avoid duplicates
  if (!favorites.find(fav => fav.id === book.id)) {
    favorites.push(book);
    saveFavorites(favorites);
    console.log(`${book.title} added to favorites.`);
  } else {
    console.log(`${book.title} is already in favorites.`);
  }
}

// Remove a book from favorites
export function removeFavorite(bookId) {
  let favorites = getFavorites();
  favorites = favorites.filter(b => b.id !== bookId);
  saveFavorites(favorites);
  console.log(`Book with id ${bookId} removed from favorites.`);
}

