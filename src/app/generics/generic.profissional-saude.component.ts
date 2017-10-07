import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';

import { MyDatePickerModule } from 'mydatepicker'; 
import { IMyDpOptions } from 'mydatepicker'; 

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
import { Curriculo } from './../model/curriculo';
import { Endereco } from './../model/endereco';
import { Telefone } from './../model/telefone';
import { ProfissionalConselho } from './../model/profissional-conselho';

export class GenericProfissionalSaudeComponent {

    formulario: FormGroup;
    profissionaisSaude: Array<ProfissionalSaude>;
    profissionalSaude: ProfissionalSaude;
    localizacoes: Array<Localizacao>;
    equipes: Array<Equipe>;
    funcoes: Array<Funcao>;
    cursos: Array<Curso>;
    cidades: Array<Cidade>;
    localizacao: Localizacao;
    equipe:Equipe;
    funcao:Funcao;
    curriculo: Curriculo;
    endereco: Endereco;
    cidade: Cidade;
    profissionalConselho: ProfissionalConselho;

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

    myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'dd/mm/yyyy'
    };

    constructor( profissionalSaudeService: ProfissionalSaudeService) {
        this.profissionalSaudeService = profissionalSaudeService;
        
        this.profissionalSaude = new ProfissionalSaude();
        this.profissionalSaude.setId(0);
        this.profissionalSaude.setNome(null);
        this.profissionalSaude.setDataNascimento(null);
        this.profissionalSaude.setMatricula(null);
        this.profissionalSaude.setChave(null);
        this.profissionalSaude.setMi(null);
        this.profissionalSaude.setRamal(null);
        this.profissionalSaude.setVersion(0);
        
        this.localizacao = new Localizacao();
        this.localizacao.setId(0);
        this.profissionalSaude.setLocalizacao(this.localizacao);
        
        this.equipe = new Equipe();
        this.equipe.setId(0);
        this.profissionalSaude.setEquipe(this.equipe);
        
        this.funcao = new Funcao();
        this.funcao.setId(0);
        this.profissionalSaude.setFuncao(this.funcao);
        
        this.curriculo = new Curriculo();
        this.profissionalSaude.setCurriculo(this.curriculo);
        
        this.profissionalConselho = new ProfissionalConselho();
        this.profissionalSaude.setProfissionalConselho(this.profissionalConselho);
        
        this.endereco = new Endereco();
        
        this.cidade = new Cidade();
        this.cidade.setId(0);
        this.endereco.setId(0);
        this.endereco.setCidade(this.cidade);
        this.profissionalSaude.setEndereco(this.endereco);
        
//        let telefone:Telefone = new Telefone();
//        telefone.numero = "3344-5678";
//        
//        this.profissionalSaude.telefones = new Array<Telefone>();
//        this.profissionalSaude.telefones.push(telefone);
//        this.profissionalSaude.telefones.push(telefone);
//        this.profissionalSaude.telefones.push(telefone);
        
//        
//        this.formBuilder.group(this.profissionalSaude);
//        console.log(this.formulario.value);
        
//        this.formulario = this.formBuilder.group(this.profissionalSaude);
//        console.log(this.profissionalSaude);
        
//        this.formulario = this.formBuilder.group( {
//            id: [0],
//            version: [0],
//            nome: [null, Validators.required],
//            matricula: [null],
//            dataNascimento: [null],        
//            ramal: [null],
//            chave: [null],
//            localizacao: this.formBuilder.group({
//               id: ['']
//            }),
//            equipe: this.formBuilder.group({
//                id: [''] 
//            }),
//            funcao: this.formBuilder.group({
//                id: ['']
//            }),
//            telefones: this.formBuilder.array([
//                this.formBuilder.group({
//                    numero: [null],
//                    id: [0],
//                    version: [0]
//                }),                                          
//            ]),
//            vacinas: this.formBuilder.array([
//               this.formBuilder.group({
//                   descricao: [''],
//                   data: [null],
//                   lote: [''],
//                   laboratorio: [''],
//                   dose: [0],
//                   proximaDose: [null],
//                   id: [0],
//                   version: [0],
//                   profissional: this.formBuilder.group({
//                       id: [0]
//                   })
//               }),                                          
//           ]),
//            endereco: this.formBuilder.group({
//                logradouro: [null, Validators.required],
//                bairro: [null],
//                numero: [null],
//                complemento: [null],
//                cep: [null],
//                cidade: this.formBuilder.group({
//                    id: ['']
//                }),
//                id: [0],
//                version: [0]
//            }),
//            profissionalConselho: this.formBuilder.group({
//                conselho: [null],
//                uf: [null],
//                numero: [null],
//                vencimento: [null],
//                id: [0],
//                version: [0]
//            }),
//            curriculo: this.formBuilder.group({
//                historico: [''],
//                formacao: [''],
//                atuacao: [''],
//                curriculoCursos: this.formBuilder.array([
//                    this.formBuilder.group({
//                        curso: this.formBuilder.group({
//                            id: ['']
//                        }),
//                        curriculo: this.formBuilder.group({
//                            id: [0]
//                        }),
//                        data: [null]
//                    }),                                          
//                ]),
//                id: [0],
//                version: [0]
//            })
//        } );
//        
//        this.telefonesArray = this.formulario.get('telefones') as FormArray;
//        this.curriculoCursosArray = this.formulario.get('curriculo').get('curriculoCursos') as FormArray;
//        this.vacinasArray = this.formulario.get('vacinas') as FormArray;
//        this.curriculoCursosArray.removeAt(0);
//        this.telefonesArray.removeAt(0);
//        this.vacinasArray.removeAt(0);
       
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
        
//        console.log(this.formulario);
        
    }

    addCurriculoCurso() {
        let c: Curriculo = new Curriculo;

//      let curriculoCurso = new FormGroup({});
//      let curso = new FormGroup({});
//      let curriculo = new FormGroup({});
//      
//      curso.addControl("id", new FormControl(''));
//      curriculo.addControl("id", new FormControl(0));
//      curriculoCurso.addControl("curso", curso);
//      curriculoCurso.addControl("curriculo", curriculo);
//      curriculoCurso.addControl("data", new FormControl(null));
//      
//      this.curriculoCursosArray.push(curriculoCurso);
  }
    
    addTelefone() {
//        this.profissionalSaude.telefones.push(new Telefone());
//        let telefone = new FormGroup({});
//        telefone.addControl("numero", new FormControl(null));
//        telefone.addControl("id", new FormControl(0));
//        telefone.addControl("version", new FormControl(0));
//        
//        this.telefonesArray.push(telefone);
    }

    removeTelefone(i: number) {
//        this.telefonesArray.removeAt(i);
    }

    removeCurriculoCurso(i: number) {
//        this.curriculoCursosArray.removeAt(i);
    }
    
    addVacina(){
//        let vacina = new FormGroup({});
//        let profissional = new FormGroup({});
//        profissional.addControl("id", new FormControl(0));
//        
//        vacina.addControl("descricao", new FormControl(null));
//        vacina.addControl("data", new FormControl(null));
//        vacina.addControl("lote", new FormControl(''));
//        vacina.addControl("laboratorio", new FormControl(''));
//        vacina.addControl("dose", new FormControl(0));
//        vacina.addControl("proximaDose", new FormControl(null));
//        vacina.addControl("id", new FormControl(0));
//        vacina.addControl("version", new FormControl(0));
//        vacina.addControl("profissional", profissional);
//        
//        this.vacinasArray.push(vacina);
    }
    
    removeVacina(i: number) {
//        this.vacinasArray.removeAt(i);
    }
    
    isValid() {
        if ( this.formulario.valid ) {
            return true;
        } else { return false; }
    }

    save() {
        
//        if (this.formulario.value.localizacao !== undefined && 
//                this.formulario.value.localizacao !== null){
//            if (this.formulario.value.localizacao.id === '') {
//                this.formulario.value.localizacao = null;
//            }
//        }
//
//        if (this.formulario.value.funcao !== undefined && 
//                this.formulario.value.funcao !== null){
//            if (this.formulario.value.funcao.id === '') {
//                this.formulario.value.funcao = null;
//            }
//        }
//        
//        if (this.formulario.value.equipe !== undefined && 
//                this.formulario.value.equipe !== null){
//            if (this.formulario.value.equipe.id === '') {
//                this.formulario.value.equipe = null;
//            }
//        }
//        
//        if (this.formulario.value.endereco.cidade !== undefined && 
//                this.formulario.value.endereco.cidade !== null){
//            if (this.formulario.value.endereco.cidade.id === '') {
//                this.formulario.value.endereco.cidade = null;
//            }
//        }
//        
//        this.formulario.value.dataNascimento = 
//            this.verifyAndSetDate(this.formulario.value.dataNascimento);
//          
//        this.formulario.value.profissionalConselho.vencimento = 
//            this.verifyAndSetDate(this.formulario.value.profissionalConselho.vencimento);
//
//        for (let i=0; i < this.formulario.value.curriculo.curriculoCursos.length; i++ ) {
//            if ( this.formulario.value.curriculo.curriculoCursos[i].curso.id === null ||
//                    this.formulario.value.curriculo.curriculoCursos[i].curso.id === undefined || 
//                    this.formulario.value.curriculo.curriculoCursos[i].curso.id === "") {
//                this.formulario.value.curriculo.curriculoCursos[i].curso.id = 0;
//            }
//            
//            this.formulario.value.curriculo.curriculoCursos[i].data = 
//                this.verifyAndSetDate(this.formulario.value.curriculo.curriculoCursos[i].data);
//            
//        }
//
//        for (let i=0; i < this.formulario.value.vacinas.length; i++ ) {
//            this.formulario.value.vacinas[i].data = 
//                this.verifyAndSetDate(this.formulario.value.vacinas[i].data);
//
//            this.formulario.value.vacinas[i].proximaDose = 
//                this.verifyAndSetDate(this.formulario.value.vacinas[i].proximaDose);
//        }
//               
        
        if(this.profissionalSaude.getEndereco().getId() === 0 
                && this.profissionalSaude.getEndereco().getCidade().getId() === 0 )
            this.profissionalSaude.setEndereco(null);
        
        console.log(this.profissionalSaude);
        this.profissionalSaudeService.submit( this.profissionalSaude )
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
    
    verifyAndSetDate( data ): any {
        if ( data !== null && data !== undefined ) {
            if ( typeof(data) === 'string' ) {
                return data;
            } else {
                return this.setDate(data);
            }
        } else return null;
//          if (data === "") {
//              return null;
//          } else {
//              return this.setDate(data); 
//          }
//      } else { return null }
    }

    setDate(data) {
        if (data instanceof Date) {
            return data;
        } else {
            let d = new Date(Number.parseInt(data.date.year), 
                    Number.parseInt(data.date.month) - 1, 
                    Number.parseInt(data.date.day));
            return d;
        }
    }
    
    clearDate(): void {
        // Clear the date using the patchValue function
        this.formulario.patchValue({myDate: null});
    }
        
    parseStringToDate(data) {
        if (typeof(data) === 'string') {
            let s = data.split("/");
            let d: Date = new Date(Number.parseInt(s[2]), Number.parseInt(s[1]) - 1, Number.parseInt(s[0]));
    //        console.log(d);
            return d;
        } else return data;
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
    
    teste() {
        console.log(this.profissionalSaude);
    }
}