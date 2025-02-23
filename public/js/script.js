const socket = io();

// Genera un nombre de usuario aleatorio y lo guarda en una variable
const username = 'Usuario' + Math.floor(Math.random() * 1000);

socket.on('connect', () => {
    console.log('Conectado al servidor');
    // Emite el evento join con el nombre de usuario
    socket.emit('join', { username });
    // Actualiza el DOM para mostrar el mensaje de bienvenida
    document.getElementById('welcomeMsg').innerText = `Bienvenido ${username}`;
});

// Recibir mensaje de bienvenida del servidor (opcional)
socket.on('welcome', (data) => {
    console.log('Mensaje de bienvenida:', data.message);
});

// Recibir nuevos mensajes
socket.on('newMessage', (message) => {
    console.log('Nuevo mensaje:', message);
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML += `<div class="message"><strong>${message.username}:</strong> ${message.content}</div>`;
});

// Manejar eventos de usuarios
socket.on('userJoined', (data) => {
    console.log('Usuario unido:', data);
    updateUserList(data.onlineUsers);
});

socket.on('userLeft', (data) => {
    console.log('Usuario abandonó:', data);
    updateUserList(data.onlineUsers);
});

// Actualizar lista de usuarios en línea
function updateUserList(users) {
    const userList = document.getElementById('userList');
    let html = '<h3>Usuarios en línea:</h3>';
    users.forEach(user => {
        html += `<div>${user.username}</div>`;
    });
    userList.innerHTML = html;
}

// Enviar mensaje
function sendMessage() {
    const input = document.getElementById('messageInput');
    const content = input.value.trim();
    if (content) {
        socket.emit('message', { content });
        input.value = '';
    }
}

// Manejar errores
socket.on('error', (error) => {
    console.error('Error del servidor:', error);
});

// Enviar ping periódicamente
setInterval(() => {
    socket.emit('ping');
}, 30000);
