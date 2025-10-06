// favorites.js

let favorites = [];

// Add book to favorites
export function addFavorite(book) {
  favorites.push(book);
  console.log(`${book.title} added to favorites.`);
}

// Remove book from favorites
export function removeFavorite(bookId) {
  favorites = favorites.filter(b => b.id !== bookId);
  console.log(`Book with id ${bookId} removed from favorites.`);
}

// Get all favorites
export function getFavorites() {
  return favorites;
}
