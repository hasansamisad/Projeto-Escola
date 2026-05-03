import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config();

import './src/database';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import homeRoutes from './src/routes/homeRoutes';
import userRoutes from './src/routes/userRoutes';
import tokenRoutes from './src/routes/tokenRoutes';
import alunoRoutes from './src/routes/alunoRoutes';
import photoRoutes from './src/routes/photoRoutes';

// Whitelist para limitar os locais de onde vem as requisições
/*
const whiteList = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173', // Adicione esta linha!
];

*/
class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    // 2. Agora ela será reconhecida aqui dentro
    this.app.use(cors());
    //this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(
      '/images/',
      express.static(resolve(__dirname, 'uploads', 'images')),
    );
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users/', userRoutes);
    this.app.use('/tokens/', tokenRoutes);
    this.app.use('/alunos/', alunoRoutes);
    this.app.use('/photos/', photoRoutes);
  }
}

export default new App().app;
