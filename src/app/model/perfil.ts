import { Permissao } from './permissao';

export class Perfil {
    id: number;
    titulo: string;
    permissoes: Permissao[];
    version: number;
}