const initializeSocket = (server) => {
    const socketIO = require('socket.io')(server, {
        cors: {
            origin: ["http://localhost:5173"],  // Add your frontend URL here
            methods: ["GET", "POST"],
            allowedHeaders: ["Content-Type"],
            credentials: true  // If using cookies for authentication
        }
    });

    socketIO.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        socket.on('disconnect', () => {
            console.log('A user disconnected:', socket.id);
        });
    });
};

module.exports = initializeSocket;
