        const senhaInput = document.getElementById('senha');
        const toggleSenhaBtn = document.getElementById('toggleSenha');
        const iconSenha = document.getElementById('iconSenha');

        toggleSenhaBtn.addEventListener('click', () => {
            const isPassword = senhaInput.type === 'password';
            senhaInput.type = isPassword ? 'text' : 'password';
            iconSenha.textContent = isPassword ? 'visibility' : 'visibility_off';
            toggleSenhaBtn.setAttribute('aria-label', isPassword ? 'Ocultar senha' : 'Mostrar senha');
        });