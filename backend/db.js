// backend/db.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

// URL completa de conexión (recomendado en Render)
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Render requiere esto
    },
  },
});

// Probar conexión
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a PostgreSQL establecida exitosamente.');
  } catch (error) {
    console.error('No se pudo conectar a PostgreSQL:', error);
  }
}

testConnection();

module.exports = sequelize;
