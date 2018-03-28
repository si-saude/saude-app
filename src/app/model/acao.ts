import { Tarefa } from './tarefa';
import { Triagem } from './triagem';

export class Acao {
	private id: number;
	private tipo: string = "";
	private status: string = "";
	private tipoContato: string = "";
	private detalhe: string;
	private tarefa: Tarefa;
	private triagem: Triagem;
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

	getVersion() {
		return this.version;
	}

	setVersion(version: number) {
		this.version = version;
	}
}
