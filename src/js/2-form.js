const storageKey = 'feedback-form-state';
const formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');
populateForm();

form.addEventListener('input', event => {
  formData[event.target.name] = event.target.value.trim();

  localStorage.setItem(storageKey, JSON.stringify(formData));
});

form.addEventListener('submit', event => {
  event.preventDefault();

  if (formData.email === '' || formData.message === '') {
    alert('Fill please all fields');
    return;
  }

  console.log('Submitted data:', formData);
  localStorage.removeItem(storageKey);

  formData.email = '';
  formData.message = '';

  form.reset();
});

function populateForm() {
  const savedData = localStorage.getItem(storageKey);

  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);

      formData.email = parsedData.email || '';
      formData.message = parsedData.message || '';

      form.elements.email.value = formData.email;
      form.elements.message.value = formData.message;
    } catch (error) {
      console.error('Error parsing data from localStorage', error);
    }
  }
}
