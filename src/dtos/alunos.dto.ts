export interface cadastrarAlunoDto{
    nome: string;
    email: string;
    senha: string;
}

export interface listarAlunoDto{
    nome?: string;
}

export type atualizarAlunoDto = Partial<cadastrarAlunoDto> & {id: string};