import { Tarefa } from './tarefa';
import { Triagem } from './triagem';
import { Acompanhamento } from './acompanhamento';
import { AcaoIntervencao } from './acao-intervencao';

export class Acao {
	private id: number;
	private tipo: string = "";
	private status: string = "";
	private tipoContato: string = "";
	private acaoIntervencao: AcaoIntervencao;
	private triagem: Triagem;
    private acompanhamentos: Array<Acompanhamento>; 
    private selecionado: string = "";
	private version: number;

	getId() {
		return this.id;
	}

	setId(id: number) {
		this.id = id;
	}

	getTipo() {
		return this.tipo;
	}

	setTipo(tipo: string) {
		this.tipo = tipo;
	}

	getStatus() {
		return this.status;
	}

	setStatus(status: string) {
		this.status = status;
	}

    getSelecionado(){
        return this.selecionado;
    }
    
    setSelecionado(selecionado:string){
        this.selecionado = selecionado;
    }
    
	getTipoContato() {
		return this.tipoContato;
	}

	setTipoContato(tipoContato: string) {
		this.tipoContato = tipoContato;
	}

	getAcaoIntervencao() {
		return this.acaoIntervencao;
	}

	setAcaoIntervencao(acaoIntervencao: AcaoIntervencao) {
		this.acaoIntervencao = acaoIntervencao;
	}
	getTriagem() {
		return this.triagem;
	}

	setTriagem(triagem: Triagem) {
		this.triagem = triagem;
	}
	
    getAcompanhamentos() {
        return this.acompanhamentos;
    }

    setAcompanhamentos(acompanhamentos: Array<Acompanhamento>) {
        this.acompanhamentos = acompanhamentos;
    }

	getVersion() {
		return this.version;
	}

	setVersion(version: number) {
		this.version = version;
	}
}
