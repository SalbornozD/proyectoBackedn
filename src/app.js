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
const cartRoutes = require('./routes/cartRoutes');
const viewRoutes = require('./routes/viewRoutes');

// Inicialización de la aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a la base de datos
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to the database successfully'))
  .catch(err => console.error('Could not connect to the database', err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de Passport
require('./utils/passport'); 
app.use(passport.initialize());

// Configuración del motor de plantillas Handlebars
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// Rutas
app.use('/', viewRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

// Manejador de errores genérico
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});