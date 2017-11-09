import { Cargo } from './../../model/cargo';
import { CursoBuilder } from './../curso/curso.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class CargoBuilder extends GenericBuilder {
    
    initialize(cargo: Cargo) {
        cargo = new Cargo();
        cargo.setCursos(new CursoBuilder().initializeList(cargo.getCursos()));
        return cargo;
    }
    
    clone(cargo: Cargo) {
        
        if (cargo === null || cargo === undefined)
            cargo = new Cargo();
        
        let cloneCargo = new Cargo();
        cloneCargo.setId(this.getValue(cargo,"getId"));
        cloneCargo.setVersion(this.getValue(cargo,"getVersion"));
        cloneCargo.setNome(this.getValue(cargo,"getNome"));
        cloneCargo.setCursos(new CursoBuilder().cloneList(this.getValue(cargo,"getCursos")));
        
        return cloneCargo;
    }
}