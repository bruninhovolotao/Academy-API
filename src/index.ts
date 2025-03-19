import express from 'express';
import { envs } from './envs';
import { AlunosRoutes } from './routes/alunos.routes';

const app = express();

// Padrão de comunicação da API: REST

app.use(express.json());

// Definição das rotas

app.get("/", (_, res, next) => {
    res.status(200).json({
        sucess: true,
        message: "Bem-vindo ao meu servidor"
    });
}

);

app.use(AlunosRoutes.bind())

app.listen(envs.PORT, () => console.log('Servidor rodando na porta 3030.'));