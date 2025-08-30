document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ register.js cargado correctamente');
    
    const registerForm = document.getElementById('register_form');
    
    if (!registerForm) {
        console.error('❌ No se encontró el formulario con id register_form');
        return;
    }
    
    // ELIMINAR action del formulario
    registerForm.removeAttribute('action');
    
    registerForm.addEventListener('submit', async function(e) {
        e.preventDefault(); // Evitar que se recargue la página
        console.log('📝 Formulario de registro enviado');
        
        const username = document.getElementById('username').value;
        const email = document.getElementById('address').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('conf_pass').value;
        
        console.log('📋 Datos:', { username, email, password, confirmPassword });

        // VALIDACIONES COMPLETAS
        if (!username || !email || !password || !confirmPassword) {
            console.log('❌ Campos vacíos');
            showModal('Error', 'Por favor, completa todos los campos');
            return;
        }
        
        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.log('❌ Email inválido');
            showModal('Error', 'Por favor, ingresa un email válido');
            return;
        }
        
        if (password !== confirmPassword) {
            console.log('❌ Contraseñas no coinciden');
            showModal('Error', 'Las contraseñas no coinciden');
            return;
        }
        
        if (password.length < 6) {
            console.log('❌ Contraseña muy corta');
            showModal('Error', 'La contraseña debe tener al menos 6 caracteres');
            return;
        }

        try {
            console.log('🌐 Enviando petición de registro al servidor...');
            const response = await fetch('http://localhost:3001/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });
            
            console.log('📨 Respuesta recibida, status:', response.status);
            const data = await response.json();
            console.log('📊 Datos recibidos:', data);
            
            if (data.success) {
                console.log('✅ Registro exitoso');
                showModal('¡Éxito!', 'Usuario registrado exitosamente');
                
                // Redirigir al login después de 2 segundos
                setTimeout(() => {
                    console.log('🔄 Redirigiendo al login...');
                    window.location.href = '../login/login.html';
                }, 2000);
            } else {
                console.log('❌ Error del servidor:', data.message);
                showModal('Error', data.message);
            }
        } catch (error) {
            console.error('❌ Error de conexión:', error);
            showModal('Error', 'Error de conexión con el servidor');
        }
    });
});