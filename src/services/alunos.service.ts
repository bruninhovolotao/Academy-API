import { Aluno } from "@prisma/client";
import { prismaClient } from "../database/prisma.client";
import { atualizarAlunoDto, cadastrarAlunoDto, listarAlunoDto } from "../dtos/alunos.dto";
import { validate } from "uuid";
import { HTTPError } from "../utils/http.error";

type AlunoParcial = Omit<Aluno, "authToken" | "senha">;

export class AlunosService {
    public async listar({nome}: listarAlunoDto): Promise<AlunoParcial[]>{
        const listarAluno = await prismaClient.aluno.findMany({
                        where:{ // Onde
                            nome: {
                                contains: nome,
                                mode: "insensitive",
                            }
                        },
                        orderBy: { // Ordenar
                            nome: 'asc',
                        },
                        omit: { // Omitir
                            authToken: true,
                            senha: true,
                        },
                        // select: { // Selecionar
                        //     nome: true,
                        //     email: true,
                        //     criadoEm: true,
                        // },
                        
                        // skip: 10 // Pular os registro
                        // take: 5, // Pegar os 5 primeiros registros
        
                    });

                    return listarAluno;
    }

    public async listarPorId(idAluno: string): Promise<AlunoParcial>{

        if(!validate(idAluno)){
            throw new HTTPError(400, "ID do aluno invalido");
        }

        const aluno = await prismaClient.aluno.findUnique({
            where: {id: idAluno},
            omit: {authToken: true, senha: true},
        });

        if(!aluno){
            throw new HTTPError(404, "Aluno não encontrado");
        }

        return aluno;

    }

    public async cadastrar({nome, email, senha}: cadastrarAlunoDto): Promise<AlunoParcial>{
        const emailJaCadastrado = await prismaClient.aluno.findUnique({where:{email}});
        
            if(emailJaCadastrado){
                throw new HTTPError(409, "E-mail já cadastrado");
            }
        
            const novoAluno = await prismaClient.aluno.create({
                data: {
                    nome,
                    email,
                    senha,
                },
                omit: {
                    authToken: true,
                    senha: true,
                }
            })

            return novoAluno;
    }

    public async atualizar({id, nome, email, senha}: atualizarAlunoDto): Promise<AlunoParcial>{
        await this.listarPorId(id);

        const alunoAtualizado = await prismaClient.aluno.update({
            where: {id},
            data: {
                nome,
                email,
                senha
            },
            omit:{
                authToken: true,
                senha: true
            }
        });
        return alunoAtualizado;
    }

    public async deletar(): Promise<void>{}
}