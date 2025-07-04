document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const password = this.password.value;
    if (password === 'clinica@2025') {
        window.location.href = 'report.html';
    } else {
        alert('Senha incorreta!');
    }
});