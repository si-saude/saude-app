import { Profissional } from './../../model/profissional';
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
import { GenericBuilder } from './../../generics/generic.builder';

export class ProfissionalSaudeBuilder extends GenericBuilder{
    
    initialize(profissionalSaude: Profissional):Profissional {
        profissionalSaude = new Profissional();
        
        profissionalSaude.setEndereco(new EnderecoBuilder().initialize(profissionalSaude.getEndereco()));
        profissionalSaude.setEquipe(new EquipeBuilder().initialize(profissionalSaude.getEquipe()));
        profissionalSaude.setLocalizacao(new LocalizacaoBuilder().initialize(profissionalSaude.getLocalizacao()));
        profissionalSaude.setCargo(new CargoBuilder().initialize(profissionalSaude.getCargo()));
        profissionalSaude.setProfissionalConselho(
                new ProfissionalConselhoBuilder().initialize(profissionalSaude.getProfissionalConselho()));
        profissionalSaude.setCurriculo(new CurriculoBuilder().initialize(profissionalSaude.getCurriculo()));
        profissionalSaude.setProfissionalVacinas(
                new ProfissionalVacinaBuilder().initializeList(profissionalSaude.getProfissionalVacinas()));
        profissionalSaude.setTelefones(new TelefoneBuilder().initializeList(profissionalSaude.getTelefones()));
        
        return profissionalSaude;
    }
    
    initializeList(profissionaisSaude: Array<Profissional>) {
        for (let profissionalSaude of profissionaisSaude) {
            this.initialize(profissionalSaude);
        }
    }
    
   clone(profissionalSaude: Profissional): Profissional {        
        let cloneProfissionalSaude = new Profissional();
        
        if (profissionalSaude === null || profissionalSaude === undefined)
            profissionalSaude = new Profissional();
        
        cloneProfissionalSaude.setId(this.getValue(profissionalSaude, "getId"));
        cloneProfissionalSaude.setChave(this.getValue(profissionalSaude, "getChave"));
        cloneProfissionalSaude.setDataNascimento(this.getValue(profissionalSaude, "getDataNascimento"));
        cloneProfissionalSaude.setMatricula(this.getValue(profissionalSaude,"getMatricula"));
        cloneProfissionalSaude.setMi(this.getValue(profissionalSaude, "getMi"));
        cloneProfissionalSaude.setNome(this.getValue(profissionalSaude, "getNome"));
        cloneProfissionalSaude.setRamal(this.getValue(profissionalSaude,"getRamal"));
        cloneProfissionalSaude.setAssinaturaBase64(this.getValue(profissionalSaude,"getAssinaturaBase64"));
        cloneProfissionalSaude.setVersion(this.getValue(profissionalSaude, "getVersion"));
        
        if (this.getValue(profissionalSaude, "getEquipe") !== undefined) { 
            cloneProfissionalSaude.setEquipe(
                    new EquipeBuilder().clone(this.getValue(profissionalSaude,"getEquipe")));
            if(!this.idGtZero(cloneProfissionalSaude.getEquipe()))
                cloneProfissionalSaude.setEquipe(undefined);
        } else {
            cloneProfissionalSaude.setEquipe(new EquipeBuilder().initialize(null));
        }
        
        if (this.getValue(profissionalSaude, "getCargo") !== undefined) {
            cloneProfissionalSaude.setCargo(
                    new CargoBuilder().clone(this.getValue(profissionalSaude, "getCargo")));
            if(!this.idGtZero(cloneProfissionalSaude.getCargo()))
                cloneProfissionalSaude.setCargo(undefined);
       } else {
           cloneProfissionalSaude.setCargo(new CargoBuilder().initialize(null));
       }
        
        
        if (this.getValue(profissionalSaude, "getLocalizacao") !== undefined) {
            cloneProfissionalSaude.setLocalizacao(
                    new LocalizacaoBuilder().clone(this.getValue(profissionalSaude, "getLocalizacao")));
            if(!this.idGtZero(cloneProfissionalSaude.getLocalizacao()))
                cloneProfissionalSaude.setLocalizacao(undefined);
        } else {
            cloneProfissionalSaude.setLocalizacao(new LocalizacaoBuilder().initialize(null));
        }
        
        if(this.getValue(profissionalSaude, "getCurriculo") !== undefined) {
            if(Object.keys(this.getValue(profissionalSaude,"getCurriculo")).length === 2 && 
                    profissionalSaude.getCurriculo().getCurriculoCursos().length === 0)
                cloneProfissionalSaude.setCurriculo(undefined);
            else
                cloneProfissionalSaude.setCurriculo( 
                        new CurriculoBuilder().clone(this.getValue(profissionalSaude, "getCurriculo")));
        } else {
            cloneProfissionalSaude.setCurriculo(new CurriculoBuilder().initialize(null));
        }
        
        if(this.getValue(profissionalSaude, "getProfissionalConselho") !== undefined){
            if(Object.keys(this.getValue(profissionalSaude,"getProfissionalConselho")).length === 2 && 
                    profissionalSaude.getProfissionalConselho().getVencimento() === null)
                cloneProfissionalSaude.setProfissionalConselho(undefined);
            else
                cloneProfissionalSaude.setProfissionalConselho(
                        new ProfissionalConselhoBuilder().clone(this.getValue(profissionalSaude, "getProfissionalConselho")));
        } else {
            cloneProfissionalSaude.setProfissionalConselho(new ProfissionalConselhoBuilder().initialize(null));
        }
        
        if(this.getValue(profissionalSaude, "getEndereco") !== undefined){
            if(Object.keys(this.getValue(profissionalSaude, "getEndereco")).length === 2 && 
                    profissionalSaude.getEndereco().getCidade().getId() === 0)
                cloneProfissionalSaude.setEndereco(undefined);
            else
                cloneProfissionalSaude.setEndereco(
                        new EnderecoBuilder().clone(this.getValue(profissionalSaude, "getEndereco")));
        } else {
            cloneProfissionalSaude.setEndereco(new EnderecoBuilder().initialize(null));
        }
       
        cloneProfissionalSaude.setProfissionalVacinas(
                new ProfissionalVacinaBuilder().cloneList(this.getValue(profissionalSaude, "getProfissionalVacinas")));
        
        cloneProfissionalSaude.setTelefones(
                new TelefoneBuilder().cloneList(this.getValue(profissionalSaude, "getTelefones")));
        
        return cloneProfissionalSaude;
    } 
    
    
}