// main.js
import { addFavorite } from "./favorites.js";

document.getElementById("add-all-favorites").addEventListener("click", () => {
  const books = [
    { id: 1, title: "The Passion Within: A Woman’s Journal", author: "Lisa Franke" },
    { id: 2, title: "eat beautiful", author: "Tosca Reno" },
    { id: 3, title: "The Power of Your Subconscious Mind", author: "Dr. Joseph Murphy" },
    { id: 4, title: "WRITE IDEAS", author: "Steven Johnson" },
  ];

  books.forEach(book => addFavorite(book));

  alert("All books have been added to Favorites!");
});
