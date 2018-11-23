import { Component, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import * as $ from 'jquery';
import { MaterializeAction } from "angular2-materialize";

import { GlobalVariable } from './../../../global';
import { Cat } from './../../../model/cat'; 
import { CatBuilder } from './../cat.builder';
import { CatService } from './../cat.service';
import { Cargo } from './../../../model/cargo';
import { CargoBuilder } from './../../cargo/cargo.builder';
import { Funcao } from './../../../model/funcao';
import { ClassificacaoAfastamento } from './../../../model/classificacao-afastamento';
import { ClassificacaoAfastamentoBuilder } from './../../classificacao-afastamento/classificacao-afastamento.builder';
import { FuncaoBuilder } from './../../funcao/funcao.builder';
import { EmpregadoBuilder } from './../../empregado/empregado.builder';
import { GerenciaCodigoCompletoAutocomplete } from './../../gerencia/gerencia-codigo-completo.autocomplete';
import { EmpregadoNomeAutocomplete } from './../../empregado/empregado-nome.autocomplete';
import { EmpresaNomeAutocomplete } from './../../empresa/empresa-nome.autocomplete';
import { EmpresaFilter } from './../../empresa/empresa.filter';
import { ProfissionalCatNomeAutocomplete } from './../../profissional-saude/profissional-cat-nome.autocomplete';
import { DiagnosticoAtestadoAutocomplete } from './../../diagnostico/diagnostico-atestado.autocomplete';
import { AgenteCausadorDescricaoAutocomplete } from './../../agente-causador/agente-causador-descricao.autocomplete';
import { NaturezaLesaoDescricaoAutocomplete } from './../../natureza-lesao/natureza-lesao-descricao.autocomplete';
import { ParteCorpoAtingidaDescricaoAutocomplete } from './../../parte-corpo-atingida/parte-corpo-atingida-descricao.autocomplete';
import { InstalacaoNomeAutocomplete } from './../../instalacao/instalacao-nome.autocomplete';
import { CidadeNomeAutocomplete } from './../../cidade/cidade-nome.autocomplete';
import { CnaeCodigoAutocomplete } from './../../cnae/cnae-codigo.autocomplete';
import { CnaeFilter } from './../../cnae/cnae.filter';
import { CnaeBuilder } from './../../cnae/cnae.builder';
import { ClassificacaoGravidadeTituloAutocomplete } from './../../classificacao-gravidade/classificacao-gravidade-titulo.autocomplete';
import { DiagnosticoFilter } from './../../diagnostico/diagnostico.filter';
import { Usuario } from './../../../model/usuario';
import { UsuarioBuilder } from './../../usuario/usuario.builder';
import { Profissional } from './../../../model/profissional';
import { ProfissionalSaudeBuilder } from './../../profissional-saude/profissional-saude.builder';
import { ProfissionalSaudeFilter } from './../../profissional-saude/profissional-saude.filter';
import { ModalExameComponent } from './../../../includes/modal-exame/modal-exame.component';
import { ModalConfirmComponent } from './../../../includes/modal-confirm/modal-confirm.component';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { Exame } from './../../../model/exame';
import { ExameBuilder } from './../../exame/exame.builder';

@Component( {
    selector: 'app-cat-form',
    templateUrl: './cat-form.html',
    styleUrls: ['./cat-form.css', './../../../../assets/css/form-component.css']
} )
export class CatFormComponent extends GenericFormComponent implements OnInit {
    @ViewChild( ModalExameComponent ) modalExame: ModalExameComponent;
    @ViewChild( ModalConfirmComponent ) modalConfirm: ModalConfirmComponent;
    @ViewChild( 'arquivo' ) inputElArquivo: ElementRef;
    private cat: Cat;
    private cargos: Array<Cargo>;
    private escolaridades: Array<string>;
    private estadosCivis: Array<string>;
    private sexos: Array<string>;
    private tipoAcidentes: Array<string>;
    private tipoCats: Array<string>;
    private autoCompleteGerencia: GerenciaCodigoCompletoAutocomplete;
    private autoCompleteGerenciaEmpregado: GerenciaCodigoCompletoAutocomplete;
    private autoCompleteEmpregado: EmpregadoNomeAutocomplete;
    private autoCompleteEmpresa: EmpresaNomeAutocomplete;
    private autoCompleteProfissionalCaracterizacao: ProfissionalCatNomeAutocomplete;
    private autoCompleteProfissionalClassificacao: ProfissionalCatNomeAutocomplete;
    private autoCompleteCid: DiagnosticoAtestadoAutocomplete;
    private autoCompleteDiagnosticoProvavel: DiagnosticoAtestadoAutocomplete;
    private autoCompleteAgenteCausador: AgenteCausadorDescricaoAutocomplete;
    private autoCompleteNaturezaLesao: NaturezaLesaoDescricaoAutocomplete;
    private autoCompleteParteCorpoAtingida: ParteCorpoAtingidaDescricaoAutocomplete;
    private autoCompleteCidade: CidadeNomeAutocomplete;
    private autoCompleteInstalacao: InstalacaoNomeAutocomplete;
    private autoCompleteCnae: CnaeCodigoAutocomplete;
    private autoCompleteClassificacaoGravidade: ClassificacaoGravidadeTituloAutocomplete;
    private vinculos: Array<string>;
    private funcoes: Array<Funcao>;
    private classificacoes: Array<ClassificacaoAfastamento>;
    private nexoCausais: Array<string>;
    private profissional: Profissional;
    private cnaeFilter: CnaeFilter;
    private conformeNaoConforme: Array<string>;
    private aplicavelNaoAplicavel: Array<string>;
    
    constructor( private route: ActivatedRoute,
        private catService: CatService,
        router: Router) {
        super( catService, router );

        this.goTo = "cat";
        this.cat = new CatBuilder().initialize( this.cat );
        this.cargos = new CargoBuilder().initializeList( this.cargos );
        this.escolaridades = new Array<string>();
        this.estadosCivis = new Array<string>();
        this.vinculos = new Array<string>();
        this.conformeNaoConforme = new Array<string>();
        this.aplicavelNaoAplicavel = new Array<string>();
        this.sexos = new Array<string>();
        this.tipoAcidentes = new Array<string>();
        this.tipoCats = new Array<string>();
        this.cnaeFilter = new CnaeFilter();
        this.cnaeFilter.setPageNumber(0);
        this.cnaeFilter.setPageSize(0);
        this.autoCompleteGerencia = new GerenciaCodigoCompletoAutocomplete(this.catService.getGerenciaService());
        this.autoCompleteGerenciaEmpregado = new GerenciaCodigoCompletoAutocomplete(this.catService.getGerenciaService());
        this.autoCompleteEmpregado = new EmpregadoNomeAutocomplete(this.catService.getEmpregadoService());
        this.autoCompleteEmpresa = new EmpresaNomeAutocomplete(this.catService.getEmpresaService());
        this.autoCompleteProfissionalCaracterizacao = new ProfissionalCatNomeAutocomplete(this.catService.getProfissionalService());
        this.autoCompleteCid = new DiagnosticoAtestadoAutocomplete(this.catService.getDiagnosticoService(), new DiagnosticoFilter());
        this.autoCompleteDiagnosticoProvavel = new DiagnosticoAtestadoAutocomplete(this.catService.getDiagnosticoService(), new DiagnosticoFilter());
        this.autoCompleteProfissionalClassificacao = new ProfissionalCatNomeAutocomplete(this.catService.getProfissionalService());
        this.autoCompleteAgenteCausador  = new AgenteCausadorDescricaoAutocomplete(this.catService.getAgenteCausadorService());
        this.autoCompleteNaturezaLesao = new NaturezaLesaoDescricaoAutocomplete(this.catService.getNaturezaLesaoService());
        this.autoCompleteParteCorpoAtingida  = new ParteCorpoAtingidaDescricaoAutocomplete(this.catService.getParteCorpoAtingidaService());
        this.autoCompleteCidade = new CidadeNomeAutocomplete(this.catService.getCidadeService());
        this.autoCompleteInstalacao = new InstalacaoNomeAutocomplete(this.catService.getInstalacaoService());
        this.autoCompleteCnae = new CnaeCodigoAutocomplete(this.catService.getCnaeService(), this.cnaeFilter);
        this.autoCompleteClassificacaoGravidade = new ClassificacaoGravidadeTituloAutocomplete(this.catService.getClassificacaoGravidadeService());
        this.funcoes = new FuncaoBuilder().initializeList(this.funcoes);
        this.classificacoes = new ClassificacaoAfastamentoBuilder().initializeList(this.classificacoes);
        this.nexoCausais = new Array<string>();
        this.profissional = new ProfissionalSaudeBuilder().initialize(null);
    }

    ngOnInit() {
        if ( localStorage.getItem( 'usuario-id' ) != undefined ) {
            this.catService.getUsuarioService().get( Number( localStorage.getItem( 'usuario-id' ) ) )
                .then(res => {
                    let usuario = new UsuarioBuilder().clone(res.json());
                    if ( usuario.getId() > 0 && usuario.getPessoa().getId() > 0 ) {
                        let profissionalFilter: ProfissionalSaudeFilter = new ProfissionalSaudeFilter();
                        profissionalFilter.getEmpregado().getPessoa().setCpf(usuario.getPessoa().getCpf());
                        this.catService.getProfissionalService().list(profissionalFilter)
                            .then(res => {
                                this.profissional = new ProfissionalSaudeBuilder().clone(res.json().list[0]);
                            })
                            .catch(error => {
                                this.catchConfiguration(error);
                            })
                    }
                })
                .catch(error => {
                    this.catchConfiguration(error);
                })
        }
        
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if ( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.service.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.cat = new CatBuilder().clone( res.json() );
                            
                            this.changeAto1();
                            if ( this.cat.getDataAvaliacaoMedicaCustomDate().getAppDate() != undefined )
                                this.changeAto2();
                            this.changeAto3();
                            this.changeAto4();
                        
                            if ( this.cat.getEmpregado() )
                                this.autoCompleteEmpregado.getAutocomplete().initializeLastValue(
                                        this.cat.getEmpregado().getPessoa().getNome());
                            
                            if ( this.cat.getEmpregado() && this.cat.getEmpregado().getGerencia() )
                                this.autoCompleteGerencia.getAutocomplete().initializeLastValue(
                                        this.cat.getEmpregado().getGerencia().getCodigoCompleto());
                            
                            if ( this.cat.getEmpresa() )
                                this.autoCompleteEmpresa.getAutocomplete().initializeLastValue(
                                        this.cat.getEmpresa().getNome());
                            
                            if ( this.cat.getProfissionalCaracterizacao() )
                                this.autoCompleteProfissionalCaracterizacao.getAutocomplete().initializeLastValue(
                                        this.cat.getProfissionalCaracterizacao().getEmpregado().getPessoa().getNome());
                            
                            if ( this.cat.getCid() )
                                this.autoCompleteCid.getAutocomplete().initializeLastValue(
                                        this.cat.getCid().getCodigo());
                            
                            if ( this.cat.getDiagnosticoProvavel() )
                                this.autoCompleteDiagnosticoProvavel.getAutocomplete().initializeLastValue(
                                        this.cat.getDiagnosticoProvavel().getCodigo());
                            
                            if ( this.cat.getProfissionalClassificacao() )
                                this.autoCompleteProfissionalCaracterizacao.getAutocomplete().initializeLastValue(
                                        this.cat.getProfissionalClassificacao().getEmpregado().getPessoa().getNome());
                            
                            if ( this.cat.getAgenteCausador() )
                                this.autoCompleteAgenteCausador.getAutocomplete().initializeLastValue(
                                        this.cat.getAgenteCausador().getDescricao());
                            
                            if ( this.cat.getNaturezaLesao() )
                                this.autoCompleteNaturezaLesao.getAutocomplete().initializeLastValue(
                                        this.cat.getNaturezaLesao().getDescricao());
                            
                            if ( this.cat.getParteCorpoAtingida() )
                                this.autoCompleteParteCorpoAtingida.getAutocomplete().initializeLastValue(
                                        this.cat.getParteCorpoAtingida().getDescricao());
                            
                            if ( this.cat.getMunicipio() )
                                this.autoCompleteCidade.getAutocomplete().initializeLastValue(
                                        this.cat.getMunicipio().getNome());
                            
                            if ( this.cat.getInstalacao() )
                                this.autoCompleteInstalacao.getAutocomplete().initializeLastValue(
                                        this.cat.getInstalacao().getNome());
                            
                            if ( this.cat.getCnae() )
                                this.autoCompleteCnae.getAutocomplete().initializeLastValue(
                                        this.cat.getCnae().getCodigo());
                            
                            if ( this.cat.getClassificacaoGravidade() )
                                this.autoCompleteClassificacaoGravidade.getAutocomplete().initializeLastValue(
                                        this.cat.getClassificacaoGravidade().getTitulo());
                            
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
        
        this.getCargos();
        this.getEscolaridades();
        this.getEstadosCivis();
        this.getSexos();
        this.getVinculos();
        this.getFuncoes();
        this.getClassificacoes();
        this.getNexoCausais();
        this.getTipoAcidentes();
        this.getTipoCats();
        this.getConformeNaoConforme();
        this.getAplicavelNaoAplicavel();
    }
    
    getCargos() {
        this.catService.getCargoService().getCargos()
            .then(res => {
                this.cargos = new CargoBuilder().cloneList(res.json());
            })
            .catch(error => {
                this.catchConfiguration(error);
            })
    }
    
    getEscolaridades() {
        this.catService.getEscolaridades()
            .then(res => {
                this.escolaridades = Object.keys(res.json()).sort();
            })
            .catch(error => {
                this.catchConfiguration(error);
            })
    }
    
    getEstadosCivis() {
        this.catService.getEstadosCivis()
            .then(res => {
                this.estadosCivis = Object.keys(res.json()).sort();
            })
            .catch(error => {
                this.catchConfiguration(error);
            })
    }
    
    getVinculos() {
        this.catService.getVinculos()
            .then(res => {
                this.vinculos = Object.keys(res.json()).sort();
            })
            .catch(error => {
                this.catchConfiguration(error);
            })
    }
    
    getFuncoes() {
        this.catService.getFuncaoService().getFuncoes()
            .then(res => {
                this.funcoes = new FuncaoBuilder().cloneList(res.json());
            })
            .catch(error => {
                this.catchConfiguration(error);
            })
    }
    
    getClassificacoes() {
        this.catService.getClassificacaoService().getClassificacaoAfastamentos()
            .then(res => {
                this.classificacoes = new ClassificacaoAfastamentoBuilder().cloneList(res.json());
            })
            .catch(error => {
                this.catchConfiguration(error);
            })
    }
    
    getNexoCausais() {
        this.catService.getNexoCausais()
            .then(res => {
                this.nexoCausais = Object.keys( res.json() ).sort();
            })
            .catch(error => {
                this.catchConfiguration(error);
            })
    }
    
    getSexos() {
        this.catService.getSexos()
            .then(res => {
                this.sexos = Object.keys(res.json()).sort();
            })
            .catch(error => {
                this.catchConfiguration(error);
            })
    }
    
    getTipoAcidentes() {
        this.catService.getTipoAcidentes()
            .then(res => {
                this.tipoAcidentes = Object.keys(res.json()).sort();
            })
            .catch(error => {
                this.catchConfiguration(error);
            })
    }
    
    getTipoCats() {
        this.catService.getTipoCats()
            .then(res => {
                this.tipoCats = Object.keys(res.json()).sort();
            })
            .catch(error => {
                this.catchConfiguration(error);
            })
    }
    
    getConformeNaoConforme() {
        this.catService.getConformeNaoConforme()
            .then(res => {
                this.conformeNaoConforme = Object.keys(res.json()).sort();
            })
            .catch(error => {
                this.catchConfiguration(error);
            })
    }
   
    getAplicavelNaoAplicavel() {
        this.catService.getAplicavelNaoAplicavel()
            .then(res => {
                this.aplicavelNaoAplicavel = Object.keys(res.json()).sort();
            })
            .catch(error => {
                this.catchConfiguration(error);
            })
    }
    
    save() {
        let i: number = 0;
        let total: number = 0;
        let arquivo= undefined;
        let name: string;
        
        
        if ( this.inputElArquivo.nativeElement.files.length > 0 ) {
            if ( this.inputElArquivo.nativeElement.files[0].name.substr(
                this.inputElArquivo.nativeElement.files[0].name.length-3, 
                this.inputElArquivo.nativeElement.files[0].name.length) != 'zip' ) {
                    this.toastParams = ["O arquivo deve ser, exclusivamente, no formato .zip.", 4000];
                    this.globalActions.emit( 'toast' );
                    return;
                }
            arquivo = this.inputElArquivo.nativeElement.files[0];
            total++;
        }
        
        if ( total > 0 ) {
            let component = this;
            let cat: Cat = new CatBuilder().clone( component.cat );
    
            if ( arquivo != undefined ) {
                let readerArquivo = new FileReader();
    
                readerArquivo.onload = function() {
                    let arrayBuffer: ArrayBuffer = readerArquivo.result;
                    let array = new Uint8Array( arrayBuffer );
                    cat.setArquivo( array );
                    component.callSave( ++i, total, cat );
                }
    
                readerArquivo.readAsArrayBuffer( new Blob( [arquivo] ) );
            }
        } else {
            super.save( new CatBuilder().clone( this.cat ) );
        }
    }
    
    salvar( cat ) {
        super.save( cat );
    }
    
    callSave( i: number, total: number, cat: Cat ) {
        if ( i == total ) {
            this.salvar( cat );
        }
    }
    
    changeEmpregado() {
        setTimeout(() => {
            if ( this.cat.getEmpregado().getId() > 0 ) {
                this.cat.setGerencia(this.cat.getEmpregado().getGerencia());
            }
        }, 250);
    }
    
    cadastrarContratado() {
        if ( this.cat.getEmpregado().getNome() == '' || this.cat.getEmpregado().getNome() == undefined || 
                this.cat.getEmpregado().getMatricula() == '' || this.cat.getEmpregado().getMatricula() == undefined ||
                this.cat.getEmpregado().getChave() == '' || this.cat.getEmpregado().getChave() == undefined || 
                this.cat.getEmpregado().getPessoa().getCpf() == '' || this.cat.getEmpregado().getPessoa().getCpf() == undefined ||
                this.cat.getEmpregado().getPis() == '' || this.cat.getEmpregado().getPis() == undefined ||
                this.cat.getEmpregado().getPessoa().getRg() == '' || this.cat.getEmpregado().getPessoa().getRg() == undefined ||
                this.cat.getEmpregado().getGerencia().getId() ==  0 || this.cat.getEmpregado().getGerencia().getId() == undefined || 
                this.cat.getEmpregado().getPessoa().getDataNascimento() == undefined ||
                this.cat.getEmpregado().getCargo() == undefined || 
                this.cat.getEmpregado().getCargo().getId() == 0 || this.cat.getEmpregado().getCargo().getId() == undefined ||
                this.cat.getEmpregado().getFuncao() == undefined || 
                this.cat.getEmpregado().getFuncao().getId() == 0 || this.cat.getEmpregado().getFuncao().getId() == undefined ||
                this.cat.getEmpregado().getPessoa().getSexo() == '' || this.cat.getEmpregado().getPessoa().getSexo() == undefined ||
                this.cat.getEmpregado().getEscolaridade() == '' || this.cat.getEmpregado().getEscolaridade() == undefined ||
                this.cat.getEmpregado().getEstadoCivil() == '' || this.cat.getEmpregado().getEstadoCivil() == undefined) {
            this.toastParams = ["Por favor, complete todos os dados do empregado.", 4000];
            this.globalActions.emit( 'toast' );
            return;
        }
        
        this.cat.getEmpregado().setVinculo("CONTRATADO");
        this.catService.getEmpregadoService().saveAndReturn(new EmpregadoBuilder().clone(this.cat.getEmpregado()))
            .then(res => {
                this.cat.setEmpregado(new EmpregadoBuilder().clone(res.json()));
                this.verifyError = false;
                this.toastParams = ["Sucesso ao salvar o empregado.", 4000];
                this.globalActions.emit( 'toast' );
            })
            .catch(error => {
                this.toastParams = ["Erro ao salvar o empregado.", 4000];
                this.globalActions.emit( 'toast' );
                this.catchConfiguration(error);
            })
    }
    
    getNexoCausal() {
        if ( this.cat.getNexoCausal() == undefined ) return "";
        else if ( this.cat.getNexoCausal().includes("APLIC") )
            return "naoAplicavel";
        else if ( this.cat.getNexoCausal().includes("N") )
            return "nao";
        else return "sim";
    }
    
    setNexoCausal( value ) {
        switch(value) {
            case "nao":
                this.cat.setNexoCausal(this.nexoCausais[0]);
                break;
            case "naoAplicavel":
                this.cat.setNexoCausal(this.nexoCausais[1]);
                break;
            case "sim":
                this.cat.setNexoCausal(this.nexoCausais[2]);
                break;
        }
    }
    
    changeCaracterizacao() { 
        if ( this.cat.getProfissionalCaracterizacao().getId() == 0 )
            this.cat.setProfissionalCaracterizacao(this.profissional);
        if ( this.cat.getDataCaracterizacao() == undefined )
            this.cat.setDataCaracterizacao(new Date());
    }
    
    changeCid() {
        this.setPropertiesClassificacao();
    }
    
    changeClassificacaoAfastamento() {
        this.cat.setClassificacao(
                new ClassificacaoAfastamentoBuilder().clone(
                        this.classificacoes.find(c => c.getId() == this.cat.getClassificacao().getId())));
        this.setPropertiesClassificacao();
    }
    
    setPropertiesClassificacao() {
        if ( this.cat.getProfissionalClassificacao().getId() == 0 && 
                ( this.cat.getCid().getId() > 0 || this.cat.getClassificacao().getId() > 0) )
            this.cat.setProfissionalClassificacao(this.profissional);
        if ( this.cat.getDataClassificacao() == undefined )
            this.cat.setDataClassificacao(new Date());
    }
    
    setCnaeFilter() {
        if ( this.cat.getEmpresa() && this.cat.getEmpresa().getId() > 0 ) {
            this.cnaeFilter.setEmpresa(new EmpresaFilter());
            this.cnaeFilter.getEmpresa().setId(this.cat.getEmpresa().getId());
            this.cnaeFilter.setPageNumber(1);
            this.cnaeFilter.setPageSize(Math.pow(2, 31)-1);
            this.autoCompleteCnae = new CnaeCodigoAutocomplete(this.catService.getCnaeService(), this.cnaeFilter);
        } else {
            this.cnaeFilter = new CnaeFilter();
            this.cnaeFilter.setPageNumber(0);
            this.cnaeFilter.setPageSize(0);
            this.cat.setCnae(new CnaeBuilder().initialize(null));
        }
    }
    
    addExame(exame: Exame) {
        if ( this.cat.getExamesConvocacao().find(ec => ec.getId() == exame.getId() ) != undefined ) {
            this.toastParams = ["N&atilde;o &eacute; poss&iacute;vel adicionar exames repetidos.", 4000];
            this.globalActions.emit( 'toast' );
            return;
        }
        this.cat.getExamesConvocacao().push(new ExameBuilder().clone(exame));   
    }
    
    setAusenciaExames(evento) {
        if ( evento.target.checked ) {
            this.modalConfirm.setMensagem("Tem certeza que deseja excluir todos os exames?");
            this.modalConfirm.openModal();
        }
    }
    
    functionModalConfirm(evento) {
        if ( evento ) 
            this.cat.setExamesConvocacao(new Array<Exame>());
        else 
            this.cat.setAusenciaExames(false);
    }
    
    downloadComunicacaoOcorrencia() {        
        this.catService.getComunicacaoOcorrencia( new CatBuilder().clone( this.cat ) )
            .then(res => {
                this.baixar( res, this.cat.getEmpregado().getMatricula().trim()+".pdf", 'relatorio' );
            })
            .catch(error => {
                this.catchConfiguration(error);
            })
    }
    
    downloadArquivoZip() {
        if ( this.verifyDownloadArquivo() ) return;
        
        this.baixar(this.cat.getArquivoBase64(), "arquivo-zip.zip", 'arquivo-zip');
    }
    
    verifyDownloadRelatorio() {
        if ( this.cat.getEmpregado() == undefined || this.cat.getEmpregado().getId() == 0 ||
                this.cat.getEmpregado() == undefined || this.cat.getEmpregado().getId() == 0 ||
                this.cat.getGerenteContrato() == undefined || this.cat.getGerenteContrato() == "" || this.cat.getTelefoneGerente() == "" ||
                this.cat.getFiscalContrato() == undefined || this.cat.getFiscalContrato() == "" || this.cat.getTelefoneFiscal() == "" ||
                this.cat.getDataOcorrencia() == undefined ||
                this.cat.getDataInformacao() == undefined ||
                this.cat.getProfissionalCaracterizacao() == undefined || this.cat.getProfissionalCaracterizacao().getId() == 0 ||
                this.cat.getProfissionalClassificacao() == undefined || this.cat.getProfissionalClassificacao().getId() == 0 ||
                this.cat.getDataClassificacao() == undefined ||
                this.cat.getDataCaracterizacao() == undefined ||
                this.cat.getCid() == undefined || this.cat.getCid().getId() == 0 ||
                this.cat.getClassificacao() == undefined || this.cat.getClassificacao().getId() == 0 )
            return true;
    }
    
    
    
    verifyDownloadArquivo() {
        if ( this.cat.getArquivoBase64() == undefined )
            return true;
    }
    
    baixar( data, fileName, file ) {
        let byteCharacters;
        
        if ( file == 'arquivo-zip' )
            byteCharacters = atob(data);
        else byteCharacters = atob(data._body);
        let byteArrays = [];
        let sliceSize = 1024;

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            let slice = byteCharacters.slice(offset, offset + sliceSize);

            let byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            let byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        
        let blob = new Blob(byteArrays);
        let url = window.URL.createObjectURL(blob);
        var anchor = document.createElement("a");
        anchor.download = fileName;
        anchor.href = url;
        document.body.appendChild(anchor);
        anchor.click();
    }
    
    changeAto1() {
        if ( this.cat.getAto1() == undefined || this.cat.getAto1() == "" ) {
            if ( this.cat.getDataEmissaoCustomDate().getAppDate() != undefined && 
                this.cat.getDataOcorrenciaCustomDate().getAppDate() != undefined ) {
                let prazo = this.getPrazo();
                if ( prazo != undefined )
                    prazo.then(res => {
                            this.cat.setAto1( (Number(res.json()) > 1) ? this.conformeNaoConforme[1] : this.conformeNaoConforme[0]);
                        })
                        .catch(error => {
                            this.catchConfiguration(error);
                        })
               }
        }
    }
    
    changeAto2() {
        if ( this.cat.getAto2() == undefined || this.cat.getAto2() == "" ) {
            this.cat.setAto2( this.cat.getDataAvaliacaoMedica() == undefined ?
                this.conformeNaoConforme[1] : this.conformeNaoConforme[0] );
        }
    }
    
    changeAto3() {
        if ( this.cat.getAto3() == undefined || this.cat.getAto3() == "" ) {
            if ( this.cat.getDataEmissaoCustomDate().getAppDate() != undefined && 
                    this.cat.getDataComunicacaoSindicatoCustomDate().getAppDate() != undefined ) {
                this.catService.getFeriadoService().getDaysBetweenDates(
                    this.cat.getDataEmissao(), this.cat.getDataComunicacaoSindicato())
                        .then(res => {
                            if ( this.cat.getEmpregado().getVinculo() == "CONTRATADO" )
                                this.cat.setAto3( (Number(res.json()) > 10) ? this.conformeNaoConforme[1] : this.conformeNaoConforme[0]);
                            else this.cat.setAto3( (Number(res.json()) > 1) ? this.conformeNaoConforme[1] : this.conformeNaoConforme[0]);
                        })
                        .catch(error => {
                            this.catchConfiguration(error);
                        })
            }
        }
    }
   
    changeAto4() {
        if ( this.cat.getAto4() == undefined || this.cat.getAto4() == "" ) {
            this.changeNumeroCartaMulta();
        }
    }
    
    changeNumeroCartaMulta() {
        if ( this.cat.getDataEmissaoCustomDate().getAppDate() != undefined && 
                this.cat.getDataOcorrenciaCustomDate().getAppDate() != undefined ) {
                let prazo = this.getPrazo();
                if ( prazo != undefined )
                    prazo.then(res => {
                        if ( Number(res.json()) <= 1 )
                            this.cat.setAto4(this.aplicavelNaoAplicavel[1]);
                        else {
                            if ( this.cat.getNumeroCartaMulta() != undefined && this.cat.getNumeroCartaMulta() != "" )
                                this.cat.setAto4( this.conformeNaoConforme[0] )
                            else this.cat.setAto4( this.conformeNaoConforme[1] );
                        }
                    })
                    .catch(error => {
                        this.catchConfiguration(error);
                    })
            }
    }
    
    getPrazo() {
        if ( this.cat.getDataOcorrencia() != undefined && this.cat.getDataEmissao() != undefined ) 
            return this.catService.getFeriadoService().getDaysBetweenDates(
                    this.cat.getDataOcorrencia(), this.cat.getDataEmissao());
        else undefined;
    }
}