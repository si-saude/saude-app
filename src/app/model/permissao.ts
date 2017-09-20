import { Perfil } from './perfil';

export class Permissao {
    id: number;
    funcao: string;
    leitura: boolean;
    escrita: boolean;
    perfil: Perfil;
    version: number;
}