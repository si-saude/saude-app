import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

@Component( {
    selector: 'app-profissional-saude-form',
    templateUrl: './profissional-saude-form.html',
    styleUrls: ['./profissional-saude-form.css']
} )
export class ProfissionalSaudeFormComponent extends GenericFormComponent implements OnInit {
    
    empregados: Array<Empregado>;
    profissionalSaude: Profissional;
    localizacoes: Array<Localizacao>;
    equipes: Array<Equipe>;
    cursos: Array<Curso>;
    autocompleteEmpregado = [];

    //ngModel
    dataAso: any;
    dataCurriculoCursos: Array<any>;
    vencimentoProfissionalConselho: any;
    assinaturaSrc: any;
    
    profissionalSaudeFilter: ProfissionalSaudeFilter = new ProfissionalSaudeFilter();
    
    constructor( private route: ActivatedRoute,
        private profissionalSaudeService: ProfissionalSaudeService) { 
        super(profissionalSaudeService);
        this.goTo = "profissional-saude";
        
        this.dataCurriculoCursos = new Array<any>();
        this.empregados = new Array<Empregado>();
        this.profissionalSaude = new ProfissionalSaudeBuilder().initialize(this.profissionalSaude);        
    }

    ngOnInit() {
        
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;
                    
                    this.profissionalSaudeService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.profissionalSaude = new ProfissionalSaudeBuilder().clone(res.json());
                            this.parseAndSetDates();
                        } )
                        .catch( error => {
                            this.showPreload = false;
                            console.log( error );
                        } )
                }
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
    
