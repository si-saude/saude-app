import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';

import { Subscription } from 'rxjs/Rx';

import { GlobalVariable } from './../../../global';
import { Vacina } from './../../../model/vacina';
import { CurriculoCurso } from './../../../model/curriculo-curso';
import { Telefone } from './../../../model/telefone';
import { ProfissionalSaudeService } from './../profissional-saude.service';
import { GenericProfissionalSaudeComponent } from './../../../generics/generic.profissional-saude.component';

@Component( {
    selector: 'app-profissional-saude-editar',
    templateUrl: './../profissional-saude-form/profissional-saude-form.html',
    styleUrls: ['./../profissional-saude-form/profissional-saude-form.css']
} )
export class ProfissionalSaudeEditarComponent extends GenericProfissionalSaudeComponent implements OnInit {

    private titulo: string = "Editar Profissional de Saude";
    private corTitulo: string = GlobalVariable.COLOR_TITLE;
    private inscricao: Subscription;

    constructor( private route: ActivatedRoute,
        profissionalSaudeService: ProfissionalSaudeService ) { 
        super(profissionalSaudeService );
    }

    ngOnInit() {
        
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                let id = params['id'];

                this.profissionalSaudeService.get( id )
                    .then( res => {
                        this.profissionalSaude = res.json();
                        console.log(this.profissionalSaude);
//                        this.buildForm( res.json() );
                    } )
                    .catch( error => {
                        console.log( error );
                    } )
            } );
    }
    
    buildForm( json ) {
        
//        this.profissionalSaude.setEquipe(json.equipe.id);
        
//        this.formulario.patchValue(json);

//        let d = this.setDatePicker( this.formulario, "dataNascimento", json.dataNascimento );
//        if ( d !== null ) {
//            this.formulario.patchValue({dataNascimento: {
//                date: {
//                    year: d.data.year,
//                    month: d.data.month,
//                    day: d.data.day}
//                }
//            });
//        }
////               
//        if (json.vacinas !== null && json.vacinas !== undefined) {
//            for (let i=0; i < json.vacinas.length; i++){
//                this.includeVacinas(json.vacinas[i]);
//            }
//            this.formulario.value.vacinas = json.vacinas;
//        }
//////        
//        if (json.curriculo.curriculoCursos !== null && json.curriculo.curriculoCursos !== undefined) {
//            for (let i=0; i < json.curriculo.curriculoCursos.length; i++) {
//                this.includeCurriculoCursos(json.curriculo.curriculoCursos[i]);
//            }
//            this.formulario.value.curriculo.curriculoCursos = json.curriculo.curriculoCursos;
//        }
//////        
//        if (json.telefones !== null && json.telefones !== undefined) {
//            for (let i=0; i < json.telefones.length; i++) {
//                this.includeTelefones(json.telefones[i]);
//            }
//            this.formulario.value.telefones = json.telefones;
//        }
//        
////        if (json.dataNascimento !== null && json.dataNascimento !== undefined) {
////            console.log(json.dataNascimento);
////            let d: string = this.parseFormatDatePicker(json.dataNascimento);
////            console.log(d);
////            this.formulario.patchValue({dataNascimento: d});
////        }
//        
//        
//        let v = this.setDatePicker( this.formulario.get("profissionalConselho"), 
//                "vencimento", json.profissionalConselho.vencimento );
//        
//        this.formulario.get("profissionalConselho").patchValue({"vencimento": {
//            date: {
//                year: v.data.year,
//                month: v.data.month,
//                day: v.data.day
//            }
//        }}) 
        
        
    }
    
    includeVacinas(vacina: Vacina) {
//        let vacinaForm = new FormGroup({});
//        let profissional = new FormGroup({});
//        
//        profissional.addControl("id", new FormControl(0));
//        vacinaForm.addControl("profissional", profissional);
//        
//        vacinaForm.addControl("id", new FormControl(vacina.id));
//        vacinaForm.addControl("descricao", new FormControl(vacina.descricao));
//        vacinaForm.addControl("data", new FormControl(null));
//        
//        let d = this.setDatePicker( vacinaForm, "data", vacina.data );
//        vacinaForm.patchValue({"data": {
//            date: {
//                year: d.data.year,
//                month: d.data.month,
//                day: d.data.day}
//            }
//        });
//        
//        vacinaForm.addControl("lote", new FormControl(vacina.lote));
//        vacinaForm.addControl("laboratorio", new FormControl(vacina.laboratorio));
//        vacinaForm.addControl("dose", new FormControl(vacina.dose));
//        vacinaForm.addControl("proximaDose", new FormControl(null));
//        
//        let pd = this.setDatePicker( vacinaForm, "data", vacina.proximaDose );
//        vacinaForm.patchValue({"proximaDose": {
//            date: {
//                year: pd.data.year,
//                month: pd.data.month,
//                day: pd.data.day}
//            }
//        });
//        
//        this.vacinasArray.push(vacinaForm);
    }
