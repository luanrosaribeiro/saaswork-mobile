export class Usuario {
    public id: string;
    public nome: string;
    public email: string;
    public fone: string;
    public senha: string;
    public tipo: string;
    public cpf: string;
    public cnpj: string;
    public dt_nascimento: string;

    constructor(objeto?: Partial<Usuario>) {
        if(objeto){
            this.id = objeto.id
            this.nome = objeto.nome
            this.email = objeto.email
            this.fone = objeto.fone
            this.senha = objeto.senha
            this.tipo = objeto.tipo
            this.cpf = objeto.cpf
            this.cnpj = objeto.cnpj
            this.dt_nascimento = objeto.dt_nascimento
        }
    }

    toString() {
        const objeto = `{
            "id" : "${ this.id }",
            "nome" : "${ this.nome }",
            "email" : "${ this.email }",
            "fone" : "${ this.fone }",
            "senha" : "${ this.senha }",
            "tipo" : "${ this.tipo }",
            "cpf" : "${ this.cpf }",
            "cnpj" : "${ this.cnpj }",
            "dt_nascimento" : "${ this.dt_nascimento }"
        }`
        return objeto
    }

    toFirestore() {
        const usuario = {
            id: this.id,
            nome: this.nome,
            email: this.email,
            fone: this.fone,
            senha: this.senha,
            tipo: this.tipo,
            cpf: this.cpf,
            cnpj: this.cnpj,
            dt_nascimento: this.dt_nascimento
        }
        return usuario
    }
}