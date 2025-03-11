// Array to store book objects
const bookLibrary = [];

// Function to check if a string is a valid URL
const isStringAValidURL = (string) => {
  try {
    new URL(string);
    return true;
  } catch (error) {
    return false;
  }
};

// Get references to the form toggle button and the form itself
const bookFormToggleButton = document.getElementById("bookFormToggleButton");
const bookInputForm = document.getElementById("bookInputForm");

// Event listener to toggle the visibility of the book input form
bookFormToggleButton.addEventListener("click", () => {
  bookInputForm.style.display =
    bookInputForm.style.display === "none" ? "block" : "none";
});
// Updates the visual style of a book card based on the book's cover image URL
const updateBookCardVisuals = (book, bookCard) => {
  const overlayOpacity = 0.5;
  const defaultCoverImage = "sources/defaultCover.jpg";
  const lightTextColor = "#f0ead6"; 
  const darkTextColor = "#5e4429"; 

  if (book.bookCoverImageURL) {
    // Has a cover image
    bookCard.style.color = lightTextColor;
    bookCard.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, ${overlayOpacity}), rgba(0, 0, 0, ${overlayOpacity})), url(${book.bookCoverImageURL})`;
  } else {
    // No cover image
    bookCard.style.color = darkTextColor; 
    bookCard.style.backgroundImage = `url(${defaultCoverImage})`;
  }

  bookCard.style.backgroundSize = "cover";
  bookCard.style.backgroundRepeat = "no-repeat";
  bookCard.style.backgroundPosition = "center";
  bookCard.style.backgroundColor = "";
  bookCard.style.minHeight = "200px";

  // Update text color of all h3 and p elements inside bookCard
  const textElements = bookCard.querySelectorAll("h3, p");
  textElements.forEach(element => {
    element.style.color = bookCard.style.color;
  });

};
// Book object constructor
function Book(
  bookTitle,
  bookAuthor,
  bookPages,
  bookIsRead,
  bookCoverImageURL,
  bookUUID = self.crypto.randomUUID()
) {
  this.bookTitle = bookTitle;
  this.bookAuthor = bookAuthor;
  this.bookPages = bookPages;
  this.bookIsRead = bookIsRead;
  this.bookCoverImageURL = bookCoverImageURL;
  this.bookUUID = bookUUID;
  this.getBookInfo = () =>
    `${bookTitle} by ${bookAuthor}, ${bookPages} pages, ${
      this.bookIsRead ? "Reading Completed" : "Not read yet"
    }`;
}

// Creates a new book card element in the grid
const createNewBookCard = (book, bookIndex) => {
  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");

  const createElementWithText = (elementTag, elementText) => {
    const newElement = document.createElement(elementTag);
    newElement.textContent = elementText;
    return newElement;
  };

  const titleElement = createElementWithText("h3", book.bookTitle);
  const authorElement = createElementWithText("p", `By: ${book.bookAuthor}`);
  const pagesElement = createElementWithText("p", `Pages: ${book.bookPages}`);
  const readingStatusElement = createElementWithText(
    "p",
    `Status: ${book.bookIsRead ? "Completed" : "Not read yet"}`
  );

  const removeBookButton = createRemoveBookButton(bookIndex);
  const toggleReadStatusButton = createToggleReadStatusButton(book);
  const toggleCoverButton = createToggleCoverButton(book, bookCard);

  bookCard.append(
    titleElement,
    authorElement,
    pagesElement,
    readingStatusElement,
    removeBookButton,
    toggleCoverButton,
    toggleReadStatusButton
  );

  updateBookCardVisuals(book, bookCard); // Apply styles after element creation

  return bookCard;
};

// Creates the remove book button
const createRemoveBookButton = (bookIndex) => {
  const removeBookButton = document.createElement("button");
  removeBookButton.textContent = "Delete Book";
  removeBookButton.addEventListener("click", () => {
    bookLibrary.splice(bookIndex, 1);
    displayAllBooks();
  });
  return removeBookButton;
};

// Creates the toggle read status button
const createToggleReadStatusButton = (book) => {
  const toggleReadStatusButton = document.createElement("button");
  toggleReadStatusButton.textContent = "Mark as Read/Unread"; 
  toggleReadStatusButton.addEventListener("click", () => {
    book.bookIsRead = !book.bookIsRead;
    displayAllBooks();
  });
  return toggleReadStatusButton;
};

const createToggleCoverButton = (book, bookCard) => {
  const toggleCoverButton = document.createElement("button");
  toggleCoverButton.textContent = "Show/Hide Cover"; 
  toggleCoverButton.addEventListener("click", () => {
    if (book.bookCoverImageURL) {
      // If there's a cover, remove it and store it in original
      book.originalBookCoverImageURL = book.bookCoverImageURL;
      book.bookCoverImageURL = null; // or ""
    } else {
      // If there's no cover, restore it from original
      book.bookCoverImageURL = book.originalBookCoverImageURL || null; // or ""
      book.originalBookCoverImageURL = null;
    }
    updateBookCardVisuals(book, bookCard);
    displayAllBooks();
  });
  return toggleCoverButton;
};

// Adds a new book to the library
const addBookToBookLibrary = (
  bookTitle,
  bookAuthor,
  bookPages,
  bookIsRead,
  bookCoverImageURL
) => {
  if (bookCoverImageURL && !isStringAValidURL(bookCoverImageURL)) {
    alert("Invalid Book Cover URL. Please enter a valid URL.");
    return;
  }

  bookLibrary.push(
    new Book(bookTitle, bookAuthor, bookPages, bookIsRead, bookCoverImageURL)
  );
  displayAllBooks();
};

// Displays all books in the library
const displayAllBooks = () => {
  const booksGrid = document.querySelector(".books-grid");
  booksGrid.innerHTML = "";
  bookLibrary.forEach((book, bookIndex) => {
    const bookCard = createNewBookCard(book, bookIndex);
    booksGrid.appendChild(bookCard);
  });
};

// Form submission event listener
document.getElementById("bookInputForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const bookTitle = document.getElementById("bookTitleInput").value;
  const bookAuthor = document.getElementById("bookAuthorInput").value;
  const bookPages = document.getElementById("bookPagesInput").value;
  const bookIsRead = document.getElementById(
    "bookReadingStatusCheckbox"
  ).checked;
  const bookCoverImageURL = document.getElementById(
    "bookCoverImageURLInput"
  ).value;

  addBookToBookLibrary(
    bookTitle,
    bookAuthor,
    bookPages,
    bookIsRead,
    bookCoverImageURL
  );

  event.target.reset();
});

// Initial books added for demonstration
addBookToBookLibrary(
  "Merchant of Venice",
  "William Shakespeare",
  304,
  true,
  "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781625589507/the-merchant-of-venice-9781625589507_hr.jpg"
);
addBookToBookLibrary(
  "Rich Dad Poor Dad",
  "Robert T. Kiyosaki",
  336,
  true,
  "https://m.media-amazon.com/images/I/51Hfv2MfNGL._SY445_SX342_.jpg"
);