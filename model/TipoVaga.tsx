export class TipoVaga {
    public id: string;
    public nome: string;

    constructor(objeto?: Partial<TipoVaga>) {
        if(objeto){
            this.id = objeto.id
            this.nome = objeto.nome
        }
    }

    toString() {
        const objeto = `{
            "id": "${ this.id }",
            "nome": "${ this.nome }"
        }`
        return objeto;
    }

    toFirestore() {
        const tipoVaga = {
            id: this.id,
            nome: this.nome
        }
        return tipoVaga;
    }
    
}