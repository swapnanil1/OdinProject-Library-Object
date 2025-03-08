const library = [];

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

function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

function displayLibrary() {
  console.log("displayLibrary called");
  const booksGrid = document.querySelector(".books-grid");
  booksGrid.innerHTML = "";

  for (let i = 0; i < library.length; i++) {
    const book = library[i];
    const bookCard = createBookCard(book, i);
    booksGrid.appendChild(bookCard);
  }
}

function createBookCard(book, index) {
  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");

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

  bookCard.appendChild(titleElement);
  bookCard.appendChild(authorElement);
  bookCard.appendChild(pagesElement);
  bookCard.appendChild(readingStatusElement);
  bookCard.appendChild(removeBookButton);
  bookCard.appendChild(toggleReadStatusButton);

  return bookCard;
}

function createRemoveButton(index) {
  const removeBookButton = document.createElement("button");
  removeBookButton.textContent = "Remove Book";
  removeBookButton.addEventListener("click", function () {
    library.splice(index, 1);
    displayLibrary();
  });
  return removeBookButton;
}

function createToggleReadButton(book) {
  const toggleReadStatusButton = document.createElement("button");
  toggleReadStatusButton.textContent = "Toggle Read Status";
  toggleReadStatusButton.addEventListener("click", () => {
    book.read = !book.read;
    displayLibrary();
  });
  return toggleReadStatusButton;
}

addBookToLibrary("Merchant of venice", "William Shakespeare", 304, true, "");
addBookToLibrary("Rich Dad Poor Dad", "Robert T. Kiyosak", 336, true, "");

document
  .getElementById("bookForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
  });
