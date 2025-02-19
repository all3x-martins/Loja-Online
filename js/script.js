 // Alterna a visibilidade do menu
 document.getElementById('menu-toggle').addEventListener('click', function() {
  const navList = document.getElementById('nav-list');
  navList.classList.toggle('show');
});
  
// Form Validation
document.querySelector('.newsletter_form').addEventListener('submit', function(e) {
  let email = document.querySelector('.newsletter_input--email').value;
  if (!email.includes('@')) {
      alert('Please enter a valid email address');
      e.preventDefault();
  }
});