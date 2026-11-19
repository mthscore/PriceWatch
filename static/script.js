document.querySelectorAll('[data-notice]').forEach((button) => {
  button.addEventListener('click', () => {
    alert('O acesso ao sistema estará disponível em breve.');
  });
});
