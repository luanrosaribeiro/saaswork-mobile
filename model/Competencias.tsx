export class Competencia {
    public id: string;
    public nome: string;
    public dt_inicio: string;
    public dt_final: string;
    public carga_horaria: string;
    public tipo: string;
    public instituicao: string;

    constructor(objeto?: Partial<Competencia>) {
        if(objeto){
            this.id = objeto.id
            this.nome = objeto.nome
            this.dt_inicio = objeto.dt_inicio
            this.dt_final = objeto.dt_final
            this.carga_horaria = objeto.carga_horaria
            this.tipo = objeto.tipo
            this.instituicao = objeto.instituicao
        }
    }

    toString() {
        const objeto = `{
            "id": "${ this.id }",
            "nome": "${ this.nome }",
            "dt_inicio": "${ this.dt_inicio }",
            "dt_final": "${ this.dt_final }",
            "carga_horaria": "${ this.carga_horaria }",
            "tipo": "${ this.tipo }",
            "instituicao": "${ this.instituicao }",
        }`
        return objeto;
    }

    toFirestore() {
        const competencia = {
            id: this.id,
            nome: this.nome,
            dt_inicio: this.dt_inicio,
            dt_final: this.dt_final,
            carga_horaria: this.carga_horaria,
            tipo: this.tipo,
            instituicao: this.instituicao,
        }
        return competencia;
    }
    
}