import {CargoBuilder} from '../cargo/cargo.builder';
import {CargoFilter} from '../cargo/cargo.filter';
import {CargoService} from '../cargo/cargo.service';
import {Cargo} from './../../model/cargo';
 
import {AutoComplete} from './../../generics/utils/autocomplete.util'

export class CargoNomeAutocomplete{
    
    private autoComplete:AutoComplete<CargoFilter>;

    constructor(service:CargoService) {
        let cargoFilter: CargoFilter = new CargoFilter();
        
        this.autoComplete = new AutoComplete<CargoFilter>(
                cargoFilter,
                this,
                service,
                new CargoBuilder()
        ); 
    }
    
    public getAutocomplete(){
        return this.autoComplete;
    }
    
    public getLabel(obj:any){
        return obj.getNome();
    }
    
    public getFilter(e:Cargo, eF:CargoFilter){
        eF.setNome(e.getNome());
        return eF;
    }    
}