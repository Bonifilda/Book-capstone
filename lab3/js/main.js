// js/main.js
import { fetchBooks } from "./fetchBooks.js";

const grid = document.getElementById("books-grid");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

// Function to render books
function renderBooks(books) {
  if (!books.length) {
    grid.innerHTML = `<p class="text-center col-span-full text-gray-600">No books found.</p>`;
    return;
  }

  grid.innerHTML = books.map(book => `
    <div class="bg-white shadow rounded overflow-hidden">
      <img src="${book.image}" alt="${book.title}" class="w-full h-56 object-cover">
      <div class="p-4">
        <h3 class="font-semibold text-lg mb-2">${book.title}</h3>
        <p class="text-gray-600 text-sm">${book.author}</p>
        <button class="mt-2 bg-blue-600 text-white px-3 py-1 rounded add-favorite-btn"
                data-id="${book.id}"
                data-title="${book.title}"
                data-author="${book.author}"
                data-image="${book.image}">
          Add to Favorites
        </button>
      </div>
    </div>
  `).join('');

  // Add event listeners to favorite buttons
  document.querySelectorAll(".add-favorite-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const book = {
        id: btn.dataset.id,
        title: btn.dataset.title,
        author: btn.dataset.author,
        image: btn.dataset.image
      };
      addFavorite(book);
      alert(`"${book.title}" added to Favorites!`);
    });
  });
}

// Initial fetch
async function init() {
  const books = await fetchBooks();
  renderBooks(books);
}

// Search functionality
searchBtn.addEventListener("click", async () => {
  const query = searchInput.value.trim();
  const books = await fetchBooks(query);
  renderBooks(books);
});

init();
