import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';

import {IMyDpOptions} from 'mydatepicker';

import { ProfissionalSaude } from './../model/profissional-saude';
import { ProfissionalSaudeService } from './../controller/profissional-saude/profissional-saude.service';
import { ProfissionalSaudeFilter } from './../controller/profissional-saude/profissional-saude.filter';
import { LocalizacaoFilter } from './../controller/localizacao/localizacao.filter';
import { FuncaoFilter } from './../controller/funcao/funcao.filter';
import { EquipeFilter } from './../controller/equipe/equipe.filter';
import { CursoFilter } from './../controller/curso/curso.filter';
import { Localizacao } from './../model/localizacao';
import { Equipe } from './../model/equipe';
import { Funcao } from './../model/funcao';
import { Curso } from './../model/curso';

export class GenericProfissionalSaudeComponent {

    formulario: FormGroup;
    telefonesArray: FormArray;
    curriculoCursosArray: FormArray;
    profissionaisSaude: Array<ProfissionalSaude>;
    profissionalSaude: ProfissionalSaude;
    localizacoes: Array<Localizacao>;
    equipes: Array<Equipe>;
    funcoes: Array<Funcao>;
    cursos: Array<Curso>;
    myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'dd.mm.yyyy'
    };

    colorMsg: string;
    msg: string;
    verifyMsg: boolean = false;
    profissionalSaudeService: ProfissionalSaudeService;
    profissionalSaudeFilter: ProfissionalSaudeFilter = new ProfissionalSaudeFilter();
    localizacaoFilter: LocalizacaoFilter = new LocalizacaoFilter();
    equipeFilter: EquipeFilter = new EquipeFilter();
    funcaoFilter: FuncaoFilter = new FuncaoFilter();
    cursoFilter: CursoFilter = new CursoFilter();
    formBuilder: FormBuilder;

    constructor( profissionalSaudeService: ProfissionalSaudeService,
        formBuilder: FormBuilder ) {
        this.profissionalSaudeService = profissionalSaudeService;
        this.formBuilder = formBuilder;
        
        this.formulario = this.formBuilder.group( {
            id: [0],
            version: [0],
            nome: [null, Validators.required],
            matricula: [null],
            dataNascimento: [null],        
            ramal: [null],
            chave: [null],
            localizacao: this.formBuilder.group({
               id: ['']
            }),
            equipe: this.formBuilder.group({
                id: [''] 
            }),
            funcao: this.formBuilder.group({
                id: ['']
            }),
            telefones: this.formBuilder.array([
                this.formBuilder.group({
                    numero: [null],
                    id: [0],
                    version: [0]
                }),                                          
            ]),
            endereco: this.formBuilder.group({
                logradouro: [null],
                bairro: [null],
                numero: [null],
                complemento: [null],
                cep: [null],
                cidade: [null],
                id: [0],
                version: [0]
            }),
            curriculo: this.formBuilder.group({
                historico: [''],
                formacao: [''],
                atuacao: [''],
                curriculoCursos: this.formBuilder.array([
                    this.formBuilder.group({
                        curso: this.formBuilder.group({
                            id: ['']
                        }),
                        data: [null]
                    }),                                          
                ]),
                id: [0],
                version: [0]
            })
        } );
        
        this.telefonesArray = this.formulario.get('telefones') as FormArray;
        this.curriculoCursosArray = this.formulario.get('curriculo').get('curriculoCursos') as FormArray;
        
        this.profissionalSaudeService.getLocalizacoes(this.localizacaoFilter)
            .then(res => {
                this.localizacoes = res.json();
            })
            .catch(error => {
                console.log(error);
            })
        
        this.profissionalSaudeService.getEquipe(this.equipeFilter)
            .then(res => {
                this.equipes = res.json();
            })
            .catch(error => {
                console.log(error);
            })
        
        this.profissionalSaudeService.getFuncoes(this.funcaoFilter)
            .then(res => {
                this.funcoes = res.json();
            })
            .catch(error => {
                console.log(error);
            })
        
        this.profissionalSaudeService.getCursos(this.cursoFilter)
            .then(res => {
                this.cursos = res.json();
            })
            .catch(error => {
                console.log(error);
            }) 
        
    }

    addTelefone() {
        let telefone = new FormGroup({});
        telefone.addControl("numero", new FormControl(null));
        telefone.addControl("id", new FormControl(0));
        telefone.addControl("version", new FormControl(0));
        
        this.telefonesArray.push(telefone);
    }

    removeTelefone(i: number) {
        this.telefonesArray.removeAt(i);
    }
    
    addCurriculoCurso() {
        let curriculoCurso = new FormGroup({});
        let curso = new FormGroup({});
        curriculoCurso.addControl("curso", new FormControl(null));
        curriculoCurso.addControl(curso.addControl("id", new FormControl(null)), new FormControl(null));
        curriculoCurso.addControl("data", new FormControl(null));
        
        this.curriculoCursosArray.push(curriculoCurso);
    }

    removeCurriculoCurso(i: number) {
        this.curriculoCursosArray.removeAt(i);
    }
    
    isValid() {
        if ( this.formulario.valid ) {
            return true;
        } else { return false; }
    }

    save() {
        if ( this.formulario.value.dataNascimento !== null && 
                this.formulario.value.dataNascimento !== undefined ) {
            this.formulario.value.dataNascimento = this.formulario.value.dataNascimento.jsdate;
//            let stringDate = this.formulario.value.dataNascimento.split("/");
//            let dateFormated = new Date(stringDate[2], stringDate[1] - 1, stringDate[0]);
//            this.formulario.value.dataNascimento = dateFormated;
        }
        
        if ( this.formulario.value.curriculo.curriculoCursos !== null && 
                this.formulario.value.curriculo.curriculoCursos !== undefined ) {
            this.formulario.value.curriculo.curriculoCursos.data = this.formulario.value.curriculo.curriculoCursos.data.jsdate;
        }

        if (this.formulario.value.localizacao.id === '') {
            this.formulario.value.localizacao.id = 0;
        }

        if (this.formulario.value.funcao.id === '') {
            this.formulario.value.funcao.id = 0;
        }

        if (this.formulario.value.equipe.id === '') {
            this.formulario.value.equipe.id = 0;
        }
        console.log(this.formulario.value);
        this.profissionalSaudeService.submit( this.formulario.value )
            .then( res => {
                this.verifyMsg = true;
                this.colorMsg = "green";
                this.msg = res.text();
            } )
            .catch( error => {
                this.verifyMsg = true;
                this.colorMsg = "red";
                this.msg = error.text();
            } )
    }
    
    changedExtraHandler( evento: string ) {
        
    }


    setDate(): void {
        // Set today date using the patchValue function
        let date = new Date();
        this.formulario.patchValue({dataNascimento: {
            date: {
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                day: date.getDate()}
            }
        });
    }

    clearDate(): void {
        // Clear the date using the patchValue function
        this.formulario.patchValue({myDate: null});
    }
    
}