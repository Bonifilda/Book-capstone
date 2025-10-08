
    // Favorites functio    const FAVORITES_KEY = "book_favorites";
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
        alert(`"${book.title}" added to Favorites!`);
      } else {
        alert(`"${book.title}" is already in Favorites!`);
      }
    }

    // Fetch books from Open Library
    async function fetchBooks(query = "bestsellers") {
      try {
        const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=20`);
        const data = await res.json();
        return data.docs.map(book => ({
          id: book.key,
          title: book.title,
          author: book.author_name ? book.author_name[0] : "Unknown",
          image: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : "https://via.placeholder.com/200x300?text=No+Cover"
        }));
      } catch (err) {
        console.error("Error fetching books:", err);
        return [];
      }
    }

    // Render books
    const grid = document.getElementById("books-grid");
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

      document.querySelectorAll(".add-favorite-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const book = {
            id: btn.dataset.id,
            title: btn.dataset.title,
            author: btn.dataset.author,
            image: btn.dataset.image
          };
          addFavorite(book);
        });
      });
    }

    // Initial load
    async function init() {
      const books = await fetchBooks();
      renderBooks(books);
    }

    // Search
    document.getElementById("search-btn").addEventListener("click", async () => {
      const query = document.getElementById("search-input").value.trim();
      const books = await fetchBooks(query || "bestsellers");
      renderBooks(books);
    });

    init();
  