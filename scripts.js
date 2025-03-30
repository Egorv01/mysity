// Клиентская логика чата
const socket = io();

document.getElementById('send-message').addEventListener('click', () => {
    const message = document.getElementById('message-input').value;
    socket.emit('user-message', message); // Отправка сообщения на сервер
    document.getElementById('message-input').value = ''; // Очистка поля ввода
});

socket.on('admin-message', (message) => {
    const messagesDiv = document.getElementById('messages');
    const newMessage = document.createElement('p');
    newMessage.innerText = `Админ: ${message}`;
    messagesDiv.appendChild(newMessage);
});
