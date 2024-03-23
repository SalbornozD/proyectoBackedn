const express = require("express");
const handlebars = require("express-handlebars");
const path = require('path');
const SocketServer = require('socket.io');
const mongoose = require('mongoose');
const passport = require('passport'); // Importar passport
require('./passport'); // Importar la configuración de Passport (ajusta la ruta según sea necesario)

const productRoutes = require('./routes/productRoutes');
const cartsRoutes = require('./routes/cartsRoutes');
const viewsRouter = require('./routes/viewsRoutes');
const messageModel = require('./dao/models/messagesModel')

const app = express();
const PORT = 5000;
const API_PREFIX = "api";

// Configuración de express
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Configuración de websocket
const httpServer = app.listen(PORT, () => console.log("Servidor corriendo en el puerto ", PORT));
const socketServer = SocketServer(httpServer);

// Configuración DB
mongoose.connect('mongodb+srv://Salbornoz:Sjnt110102@backend.or438wf.mongodb.net/?retryWrites=true&w=majority&appName=Backend')
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
  })
  .catch(error => {
    console.error('Error de conexión a la base de datos:', error);
    process.exit(1);
  });

// Configuración Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'handlebars');

// Configuración carpeta public
app.use(express.static(path.join(__dirname, '/public')));

// Inicializar Passport
app.use(passport.initialize());

// RUTAS
app.use('/', viewsRouter);
app.use(`/${API_PREFIX}/products`, productRoutes);
app.use(`/${API_PREFIX}/carts`, cartsRoutes);

// socketServer
socketServer.on('connection', socket => {
    console.log("Nuevo cliente conectado");

    socket.on('message', async (data) => {
        await messageModel.create(data);
        messages = await messageModel.find();
        socketServer.emit('messageLogs', messages)
    })
});