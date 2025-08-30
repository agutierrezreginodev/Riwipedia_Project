// Funcionalidad del modal
const modalOverlay = document.getElementById("modal-overlay");
const openModalBtn = document.getElementById("open-modal-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cancelBtn = document.getElementById("cancel-btn");
const addBookForm = document.getElementById("add-book-form");
const bookCoverInput = document.getElementById("book-cover");
const bookPdfInput = document.getElementById("book-pdf");
const coverFileName = document.getElementById("cover-file-name");
const pdfFileName = document.getElementById("pdf-file-name");

// Abrir modal
openModalBtn.addEventListener("click", () => {
  modalOverlay.style.display = "flex";
});

// Cerrar modal
const closeModal = () => {
  modalOverlay.style.display = "none";
  addBookForm.reset();
  coverFileName.textContent = "";
  pdfFileName.textContent = "";
};

closeModalBtn.addEventListener("click", closeModal);
cancelBtn.addEventListener("click", closeModal);

// Cerrar al hacer clic fuera del modal
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    closeModal();
  }
});

// Mostrar nombre de archivo seleccionado
bookCoverInput.addEventListener("change", (e) => {
  if (e.target.files.length > 0) {
    coverFileName.textContent = e.target.files[0].name;
  }
});

bookPdfInput.addEventListener("change", (e) => {
  if (e.target.files.length > 0) {
    pdfFileName.textContent = e.target.files[0].name;
  }
});

// Manejar envío del formulario
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Aquí iría la lógica para procesar el formulario
  // Por ahora solo cerramos el modal
  alert("Book added successfully!");
  closeModal();
});

async function fetchBooks() {
  try {
    const response = await fetch('http://localhost:3001/api/books');
    if (!response.ok) throw new Error('Network response was not ok');
    const result = await response.json();

    if (!result.success) throw new Error(result.message);

    const booksContainer = document.querySelector('.books');
    booksContainer.innerHTML = '';

    result.data.forEach(book => {
      const div = document.createElement('div');
      div.classList.add('book-item'); // optional, for styling

      div.innerHTML = `
        <h3>Book ID: ${book.id}</h3>
        <img src="${book.portrait_url}" alt="Book Image" style="width:100px;" />
        <p>Language: ${book.book_language}</p>
        <p>Downloads: ${book.download_count}</p>
        <p>Favorite: ${book.is_favorite ? 'Yes' : 'No'}</p>
      `;
      booksContainer.appendChild(div);
    });
  } catch (error) {
    console.error('Error fetching books:', error);
  }
}

fetchBooks();
result.data.forEach(book => {
  const div = document.createElement('div');
  div.classList.add('book-item');
  
  // Normalize category for class use
  const categoryClass = `category-${book.category?.replace(/\s+/g, '') || 'Unknown'}`;
  
  div.innerHTML = `
  <img src="${book.portrait_url}" alt="Cover of ${book.title}" />
  <h3 title="${book.title}">${book.title}</h3>
  <p class="author" title="${book.author}">${book.author}</p>
  <span class="category-label ${categoryClass}">${book.category || 'Uncategorized'}</span>
  
  <div class="icons">
  <i class="fa-regular fa-heart favorite" title="Add to favorites"></i>
      <i class="fa-solid fa-download download" title="Download book"></i>
      </div>
  `;

  booksContainer.appendChild(div);
});

