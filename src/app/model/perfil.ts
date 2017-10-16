import { Permissao } from './permissao';

export class Perfil {
    private id: number = 0;
    private titulo: string;
    private permissoes: Array<Permissao>;
    private version: number;

    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getTitulo() {
        return this.titulo;
    }

    setTitulo(titulo: string) {
        this.titulo = titulo;
    }

    getVersion() {
        return this.version;
    }

    setVersion(version: number) {
        this.version = version;
    }

    getPermissoes() {
        return this.permissoes;
    }

    setPermissoes(permissoes: Array<Permissao> ) {
        this.permissoes = permissoes;
    }
}
