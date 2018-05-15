import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { MyDatePickerModule } from 'mydatepicker'; 

import { GlobalVariable } from './../../../global';
import { Profissional } from './../../../model/profissional';
import { ProfissionalSaudeService } from './../profissional-saude.service';
import { ProfissionalSaudeFilter } from './../profissional-saude.filter';
import { Localizacao } from './../../../model/localizacao';
import { Empregado } from './../../../model/empregado';
import { Equipe } from './../../../model/equipe';
import { Cargo } from './../../../model/cargo';
import { Curso } from './../../../model/curso';
import { CurriculoCurso } from './../../../model/curriculo-curso';
import { Cidade } from './../../../model/cidade';
import { Curriculo } from './../../../model/curriculo';
import { Endereco } from './../../../model/endereco';
import { Telefone } from './../../../model/telefone';
import { Vacina } from './../../../model/vacina';
import { ProfissionalConselho } from './../../../model/profissional-conselho';
import { ProfissionalVacina } from './../../../model/profissional-vacina';
import { ProfissionalVacinaBuilder } from './../../profissional-vacina/profissional-vacina.builder';
import { EmpregadoBuilder } from './../../empregado/empregado.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { ProfissionalSaudeBuilder } from './../profissional-saude.builder';
import { DateUtil } from './../../../generics/date.util';

@Component( {
    selector: 'app-profissional-saude-form-detail',
    templateUrl: './profissional-saude-form-detail.html',
    styleUrls: ['./../../../../assets/css/form-component.css', './profissional-saude-form.css']
} )
export class ProfissionalSaudeFormDetailComponent extends GenericFormComponent implements OnInit {
    
    empregados: Array<Empregado>;
    profissionalSaude: Profissional;
    localizacoes: Array<Localizacao>;
    equipes: Array<Equipe>;
    cursos: Array<Curso>;
    autocompleteEmpregado;

    //ngModel
    dataAso: any;
    dataCurriculoCursos: Array<any>;
    vencimentoProfissionalConselho: any;
    assinaturaSrc: any;
    
    profissionalSaudeFilter: ProfissionalSaudeFilter = new ProfissionalSaudeFilter();
    
    private dateUtil: DateUtil;
    
    constructor( private route: ActivatedRoute,
        private profissionalSaudeService: ProfissionalSaudeService,
        router: Router) { 
        super(profissionalSaudeService, router);
        this.goTo = "profissional-saude";
        
        this.dataCurriculoCursos = new Array<any>();
        this.empregados = new Array<Empregado>();
        this.profissionalSaude = new ProfissionalSaudeBuilder().initialize(this.profissionalSaude);
        this.autocompleteEmpregado = [];
        this.dateUtil = new DateUtil();
    }

    ngOnInit() {
        
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                let id = params['id'];
                this.showPreload = true;
                
                this.profissionalSaudeService.get( id )
                    .then( res => {
                        this.showPreload = false;
                        this.profissionalSaude = new ProfissionalSaudeBuilder().clone(res.json());
                        this.parseAndSetDates();
                    } )
                    .catch( error => {
                        this.catchConfiguration( error );
                    } )
            } );
            
      this.profissionalSaudeService.getLocalizacoes()
          .then(res => {
              this.localizacoes = res.json();
          })
          .catch(error => {
              console.log(error);
          })
      
      this.profissionalSaudeService.getEquipe()
          .then(res => {
              this.equipes = res.json();
          })
          .catch(error => {
              console.log(error);
          })
      
      this.profissionalSaudeService.getCursos()
          .then(res => {
              this.cursos = res.json();
          })
          .catch(error => {
              console.log(error);
          }) 
            
    }
    
    verifyIfPessoaExist() {
        let empregado = this.empregados.find(e => {
            return JSON.stringify(this.profissionalSaude.getEmpregado()) === JSON.stringify(e);
        })
        if ( empregado != undefined )
            return true;
        
        return false;
    }
    
    onDestroy() {
        this.inscricao.unsubscribe();
    }
    
    parseAndSetDates() {
        if (this.profissionalSaude.getDataAso() !== undefined &&
                this.profissionalSaude.getDataAso() !== null) {
            this.dataAso = this.dateUtil.parseDataToObjectDatePicker( this.profissionalSaude.getDataAso() );
        }
        
        if ( this.profissionalSaude.getCurriculo() !== undefined &&
                this.profissionalSaude.getCurriculo() !== null &&
                this.profissionalSaude.getCurriculo().getCurriculoCursos() !== undefined && 
                this.profissionalSaude.getCurriculo().getCurriculoCursos() !== null ) {
            
            for (let i=0; i < this.profissionalSaude.getCurriculo().getCurriculoCursos().length; i++) {
                this.dataCurriculoCursos[i] = 
                    this.dateUtil.parseDataToObjectDatePicker(
                            this.profissionalSaude.getCurriculo().getCurriculoCursos()[i].getData());   
            }
        }
        
        if ( this.profissionalSaude.getProfissionalConselho() !== undefined && 
                this.profissionalSaude.getProfissionalConselho() !== null) {
            this.vencimentoProfissionalConselho = 
                this.dateUtil.parseDataToObjectDatePicker(this.profissionalSaude.getProfissionalConselho().getVencimento());
        }
        
    }
}
