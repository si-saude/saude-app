import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';

import { ProfissionalSaude } from './../model/profissional-saude';
import { ProfissionalSaudeService } from './../controller/profissional-saude/profissional-saude.service';
import { ProfissionalSaudeFilter } from './../controller/profissional-saude/profissional-saude.filter';
import { LocalizacaoFilter } from './../controller/localizacao/localizacao.filter';
import { FuncaoFilter } from './../controller/funcao/funcao.filter';
import { EquipeFilter } from './../controller/equipe/equipe.filter';
import { CursoFilter } from './../controller/curso/curso.filter';
import { CidadeFilter } from './../controller/cidade/cidade.filter';
import { Localizacao } from './../model/localizacao';
import { Equipe } from './../model/equipe';
import { Funcao } from './../model/funcao';
import { Curso } from './../model/curso';
import { Cidade } from './../model/cidade';

export class GenericProfissionalSaudeComponent {

    formulario: FormGroup;
    telefonesArray: FormArray;
    curriculoCursosArray: FormArray;
    vacinasArray: FormArray;
    profissionaisSaude: Array<ProfissionalSaude>;
    profissionalSaude: ProfissionalSaude;
    localizacoes: Array<Localizacao>;
    equipes: Array<Equipe>;
    funcoes: Array<Funcao>;
    cursos: Array<Curso>;
    cidades: Array<Cidade>;
//    myDatePickerOptions: IMyDpOptions = {
//        dateFormat: 'dd/mm/yyyy'
//    };

