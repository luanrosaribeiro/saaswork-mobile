export class Usuario {
    public id: string;
    public nome: string;
    public email: string;
    public fone: string;

    constructor(objeto?: Partial<Usuario>) {
        if(objeto){
            this.id = objeto.id
            this.nome = objeto.nome
            this.email = objeto.email
            this.fone = objeto.fone
        }
    }

    toString() {
        const objeto = `{
            "id" : "${ this.id }",
            "nome" : "${ this.nome }",
            "email" : "${ this.email }",
            "fone" : "${ this.fone }",
        }`
        return objeto
    }
}