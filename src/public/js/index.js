document.addEventListener('DOMContentLoaded', function () {
    const socket = io();

    // Captura los elementos de la interfaz
    let chatBox = document.getElementById('chatBox');
    let sendButton = document.getElementById('sendButton');
    let messagesList = document.getElementById('messagesList');
    let userName = '';

    // Solicita al usuario su nombre para usar en el chat
    userName = prompt('Please enter your name to join the chat:', 'Guest');

    // Función para enviar mensajes
    function sendMessage() {
        if (chatBox.value.trim()) {
            const message = chatBox.value.trim();
            socket.emit('newMessage', { user: userName, message: message });
            chatBox.value = '';
        }
    }

    // Evento de tecla 'Enter' para enviar mensajes
    chatBox.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
            e.preventDefault();
        }
    });

    // Evento click en el botón de enviar
    sendButton.addEventListener('click', function (e) {
        sendMessage();
        e.preventDefault();
    });

    // Escucha eventos de nuevos mensajes desde el servidor
    socket.on('message', function (data) {
        const messageItem = document.createElement('li');
        messageItem.textContent = `${data.user} says: ${data.message}`;
        messagesList.appendChild(messageItem);
    });

    // Manejo de errores de conexión
    socket.on('connect_error', () => {
        displayStatus('Error connecting to the chat server');
    });

    // Función para mostrar el estado de la conexión
    function displayStatus(status) {
        const statusElement = document.createElement('li');
        statusElement.textContent = status;
        messagesList.appendChild(statusElement);
    }
});
