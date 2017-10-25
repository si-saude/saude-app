import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GlobalVariable } from './../../../global'; 
import { Profissiograma } from './../../../model/profissiograma';
import { ProfissiogramaService } from './../profissiograma.service';
import { ProfissiogramaFilter } from './../profissiograma.filter';
import { GrupoMonitoramento } from './../../../model/grupo-monitoramento';
import { GenericFormComponent } from './../../../generics/generic.form.component'; 
import { ProfissiogramaBuilder } from './../profissiograma.builder';
import { GrupoMonitoramentoBuilder } from './../../grupo-monitoramento/grupo-monitoramento.builder';

@Component( {
    selector: 'app-profissiograma-form',
    templateUrl: './profissiograma-form.html',
    styleUrls: ['./profissiograma-form.css']
} )
export class ProfissiogramaFormComponent extends GenericFormComponent<Profissiograma> {
    profissiograma: Profissiograma;
    gruposMonitoramento: Array<GrupoMonitoramento>;
//    dtOptions: DataTables.Settings = {};
//    dtTrigger: Subject = new Subject();

    profissiogramaFilter: ProfissiogramaFilter = new ProfissiogramaFilter();
    
    constructor( private route: ActivatedRoute,
        private profissiogramaService: ProfissiogramaService) {
        super(profissiogramaService);
        this.goTo = "profissiograma";
        
        this.profissiograma = new ProfissiogramaBuilder().initialize(this.profissiograma);
    }

    ngOnInit() {
//        this.dtOptions = {
//            paging: false,
//            seaching: false,
//            displayLength: 2
//        };
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;
                    
                    this.profissiogramaService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.profissiograma = new ProfissiogramaBuilder().clone(res.json());
                        } )
                        .catch( error => {
                            this.showPreload = false;
                            console.log( error );
                        } )
                }
            } );
            
          this.profissiogramaService.getGruposMonitoramento()
              .then(res => {
                  this.gruposMonitoramento = res.json();
              })
              .catch(error => {
                  console.log(error);
              })
      }
        
    save() {
        super.save(new ProfissiogramaBuilder().clone(this.profissiograma));
    }
  
    addExame() {
    }
    

    removeExame(i: number) {
    }
    
    addCriterio() {
    }

    removeCriterio(i: number) {
    }
    
    isPossibleDeactivate() {
//        if ( this.formulario.dirty ) {
//            return false;
//        } else return true;
    }
    
    onDestroy() {
        this.inscricao.unsubscribe();
    }
    
}
