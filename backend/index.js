const express = require('express');
const cors = require('cors');
const next = require('next');
require('dotenv').config();

const sequelize = require('./db');

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: '../frontend' });

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(cors());
  server.use(express.json());

  // 💡 Montar rutas del backend
  server.use('/api/productos', require('./routes/productos'));

  // 🔁 Todas las demás rutas van al frontend
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // ⛓️ Sincroniza Sequelize con PostgreSQL
  sequelize.sync().then(() => {
    server.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  }).catch(err => {
    console.error('❌ Error al conectar con la base de datos:', err);
  });
});
