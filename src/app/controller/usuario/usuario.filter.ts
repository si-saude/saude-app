import { GenericFilter } from './../../generics/generic.filter';
import { BooleanFilter } from './../../generics/boolean.filter';
import { PessoaFilter } from './../pessoa/pessoa.filter';

export class UsuarioFilter extends GenericFilter {
    private chave: string;
    private senha: string;
    private pessoa: PessoaFilter;
    private gestorCss: BooleanFilter = new BooleanFilter();

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
    
    getPessoa() {
        return this.pessoa;
    }
    
    setPessoa(pessoa: PessoaFilter) {
        this.pessoa = pessoa;
    }
    
    getGestorCss() {
        return this.gestorCss;
    }
    
    setGestorCss(gestorCss: BooleanFilter) {
        this.gestorCss = gestorCss;
    }
}