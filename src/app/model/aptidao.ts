import { Aso } from './aso';
import { GrupoMonitoramento } from './grupo-monitoramento';

export class Aptidao {
	private id: number;
	private aptidaoAso: string = "";
	private aso: Aso;
    private grupoMonitoramento :GrupoMonitoramento;
	private version: number;

	getId() {
		return this.id;
	}

	setId(id: number) {
		this.id = id;
	}
	
	getAptidaoAso() {
		return this.aptidaoAso;
	}

	setAptidaoAso(aptidaoAso: string) {
		this.aptidaoAso = aptidaoAso;
	}
	
	getGrupoMonitoramento() {
		return this.grupoMonitoramento;
	}

	setGrupoMonitoramento(grupoMonitoramento: GrupoMonitoramento) {
		this.grupoMonitoramento = grupoMonitoramento;
	}
	
   getAso() {
        return this.aso;
    }

    setAso(aso: Aso) {
        this.aso = aso;
    }

	getVersion() {
		return this.version;
	}

	setVersion(version: number) {
		this.version = version;
	}	
}
