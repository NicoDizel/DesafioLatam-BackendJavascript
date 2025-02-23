// Función auxiliar para manejar desconexiones de usuarios
function handleUserDisconnect(socket, io, connectedUsers) {
    const user = connectedUsers.get(socket.id);
    if (user) {
        connectedUsers.delete(socket.id);
        io.emit('userLeft', {
            userId: socket.id,
            username: user.username,
            onlineUsers: Array.from(connectedUsers.values())
        });
    }
}

// Función auxiliar para manejar errores
function handleError(socket, event, error) {
    console.error(`[ERROR][${event}]`, error);
    socket.emit('error', {
        event,
        message: 'Ha ocurrido un error en el servidor',
        timestamp: new Date()
    });
}

module.exports = {
    handleUserDisconnect,
    handleError
};