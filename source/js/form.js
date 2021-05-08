let forms = document.querySelectorAll('.form');
let requiredFields = document.querySelectorAll('.required');
requiredFields.forEach((item) => {
  item.removeAttribute('required')
});
forms.forEach((item) => {
  item.addEventListener('submit', checkForm)
});

function checkForm(evt) {
  requiredFields.forEach((item) => {
    if (item.value == '') {
      evt.preventDefault();
      item.setAttribute('required', true);
    }
  });
}
