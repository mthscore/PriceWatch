const loginTab = document.querySelector('#loginTab');
const registerTab = document.querySelector('#registerTab');
const loginPanel = document.querySelector('#loginPanel');
const registerPanel = document.querySelector('#registerPanel');
const formStatus = document.querySelector('#formStatus');

function showLogin() {
  loginPanel.hidden = false;
  registerPanel.hidden = true;
  loginTab.classList.add('is-active');
  registerTab.classList.remove('is-active');
  loginTab.setAttribute('aria-selected', 'true');
  registerTab.setAttribute('aria-selected', 'false');
  formStatus.textContent = '';
}

function showRegister() {
  loginPanel.hidden = true;
  registerPanel.hidden = false;
  loginTab.classList.remove('is-active');
  registerTab.classList.add('is-active');
  loginTab.setAttribute('aria-selected', 'false');
  registerTab.setAttribute('aria-selected', 'true');
  formStatus.textContent = '';
}

loginTab.addEventListener('click', showLogin);
registerTab.addEventListener('click', showRegister);
document.querySelector('[data-show-register]').addEventListener('click', showRegister);
document.querySelector('[data-show-login]').addEventListener('click', showLogin);

const registerForm = document.querySelector('#registerForm');
const loginForm = document.querySelector('#loginForm');
const password = document.querySelector('#registerPassword');
const passwordConfirmation = document.querySelector('#confirmPassword');

function validatePasswordConfirmation() {
  passwordConfirmation.setCustomValidity(
    password.value === passwordConfirmation.value
      ? ''
      : 'As senhas precisam ser iguais.'
  );
}

password.addEventListener('input', validatePasswordConfirmation);
passwordConfirmation.addEventListener('input', validatePasswordConfirmation);

document.querySelectorAll('form').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (form === loginForm) {
      window.location.href = '/dashboard';
      return;
    }

    if (form === registerForm) {
      validatePasswordConfirmation();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
    }

    formStatus.textContent = 'Interface pronta para integração. Nenhum dado foi enviado.';
  });
});
