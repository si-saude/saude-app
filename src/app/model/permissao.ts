import { Perfil } from './perfil';

export class Permissao {
    private id: number = 0;
    private funcionalidade: string = "";
    private valor: boolean;
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
    
    getValor() {
        return this.valor;
    }
    
    setValor(valor: boolean) {
        this.valor = valor;
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