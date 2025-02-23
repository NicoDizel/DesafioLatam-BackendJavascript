const socketIO = require('socket.io');
const { handleUserDisconnect, handleError } = require('./utils.js');

/**
* Estructuras de datos para el sistema de mensajería
* @type {Array} messages - Almacena el historial de mensajes
* @type {Map} connectedUsers - Mantiene registro de usuarios conectados
*/
const messages = [];
const connectedUsers = new Map();

// Configuración de logging personalizado para WebSocket events
const wsLogger = (event, ...args) => {
    console.log(`[WebSocket][${new Date().toISOString()}] ${event}:`, ...args);
};

/**
* Configuración principal de Socket.IO
* Maneja todos los eventos de WebSocket
*/
function initSocket(server) {
    const io = socketIO(server);

    io.on('connection', (socket) => {
        wsLogger('connect', `Cliente conectado - ID: ${socket.id}`);
        // Evento Connect
        socket.emit('welcome', {
            message: 'Bienvenido al servidor de mensajería'
        });
        
        // Evento Join
        socket.on('join', (userData) => {
            try {
                connectedUsers.set(socket.id, {
                    id: socket.id,
                    username: userData.username,
                    joinedAt: new Date()
                });
                wsLogger('join', `Usuario ${userData.username} se unió`);
                // Broadcast a todos los usuarios conectados
                io.emit('userJoined', {
                    userId: socket.id,
                    username: userData.username,
                    onlineUsers: Array.from(connectedUsers.values())
                });
            } catch (error) {
                handleError(socket, 'join', error);
            }
        });

        // Evento Message
        socket.on('message', (data) => {
            try {
                const user = connectedUsers.get(socket.id);
                if (!user) throw new Error('Usuario no autenticado');
                const messageData = {
                    id: Date.now(),
                    userId: socket.id,
                    username: user.username,
                    content: data.content,
                    timestamp: new Date()
                };
                messages.push(messageData);
                wsLogger('message', `Mensaje de ${user.username}:
    ${data.content}`);

                // Broadcast del mensaje a todos los usuarios
                io.emit('newMessage', messageData);
            } catch (error) {
                handleError(socket, 'message', error);
            }
        });

        // Evento Leave
        socket.on('leave', () => {
            try {
                const user = connectedUsers.get(socket.id);
                if (user) {
                    wsLogger('leave', `Usuario ${user.username} abandonó el
    chat`);
                    handleUserDisconnect(socket, io, connectedUsers);
                }
            } catch (error) {
                handleError(socket, 'leave', error);
            }
        });

        // Evento Ping
        socket.on('ping', () => {
            try {
                socket.emit('pong', { timestamp: Date.now() });
                wsLogger('ping', `Ping recibido de ${socket.id}`);
            } catch (error) {
                handleError(socket, 'ping', error);
            }
        });

        // Evento Disconnect
        socket.on('disconnect', () => {
            try {
                wsLogger('disconnect', `Cliente desconectado - ID: ${socket.id}`);
                handleUserDisconnect(socket, io, connectedUsers);
            } catch (error) {
                handleError(socket, 'disconnect', error);
            }
        });

        // Evento Reconnect
        socket.on('reconnect_attempt', () => {
            wsLogger('reconnect_attempt', `Intento de reconexión - ID:
    ${socket.id}`);
        });
    });
};

module.exports = { initSocket };
