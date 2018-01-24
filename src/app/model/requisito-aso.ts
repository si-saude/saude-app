export class RequisitoAso {
    private id: number = 0;
    private conteudo: string;
    private conforme: boolean;
    private version: number;

    getId() {
        return this.id;
    }
    
    setId(id: number) {
        this.id = id;
    }
    
    getConteudo() {
        return this.conteudo;
    }
    
    setConteudo(conteudo: string) {
        this.conteudo = conteudo;
    }
    
    getConforme() {
        return this.conforme;
    }
    
    setConforme( conforme: boolean ) {
        this.conforme = conforme;
    }
    
    getVersion() {
        return this.version;
    }
    
    setVersion(version: number) {
        this.version = version;
    }
}