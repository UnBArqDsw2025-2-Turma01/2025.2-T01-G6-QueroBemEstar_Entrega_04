import { Recipe } from '../entities/recipe';
import { User } from '../../../users/domain/entities/user';


export interface IRecipeBuilder {
    comTitulo(titulo: string): this;
    comDescricao(descricao: string): this;
    comIngredientes(ingredientes: string[]): this;
    comModoPreparo(modo: string): this;
    comFotoUrl(url: string): this;
    comDataPublicacao(data: Date): this;
    comAutor(autor: User): this;
    getResult(): Recipe;
}

/**
 * @pattern Builder
 * Permite a construção fluente e segura da Entidade Receita.
 */
export class RecipeBuilder implements IRecipeBuilder {
    private id?: number;
    private titulo: string = '';
    private descricao: string = '';
    private ingredientes: string[] = [];
    private modoPreparo: string = '';
    private fotoUrl: string = '';
    private dataPublicacao: Date = new Date();
    private autor!: User; 



    public comTitulo(titulo: string): this {
        if (!titulo || titulo.length < 5) throw new Error('Builder: O título deve ter no mínimo 5 caracteres.');
        this.titulo = titulo;
        return this;
    }

    public comDescricao(descricao: string): this {
        this.descricao = descricao;
        return this;
    }
    
    public comIngredientes(ingredientes: string[]): this {
        if (!ingredientes || ingredientes.length === 0) throw new Error('Builder: A receita deve ter ingredientes.');
        this.ingredientes = ingredientes;
        return this;
    }

    public comModoPreparo(modo: string): this {
        this.modoPreparo = modo;
        return this;
    }
    
    public comFotoUrl(url: string): this {
        this.fotoUrl = url;
        return this;
    }

    public comDataPublicacao(data: Date): this {
        this.dataPublicacao = data;
        return this;
    }

    public comAutor(autor: User): this {
        this.autor = autor;
        return this;
    }

    /**
     * @method getResult
     * Finaliza a construção e retorna a Entidade Receita.
     */
    public getResult(): Recipe {
        if (!this.id || !this.titulo || !this.autor || !this.ingredientes) {
             throw new Error('Builder: Não foi possível construir a Receita. Faltam campos obrigatórios (Id, Título, Autor, Ingredientes).');
        }

        return Recipe.createReceita(this.id,this.titulo,this.descricao,this.ingredientes,this.modoPreparo,this.fotoUrl,this.dataPublicacao,this.autor)
    }
}