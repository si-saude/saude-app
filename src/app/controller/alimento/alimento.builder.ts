import { Alimento } from '../../model/alimento';
import { AlimentoMedidaAlimentarBuilder } from './../alimento-medida-alimentar/alimento-medida-alimentar.builder';
import { GenericBuilder } from '../../generics/generic.builder';
import { Util } from './../../generics/utils/util';

export class AlimentoBuilder extends GenericBuilder {

    initialize(alimento: Alimento) {
        alimento = new Alimento();
        
        alimento.setAlimentoMedidaAlimentares(new AlimentoMedidaAlimentarBuilder().initializeList(null));
        return alimento;
    }
    
    initializeList(alimentos: Array<Alimento>) {
        
        let array:Array<Alimento> = new Array<Alimento>();
        
        if(alimentos === null || alimentos === undefined)
            alimentos = new Array<Alimento>();
        
        for (let alimento of alimentos) {
            array.push(this.initialize(alimento));
        }
        
        return array;
    }
    
    clone(alimento: Alimento): Alimento {
        
        if (alimento === null || alimento === undefined)
            alimento = new Alimento();
        
        let cloneAlimento = new Alimento();
        cloneAlimento.setId(this.getValue(alimento,"getId"));
        cloneAlimento.setNome(this.getValue(alimento,"getNome"));
        cloneAlimento.setTipo(this.getValue(alimento,"getTipo"));
        cloneAlimento.setTipoCarboidrato(this.getValue(alimento,"getTipoCarboidrato"));
        cloneAlimento.setPadrao(Util.treatDouble(this.getValue(alimento,"getPadrao")));
        cloneAlimento.setEnergia(Util.treatDouble(this.getValue(alimento,"getEnergia")));
        cloneAlimento.setProteina(Util.treatDouble(this.getValue(alimento,"getProteina")));
        cloneAlimento.setLipideos(Util.treatDouble(this.getValue(alimento,"getLipideos")));
        cloneAlimento.setSaturada(Util.treatDouble(this.getValue(alimento,"getSaturada")));
        cloneAlimento.setMonoinsaturada(Util.treatDouble(this.getValue(alimento,"getMonoinsaturada")));
        cloneAlimento.setPoliinsaturada(Util.treatDouble(this.getValue(alimento,"getPoliinsaturada")));
        cloneAlimento.setOmega6(Util.treatDouble(this.getValue(alimento,"getOmega6")));
        cloneAlimento.setOmega3(Util.treatDouble(this.getValue(alimento,"getOmega3")));
        cloneAlimento.setColesterol(Util.treatDouble(this.getValue(alimento,"getColesterol")));
        cloneAlimento.setCho(Util.treatDouble(this.getValue(alimento,"getCho")));
        cloneAlimento.setFibra(Util.treatDouble(this.getValue(alimento,"getFibra")));
        cloneAlimento.setCalcio(Util.treatDouble(this.getValue(alimento,"getCalcio")));
        cloneAlimento.setMg(Util.treatDouble(this.getValue(alimento,"getMg")));
        cloneAlimento.setMn(Util.treatDouble(this.getValue(alimento,"getMn")));
        cloneAlimento.setP(Util.treatDouble(this.getValue(alimento,"getP")));
        cloneAlimento.setFerro(Util.treatDouble(this.getValue(alimento,"getFerro")));
        cloneAlimento.setSodio(Util.treatDouble(this.getValue(alimento,"getSodio")));
        cloneAlimento.setPotassio(Util.treatDouble(this.getValue(alimento,"getPotassio")));
        cloneAlimento.setCobre(Util.treatDouble(this.getValue(alimento,"getCobre")));
        cloneAlimento.setZinco(Util.treatDouble(this.getValue(alimento,"getZinco")));
        cloneAlimento.setRetinol(Util.treatDouble(this.getValue(alimento,"getRetinol")));
        cloneAlimento.setTiamina(Util.treatDouble(this.getValue(alimento,"getTiamina")));
        cloneAlimento.setRiboflavina(Util.treatDouble(this.getValue(alimento,"getRiboflavina")));
        cloneAlimento.setPiridoxina(Util.treatDouble(this.getValue(alimento,"getPiridoxina")));
        cloneAlimento.setNiacina(Util.treatDouble(this.getValue(alimento,"getNiacina")));
        cloneAlimento.setVitc(Util.treatDouble(this.getValue(alimento,"getVitc")));
        cloneAlimento.setVitd(Util.treatDouble(this.getValue(alimento,"getVitd")));
        cloneAlimento.setVite(Util.treatDouble(this.getValue(alimento,"getVite")));
        cloneAlimento.setInativo(this.getValue(alimento,"getInativo"));
        cloneAlimento.setVersion(this.getValue(alimento, "getVersion"));

        cloneAlimento.setAlimentoMedidaAlimentares(
                new AlimentoMedidaAlimentarBuilder().cloneList(
                        this.getValue(alimento,"getAlimentoMedidaAlimentares")))        
        
        return cloneAlimento;
    }
    
    cloneList(alimentos: Array<Alimento>): Array<Alimento> {
        let array:Array<Alimento> = new Array<Alimento>();
        if (alimentos !== null && alimentos !== undefined) { 
            for (let alimento of alimentos) {
                array.push(this.clone(alimento));
            }
        }
        
        return array;
    }
}