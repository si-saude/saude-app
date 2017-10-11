export class TipoGrupoMonitoramentoFilter {

    private nome: string;
    private descricao: string;

    getNome():string{
        return this.nome;
    }
    
    setNome(nome:string){
        this.nome = nome;
    }
    
    getDescricao():string{
        return this.descricao;
    }
    
    setDescricao(descricao:string){
        this.descricao = descricao;
    }
}