import { AtestadoBuilder } from './atestado.builder';
import { AtestadoFilter } from './atestado.filter';
import { AtestadoService } from './atestado.service';
import { Atestado } from './../../model/atestado';
import { MotivoRecusaAtestadoFilter } from './../motivo-recusa-atestado/motivo-recusa-atestado.filter';
import { EmpregadoFilter } from './../empregado/empregado.filter';
import { BooleanFilter } from './../../generics/boolean.filter';
import { AutoComplete } from './../../generics/utils/autocomplete.util';

export class AtestadoIdCorrecaoAutocomplete {

    private autoComplete: AutoComplete<AtestadoFilter>;

    constructor( service: AtestadoService ) {
        this.autoComplete = new AutoComplete<AtestadoFilter>(
            new AtestadoFilter(),
            this,
            service,
            new AtestadoBuilder()
        );
    }

    public getAutocomplete() {
        return this.autoComplete;
    }

    public getLabel( obj: any ) {
        return obj.getId();
    }

    public getFilter( a: Atestado, aF: AtestadoFilter ) {
        aF.setMotivoRecusa( new MotivoRecusaAtestadoFilter() );
        aF.getMotivoRecusa().setPermiteReabertura( new BooleanFilter() );
        aF.getMotivoRecusa().getPermiteReabertura().setValue( 1 );
        aF.setEmpregado( new EmpregadoFilter() );
        aF.getEmpregado().setId(a.getEmpregado().getId());
        aF.setId(Number( a.getId().toString().replace(/\D/g, "")));
        return aF;
    }

    public getList( service: AtestadoService, aF: AtestadoFilter ) {
        return service.getListAll( aF );
    }
}