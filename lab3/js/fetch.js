// js/fetchBooks.js

// Function to fetch books by search term
export async function fetchBooks(query = "bestsellers") {
  try {
    const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=20`);
    const data = await response.json();

    // Map the results to a usable format
    const books = data.docs.map(book => ({
      id: book.key, // unique identifier
      title: book.title,
      author: book.author_name ? book.author_name[0] : "Unknown",
      image: book.cover_i 
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` 
        : "https://via.placeholder.com/200x300?text=No+Cover"
    }));

    return books;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}
