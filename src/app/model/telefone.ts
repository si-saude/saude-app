import { ProfissionalSaude } from './profissional-saude';
import { Fornecedor } from './fornecedor';

export class Telefone {
    private id: number;
    private version: number;
    private numero: string;
    private profissionais: Array<ProfissionalSaude>;
    private fornecedores: Array<Fornecedor>;

    getId() {
        return this.id;
    }
    
    setId(id: number) {
        this.id = id;
    }
    
    getVersion() {
        return this.version;
    }
    
    setVersion(version: number) {
        this.version = version;
    }
    
    getNumero() {
        return this.numero;
    }
    
    setNumero(numero: string) {
        this.numero = numero;
    }
    
    getProfissionais() {
        return this.profissionais;
    }
    
    setProfissionais(profissionais: Array<ProfissionalSaude>) {
        this.profissionais = profissionais;
    }
    
    getFornecedores() {
        return this.fornecedores;
    }
    
    setFornecedores(fornecedores: Array<Fornecedor>) {
        this.fornecedores = fornecedores;
    }
    
}