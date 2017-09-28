import { Cidade } from './cidade';
import { ProfissionalSaude } from './profissional-saude';

export class Endereco {
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cep: string;
    cidade: Cidade;
    profissionais: Array<ProfissionalSaude>;
    version: number;
}
