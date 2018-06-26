export class AgendaPeriodicoDto {
    private empregadoId: number;
    private empregadoNome: string;
    private status: string;
    private data: string;
    private nomeServico: string;
    private pendencias: string;
    
    getEmpregadoId() {
        return this.empregadoId;
    }
    setEmpregadoId(empregadoId: number) {
        this.empregadoId = empregadoId;
    }
    getEmpregadoNome() {
        return this.empregadoNome;
    }
    setEmpregadoNome(empregadoNome: string) {
        this.empregadoNome = empregadoNome;
    }
    getStatus() {
        return this.status;
    }
    setStatus(status: string) {
        this.status = status;
    }
    getData() {
        return this.data;
    }
    setData(data: string) {
        this.data = data;
    }
    setNomeServico(nomeServico: string) {
        this.nomeServico = nomeServico;
    }
    getNomeServico() {
        return this.nomeServico;
    }
    setPendencias(pendencias: string) {
        this.pendencias = pendencias;
    }
    getPendencias() {
        return this.pendencias;
    }
}
