import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

import { ProfissionalSaude } from './../model/profissional-saude';
import { ProfissionalSaudeService } from './../controller/profissional-saude/profissional-saude.service';
import { ProfissionalSaudeFilter } from './../controller/profissional-saude/profissional-saude.filter';
import { LocalizacaoFilter } from './../controller/localizacao/localizacao.filter';
import { GerenciaFilter } from './../controller/gerencia/gerencia.filter';
import { EquipeFilter } from './../controller/equipe/equipe.filter';
import { Localizacao } from './../model/localizacao';
import { Equipe } from './../model/equipe';
import { Gerencia } from './../model/gerencia';

export class GenericProfissionalSaudeComponent {

    formulario: FormGroup;
    telefonesArray: FormArray;
    profissionaisSaude: Array<ProfissionalSaude>;
    profissionalSaude: ProfissionalSaude;
    localizacoes: Array<Localizacao>;
    equipes: Array<Equipe>;
    gerencias: Array<Gerencia>;

    colorMsg: string;
    msg: string;
    verifyMsg: boolean = false;
    profissionalSaudeService: ProfissionalSaudeService;
    profissionalSaudeFilter: ProfissionalSaudeFilter = new ProfissionalSaudeFilter();
    localizacaoFilter: LocalizacaoFilter = new LocalizacaoFilter();
    gerenciaFilter: GerenciaFilter = new GerenciaFilter();
    equipeFilter: EquipeFilter = new EquipeFilter();
    formBuilder: FormBuilder;

    constructor( profissionalSaudeService: ProfissionalSaudeService,
        formBuilder: FormBuilder ) {
        this.profissionalSaudeService = profissionalSaudeService;
        this.formBuilder = formBuilder;
        
        this.profissionalSaudeService.getLocalizacoes(this.localizacaoFilter)
            .then(res => {
                this.localizacoes = res.json();
                console.log(this.localizacoes);
            })
            .catch(error => {
                console.log(error);
            })
        
        this.profissionalSaudeService.getGerencias(this.gerenciaFilter)
        .then(res => {
            this.gerencias = res.json();
            console.log(this.gerencias);
        })
        .catch(error => {
            console.log(error);
        })
        
        this.profissionalSaudeService.getEquipe(this.equipeFilter)
        .then(res => {
            this.equipes = res.json();
            console.log(this.equipes);
        })
        .catch(error => {
            console.log(error);
        })
        
        this.profissionalSaudeService.getLocalizacoes(this.localizacaoFilter)
        .then(res => {
            this.localizacoes = res.json();
            console.log(this.localizacoes);
        })
        .catch(error => {
            console.log(error);
        })
        
//        this.profissionalSaudeService.getFuncoes(this.funcaoFilter)
//        .then(res => {
//            this.funcoes = res.json();
//            console.log(this.funcoes);
//        })
//        .catch(error => {
//            console.log(error);
//        })
        
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
    
    isValid() {
        if ( this.formulario.valid ) {
            return true;
        } else { return false; }
    }

    save() {
        let stringDate = this.formulario.value.dataNascimento.split("/");
        let dateFormated = new Date(stringDate[2], stringDate[1] - 1, stringDate[0]);
        this.formulario.value.dataNascimento = dateFormated;

        if (this.formulario.value.localizacao === '') {
            this.formulario.value.localizacao = null;
        }

        if (this.formulario.value.gerencia === '') {
            this.formulario.value.gerencia = null;
        }

        if (this.formulario.value.equipe === '') {
            this.formulario.value.equipe = null;
        }
        
        if (this.formulario.value.funcao === '') {
            this.formulario.value.funcao = null;
        }
        
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

}