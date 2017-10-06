import { Perfil } from './perfil';

export class Usuario {
    private chave: string;
    private id: number;
    private senha: string;
    private token: string;
    private perfis: Array<Perfil>;
    private version: number;

    getChave() {
        return this.chave;
    }
    
    setChave(chave: string) {
        this.chave = chave;
    }
    
    getId() {
        return this.id;
    }
    
    setId(id: number) {
        this.id = id;
    }
    
    getSenha() {
        return this.senha;
    }
    
    setSenha(senha: string) {
        this.senha = senha;
    }
    
    getToken() {
        return this.token;
    }
    
    setToken(token: string) {
        this.token = token;
    }
    
    getVersion() {
        return this.version;
    }
    
    setVersion(version: string) {
        this.version = version;
    }
    
    getPerfis() {
        return this.perfis;
    }
    
    setPerfis(perfis: Array<Perfil>) {
        this.perfis = perfis;
    }
}