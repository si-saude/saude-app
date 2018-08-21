import { GenericFilter } from'../../generics/generic.filter';
import { BooleanFilter } from './../../generics/boolean.filter';

export class MotivoRecusaAtestadoFilter extends GenericFilter {
    private descricao: string;
    private permiteReabertura: BooleanFilter;
   
    constructor() {
        super();
    }

    public getDescricao() {
        return this.descricao;
    }
    
    public setDescricao(d: string) {
        this.descricao = d;
    }
    
    public getPermiteReabertura() {
        return this.permiteReabertura;
    }
    
    public setPermiteReabertura(permiteReabertura: BooleanFilter) {
        this.permiteReabertura = permiteReabertura;
    }
       
}