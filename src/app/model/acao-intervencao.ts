import { Equipe } from './equipe';

export class AcaoIntervencao {
	private id: number;
	private descricao: string = "";
	private equipe: Equipe;
	private version: number;

	getId() {
		return this.id;
	}

	setId(id: number) {
		this.id = id;
	}
	
	getDescricao() {
		return this.descricao;
	}

	setDescricao(descricao: string) {
		this.descricao = descricao;
	}
	
	getEquipe() {
		return this.equipe;
	}

	setEquipe(equipe: Equipe) {
		this.equipe = equipe;
	}

	getVersion() {
		return this.version;
	}

	setVersion(version: number) {
		this.version = version;
	}
}
