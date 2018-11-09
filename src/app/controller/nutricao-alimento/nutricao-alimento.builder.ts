import { NutricaoAlimento } from '../../model/nutricao-alimento';
import { NutricaoAlimentoMedidaAlimentarBuilder } from './../nutricao-alimento-medida-alimentar/nutricao-alimento-medida-alimentar.builder';
import { GenericBuilder } from '../../generics/generic.builder';
import { Util } from './../../generics/utils/util';

export class NutricaoAlimentoBuilder extends GenericBuilder {

    initialize(nutricaoAlimento: NutricaoAlimento) {
        nutricaoAlimento = new NutricaoAlimento();
        
        nutricaoAlimento.setNutricaoAlimentoMedidaAlimentares(new NutricaoAlimentoMedidaAlimentarBuilder().initializeList(null));
        
        return nutricaoAlimento;
    }
    
    initializeList(nutricaoAlimentos: Array<NutricaoAlimento>) {
        
        let array:Array<NutricaoAlimento> = new Array<NutricaoAlimento>();
        
        if(nutricaoAlimentos === null || nutricaoAlimentos === undefined)
            nutricaoAlimentos = new Array<NutricaoAlimento>();
        
        for (let nutricaoAlimento of nutricaoAlimentos) {
            array.push(this.initialize(nutricaoAlimento));
        }
        
        return array;
    }
    
    clone(nutricaoAlimento: NutricaoAlimento): NutricaoAlimento {
        
        if (nutricaoAlimento === null || nutricaoAlimento === undefined)
            nutricaoAlimento = new NutricaoAlimento();
        
        let cloneNutricaoAlimento = new NutricaoAlimento();
        cloneNutricaoAlimento.setId(this.getValue(nutricaoAlimento,"getId"));
        cloneNutricaoAlimento.setNome(this.getValue(nutricaoAlimento,"getNome"));
        cloneNutricaoAlimento.setTipo(this.getValue(nutricaoAlimento,"getTipo"));
        cloneNutricaoAlimento.setPadrao(Util.treatDouble(this.getValue(nutricaoAlimento,"getPadrao")));
        cloneNutricaoAlimento.setEnergia(Util.treatDouble(this.getValue(nutricaoAlimento,"getEnergia")));
        cloneNutricaoAlimento.setProteina(Util.treatDouble(this.getValue(nutricaoAlimento,"getProteina")));
        cloneNutricaoAlimento.setLipideos(Util.treatDouble(this.getValue(nutricaoAlimento,"getLipideos")));
        cloneNutricaoAlimento.setSaturada(Util.treatDouble(this.getValue(nutricaoAlimento,"getSaturada")));
        cloneNutricaoAlimento.setMonoinsaturada(Util.treatDouble(this.getValue(nutricaoAlimento,"getMonoinsaturada")));
        cloneNutricaoAlimento.setPoliinsaturada(Util.treatDouble(this.getValue(nutricaoAlimento,"getPoliinsaturada")));
        cloneNutricaoAlimento.setOmega6(Util.treatDouble(this.getValue(nutricaoAlimento,"getOmega6")));
        cloneNutricaoAlimento.setOmega3(Util.treatDouble(this.getValue(nutricaoAlimento,"getOmega3")));
        cloneNutricaoAlimento.setColesterol(Util.treatDouble(this.getValue(nutricaoAlimento,"getColesterol")));
        cloneNutricaoAlimento.setCho(Util.treatDouble(this.getValue(nutricaoAlimento,"getCho")));
        cloneNutricaoAlimento.setFibra(Util.treatDouble(this.getValue(nutricaoAlimento,"getFibra")));
        cloneNutricaoAlimento.setCalcio(Util.treatDouble(this.getValue(nutricaoAlimento,"getCalcio")));
        cloneNutricaoAlimento.setMg(Util.treatDouble(this.getValue(nutricaoAlimento,"getMg")));
        cloneNutricaoAlimento.setMn(Util.treatDouble(this.getValue(nutricaoAlimento,"getMn")));
        cloneNutricaoAlimento.setP(Util.treatDouble(this.getValue(nutricaoAlimento,"getP")));
        cloneNutricaoAlimento.setFerro(Util.treatDouble(this.getValue(nutricaoAlimento,"getFerro")));
        cloneNutricaoAlimento.setSodio(Util.treatDouble(this.getValue(nutricaoAlimento,"getSodio")));
        cloneNutricaoAlimento.setPotassio(Util.treatDouble(this.getValue(nutricaoAlimento,"getPotassio")));
        cloneNutricaoAlimento.setCobre(Util.treatDouble(this.getValue(nutricaoAlimento,"getCobre")));
        cloneNutricaoAlimento.setZinco(Util.treatDouble(this.getValue(nutricaoAlimento,"getZinco")));
        cloneNutricaoAlimento.setRetinol(Util.treatDouble(this.getValue(nutricaoAlimento,"getRetinol")));
        cloneNutricaoAlimento.setTiamina(Util.treatDouble(this.getValue(nutricaoAlimento,"getTiamina")));
        cloneNutricaoAlimento.setRiboflavina(Util.treatDouble(this.getValue(nutricaoAlimento,"getRiboflavina")));
        cloneNutricaoAlimento.setPiridoxina(Util.treatDouble(this.getValue(nutricaoAlimento,"getPiridoxina")));
        cloneNutricaoAlimento.setNiacina(Util.treatDouble(this.getValue(nutricaoAlimento,"getNiacina")));
        cloneNutricaoAlimento.setVitc(Util.treatDouble(this.getValue(nutricaoAlimento,"getVitc")));
        cloneNutricaoAlimento.setVitd(Util.treatDouble(this.getValue(nutricaoAlimento,"getVitd")));
        cloneNutricaoAlimento.setVite(Util.treatDouble(this.getValue(nutricaoAlimento,"getVite")));
        cloneNutricaoAlimento.setInativo(this.getValue(nutricaoAlimento,"getInativo"));
        cloneNutricaoAlimento.setVersion(this.getValue(nutricaoAlimento, "getVersion"));
        
        cloneNutricaoAlimento.setNutricaoAlimentoMedidaAlimentares(
                new NutricaoAlimentoMedidaAlimentarBuilder().cloneList(
                        this.getValue(nutricaoAlimento,"getNutricaoAlimentoMedidaAlimentares")))
        
        return cloneNutricaoAlimento;
    }
    
    cloneList(nutricaoAlimentos: Array<NutricaoAlimento>): Array<NutricaoAlimento> {
        let array:Array<NutricaoAlimento> = new Array<NutricaoAlimento>();
        if (nutricaoAlimentos !== null && nutricaoAlimentos !== undefined) { 
            for (let nutricaoAlimento of nutricaoAlimentos) {
                array.push(this.clone(nutricaoAlimento));
            }
        }
        
        return array;
    }
}