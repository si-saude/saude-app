import { Clinica } from '../../model/clinica';
import { Exame } from '../../model/exame';
import { ExameBuilder } from './../exame/exame.builder';
import { GenericBuilder } from '../../generics/generic.builder';

export class ClinicaBuilder extends GenericBuilder {

    initialize(clinica: Clinica) {
        clinica = new Clinica();
        
        clinica.setExames(new Array<Exame>());
        
        return clinica;
    }
    
    initializeList(clinicas: Array<Clinica>) {
        
        let array:Array<Clinica> = new Array<Clinica>();
        
        if(clinicas === null || clinicas === undefined)
            clinicas = new Array<Clinica>();
        
        for (let clinica of clinicas) {
            array.push(this.initialize(clinica));
        }
        
        return array;
    }
    
    clone(clinica: Clinica): Clinica {
        
        if (clinica === null || clinica === undefined)
            clinica = new Clinica();
        
        let cloneClinica = new Clinica();
        cloneClinica.setId(this.getValue(clinica,"getId"));
        cloneClinica.setNome(this.getValue(clinica, "getNome"));
        cloneClinica.setUf(this.getValue(clinica, "getUf"));
        cloneClinica.setVersion(this.getValue(clinica, "getVersion"));
        
        cloneClinica.setExames(new ExameBuilder().cloneList(this.getValue(clinica,"getExames")));
        
        return cloneClinica;
    }
    
    cloneList(clinicas: Array<Clinica>): Array<Clinica> {
        let array:Array<Clinica> = new Array<Clinica>();
        if (clinicas !== null && clinicas !== undefined) { 
            for (let clinica of clinicas) {
                array.push(this.clone(clinica));
            }
        }
        
        return array;
    }
}