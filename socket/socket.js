const io = require('socket.io')(8000, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    }
})

let users = [];
const addUser = (userId, socketId, userInfo) => {
    const checkUser = users.some(u => u.userId === userId);

    if (!checkUser) {
        users.push({ userId, socketId, userInfo });
    } else {
        users.map(u => u.userId === userId ? u.socketId = socketId : u);
    }
}

const userRemove = (socketId) => {
    users = users.filter(u => u.socketId !== socketId);
}

const findFriend = (id) => {
    return users.find(u => u.userId === id);
}

io.on('connection', (socket) => {
    console.log('Socket connected');
    socket.on('addUser', (userId, userInfo) => {
        addUser(userId, socket.id, userInfo);
        io.emit('getUser', users);
    })

    socket.on('sendMessage', (data) => {
        const user = findFriend(data.reseverId);
        if (user !== undefined) {
            socket.to(user.socketId).emit('getMessage', {
                senderId: data.senderId,
                senderName: data.senderName,
                reseverId: data.reseverId,
                createAt: data.time,
                message: {
                    text: data.message.text,
                    image: data.message.image
                }
            })
        }
    })

    socket.on('disconnect', () => {
        console.log('User disconnected');
        userRemove(socket.id);
        io.emit('getUser', users);
    })
})   