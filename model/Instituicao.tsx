export class Instituicao {
    public id: string;
    public nome: string;
    public cep: string;
    public endereco: string;
    public numero: string;
    public telefone: string;

    constructor(objeto?: Partial<Instituicao>) {
        if(objeto){
            this.id = objeto.id
            this.nome = objeto.nome
            this.cep = objeto.cep
            this.endereco = objeto.endereco
            this.numero = objeto.numero
            this.telefone = objeto.telefone
        }
    }

    toString() {
        const objeto = `{
            "id": "${ this.id }",
            "nome": "${ this.nome }",
            "cep": "${ this.cep }",
            "endereco": "${ this.endereco }",
            "numero": "${ this.numero }",
            "telefone": "${ this.telefone }"
        }`
        return objeto;
    }

    toFirestore() {
        const instituicao = {
            id: this.id,
            nome: this.nome,
            cep: this.cep,
            endereco: this.endereco,
            numero: this.numero,
            telefone: this.telefone
        }
        return instituicao;
    }
    
}