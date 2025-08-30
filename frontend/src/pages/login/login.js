document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Validaciones básicas
        if (!email || !password) {
            showModal('Error', 'Por favor, completa todos los campos');
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();
            
            if (data.success) {
                showModal('¡Éxito!', 'Inicio de sesión exitoso');
                
                // Guardar token y datos de usuario
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                
                // Redirigir al dashboard después de 2 segundos
                setTimeout(() => {
                    window.location.href = '../dashboard/dashboard.html';
                }, 2000);
            } else {
                showModal('Error', data.message);
            }
        } catch (error) {
            showModal('Error', 'Error de conexión con el servidor');
        }
    });
});