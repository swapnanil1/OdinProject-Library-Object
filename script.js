const library = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    const readStatus = this.read ? "Reading Completed" : "Not read yet";
    return `${title} by ${author}, ${pages} pages , ${readStatus}`;
  };
}

function addBookToLibrary(title, author, pages, read) {
  library.push(new Book(title, author, pages, read));
  displayLibrary();
}

function displayLibrary() {
  const booksGrid = document.querySelector(".books-grid");
  booksGrid.innerHTML = "";

  for (let i = 0; i < library.length; i++) {
    const book = library[i];

    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    const titleElement = document.createElement("h3");
    titleElement.textContent = book.title;
    const authorElement = document.createElement("p");
    authorElement.textContent = book.author;
    const pagesElement = document.createElement("p");
    pagesElement.textContent = book.pages;
    const readingStatusElement = document.createElement("p");
    readingStatusElement.textContent = book.read
      ? "Status: Completed"
      : "Status: Not read yet";
    const removeBookButton = document.createElement("button");
    removeBookButton.textContent = "Remove Book";
    removeBookButton.addEventListener("click", function () {
      library.splice(i, 1);
      displayLibrary();
    });
    bookCard.appendChild(titleElement);
    bookCard.appendChild(authorElement);
    bookCard.appendChild(pagesElement);
    bookCard.appendChild(readingStatusElement);
    bookCard.appendChild(removeBookButton);
    booksGrid.appendChild(bookCard);
  }
}
