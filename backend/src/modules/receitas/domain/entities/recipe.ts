import { User } from '../../../users/domain/entities/user'; 


export class Recipe {
    private _id: number;
    private _titulo: string;
    private _descricao: string;
    private _ingredientes: string[];
    private _modoPreparo: string;
    private _fotoUrl: string;
    private _dataPublicacao: Date;
    private _autor: User;


    private constructor(
        id: number,
        titulo: string,
        descricao: string,
        ingredientes: string[],
        modoPreparo: string,
        fotoUrl: string,
        dataPublicacao: Date,
        autor: User,
    ) {
        if (!id || !titulo || !autor) {
            throw new Error('Entidade Receita: Campos ID, Título ou Autor são obrigatórios.');
        }

        this._id = id;
        this._titulo = titulo;
        this._descricao = descricao;
        this._ingredientes = ingredientes;
        this._modoPreparo = modoPreparo;
        this._fotoUrl = fotoUrl;
        this._dataPublicacao = dataPublicacao;
        this._autor = autor;
    }


    get id(): number { return this._id; }
    get titulo(): string { return this._titulo; }
    get autor(): User { return this._autor; }
    get ingredientes(): string[] { return this._ingredientes; }



   
    public static createReceita(
        id: number,
        titulo: string,
        descricao: string,
        ingredientes: string[],
        modoPreparo: string,
        fotoUrl: string,
        dataPublicacao: Date,
        autor: User
    ): Recipe {
        return new Recipe(
            id,
            titulo,
            descricao,
            ingredientes,
            modoPreparo,
            fotoUrl,
            dataPublicacao,
            autor
        );
    }


 


}