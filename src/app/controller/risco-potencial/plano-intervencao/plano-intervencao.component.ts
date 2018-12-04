import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { RiscoPotencialService } from './../risco-potencial.service';
import { Triagem } from './../../../model/triagem';
import { TriagemBuilder } from './../../triagem/triagem.builder';
import { Equipe } from './../../../model/equipe';
import { EquipeBuilder } from './../../equipe/equipe.builder';
import { RiscoPotencial } from './../../../model/risco-potencial';
import { RiscoPotencialBuilder } from './../risco-potencial.builder';
import { ConfirmSaveComponent } from './../../../includes/confirm-save/confirm-save.component';

@Component({
  selector: 'app-plano-intervencao',
  templateUrl: './plano-intervencao.html',
  styleUrls: ['./plano-intervencao.css', './../../../../assets/css/form-component.css']
})
export class PlanoIntervencaoComponent extends GenericFormComponent implements OnInit {
    private equipesAbordagemTriagens: Array<Equipe>;
    private flagEquipesAbordagemTriagens: Array<Equipe>;
    private triagensByEquipeAbordagem = [[]];
    private riscoPotencial: RiscoPotencial;
    private equipesSelecteds: Array<Equipe>;
    private triagensTodosAtendimentos: Array<Triagem>;
    @ViewChild( ConfirmSaveComponent) confirmSaveComponent: ConfirmSaveComponent;

    constructor( private route: ActivatedRoute,
            private riscoPotencialService: RiscoPotencialService,
            router: Router ) {
            super( riscoPotencialService, router );
        
            this.goTo = "risco-potencial";
            
            this.equipesAbordagemTriagens = new EquipeBuilder().initializeList(new Array<Equipe>());
            this.flagEquipesAbordagemTriagens = new EquipeBuilder().initializeList(new Array<Equipe>());
            this.riscoPotencial = new RiscoPotencialBuilder().initialize(new RiscoPotencial());
            this.equipesSelecteds = new EquipeBuilder().initializeList(new Array<Equipe>());
            this.triagensTodosAtendimentos = new Array<Triagem>();
    }
    
    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if ( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.riscoPotencialService.getAcoes( id )
                        .then( res => {
                            this.showPreload = false;
                            this.riscoPotencial = new RiscoPotencialBuilder().clone( res.json() );
                            console.log(this.riscoPotencial)
                            this.equipesSelecteds = this.riscoPotencial.getEquipes();
                            this.getTriagensEquipeAbordagem();
                        } )
                        .catch( error => {
                            this.showPreload = false;
                            this.catchConfiguration( error );
                        } )
                }
            } );
    }
    
    save() {
        this.confirmSaveComponent.setGoTo("$*close*$");
        super.save(new RiscoPotencialBuilder().clone( this.riscoPotencial ));
    }
    
    validar() {
        this.showPreload = true;
        this.canDeactivate = true;
        this.riscoPotencialService.validar(new RiscoPotencialBuilder().clone(this.riscoPotencial))
            .then(res => {
                this.processReturn( true, res );
            })
            .catch(error => {
                this.processReturn( false, error );
            })
    }
    
    getTriagensEquipeAbordagem() {
        this.riscoPotencial.getRiscoEmpregados().forEach(rE => {
            if ( rE.getAtivo() ) {
                rE.getTriagens().forEach( t => {
                    if ( t.getEquipeAbordagem().getId() > 0 )   
                        this.triagensTodosAtendimentos.push(t);
                } )
            }
        })
        this.triagensTodosAtendimentos = new TriagemBuilder().cloneList(this.triagensTodosAtendimentos);
        this.equipesAbordagemTriagens.forEach( eA => this.flagEquipesAbordagemTriagens.push( eA ) ); 
    }
    
    selectIndicador( index: number ) {
        
        
    }
    
    ngOnDestroy() {
        if ( this.inscricao != undefined ) 
            this.inscricao.unsubscribe();
    }
}
