import { Perfil } from './perfil';
import { Pessoa } from './pessoa';

export class Usuario {
    private id: number = 0;
    private chave: string;
    private senha: string;
    private token: string;
    private perfis: Array<Perfil>;
    private pessoa: Pessoa;
    private gestorCss: boolean;
    private version: number;

    getId() {
        return this.id;
    }
    
    setId(id: number) {
        this.id = id;
    }

    getChave() {
        return this.chave;
    }
    
    setChave(chave: string) {
        this.chave = chave;
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
    
    getPerfis() {
        return this.perfis;
    }
    
    setPerfis(perfis: Array<Perfil>) {
        this.perfis = perfis;
    }
    
    getPessoa() {
        return this.pessoa;
    }
    
    setPessoa(pessoa: Pessoa) {
        this.pessoa = pessoa;
    }
    
    getGestorCss() {
        return this.gestorCss;
    }
    
    setGestorCss(gestorCss: boolean) {
        this.gestorCss = gestorCss;
    }
    
    getVersion() {
        return this.version;
    }
    
    setVersion(version: number) {
        this.version = version;
    }
}