import { Tarefa } from './tarefa';
import { Triagem } from './triagem';
import { Acompanhamento } from './acompanhamento';

export class Acao {
	private id: number;
	private tipo: string = "";
	private status: string = "";
	private tipoContato: string = "";
	private detalhe: string;
	private tarefa: Tarefa;
	private triagem: Triagem;
    private acompanhamentos: Array<Acompanhamento>; 
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

	getTipoContato() {
		return this.tipoContato;
	}

	setTipoContato(tipoContato: string) {
		this.tipoContato = tipoContato;
	}

	getDetalhe() {
		return this.detalhe;
	}

	setDetalhe(detalhe: string) {
		this.detalhe = detalhe;
	}

	getTarefa() {
		return this.tarefa;
	}

	setTarefa(tarefa: Tarefa) {
		this.tarefa = tarefa;
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
