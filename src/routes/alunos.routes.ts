import {Router} from 'express'
import { AlunosController } from '../controllers/alunos.controller';

export class AlunosRoutes {
    public static bind(): Router {
        const router = Router();

        const controller = new AlunosController();

        router.get("/alunos", controller.listar);
        router.get("/alunos/:id", controller.listarPorId);
        router.post("/alunos", controller.cadastrar);
        router.put("/alunos/:id", controller.atualizar);
        router.delete("/alunos/:id", controller.deletar);

        return router;
    }
}