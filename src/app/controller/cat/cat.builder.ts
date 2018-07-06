import { Cat } from './../../model/cat';
import { GenericBuilder } from './../../generics/generic.builder';
import { DiagnosticoBuilder } from './../diagnostico/diagnostico.builder';
import { EmpregadoBuilder } from './../empregado/empregado.builder';
import { FornecedorBuilder } from './../fornecedor/fornecedor.builder';
import { GerenciaBuilder } from './../gerencia/gerencia.builder';

export class CatBuilder extends GenericBuilder {

    initialize(cat: Cat) {
        cat = new Cat();
        
        cat.setDiagnostico(new DiagnosticoBuilder().initialize(cat.getDiagnostico()));
        cat.setEmpregado(new EmpregadoBuilder().initialize(cat.getEmpregado()));
        cat.setEmpresa(new FornecedorBuilder().initialize(cat.getEmpresa()));
        cat.setGerencia(new GerenciaBuilder().initialize(cat.getGerencia()));
        
        return cat;
    }
    
    initializeList(cats: Array<Cat>) {
        
        let array:Array<Cat> = new Array<Cat>();
        
        if(cats === null || cats === undefined)
            cats = new Array<Cat>();
        
        for (let cat of cats) {
            array.push(this.initialize(cat));
        }
        
        return array;
    }
    
    clone(cat: Cat): Cat {
        
        if (cat === null || cat === undefined)
            cat = new Cat();
        
        let cloneCat = new Cat();
        cloneCat.setId(this.getValue(cat,"getId"));
        cloneCat.setNumero(this.getValue(cat, "getNumero"));
        cloneCat.setAfastamento(this.getValue(cat, "getAfastamento"));
        cloneCat.setCargo(this.getValue(cat, "getCargo"));
        cloneCat.setCatSd2000(this.getValue(cat, "getCatSd2000"));
        cloneCat.setClassificacaoSisin(this.getValue(cat, "getClassificacaoSisin"));
        cloneCat.setCodigoCartaSindicato(this.getValue(cat, "getCodigoCartaSindicato"));
        cloneCat.setComunicavelSus(this.getValue(cat, "getComunicavelSus"));
        cloneCat.setContratado(this.getValue(cat, "getContratado"));
        cloneCat.setCpf(this.getValue(cat, "getCpf"));
        cloneCat.setDataAvaliacaoMedica(this.getValue(cat, "getDataAvaliacaoMedica"));
        cloneCat.setDataComunicacaoSindicato(this.getValue(cat, "getDataComunicacaoSindicato"));
        cloneCat.setDataEmissaoCat(this.getValue(cat, "getDataEmissaoCat"));
        cloneCat.setDataNascimento(this.getValue(cat, "getDataNascimento"));
        cloneCat.setDiaHoraAcidente(this.getValue(cat, "getDiaHoraAcidente"));
        cloneCat.setFerimentoGraveConformeAnp(this.getValue(cat, "getFerimentoGraveConformeAnp"));
        cloneCat.setInstalacao(this.getValue(cat, "getInstalacao"));
        cloneCat.setNome(this.getValue(cat, "getNome"));
        cloneCat.setNumeroSisin(this.getValue(cat, "getNumeroSisin"));
        cloneCat.setRegime(this.getValue(cat, "getRegime"));
        cloneCat.setRegistroSd2000(this.getValue(cat, "getRegistroSd2000"));
        cloneCat.setRemuneracao(this.getValue(cat, "getRemuneracao"));
        cloneCat.setRta(this.getValue(cat, "getRta"));
        
        if(this.getValue(cat, "getSexo") == ( "" || undefined ))
            cloneCat.setSexo(undefined);
        else
            cloneCat.setSexo(this.getValue(cat, "getSexo"));
        
        if(this.getValue(cat, "getPartesCorpo") == ( "" || undefined) )
            cloneCat.setPartesCorpo(undefined);
        else
            cloneCat.setPartesCorpo(this.getValue(cat, "getPartesCorpo"));

        if(this.getValue(cat, "getGravidade") == ( "" || undefined ) )
            cloneCat.setGravidade(undefined); 
        else
            cloneCat.setGravidade(this.getValue(cat, "getGravidade"));

        if(this.getValue(cat, "getTipoAcidente") == ( "" || undefined ) )
            cloneCat.setTipoAcidente(undefined);
        else
            cloneCat.setTipoAcidente(this.getValue(cat, "getTipoAcidente"));
        
        if(this.getValue(cat, "getTipoCat") == ( "" || undefined ) )
            cloneCat.setTipoCat(undefined);
        else
            cloneCat.setTipoCat(this.getValue(cat, "getTipoCat"));
        
        if (this.getValue(cat, "getDiagnostico") !== undefined) { 
            cloneCat.setDiagnostico(
                    new DiagnosticoBuilder().clone(this.getValue(cat,"getDiagnostico")));
            if(!this.idGtZero(cloneCat.getDiagnostico()))
                cloneCat.setDiagnostico(undefined);
        } else {
            cloneCat.setDiagnostico(new DiagnosticoBuilder().initialize(null));
        }
        
        if (this.getValue(cat, "getEmpregado") !== undefined) { 
            cloneCat.setEmpregado(
                    new EmpregadoBuilder().clone(this.getValue(cat,"getEmpregado")));
            if(!this.idGtZero(cloneCat.getEmpregado()))
                cloneCat.setEmpregado(undefined);
        } else {
            cloneCat.setEmpregado(new EmpregadoBuilder().initialize(null));
        }
        
        if (this.getValue(cat, "getEmpresa") !== undefined) { 
            cloneCat.setEmpresa(
                    new FornecedorBuilder().clone(this.getValue(cat,"getEmpresa")));
            if(!this.idGtZero(cloneCat.getEmpresa()))
                cloneCat.setEmpresa(undefined);
        } else {
            cloneCat.setEmpresa(new FornecedorBuilder().initialize(null));
        }
        
        if (this.getValue(cat, "getGerencia") !== undefined) { 
            cloneCat.setGerencia(
                    new GerenciaBuilder().clone(this.getValue(cat,"getGerencia")));
            if(!this.idGtZero(cloneCat.getGerencia()))
                cloneCat.setGerencia(undefined);
        } else {
            cloneCat.setGerencia(new GerenciaBuilder().initialize(null));
        }
        
        cloneCat.setVersion(this.getValue(cat, "getVersion"));
        
        return cloneCat;
    }
    
    cloneList(cats: Array<Cat>): Array<Cat> {
        let array:Array<Cat> = new Array<Cat>();
    
        if (cats !== null && cats !== undefined) { 
            for (let cat of cats) {
                array.push(this.clone(cat));
            }
        }
        
        return array;
    }
    
}