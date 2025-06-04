document.addEventListener('DOMContentLoaded', () => {
    // Lógica de alternância entre formulários de Login e Registro
    const showLoginButton = document.getElementById('showLogin');
    const showRegisterButton = document.getElementById('showRegister');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    showLoginButton.addEventListener('click', () => {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        showLoginButton.classList.add('active');
        showRegisterButton.classList.remove('active');
    });

    showRegisterButton.addEventListener('click', () => {
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
        showRegisterButton.classList.add('active');
        showLoginButton.classList.remove('active');
    });

    // Lógica para mostrar/esconder senha
    const togglePasswordIcons = document.querySelectorAll('.toggle-password');

    togglePasswordIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const targetId = icon.dataset.target;
            const passwordField = document.getElementById(targetId);

            // Alterna o tipo do input entre 'password' e 'text'
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                icon.innerHTML = '<i class="fas fa-eye-slash"></i>'; // Ícone de olho riscado
            } else {
                passwordField.type = 'password';
                icon.innerHTML = '<i class="fas fa-eye"></i>'; // Ícone de olho normal
            }
        });
    });

    // Adicione aqui a lógica de submissão dos formulários (ainda não implementada)
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Login clicado! (Funcionalidade a ser implementada no backend)');
        // Aqui você enviaria os dados para o servidor para autenticação
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }
        alert('Registro clicado! (Funcionalidade a ser implementada no backend)');
        // Aqui você enviaria os dados para o servidor para criar a conta
    });

});