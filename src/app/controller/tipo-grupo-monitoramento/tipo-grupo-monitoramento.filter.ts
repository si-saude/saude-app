import { GenericFilter } from './../../generics/generic.filter';

export class TipoGrupoMonitoramentoFilter extends GenericFilter {
    private nome: string;
    private version: number;
   
    constructor() {
        super();
    }

    public getNome() {
        return this.nome;
    }
    
    public setNome(n: string) {
        this.nome = n;
    }
    
    public getVersion() {
        return this.version;
    }
    
    public setVersion(version: number) {
        this.version = version;
    }
       
}