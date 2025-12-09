import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // 🔹 Importa cors
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

// 🔹 Configurar CORS
// Permite acceso desde cualquier origen (para desarrollo)
app.use(cors());

// Si quieres restringir solo a tu frontend:
// app.use(cors({ origin: 'http://localhost:4321' }));

// Rutas
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
