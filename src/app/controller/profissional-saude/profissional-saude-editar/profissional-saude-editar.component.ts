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

    private titulo: string = "Editar";
    private corTitulo: string = GlobalVariable.COLOR_TITLE;
    private inscricao: Subscription;

    constructor( private route: ActivatedRoute,
        profissionalSaudeService: ProfissionalSaudeService,
        formBuilder: FormBuilder ) { 
        super(profissionalSaudeService, formBuilder);
    }

    ngOnInit() {
        
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                let id = params['id'];

                this.profissionalSaudeService.get( id )
                    .then( res => {
//                        console.log(res.json());
                        this.buildForm( res.json() );
                    } )
                    .catch( error => {
                        console.log( error );
                    } )
            } );
    }
    
    buildForm( json ) {
        
        this.formulario.patchValue(json);
        console.log(json);
        
        if (json.vacinas !== null && json.vacinas !== undefined) {
            for (let i=0; i < json.vacinas.length; i++){
                this.includeVacinas(json.vacinas[i]);
            }
            this.formulario.value.vacinas = json.vacinas;
        }
//        
//        if (json.curriculo.curriculoCursos !== null && json.curriculo.curriculoCursos !== undefined) {
//            for (let i=0; i < json.curriculo.curriculoCursos.length; i++) {
//                this.includeCurriculoCursos(json.curriculo.curriculoCursos[i]);
//            }
//            this.formulario.value.curriculo.curriculoCursos = json.curriculo.curriculoCursos;
//        }
//        
//        if (json.telefones !== null && json.telefones !== undefined) {
//            for (let i=0; i < json.telefones.length; i++) {
//                this.includeTelefones(json.telefones[i]);
//            }
//            this.formulario.value.telefones = json.telefones;
//        }
        
        if (json.dataNascimento !== null && json.dataNascimento !== undefined) {
            console.log(json.dataNascimento);
            let d: string = this.parseFormatDatePicker(json.dataNascimento);
        
            this.formulario.patchValue({dataNascimento: d});
        }
        
//        if (json.profissionalConselho.vencimento !== null && json.profissionalConselho.vencimento !== undefined) {
//            let d: Date = this.parseStringToDate(json.profissionalConselho.vencimento.toString());
//            
//            this.formulario.get("profissionalConselho").patchValue({vencimento: {
//                date: {
//                    year: d.getFullYear(),
//                    month: d.getMonth(),
//                    day: d.getDate()
//                }
//            }}) 
//        }
        
    }
    
    includeVacinas(vacina: Vacina) {
        let vacinaForm = new FormGroup({});
        let profissional = new FormGroup({});
        profissional.addControl("id", new FormControl(0));
        
        vacinaForm.addControl("id", new FormControl(vacina.id));
        vacinaForm.addControl("descricao", new FormControl(vacina.descricao));
        vacinaForm.addControl("data", new FormControl(null));
        
        if (vacina.data !== null && vacina.data !== undefined) {
            let d: string = this.parseFormatDatePicker(vacina.data);
//        
            vacinaForm.patchValue({data: d});
        }
        vacinaForm.addControl("lote", new FormControl(vacina.lote));
        vacinaForm.addControl("laboratorio", new FormControl(vacina.laboratorio));
        vacinaForm.addControl("dose", new FormControl(vacina.dose));
        vacinaForm.addControl("proximaDose", new FormControl(null));
        vacinaForm.addControl("profissional", profissional);
        if (vacina.proximaDose !== null && vacina.proximaDose !== undefined) {
            let d: string = this.parseFormatDatePicker(vacina.proximaDose);
        
            vacinaForm.patchValue({proximaDose : d});
        }
        this.vacinasArray.push(vacinaForm);
    }
//    
    includeCurriculoCursos(curriculoCurso: CurriculoCurso) {
        let curriculoCursoForm = new FormGroup({});
        let curso = new FormGroup({});
        let curriculo = new FormGroup({});
        let c: any = curriculoCurso.curso;
        
        curso.addControl("id", new FormControl(c.id));
        curriculo.addControl("id", new FormControl(0));
        curriculoCursoForm.addControl("curso", curso);
        curriculoCursoForm.addControl("curriculo", curriculo);        
        curriculoCursoForm.addControl("data", new FormControl(null));
        
        if (curriculoCurso.data !== null && curriculoCurso.data !== undefined) {
            let d: string = this.parseFormatDatePicker(curriculoCurso.data);
        
            curriculoCursoForm.patchValue({data: d});
        }
        this.curriculoCursosArray.push(curriculoCursoForm);
    }
