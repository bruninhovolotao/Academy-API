import { Request, Response } from "express";
import { prismaClient } from "../database/prisma.client";
import { AlunosService } from "../services/alunos.service";
import { HTTPError } from "../utils/http.error";
import { onError } from "../utils/on-error";

export class AlunosController{
    public async listar(req: Request, res: Response): Promise<void> {
        try {

            // Pegar os dados do banco de dados
            const { nome } = req.query;
            
            // Retornar os dados para a página
            const service = new AlunosService();

            const resultado = await service.listar({nome: nome as string | undefined});

            // Exemplo de retorno
            res.status(200).json({
                sucesso: true,
                mensagem: "Alunos encontrados com sucesso",
                dados: resultado,
            })
            
        } catch (error) {
            onError(error, res);
        }
     }
    public async listarPorId(req: Request, res: Response): Promise<void> {
        try {

            const { id } = req.params;

            const service = new AlunosService();

            const resultado = await service.listarPorId(id);

            res.status(200).json({
                sucesso: true,
                mensagem: "Aluno encontrado com sucesso",
                dados: resultado,
            })
            
        } catch (error) {
            onError(error, res);
        }   
    }
    public async cadastrar(req: Request, res: Response): Promise<void> {
        try {
            // input
            const { nome, email, senha } = req.body;

            // processamento
            const service = new AlunosService();

            const resultado = await service.cadastrar({nome, email, senha});

            // resposta
            res.status(201).json({
                sucesso: true,
                mensagem: "Aluno cadastrado com sucesso",
                dados: resultado,
            })

        } catch (error) {
            onError(error, res);
        }
    }
    public async atualizar(req: Request, res: Response):Promise<void> {
        try {
            // input
            const { id } = req.params;
            const { nome, email, senha } = req.body;

            // processamento
            const service = new AlunosService();

            const resultado = await service.atualizar({id, nome, email, senha});

            // resposta
            res.status(201).json({
                sucesso: true,
                mensagem: "Aluno cadastrado com sucesso",
                dados: resultado,
            })

        } catch (error) {
            onError(error, res);
        }
    }
    public async deletar(req: Request, res: Response):Promise<void> {
        try {
            
        } catch (error) {
            onError(error, res);
        }
    }
}