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