//    
    includeTelefones(telefone: Telefone) {
        let telefoneForm = new FormGroup({});
        telefoneForm.addControl("numero", new FormControl(telefone.numero));
        telefoneForm.addControl("id", new FormControl(telefone.id));
        telefoneForm.addControl("version", new FormControl(telefone.version));
        
        this.telefonesArray.push(telefoneForm);
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
//        if ( this.formulario.value.dataNascimento !== null && 
//                this.formulario.value.dataNascimento !== undefined ) {
//            if (this.formulario.value.dataNascimento === "") {
//                this.formulario.value.dataNascimento = null;
//            } else {
//            this.formulario.value.dataNascimento = 
//                this.parseStringToDate(this.formulario.value.dataNascimento);
//            }
//        }
////          
//        if ( this.formulario.value.profissionalConselho.vencimento !== null && 
//                this.formulario.value.profissionalConselho.vencimento !== undefined ) {
//            if (this.formulario.value.profissionalConselho.vencimento === "") {
//                this.formulario.value.profissionalConselho.vencimento = null;
//            } else {
//            this.formulario.value.profissionalConselho.vencimento = 
//                this.parseStringToDate(this.formulario.value.profissionalConselho.vencimento);
//            }
//        }
////
//        for (let i=0; i < this.formulario.value.curriculo.curriculoCursos.length; i++ ) {
//            if ( this.formulario.value.curriculo.curriculoCursos[i].curso.id === null ||
//                    this.formulario.value.curriculo.curriculoCursos[i].curso.id === undefined || 
//                    this.formulario.value.curriculo.curriculoCursos[i].curso.id === "") {
//                this.formulario.value.curriculo.curriculoCursos[i].curso.id = 0;
//            }
//            if ( this.formulario.value.curriculo.curriculoCursos[i].data !== null &&
//                    this.formulario.value.curriculo.curriculoCursos[i].data !== undefined ) {
//                if (this.formulario.value.curriculo.curriculoCursos[i].data === "") {
//                    this.formulario.value.curriculo.curriculoCursos[i].data = null;
//                } else {
//                this.formulario.value.curriculo.curriculoCursos[i].data = 
//                    this.parseStringToDate(this.formulario.value.curriculo.curriculoCursos[i].data);
//                }
//            }
//        }
////            
//        for (let i=0; i < this.formulario.value.vacinas.length; i++ ) {
//            if ( this.formulario.value.vacinas[i].data !== null && 
//                    this.formulario.value.vacinas[i].data !== undefined ) {
//                if (this.formulario.value.vacinas[i].data === "") {
//                    this.formulario.value.vacinas[i].data = null;
//                } else {
//                this.formulario.value.vacinas[i].data = 
//                    this.parseStringToDate(this.formulario.value.vacinas[i].data);
//                }
//            }
//            if ( this.formulario.value.vacinas[i].proximaDose !== null &&
//                    this.formulario.value.vacinas[i].proximaDose !== undefined ) {
//                if (this.formulario.value.vacinas[i].proximaDose === "") {
//                    this.formulario.value.vacinas[i].proximaDose = null;
//                } else {
//                this.formulario.value.vacinas[i].proximaDose = 
//                    this.parseStringToDate(this.formulario.value.vacinas[i].proximaDose);
//                }
//            }
//        }
//        
//        if (this.formulario.value.localizacao.id === '') {
//            this.formulario.value.localizacao = null;
//        }
//
//        if (this.formulario.value.funcao.id === '') {
//            this.formulario.value.funcao = null;
//        }
//
//        if (this.formulario.value.equipe.id === '') {
//            this.formulario.value.equipe = null;
//        }
//        
//        if (this.formulario.value.endereco.cidade.id === '') {
//            this.formulario.value.endereco.cidade = null;
//        }
//        
//        console.log(this.formulario.value);
//        
//        this.profissionalSaudeService.submit( this.formulario.value )
//            .then( res => {
//                this.verifyMsg = true;
//                this.colorMsg = "green";
//                this.msg = res.text();
//            } )
//            .catch( error => {
//                this.verifyMsg = true;
//                this.colorMsg = "red";
//                this.msg = error.text();
//            } )

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
