import { Recipe} from '../../domain/entities/recipe';


export interface ICreateRecipeRepository {
    /**
     * @param recipe A entidade Recipe pura a ser salva.
     * @returns Promise<Recipe> A entidade Recipe salva (incluindo ID/timestamp, se gerados pelo DB).
     */
    create(recipe: Recipe): Promise<Recipe>;
}