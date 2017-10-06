import { Perfil } from './perfil';

export class Permissao {
    private id: number;
    private funcionalidade: string;
    private leitura: boolean;
    private escrita: boolean;
    private perfil: Perfil;
    private version: number;

    getId() {
        return this.id;
    }
    
    setId(id: number) {
        this.id = id;
    }
    
    getFuncionalidade() {
        return this.funcionalidade;
    }
    
    setFuncionalidade(funcionalidade: string) {
        this.funcionalidade = funcionalidade;
    }
    
    getLeitura() {
        return this.leitura;
    }
    
    setLeitura(leitura: boolean) {
        this.leitura = leitura;
    }
    
    getEscrita() {
        return this.escrita;
    }
    
    setEscrita(escrita: boolean) {
        this.escrita = escrita;
    }
    
    getPerfil() {
        return this.perfil;
    }
    
    setPerfil(perfil: Perfil) {
        this.perfil = perfil;
    }
    
    getVersion() {
        return this.version;
    }
    
    setVersion(version: number) {
        this.version = version;
    }
}