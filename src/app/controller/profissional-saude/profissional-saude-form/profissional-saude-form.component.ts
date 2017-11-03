import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MyDatePickerModule } from 'mydatepicker'; 

import { GlobalVariable } from './../../../global';
import { Profissional } from './../../../model/profissional';
import { ProfissionalSaudeService } from './../profissional-saude.service';
import { ProfissionalSaudeFilter } from './../profissional-saude.filter';
import { Localizacao } from './../../../model/localizacao';
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
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { ProfissionalSaudeBuilder } from './../profissional-saude.builder';

@Component( {
    selector: 'app-profissional-saude-form',
    templateUrl: './profissional-saude-form.html',
    styleUrls: ['./profissional-saude-form.css']
} )
export class ProfissionalSaudeFormComponent extends GenericFormComponent implements OnInit {
    
    @ViewChild('assinatura') inputEl: ElementRef;
    
    profissionalSaude: Profissional;
    localizacoes: Array<Localizacao>;
    equipes: Array<Equipe>;
    cargos: Array<Cargo>;
    cursos: Array<Curso>;
    cidades: Array<Cidade>;
    vacinas: Array<Vacina>;

    //ngModel
    dataNascimento: any;
    dataCurriculoCursos: Array<any> = new Array<any>();
    dataVacinas: Array<any> = new Array<any>();
    proximaDoseVacinas: Array<any> = new Array<any>();
    vencimentoProfissionalConselho: any;
    assinaturaSrc: any;
    
    profissionalSaudeFilter: ProfissionalSaudeFilter = new ProfissionalSaudeFilter();
    
    constructor( private route: ActivatedRoute,
        private profissionalSaudeService: ProfissionalSaudeService) { 
        super(profissionalSaudeService);
        this.goTo = "profissional-saude";
        
        this.profissionalSaude = new ProfissionalSaudeBuilder().initialize(this.profissionalSaude);        
    }

    ngOnInit() {
        
        let component = this;
        document.getElementById('assinatura').onchange = function() {
            component.loadAssinatura();
        };
        
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
                            
                            if(this.profissionalSaude.getAssinaturaBase64() !== undefined)
                                this.assinaturaSrc = "data:image/png;base64," + this.profissionalSaude.getAssinaturaBase64();
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
      
      this.profissionalSaudeService.getCargos()
          .then(res => {
              this.cargos = res.json();
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
      
      this.profissionalSaudeService.getCidades()
          .then(res => {
              this.cidades = res.json();
          })
          .catch(error => {
              console.log(error);
          })
      
      this.profissionalSaudeService.getVacinas()
          .then(res => {
              this.vacinas = res.json();
          })
          .catch(error => {
              console.log(error);
          })
            
    }
    
    loadAssinatura(){
        let inputEl: HTMLInputElement = this.inputEl.nativeElement;
        
        if(inputEl.files.length > 0){
            let reader = new FileReader();
            let component = this;
            
            reader.onload = function () {
                component.assinaturaSrc = reader.result.toString().replace('data:;base64','data:image/png;base64');
            };
            
            reader.readAsDataURL(new Blob([inputEl.files[0]]));
        }
    }
    
    save() {
        this.verifyAndSetDates();
        
        let inputEl: HTMLInputElement = this.inputEl.nativeElement;          
                
        if(inputEl.files.length > 0){
            let reader = new FileReader();
            let array : Uint8Array;
            let component = this;
            
            reader.onload = function () {
                let arrayBuffer:ArrayBuffer = reader.result;
                array = new Uint8Array( arrayBuffer );
                let profissional:Profissional = new ProfissionalSaudeBuilder().clone(component.profissionalSaude); 
                profissional.setAssinatura(array);
                component.salvar(profissional);
            };
            
            reader.readAsArrayBuffer(new Blob([inputEl.files[0]]));
        }else{
            super.save(new ProfissionalSaudeBuilder().clone(this.profissionalSaude));
        }
    }
    
    salvar(profissional){
        super.save(profissional);
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
    
    addVacina() {
        if ( this.profissionalSaude.getProfissionalVacinas() === undefined ) {
            this.profissionalSaude.setProfissionalVacinas(new Array<ProfissionalVacina>());
        }
        let pV = new ProfissionalVacina();
        pV.setProfissional(new Profissional());
        this.profissionalSaude.getProfissionalVacinas().push(pV);
    }
    
    removeVacina(i: number) {
        this.profissionalSaude.getProfissionalVacinas().splice(i, 1);
    }
    
    addTelefone() {
        if ( this.profissionalSaude.getTelefones() === undefined ) {
            this.profissionalSaude.setTelefones(new Array<Telefone>());   
        }
        this.profissionalSaude.getTelefones().push(new Telefone());
    }

    removeTelefone(i: number) {
        this.profissionalSaude.getTelefones().splice(i, 1);
    }

    onDestroy() {
        this.inscricao.unsubscribe();
    }
    
    verifyAndSetDates() {
        if (this.dataNascimento !== null && 
                this.dataNascimento !== undefined)
            this.profissionalSaude.setDataNascimento(
                    this.parseDatePickerToDate(this.dataNascimento));
            
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
        
        if ( this.profissionalSaude.getProfissionalVacinas() !== undefined &&
                this.profissionalSaude.getProfissionalVacinas() !== null ) {
            for (let i=0; i < this.profissionalSaude.getProfissionalVacinas().length; i++) {
                this.profissionalSaude.getProfissionalVacinas()[i].setData(
                        this.parseDatePickerToDate( this.dataVacinas[i]) ); 
                this.profissionalSaude.getProfissionalVacinas()[i].setProximaDose(
                        this.parseDatePickerToDate( this.proximaDoseVacinas[i] ));
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
        if (this.profissionalSaude.getDataNascimento() !== null && 
                this.profissionalSaude.getDataNascimento() !== undefined) {
            this.dataNascimento = this.parseDataToObjectDatePicker(this.profissionalSaude.getDataNascimento());
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
        
        if ( this.profissionalSaude.getProfissionalVacinas() !== undefined &&
                this.profissionalSaude.getProfissionalVacinas() !== null ) {
            for (let i=0; i < this.profissionalSaude.getProfissionalVacinas().length; i++) {
                this.dataVacinas[i] = 
                    this.parseDataToObjectDatePicker(
                            this.profissionalSaude.getProfissionalVacinas()[i].getData()); 
                this.proximaDoseVacinas[i] = 
                    this.parseDataToObjectDatePicker(
                            this.profissionalSaude.getProfissionalVacinas()[i].getProximaDose());
            }
        }
        
        if ( this.profissionalSaude.getProfissionalConselho() !== undefined && 
                this.profissionalSaude.getProfissionalConselho() !== null) {
            this.vencimentoProfissionalConselho = 
                this.parseDataToObjectDatePicker(this.profissionalSaude.getProfissionalConselho().getVencimento());
        }
        
    }
}
