import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');

const LOCALSTORAGE_KEY = 'feedback-form-state';

const itemForUpdate = [...formEl.querySelectorAll('[name]')];

let formData = {};

updateForm();

formEl.addEventListener('input', throttle(onFormInput, 500));
formEl.addEventListener('submit', onFormSubmit);

function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(evt) {
  evt.preventDefault();
  if (itemForUpdate.some(item => item.value === '')) {
    alert('All the fields must be filled!');
    return;
  }
  evt.currentTarget.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
  console.log(formData);
  formData = {};
}

function updateForm() {
  const dataFromLocalStorage = localStorage.getItem(LOCALSTORAGE_KEY);
  if (dataFromLocalStorage) {
    formData = JSON.parse(dataFromLocalStorage);
    itemForUpdate.forEach(item => {
      if (formData[item.name]) {
        item.value = formData[item.name];
      }
    });
  }
}
