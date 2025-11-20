import { User } from '../entities/user'

export class UserBuilder {
    private user: User

    constructor() {
        this.user = User.create({ nome: '', senha: '' })
    }

    public comNome(nome: string): UserBuilder {
        this.user.nome = nome
        return this
    }

    public comSenha(senha: string): UserBuilder {
        this.user.senha = senha
        return this
    }

    public build(): User {
        return this.user
    }
}
