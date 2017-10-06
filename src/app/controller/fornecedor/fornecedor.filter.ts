import { GenericFilter } from './../../generics/generic.filter';

import { EnderecoFilter } from './../endereco/endereco.filter';

export class FornecedorFilter extends GenericFilter {
    private razaoSocial: string;
    private tipoPessoa: string;
    private cpfCnpj: string;
    private codigoSap: string;
    private email: string;
    private endereco: EnderecoFilter;

    getRazaoSocial() {
        return this.razaoSocial;
    }
    
    setRazaoSocial(razaoSocial: string) {
        this.razaoSocial = razaoSocial;
    }
    
    getTipoPessoa() {
        return this.tipoPessoa;
    }
    
    setTipoPessoa(tipoPessoa: string) {
        this.tipoPessoa = tipoPessoa;
    }
    
    getCpfCnpj() {
        return this.cpfCnpj;
    }
    
    setCpfCnpj(cpfCnpj: string) {
        this.cpfCnpj = cpfCnpj;
    }
    
    getCodigoSap() {
        return this.codigoSap;
    }
    
    setCodigoSap(codigoSap: string) {
        this.codigoSap = codigoSap;
    }
    
    getEmail() {
        return this.email;
    }
    
    setEmail(email: string) {
        this.email = email;
    }
    
    getEndereco() {
        return this.endereco;
    }
    
    setEndereco(endereco: EnderecoFilter) {
        this.endereco = endereco;
    }
    
}