//    loadAssinatura(){
//        let inputEl: HTMLInputElement = this.inputEl.nativeElement;
//        
//        if(inputEl.files.length > 0){
//            let reader = new FileReader();
//            this.assinaturaSrcStyle = { 'width': '500px', 'heigth': '500px' };
//            let component = this;
//            
//            reader.onload = function () {
//                if ( reader.result.toString().substring(0,40).indexOf("stream") !== -1 ) {
//                    component.assinaturaSrc = reader.result.toString().replace('data:application/octet-stream;base64','data:image/png;base64');
//                } else {
//                    component.assinaturaSrc = reader.result.toString().replace('data:;base64','data:image/png;base64');
//                }
//            };
//            reader.readAsDataURL(new Blob([inputEl.files[0]]));
//        } else {
//            this.assinaturaSrcStyle = { 'width': '0px', 'heigth': '0px' };
//        }
//    }
//    
//    save() {
//        this.verifyAndSetDates();
//        
//        let inputEl: HTMLInputElement = this.inputEl.nativeElement;          
//                
//        if(inputEl.files.length > 0){
//            let reader = new FileReader();
//            let array : Uint8Array;
//            let component = this;
//            
//            reader.onload = function () {
//                let arrayBuffer:ArrayBuffer = reader.result;
//                array = new Uint8Array( arrayBuffer );
//                let profissional:Profissional = new ProfissionalSaudeBuilder().clone(component.profissionalSaude); 
//                profissional.setAssinatura(array);
//                component.salvar(profissional);
//            };
//            
//            reader.readAsArrayBuffer(new Blob([inputEl.files[0]]));
//        }else{
//            super.save(new ProfissionalSaudeBuilder().clone(this.profissionalSaude));
//        }
//    }
    
    save(){
        this.verifyAndSetDates();
//        console.log(this.profissionalSaude.getProfissionalConselho().getVencimento());
//        console.log(new ProfissionalSaudeBuilder().clone(this.profissionalSaude));
        super.save(new ProfissionalSaudeBuilder().clone(this.profissionalSaude));
    }
    
    getEmpregado() {
        if (this.profissionalSaude.getEmpregado().getPessoa().getNome() !== undefined) {
            
            let empregado = this.empregados.find(e => {
                return e.getChave()+" - "+e.getPessoa().getNome() == 
                    this.profissionalSaude.getEmpregado().getPessoa().getNome();
            });
            if ( empregado  !== undefined ) {
                this.profissionalSaude.setEmpregado(empregado);
            } else this.profissionalSaude.setEmpregado(new EmpregadoBuilder().initialize(new Empregado()));
        } else this.profissionalSaude.setEmpregado(new EmpregadoBuilder().initialize(new Empregado()));
    }
    
    private oldNome:string;
    selectEmpregado(evento) {
        if(this.oldNome != evento){
            this.oldNome = evento;
            if( evento.length > 3 ) {
                this.profissionalSaudeService.getEmpregadoByName(evento)
                    .then(res => {
                        this.empregados = new EmpregadoBuilder().cloneList(res.json());
                        console.log(this.empregados);
                        this.autocompleteEmpregado = [this.buildAutocompleteEmpregado(this.empregados)];
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        }
    }
    
    private oldNomeByChave:string;
    selectEmpregadoByChave(evento) {
        if(this.oldNomeByChave != evento){
            this.oldNomeByChave = evento;
            this.profissionalSaudeService.getEmpregadoByChave(this.profissionalSaude.getEmpregado().getPessoa().getNome())
                .then(res => {
                    this.empregados = new EmpregadoBuilder().cloneList(res.json());
                    this.autocompleteEmpregado = [this.buildAutocompleteEmpregado(this.empregados)];
                })
                .catch(error => {
                    console.log(error);
                })            
        }
    }
    
    buildAutocompleteEmpregado(empregados) {
        let data = {} ;
        empregados.forEach(item => {
            data[item.getChave() + " - " + item.getPessoa().getNome()] = null;
        });
        
        let array = {};
        array["data"] = data;
        
        return array;
    }

    addCurriculoCurso() {
        if ( this.profissionalSaude.getCurriculo().getCurriculoCursos() === undefined ) {
            this.profissionalSaude.getCurriculo().setCurriculoCursos(new Array<CurriculoCurso>());   
        }
        
        let cc: CurriculoCurso = new CurriculoCurso();
        cc.setCurriculo(new Curriculo());
        cc.setCurso(new Curso());
        this.profissionalSaude.getCurriculo().getCurriculoCursos().push(cc);
  }
    

    removeCurriculoCurso(i: number) {
        this.profissionalSaude.getCurriculo().getCurriculoCursos().splice(i, 1);
    }
    
    onDestroy() {
        this.inscricao.unsubscribe();
    }
    
    verifyAndSetDates() {
        if (this.dataAso !== undefined &&
                this.dataAso !== null) {
            this.profissionalSaude.setDataAso( this.parseDatePickerToDate( this.dataAso ) );
        }
        
        if ( this.profissionalSaude.getCurriculo() !== undefined &&
                this.profissionalSaude.getCurriculo() !== null &&
                this.profissionalSaude.getCurriculo().getCurriculoCursos() !== undefined && 
                this.profissionalSaude.getCurriculo().getCurriculoCursos() !== null ) {
            
            for (let i=0; i < this.profissionalSaude.getCurriculo().getCurriculoCursos().length; i++) {
                if (this.dataCurriculoCursos[i] !== undefined &&
                        this.dataCurriculoCursos[i] !== null)
                this.profissionalSaude.getCurriculo().getCurriculoCursos()[i].setData(
                        this.parseDatePickerToDate( this.dataCurriculoCursos[i] ));   
            }
        }
        
        if ( this.profissionalSaude.getProfissionalConselho() !== undefined && 
                this.profissionalSaude.getProfissionalConselho() !== null) {
            this.profissionalSaude.getProfissionalConselho().
                setVencimento(this.parseDatePickerToDate(
                        this.vencimentoProfissionalConselho));
        }
    }
    
    parseAndSetDates() {
        if (this.profissionalSaude.getDataAso() !== undefined &&
                this.profissionalSaude.getDataAso() !== null) {
            this.dataAso = this.parseDataToObjectDatePicker( this.profissionalSaude.getDataAso() );
        }
        
        if ( this.profissionalSaude.getCurriculo() !== undefined &&
                this.profissionalSaude.getCurriculo() !== null &&
                this.profissionalSaude.getCurriculo().getCurriculoCursos() !== undefined && 
                this.profissionalSaude.getCurriculo().getCurriculoCursos() !== null ) {
            
            for (let i=0; i < this.profissionalSaude.getCurriculo().getCurriculoCursos().length; i++) {
                this.dataCurriculoCursos[i] = 
                    this.parseDataToObjectDatePicker(
                            this.profissionalSaude.getCurriculo().getCurriculoCursos()[i].getData());   
            }
        }
        
        if ( this.profissionalSaude.getProfissionalConselho() !== undefined && 
                this.profissionalSaude.getProfissionalConselho() !== null) {
            this.vencimentoProfissionalConselho = 
                this.parseDataToObjectDatePicker(this.profissionalSaude.getProfissionalConselho().getVencimento());
        }
        
    }
}
