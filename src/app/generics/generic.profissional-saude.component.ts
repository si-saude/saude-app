import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';

import { MyDatePickerModule } from 'mydatepicker'; 
import { IMyDpOptions } from 'mydatepicker'; 

import { Profissional } from './../model/profissional';
import { ProfissionalSaudeService } from './../controller/profissional-saude/profissional-saude.service';
import { ProfissionalSaudeFilter } from './../controller/profissional-saude/profissional-saude.filter';
import { LocalizacaoFilter } from './../controller/localizacao/localizacao.filter';
import { CargoFilter } from './../controller/cargo/cargo.filter';
import { EquipeFilter } from './../controller/equipe/equipe.filter';
import { CursoFilter } from './../controller/curso/curso.filter';
import { CidadeFilter } from './../controller/cidade/cidade.filter';
import { Localizacao } from './../model/localizacao';
import { Equipe } from './../model/equipe';
import { Cargo } from './../model/cargo';
import { Curso } from './../model/curso';
import { CurriculoCurso } from './../model/curriculo-curso';
import { Cidade } from './../model/cidade';
import { Curriculo } from './../model/curriculo';
import { Endereco } from './../model/endereco';
import { Telefone } from './../model/telefone';
import { ProfissionalConselho } from './../model/profissional-conselho';
import { ProfissionalVacina } from './../model/profissional-vacina';

export class GenericProfissionalSaudeComponent {
    formulario: FormGroup;
    profissionalSaude: Profissional;
    localizacoes: Array<Localizacao>;
    equipes: Array<Equipe>;
    funcoes: Array<Cargo>;
    cursos: Array<Curso>;
    cidades: Array<Cidade>;

    //ngModel
    dataNascimento;

    colorMsg: string;
    msg: string;
    verifyMsg: boolean = false;
    profissionalSaudeService: ProfissionalSaudeService;
    profissionalSaudeFilter: ProfissionalSaudeFilter = new ProfissionalSaudeFilter();
    localizacaoFilter: LocalizacaoFilter = new LocalizacaoFilter();
    equipeFilter: EquipeFilter = new EquipeFilter();
    cargoFilter: CargoFilter = new CargoFilter();
    cursoFilter: CursoFilter = new CursoFilter();
    cidadeFilter: CidadeFilter = new CidadeFilter();

    myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'dd/mm/yyyy'
    };

    constructor( profissionalSaudeService: ProfissionalSaudeService) {

        this.profissionalSaudeService = profissionalSaudeService;
        this.profissionalSaude = new Profissional();
        this.profissionalSaude.setLocalizacao(new Localizacao());
        this.profissionalSaude.setEquipe(new Equipe());
        this.profissionalSaude.setCargo(new Cargo());
        this.profissionalSaude.setCurriculo(new Curriculo());
        this.profissionalSaude.setProfissionalConselho(new ProfissionalConselho());
        this.profissionalSaude.setEndereco(new Endereco());
        this.profissionalSaude.getEndereco().setCidade(new Cidade());
        
//        this.profissionalSaude.setId(0);
//        this.profissionalSaude.setVersion(0);
//        
//        let localizacao: Localizacao = new Localizacao();
//        localizacao.setId(0);
//        this.profissionalSaude.setLocalizacao(localizacao);
//        
//        let equipe: Equipe = new Equipe();
//        equipe.setId(0);
//        this.profissionalSaude.setEquipe(equipe);
//        
//        let cargo: Cargo = new Cargo();
//        cargo.setId(0);
//        this.profissionalSaude.setCargo(cargo);
//        
//        let curriculo: Curriculo = new Curriculo();
//        this.profissionalSaude.setCurriculo(curriculo);
//        
//        let telefones: Array<Telefone> = new Array<Telefone>();
//        this.profissionalSaude.setTelefones(telefones);
//        
//        let profissionalVacinas: Array<ProfissionalVacina> = new Array<ProfissionalVacina>();
//        this.profissionalSaude.setProfissionalVacinas(profissionalVacinas);
//        
//        let profissionalConselho: ProfissionalConselho = new ProfissionalConselho();
//        this.profissionalSaude.setProfissionalConselho(profissionalConselho);
//        
//        let endereco: Endereco = new Endereco();
//        let cidade: Cidade = new Cidade();
//        cidade.setId(0);
//        endereco.setId(0);
//        endereco.setCidade(cidade);
//        this.profissionalSaude.setEndereco(endereco);
          
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
//            cargo: this.formBuilder.group({
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
       
//        this.profissionalSaudeService.getLocalizacoes(this.localizacaoFilter)
//            .then(res => {
//                this.localizacoes = res.json();
//            })
//            .catch(error => {
//                console.log(error);
//            })
//        
//        this.profissionalSaudeService.getEquipe(this.equipeFilter)
//            .then(res => {
//                this.equipes = res.json();
//            })
//            .catch(error => {
//                console.log(error);
//            })
//        
//        this.profissionalSaudeService.getFuncoes(this.cargoFilter)
//            .then(res => {
//                console.log(res.json());
//                this.funcoes = res.json();
//            })
//            .catch(error => {
//                console.log(error);
//            })
//        
//        this.profissionalSaudeService.getCursos(this.cursoFilter)
//            .then(res => {
//                this.cursos = res.json();
//            })
//            .catch(error => {
//                console.log(error);
//            }) 
//        
//        this.profissionalSaudeService.getCidades(this.cidadeFilter)
//            .then(res => {
//                this.cidades = res.json();
//            })
//            .catch(error => {
//                console.log(error);
//            })
        
    }

    addCurriculoCurso() {
        if ( this.profissionalSaude.getCurriculo().getCurriculoCursos() === undefined ) {
            this.profissionalSaude.getCurriculo().setCurriculoCursos(new Array<CurriculoCurso>());   
        }
        let cc: CurriculoCurso = new CurriculoCurso();
        cc.setCurriculo(new Curriculo());
        cc.setCurso(new Curso());
        cc.setId(0);
        this.profissionalSaude.getCurriculo().getCurriculoCursos().push(cc);
        
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
    

    removeCurriculoCurso(i: number) {
        this.profissionalSaude.getCurriculo().getCurriculoCursos().splice(i, 1);
    }
    
    addTelefone() {
        if ( this.profissionalSaude.getTelefones() === undefined ) {
            this.profissionalSaude.setTelefones(new Array<Telefone>());   
        }
        this.profissionalSaude.getTelefones().push(new Telefone());
//        let telefone = new FormGroup({});
//        telefone.addControl("numero", new FormControl(null));
//        telefone.addControl("id", new FormControl(0));
//        telefone.addControl("version", new FormControl(0));
//        
//        this.telefonesArray.push(telefone);
    }

    removeTelefone(i: number) {
        this.profissionalSaude.getTelefones().splice(i, 1);
    }

    addVacina() {
        if ( this.profissionalSaude.getProfissionalVacinas() === undefined ) {
            this.profissionalSaude.setProfissionalVacinas(new Array<ProfissionalVacina>());
        }
        this.profissionalSaude.getProfissionalVacinas().push(new ProfissionalVacina());
    }
    
    removeVacina(i: number) {
        this.profissionalSaude.getProfissionalVacinas().splice(i, 1);
    }
    
    isValid() {
        if ( this.formulario.valid ) {
            return true;
        } else { return false; }
    }

    save() {
        this.verifyAndSetDates();
        
//        if (this.formulario.value.localizacao !== undefined && 
//                this.formulario.value.localizacao !== null){
//            if (this.formulario.value.localizacao.id === '') {
//                this.formulario.value.localizacao = null;
//            }
//        }
//
//        if (this.formulario.value.cargo !== undefined && 
//                this.formulario.value.cargo !== null){
//            if (this.formulario.value.cargo.id === '') {
//                this.formulario.value.cargo = null;
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
        
//        if(this.profissionalSaude.getEndereco().getId() === 0 
//                && this.profissionalSaude.getEndereco().getCidade().getId() === 0 )
//            this.profissionalSaude.setEndereco(null);
        
//        this.profissionalSaude.getLocalizacao().setId(
//                Number.parseInt(this.profissionalSaude.getLocalizacao().getId().toString()));
//        this.profissionalSaude.getEquipe().setId(
//                Number.parseInt(this.profissionalSaude.getEquipe().getId().toString()));
//        this.profissionalSaude.getCargo().setId(
//                Number.parseInt(this.profissionalSaude.getCargo().getId().toString()));
//        this.profissionalSaude.getEndereco().getCidade().setId(
//                Number.parseInt(this.profissionalSaude.getEndereco().getCidade().getId().toString()));
//        this.profissionalSaude.getCurriculo().setCurriculoCursos(null);
//        console.log(this.profissionalSaude);
        
//        this.profissionalSaudeService.submit( this.profissionalSaude )
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

    }

    changedExtraHandler( evento: string ) {
        
    }
    
    verifyAndSetDates() {
//        this.profissionalSaude.setDataNascimento(this.parseDatePickerToDate(this.dataNascimento));
//        if ( this.profissionalSaude.getCurriculo().getCurriculoCursos() !== undefined && 
//                this.profissionalSaude.getCurriculo().getCurriculoCursos() !== null ) {
//            for (let i=0; i < this.profissionalSaude.getCurriculo().getCurriculoCursos().length; i++) {
//                this.profissionalSaude.
//                    getCurriculo().getCurriculoCursos()[i].
//                    setData(this.parseDatePickerToData(this.profissionalSaude.
//                        getCurriculo().getCurriculoCursos()[i].getDate())); 
//            }
//        }
//        if ( this.profissionalSaude.getProfissionalVacinas() !== undefined &&
//                this.profissionalSaude.getProfissionalVacinas() !== null ) {
//            for (let i=0; i < this.profissionalSaude.getProfissionalVacinas().length; i++) {
//                this.profissionalSaude.
//                    getProfissionalVacinas()[i].
//                    setData(this.parseDatePickerToDate(this.profissionalSaude.
//                        getProfissionalVacinas()[i].getData())); 
//                this.profissionalSaude.
//                getProfissionalVacinas()[i].
//                setProximaDose(this.parseDatePickerToDate(this.profissionalSaude.
//                    getProfissionalVacinas()[i].getProximaDose()));
//            }
//        }
//        if ( this.profissionalSaude.getProfissionalConselho() !== undefined && 
//                this.profissionalSaude.getProfissionalConselho() !== null) {
//            this.profissionalSaude.getProfissionalConselho().
//                setVencimento(this.parseDatePickerToDate(this.profissionalSaude.
//                        getProfissionalConselho().getVencimento()));
//        }
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
        
    parseDatePickerToDate(data) {
        if (data === undefined || data === null) {
            return null;
        } else if (data instanceof Date) {
            return data;
        }   
        let d: Date = new Date(data.date.year, data.date.month - 1, data.date.day);
        return d;
    }
}