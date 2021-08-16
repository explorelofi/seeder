const inputs = document.querySelectorAll('.input-container input');
const textareas = document.querySelectorAll('.input-container textarea');

inputs.forEach((input) => {
  input.addEventListener('blur', (event) => {
    if (event.target.value) {
      input.classList.add('is-valid');
    } else {
      input.classList.remove('is-valid');
    }
  });
});

textareas.forEach((textarea) => {
  textarea.addEventListener('blur', (event) => {
    if (event.target.value) {
      textarea.classList.add('is-valid');
    } else {
      textarea.classList.remove('is-valid');
    }
  });
});
