import { EventEmitter, SimpleChanges, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import * as $ from 'jquery';

import { Atendimento } from './../../model/atendimento';

@Component( {
    selector: 'app-menu-atendimento-nutricao',
    templateUrl: './menu-atendimento-nutricao.html',
    styleUrls: ['./menu-atendimento-nutricao.css']
} )
export class MenuAtendimentoNutricaoComponent{
    @Input() atendimento: Atendimento;
    
    constructor() {}
    
}