//    
    includeCurriculoCursos(curriculoCurso: CurriculoCurso) {
//        let curriculoCursoForm = new FormGroup({});
//        let curso = new FormGroup({});
//        let curriculo = new FormGroup({});
//        let c: any = curriculoCurso.curso;
//        
//        curso.addControl("id", new FormControl(c.id));
//        curriculo.addControl("id", new FormControl(0));
//        curriculoCursoForm.addControl("data", new FormControl(null));
//        curriculoCursoForm.addControl("curso", curso);
//        curriculoCursoForm.addControl("curriculo", curriculo);
//        
//        let d = this.setDatePicker( curriculoCursoForm, "data", curriculoCurso.data );
//        curriculoCursoForm.patchValue({ "data": {
//            date: {
//                year: d.data.year,
//                month: d.data.month,
//                day: d.data.day}
//            }
//        });
//        
////        if (curriculoCurso.data !== null && curriculoCurso.data !== undefined) {
////            let d: string = this.parseFormatDatePicker(curriculoCurso.data);
////        
////            curriculoCursoForm.patchValue({data: d});
////        }
//        this.curriculoCursosArray.push(curriculoCursoForm);
    }
//    
    includeTelefones(telefone: Telefone) {
//        let telefoneForm = new FormGroup({});
//        telefoneForm.addControl("numero", new FormControl(telefone.numero));
//        telefoneForm.addControl("id", new FormControl(telefone.id));
//        telefoneForm.addControl("version", new FormControl(telefone.version));
//        
//        this.telefonesArray.push(telefoneForm);
    }

    addTelefone() {
        super.addTelefone();
    }

    removeTelefone( index: number ) {
        super.removeTelefone( index );
    }

    addCurriculoCurso() {
        super.addCurriculoCurso();
    }

    removeCurriculoCurso( i: number ) {
        super.removeCurriculoCurso( i );
    }

    addVacina() {
        super.addVacina();
    }

    removeVacina( i: number ) {
        super.removeVacina( i );
    }

    isValid() {
        return super.isValid();
    }

    save() {
        super.save();
    }

    isPossibleDeactivate() {
        if ( this.formulario.dirty ) {
            return false;
        } else return true;
    }

    changedExtraHandler( evento: string ) {
        super.changedExtraHandler( evento );
    }
    
    onDestroy() {
        this.inscricao.unsubscribe();
    }
    
    setDatePicker( form, pathForm: String, data ) {
        
        if ( data === null || data === undefined ) {
            return null;
        } else {
            let d = this.parseDataToObjectDatePicker(data); 
            return d;
        }
        
    }
    
    parseDataToObjectDatePicker(data) {
        let s = data.split("T");
        let datas = s[0].split("-");
        if ( datas[2].substring(0,1) === "0" ) {
            datas[2] = datas[2].replace("0", "");
        }
        let o = Object.create({data: { year: datas[0], month: datas[1], day: datas[2] }});
        return o;   
    }
    
    parseFormatDatePicker(dateString) {
        let s = dateString.split("T");
        let datas = s[0].split("-");
        
        return datas[2]+"/"+datas[1]+"/"+datas[0];
    }
    
    parseStringToDate(data) {
        let s = data.split("/");
        let d: Date = new Date(Number.parseInt(s[2]), Number.parseInt(s[1]), Number.parseInt(s[0]));
        return d;
    }
     
}
