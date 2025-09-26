export class Usuario {
    public id: string;
    public nome: string;
    public email: string;
    public fone: string;
    public senha: string;

    constructor(objeto?: Partial<Usuario>) {
        if(objeto){
            this.id = objeto.id
            this.nome = objeto.nome
            this.email = objeto.email
            this.fone = objeto.fone
            this.senha = objeto.senha
        }
    }

    toString() {
        const objeto = `{
            "id" : "${ this.id }",
            "nome" : "${ this.nome }",
            "email" : "${ this.email }",
            "fone" : "${ this.fone }",
            "senha" : "${ this.senha }"
        }`
        return objeto
    }

    toFirestore() {
        const usuario = {
            id: this.id,
            nome: this.nome,
            email: this.email,
            fone: this.fone,
            senha: this.senha
        }
        return usuario
    }
}