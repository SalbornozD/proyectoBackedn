require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

// Importación de rutas
const authRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartsRoutes');
const viewRoutes = require('./routes/viewsRoutes');

// Inicialización de la aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a la base de datos MongoDB
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true 
})
.then(() => console.log('Connected to MongoDB successfully'))
.catch(err => console.error('Could not connect to MongoDB', err));

// Middlewares
app.use(cors()); // Permite solicitudes cross-origin
app.use(express.json()); // Parsea JSON en el body de las solicitudes
app.use(express.urlencoded({ extended: true })); // Parsea URL-encoded bodies
app.use(cookieParser()); // Parsea cookies

// Configuración de Passport para la autenticación con JWT
require('./utils/passport');
app.use(passport.initialize());

// Sirve archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/', viewRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

// Manejador de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});