import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { RiscoPotencialService } from './../risco-potencial.service';
import { Triagem } from './../../../model/triagem';
import { Equipe } from './../../../model/equipe';
import { EquipeBuilder } from './../../equipe/equipe.builder';
import { RiscoPotencial } from './../../../model/risco-potencial';
import { RiscoPotencialBuilder } from './../risco-potencial.builder';

@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.html',
  styleUrls: ['./avaliacao.css', './../../../../assets/css/form-component.css']
})
export class AvaliacaoComponent extends GenericFormComponent implements OnInit {
    private equipesAbordagemTriagens: Array<Equipe>;
    private flagEquipesAbordagemTriagens: Array<Equipe>;
    private triagensByEquipeAbordagem = [[]];
    private riscoPotencial: RiscoPotencial;
    private inicioAgendamento: any;
    private fimAgendamento: any;
    private equipesSelecteds: Array<Equipe>;

    constructor( private route: ActivatedRoute,
            private riscoPotencialService: RiscoPotencialService,
            router: Router ) {
            super( riscoPotencialService, router );
        
            this.goTo = "risco-potencial";
            
            this.equipesAbordagemTriagens = new EquipeBuilder().initializeList(new Array<Equipe>());
            this.flagEquipesAbordagemTriagens = new EquipeBuilder().initializeList(new Array<Equipe>());
            this.riscoPotencial = new RiscoPotencialBuilder().initialize(new RiscoPotencial());
            this.equipesSelecteds = new EquipeBuilder().initializeList(new Array<Equipe>());
    }
    
    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if ( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.riscoPotencialService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.riscoPotencial = new RiscoPotencialBuilder().clone( res.json() );
                            this.equipesSelecteds = this.riscoPotencial.getEquipes();
                            this.getTriagensEquipeAbordagem();
                            this.getDates();
                        } )
                        .catch( error => {
                            this.showPreload = false;
                            this.catchConfiguration( error );
                        } )
                }
            } );
    }
    
    save() {
        this.setDates();
        super.save(new RiscoPotencialBuilder().clone( this.riscoPotencial ));
    }
    
    validar() {
        
    }
    
    getTriagensEquipeAbordagem() {
        this.riscoPotencial.getRiscoEmpregados().forEach(rE => {
            rE.getTriagens().forEach( t => {
                if ( t.getEquipeAbordagem().getId() > 0 && 
                        this.equipesAbordagemTriagens.find( eA => eA.getId() == t.getEquipeAbordagem().getId() ) == undefined ) {
                    
                    if ( this.riscoPotencial.getEquipes().find( e => e.getId() == t.getEquipeAbordagem().getId() ) == undefined ) {
                        this.flagEquipesAbordagemTriagens.push( t.getEquipeAbordagem() );
                    } else
                        this.equipesAbordagemTriagens.push( t.getEquipeAbordagem() );
                    
                    this.triagensByEquipeAbordagem[t.getEquipeAbordagem().getId()] = new Array<Triagem>();
                }
                
                if ( t.getEquipeAbordagem().getId() > 0 )
                    this.triagensByEquipeAbordagem[t.getEquipeAbordagem().getId()].push(t);
            } )
        })
        this.equipesAbordagemTriagens.forEach( eA => this.flagEquipesAbordagemTriagens.push( eA ) ); 
    }
    
    addEquipe( valor: number ) { 
        if ( valor != 0 ) {
            let e = this.equipesSelecteds.find( c => c.getId() == valor );
            if ( e == undefined ) {
                let equipe: Equipe = this.flagEquipesAbordagemTriagens.find( eq => eq.getId() == valor );
                this.equipesSelecteds.push( equipe );
                this.riscoPotencial.setEquipes( this.equipesSelecteds );
                this.equipesAbordagemTriagens.push( equipe );
            }
        }
    }
    
    removeEquipe( index ) {
        let indexEAT = this.equipesAbordagemTriagens.findIndex( i => i.getId() == this.riscoPotencial.getEquipes()[index].getId() );
        this.riscoPotencial.getEquipes().splice( index, 1 );
        this.equipesAbordagemTriagens.splice( indexEAT, 1 );
    }
    
    getIndiceDescricao( triagem: Triagem ) {
        return triagem.getIndice() + " - " + triagem["indicadorSast"]["indice" + triagem.getIndice()];
    }
    
    setDates() {
        if ( this.inicioAgendamento != null )
            this.riscoPotencial.setInicioAgendamento(this.parseDatePickerToDate(this.inicioAgendamento));
        if ( this.fimAgendamento != null )
            this.riscoPotencial.setFimAgendamento(this.parseDatePickerToDate(this.fimAgendamento));
    }
    
    getDates() {
        if ( this.riscoPotencial.getInicioAgendamento() != undefined )
            this.inicioAgendamento = this.parseDataToObjectDatePicker( this.riscoPotencial.getInicioAgendamento() );
        if ( this.riscoPotencial.getFimAgendamento() != undefined )
            this.fimAgendamento = this.parseDataToObjectDatePicker( this.riscoPotencial.getFimAgendamento() );
    }

    ngOnDestroy() {
        if ( this.inscricao != undefined ) 
            this.inscricao.unsubscribe();
    }
}