    colorMsg: string;
    msg: string;
    verifyMsg: boolean = false;
    profissionalSaudeService: ProfissionalSaudeService;
    profissionalSaudeFilter: ProfissionalSaudeFilter = new ProfissionalSaudeFilter();
    localizacaoFilter: LocalizacaoFilter = new LocalizacaoFilter();
    equipeFilter: EquipeFilter = new EquipeFilter();
    funcaoFilter: FuncaoFilter = new FuncaoFilter();
    cursoFilter: CursoFilter = new CursoFilter();
    cidadeFilter: CidadeFilter = new CidadeFilter();
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
            vacinas: this.formBuilder.array([
               this.formBuilder.group({
                   descricao: [''],
                   data: [null],
                   lote: [''],
                   laboratorio: [''],
                   dose: [0],
                   proximaDose: [null],
                   id: [0],
                   version: [0],
                   profissional: this.formBuilder.group({
                       id: [0]
                   })
               }),                                          
           ]),
            endereco: this.formBuilder.group({
                logradouro: [null, Validators.required],
                bairro: [null],
                numero: [null],
                complemento: [null],
                cep: [null],
                cidade: this.formBuilder.group({
                    id: ['']
                }),
                id: [0],
                version: [0]
            }),
            profissionalConselho: this.formBuilder.group({
                conselho: [null, Validators.required],
                uf: [null],
                numero: [null, Validators.required],
                vencimento: [null],
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
                        curriculo: this.formBuilder.group({
                            id: [0]
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
        this.vacinasArray = this.formulario.get('vacinas') as FormArray;
        this.curriculoCursosArray.removeAt(0);
        this.telefonesArray.removeAt(0);
        this.vacinasArray.removeAt(0);
       
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
        
        this.profissionalSaudeService.getCidades(this.cidadeFilter)
            .then(res => {
                this.cidades = res.json();
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
        let curriculo = new FormGroup({});
        
        curso.addControl("id", new FormControl(''));
        curriculo.addControl("id", new FormControl(0));
        curriculoCurso.addControl("curso", curso);
        curriculoCurso.addControl("curriculo", curriculo);
        curriculoCurso.addControl("data", new FormControl(null));
        
        this.curriculoCursosArray.push(curriculoCurso);
    }

    removeCurriculoCurso(i: number) {
        this.curriculoCursosArray.removeAt(i);
    }
    
    addVacina(){
        let vacina = new FormGroup({});
        let profissional = new FormGroup({});
        profissional.addControl("id", new FormControl(0));
        
        vacina.addControl("descricao", new FormControl(null));
        vacina.addControl("data", new FormControl(null));
        vacina.addControl("lote", new FormControl(''));
        vacina.addControl("laboratorio", new FormControl(''));
        vacina.addControl("dose", new FormControl(0));
        vacina.addControl("proximaDose", new FormControl(null));
        vacina.addControl("id", new FormControl(0));
        vacina.addControl("version", new FormControl(0));
        vacina.addControl("profissional", profissional);
        
        this.vacinasArray.push(vacina);
    }
    
    removeVacina(i: number) {
        this.vacinasArray.removeAt(i);
    }
    
    isValid() {
        if ( this.formulario.valid ) {
            return true;
        } else { return false; }
    }

    save() {
        if ( this.formulario.value.dataNascimento !== null && 
                this.formulario.value.dataNascimento !== undefined ) {
            if (this.formulario.value.dataNascimento === "") {
                this.formulario.value.dataNascimento = null;
            } else {
            this.formulario.value.dataNascimento = 
                this.parseStringToDate(this.formulario.value.dataNascimento);
            }
        }
//          
        if ( this.formulario.value.profissionalConselho.vencimento !== null && 
                this.formulario.value.profissionalConselho.vencimento !== undefined ) {
            if (this.formulario.value.profissionalConselho.vencimento === "") {
                this.formulario.value.profissionalConselho.vencimento = null;
            } else {
            this.formulario.value.profissionalConselho.vencimento = 
                this.parseStringToDate(this.formulario.value.profissionalConselho.vencimento);
            }
        }
//
        for (let i=0; i < this.formulario.value.curriculo.curriculoCursos.length; i++ ) {
            if ( this.formulario.value.curriculo.curriculoCursos[i].curso.id === null ||
                    this.formulario.value.curriculo.curriculoCursos[i].curso.id === undefined || 
                    this.formulario.value.curriculo.curriculoCursos[i].curso.id === "") {
                this.formulario.value.curriculo.curriculoCursos[i].curso.id = 0;
            }
            if ( this.formulario.value.curriculo.curriculoCursos[i].data !== null &&
                    this.formulario.value.curriculo.curriculoCursos[i].data !== undefined ) {
                if (this.formulario.value.curriculo.curriculoCursos[i].data === "") {
                    this.formulario.value.curriculo.curriculoCursos[i].data = null;
                } else {
                this.formulario.value.curriculo.curriculoCursos[i].data = 
                    this.parseStringToDate(this.formulario.value.curriculo.curriculoCursos[i].data);
                }
            }
        }
//            
        for (let i=0; i < this.formulario.value.vacinas.length; i++ ) {
            if ( this.formulario.value.vacinas[i].data !== null && 
                    this.formulario.value.vacinas[i].data !== undefined ) {
                if (this.formulario.value.vacinas[i].data === "") {
                    this.formulario.value.vacinas[i].data = null;
                } else {
                this.formulario.value.vacinas[i].data = 
                    this.parseStringToDate(this.formulario.value.vacinas[i].data);
                }
            }
            if ( this.formulario.value.vacinas[i].proximaDose !== null &&
                    this.formulario.value.vacinas[i].proximaDose !== undefined ) {
                if (this.formulario.value.vacinas[i].proximaDose === "") {
                    this.formulario.value.vacinas[i].proximaDose = null;
                } else {
                this.formulario.value.vacinas[i].proximaDose = 
                    this.parseStringToDate(this.formulario.value.vacinas[i].proximaDose);
                }
            }
        }
        
        if (this.formulario.value.localizacao.id === '') {
            this.formulario.value.localizacao = null;
        }

        if (this.formulario.value.funcao.id === '') {
            this.formulario.value.funcao = null;
        }

        if (this.formulario.value.equipe.id === '') {
            this.formulario.value.equipe = null;
        }
        
        if (this.formulario.value.endereco.cidade.id === '') {
            this.formulario.value.endereco.cidade = null;
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
    
    
    parseStringToDate(data) {
        let s = data.split("/");
        let d: Date = new Date(Number.parseInt(s[2]), Number.parseInt(s[1]), Number.parseInt(s[0]));
        return d;
    }
}