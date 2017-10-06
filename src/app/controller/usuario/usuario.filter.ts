import { GenericFilter } from './../../generics/generic.filter';

export class UsuarioFilter extends GenericFilter {
    private chave: string;
    private senha: string;

    getChave() {
        return this.chave;
    }
    
    setChave(chave: string) {
        this.chave = chave;
    }
    
    getSenha() {
        return this.chave;
    }
    
    setSenha(senha: string) {
        this.senha = senha;
    }
    
}