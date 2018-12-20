import { Profissional } from './../../model/profissional';
import { Empregado } from './../../model/empregado';
import { EmpregadoBuilder } from './../empregado/empregado.builder';
import { Endereco } from './../../model/endereco';
import { EnderecoBuilder } from './../endereco/endereco.builder';
import { Curriculo } from './../../model/curriculo';
import { CurriculoBuilder } from './../curriculo/curriculo.builder';
import { Equipe } from './../../model/equipe';
import { EquipeBuilder } from './../equipe/equipe.builder';
import { Cargo } from './../../model/cargo';
import { CargoBuilder } from './../cargo/cargo.builder';
import { Localizacao } from './../../model/localizacao';
import { LocalizacaoBuilder } from './../localizacao/localizacao.builder';
import { ProfissionalConselho } from './../../model/profissional-conselho';
import { ProfissionalConselhoBuilder } from './../profissional-conselho/profissional-conselho.builder';
import { ProfissionalVacina } from './../../model/profissional-vacina';
import { ProfissionalVacinaBuilder } from './../profissional-vacina/profissional-vacina.builder';
import { Telefone } from './../../model/telefone';
import { TelefoneBuilder } from './../telefone/telefone.builder';
import { ServicoBuilder } from './../servico/servico.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class ProfissionalSaudeBuilder extends GenericBuilder {

    initialize( profissionalSaude: Profissional ): Profissional {
        profissionalSaude = new Profissional();

        profissionalSaude.setEmpregado( new EmpregadoBuilder().initialize( profissionalSaude.getEmpregado() ) );
        profissionalSaude.setEquipe( new EquipeBuilder().initialize( profissionalSaude.getEquipe() ) );
        profissionalSaude.setLocalizacao( new LocalizacaoBuilder().initialize( profissionalSaude.getLocalizacao() ) );
        profissionalSaude.setProfissionalConselho(
            new ProfissionalConselhoBuilder().initialize( profissionalSaude.getProfissionalConselho() ) );
        profissionalSaude.setCurriculo( new CurriculoBuilder().initialize( profissionalSaude.getCurriculo() ) );
        profissionalSaude.setProfissionalVacinas(
            new ProfissionalVacinaBuilder().initializeList( profissionalSaude.getProfissionalVacinas() ) );
        profissionalSaude.setServicos(new ServicoBuilder().initializeList(profissionalSaude.getServicos()));
        profissionalSaude.setEquipes(new EquipeBuilder().initializeList(new Array<Equipe>()));
        return profissionalSaude;
    }

    initializeList( profissionaisSaude: Array<Profissional> ) {
        let array: Array<Profissional> = new Array<Profissional>();

        if ( profissionaisSaude === null || profissionaisSaude === undefined )
            profissionaisSaude = new Array<Profissional>();

        for ( let profissionalSaude of profissionaisSaude ) {
            array.push( this.initialize( profissionalSaude ) );
        }

        return array;
    }

    clone( profissionalSaude: Profissional ): Profissional {
        let cloneProfissionalSaude = this.initialize( new Profissional() );

        if ( profissionalSaude === null || profissionalSaude === undefined )
            profissionalSaude = new Profissional();
        cloneProfissionalSaude.setId( this.getValue( profissionalSaude, "getId" ) );
        cloneProfissionalSaude.setMi( this.getValue( profissionalSaude, "getMi" ) );
        cloneProfissionalSaude.setDataAso( this.getValue( profissionalSaude, "getDataAso" ) );
        cloneProfissionalSaude.setVersion( this.getValue( profissionalSaude, "getVersion" ) );

        cloneProfissionalSaude.setEmpregado(
            new EmpregadoBuilder().clone( this.getValue( profissionalSaude, "getEmpregado" ) ) );

        if ( this.getValue( profissionalSaude, "getEquipe" ) !== undefined ) {
            cloneProfissionalSaude.setEquipe(
                new EquipeBuilder().clone( this.getValue( profissionalSaude, "getEquipe" ) ) );
            if ( !this.idGtZero( cloneProfissionalSaude.getEquipe() ) )
                cloneProfissionalSaude.setEquipe( undefined );
        } else {
            cloneProfissionalSaude.setEquipe( new EquipeBuilder().initialize( null ) );
        }

        if ( this.getValue( profissionalSaude, "getLocalizacao" ) !== undefined ) {
            cloneProfissionalSaude.setLocalizacao(
                new LocalizacaoBuilder().clone( this.getValue( profissionalSaude, "getLocalizacao" ) ) );
            if ( !this.idGtZero( cloneProfissionalSaude.getLocalizacao() ) )
                cloneProfissionalSaude.setLocalizacao( undefined );
        } else {
            cloneProfissionalSaude.setLocalizacao( new LocalizacaoBuilder().initialize( null ) );
        }
        
        if ( this.getValue( profissionalSaude, "getCurriculo" ) !== undefined ) {
            if ( Object.keys( this.getValue( profissionalSaude, "getCurriculo" ) ).length === 2 &&
                    this.getValue(this.getValue( profissionalSaude, "getCurriculo" ), "getCurriculoCursos").length === 0 )
                cloneProfissionalSaude.setCurriculo( undefined );
            else
                cloneProfissionalSaude.setCurriculo(
                    new CurriculoBuilder().clone( this.getValue( profissionalSaude, "getCurriculo" ) ) );
        } else {
            cloneProfissionalSaude.setCurriculo( new CurriculoBuilder().initialize( null ) );
        }

        if ( this.getValue( profissionalSaude, "getProfissionalConselho" ) !== undefined ) {
            if ( Object.keys( this.getValue( profissionalSaude, "getProfissionalConselho" ) ).length === 2 &&
                this.getValue(this.getValue(this.getValue(profissionalSaude, "getProfissionalConselho" ), "getVencimentoCustomDate" ), "getApiDate") == undefined )
                cloneProfissionalSaude.setProfissionalConselho( undefined );
            else cloneProfissionalSaude.setProfissionalConselho(
                new ProfissionalConselhoBuilder().clone( this.getValue( profissionalSaude, "getProfissionalConselho" ) ) );
            if ( this.getValue( this.getValue( profissionalSaude, "getProfissionalConselho" ), "getConselho" ) == "" ) {
                cloneProfissionalSaude.getProfissionalConselho().setConselho( undefined );
            }
            if ( this.getValue( this.getValue( profissionalSaude, "getProfissionalConselho" ), "getNumero" ) == "" )
                cloneProfissionalSaude.getProfissionalConselho().setNumero( undefined );
        } else {
            cloneProfissionalSaude.setProfissionalConselho( new ProfissionalConselhoBuilder().initialize( null ) );
        }

        cloneProfissionalSaude.setProfissionalVacinas(
            new ProfissionalVacinaBuilder().cloneList( this.getValue( profissionalSaude, "getProfissionalVacinas" ) ) );

        cloneProfissionalSaude.setServicos(
                new ServicoBuilder().cloneList( this.getValue( profissionalSaude, "getServicos" ) ) );
        
        cloneProfissionalSaude.setEquipes(new EquipeBuilder().cloneList(
                this.getValue(profissionalSaude,"getEquipes")));
        
        return cloneProfissionalSaude;
    }

    cloneList( profissionals: Array<Profissional> ): Array<Profissional> {
        let array: Array<Profissional> = new Array<Profissional>();

        if ( profissionals !== null && profissionals !== undefined ) {
            for ( let profissional of profissionals ) {
                array.push( this.clone( profissional ) );
            }
        }

        return array;
    }

}