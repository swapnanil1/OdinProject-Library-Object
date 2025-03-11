const library = [];

// Function to validate URL format
function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}
// Function to display/hide input

let sidebar = document.getElementById("sidebar");
let form = document.getElementById("bookForm");

sidebar.addEventListener("click", () => {
  if (form.style.display === "none") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
});
function updateBookCardStyle(book, bookCard) {
  if (book.url) {
    bookCard.style.color = "#333333";
    bookCard.style.backgroundImage = `url(${book.url})`;
    bookCard.style.backgroundSize = "cover";
    bookCard.style.backgroundRepeat = "no-repeat";
    bookCard.style.backgroundPosition = "center";
    bookCard.style.minHeight = "200px";
  } else {
    bookCard.style.color = "black";
    bookCard.style.backgroundImage = "";
    bookCard.style.backgroundColor = "#ddd";
    bookCard.style.minHeight = "200px";
  }
}

// Factory Function to create a Book object
function Book(title, author, pages, read, url, uuid) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.url = url;
  this.uuid = uuid;
  this.info = function () {
    const readStatus = this.read ? "Reading Completed" : "Not read yet";
    return `${title} by ${author}, ${pages} pages , ${readStatus}`;
  };
}

// Function to create a book card element
function createBookCard(book, index) {
  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");

  updateBookCardStyle(book, bookCard);

  const titleElement = document.createElement("h3");
  titleElement.textContent = book.title;

  const authorElement = document.createElement("p");
  authorElement.textContent = `By: ${book.author}`;

  const pagesElement = document.createElement("p");
  pagesElement.textContent = `Pages: ${book.pages}`;

  const readingStatusElement = document.createElement("p");
  readingStatusElement.textContent = book.read
    ? "Status: Completed"
    : "Status: Not read yet";

  const removeBookButton = createRemoveButton(index);

  const toggleReadStatusButton = createToggleReadButton(book);

  const removeCoverButton = createRemoveCoverButton(book, bookCard);
  bookCard.appendChild(removeCoverButton);

  bookCard.appendChild(titleElement);
  bookCard.appendChild(authorElement);
  bookCard.appendChild(pagesElement);
  bookCard.appendChild(readingStatusElement);
  bookCard.appendChild(removeBookButton);
  bookCard.appendChild(toggleReadStatusButton);

  return bookCard;
}

// Function to create the remove book button
function createRemoveButton(index) {
  const removeBookButton = document.createElement("button");
  removeBookButton.textContent = "Remove Book";
  removeBookButton.addEventListener("click", function () {
    library.splice(index, 1);
    displayLibrary();
  });
  return removeBookButton;
}

// Function to create the toggle read status button
function createToggleReadButton(book) {
  const toggleReadStatusButton = document.createElement("button");
  toggleReadStatusButton.textContent = "Toggle Read Status";
  toggleReadStatusButton.addEventListener("click", () => {
    book.read = !book.read;
    displayLibrary();
  });
  return toggleReadStatusButton;
}

// Function to create the toggle cover button
function createRemoveCoverButton(book, bookCard) {
  const removeCoverButton = document.createElement("button");
  removeCoverButton.textContent = "Toggle Cover";

  removeCoverButton.addEventListener("click", () => {
    if (book.url) {
      book.originalUrl = book.url;
      book.url = "";
    } else {
      book.url = book.originalUrl || "";
      delete book.originalUrl;
    }

    updateBookCardStyle(book, bookCard);
    displayLibrary();
  });

  return removeCoverButton;
}

// Function to add a book to the library array
function addBookToLibrary(title, author, pages, read, coverurl) {
  let validatedCoverUrl = coverurl;

  if (coverurl !== "") {
    if (!isValidURL(coverurl)) {
      alert(
        "Invalid Book Cover URL. Please enter a valid URL (e.g., http://example.com)"
      );
      return;
    }
    validatedCoverUrl = coverurl;
  } else {
    validatedCoverUrl = "";
  }

  const uuid = self.crypto.randomUUID();
  library.push(new Book(title, author, pages, read, validatedCoverUrl, uuid));
  displayLibrary();
}

// Function to display the library on the page
function displayLibrary() {
  const booksGrid = document.querySelector(".books-grid");
  booksGrid.innerHTML = "";

  for (let i = 0; i < library.length; i++) {
    const book = library[i];
    const bookCard = createBookCard(book, i);
    booksGrid.appendChild(bookCard);
  }
}

// Event listener for the form submission
document
  .getElementById("bookForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const title = document.getElementById("bookTitle").value;
    const author = document.getElementById("bookAuthor").value;
    const pages = document.getElementById("bookPages").value;
    const read = document.getElementById("bookReadingStatus").checked;
    const coverUrl = document.getElementById("book-cover-url").value;

    addBookToLibrary(title, author, pages, read, coverUrl);

    document.getElementById("bookTitle").value = "";
    document.getElementById("bookAuthor").value = "";
    document.getElementById("bookPages").value = "";
    document.getElementById("bookReadingStatus").checked = false;
    document.getElementById("book-cover-url").value = "";
  });

// Initial books for testing
addBookToLibrary(
  "Merchant of venice",
  "William Shakespeare",
  304,
  true,
  "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781625589507/the-merchant-of-venice-9781625589507_hr.jpg"
);
addBookToLibrary(
  "Rich Dad Poor Dad",
  "Robert T. Kiyosak",
  336,
  true,
  "https://m.media-amazon.com/images/I/51Hfv2MfNGL._SY445_SX342_.jpg"
);
