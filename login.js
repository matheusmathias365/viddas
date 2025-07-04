document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = this.username.value;
    const password = this.password.value;

    if (username === 'viddas' && password === 'clinica@2025') {
        window.location.href = 'report.html';
    } else {
        alert('Usuário ou senha incorretos!');
    }
});