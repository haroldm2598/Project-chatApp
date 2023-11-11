const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');

require('dotenv').config();

const accountRoute = require('./routes/account');
const userRoute = require('./routes/user');
const chatRoute = require('./routes/chat');
const messageRoute = require('./routes/message');

// ==== INIT APP ====
const app = express();
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
	console.log(`post is listening to ${port}`);
});

// ==== CONNECT TO MONGODB ====
mongoose
	.connect(process.env.MONGO_CONNECT, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then((result) => {
		console.log('mongodb is connected');
		// server;
	})
	.catch((err) => console.log(err));

// ==== MIDDLEWARE ====
app.use(
	cors({
		origin: ['http://localhost:5173'],
		credentials: true
	})
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
require('./config/passport.jwt');

// ==== ROUTES ====
app.get('/', (req, res) => {
	res.send('Hello Welcome to medium');
});

app.use('/api/account', accountRoute);
app.use('/api/user', userRoute);
app.use('/api/chat', chatRoute);
app.use('/api/message', messageRoute);

app.use((req, res) => {
	res.status(404).send('Page not found');
});

// ==== WEBSOCKET ====
const io = require('socket.io')(server, {
	pingTimeout: 60000,
	cors: {
		origin: ['http://localhost:5173']
	}
});

io.on('connection', (socket) => {
	console.log('connect to socket.io');

	socket.on('setup', (userData) => {
		socket.join(userData?.account?.id);
		socket.emit('connected');
	});

	socket.on('join chat', (room) => {
		socket.join(room);
		console.log(`user joined ${room}`);
	});

	socket.on('typing', (room) => socket.in(room).emit('typing'));
	socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

	socket.on('new message', (newMessageRecieved) => {
		var chat = newMessageRecieved.chat;

		if (!chat.accounts) return console.log('not defined');

		chat.accounts.forEach((user) => {
			if (user._id === newMessageRecieved.sender._id) return;

			socket.in(user._id).emit('message recieved', newMessageRecieved);
		});
	});

	socket.off('setup', () => {
		console.log('USER DISCONNECTED');
		socket.leave(userData?.account?.id);
	});
});
