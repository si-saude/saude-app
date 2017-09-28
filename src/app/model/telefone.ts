import { ProfissionalSaude } from './profissional-saude';

export class Telefone {
    id: number;
    version: number;
    numero: string;
    profissionais: Array<ProfissionalSaude>;
}