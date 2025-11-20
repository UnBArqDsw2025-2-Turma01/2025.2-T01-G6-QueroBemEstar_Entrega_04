import { Recipe } from '../../domain/entities/recipe';


export interface CreateRecipeInput {
    title: string;
    description: string;
    ingredients: string[];
    preparationMethod: string;
    photoUrl: string;
    authorId: string; 
}

export interface ICreateRecipeUseCase {
    /**
     * @param input Dados brutos da requisição (title, description, etc.).
     * @returns Promise<Recipe> A entidade Recipe criada e salva.
     */
    execute(input: CreateRecipeInput): Promise<Recipe>;
}