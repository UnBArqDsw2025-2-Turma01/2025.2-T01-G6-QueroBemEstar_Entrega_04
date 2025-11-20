
import { 
    ICreateRecipeUseCase, 
    CreateRecipeInput 
} from '../ports/ICreateRecipeUseCase'; 
import { ICreateRecipeRepository } from '../repositories/ICreateRecipeRepository'; 
import { Recipe } from '../../domain/entities/recipe'; 
import { RecipeBuilder } from '../../domain/patterns/RecipeBuilder';
//import { IBuscarUsuarioRepository } from '../../../users/application/protocols/IBuscarUsuarioRepository'; 
import { User } from '../../../users/domain/entities/user'; 


/**
 * @class AddRecipeUseCase
 * Implementa o Caso de Uso para adicionar uma nova receita (Implementa ICreateRecipeUseCase).
 */
export class AddRecipeUseCase implements ICreateRecipeUseCase {

    private readonly receitaRepository: ICreateRecipeRepository;
    private readonly RecipeBuilder: RecipeBuilder; 

    constructor(
        receitaRepository: ICreateRecipeRepository,
    ) {
        this.receitaRepository = receitaRepository;
        //this.usuarioRepository = usuarioRepository;
        this.RecipeBuilder = new RecipeBuilder(); 
    }

    public async execute(entrada: CreateRecipeInput): Promise<Recipe> {
        
        //const autor: User | null = await usuarioRepository.buscarPorId(entrada.authorId);
        
        if (!autor) {
            throw new Error('Usuário autor não encontrado (ID inválido).');
        }
        
        // 2. Criação da Entidade: Usar o Padrão Builder
        const novaReceita = RecipeBuilder
            .comTitulo(entrada.title)
            .comDescricao(entrada.description)
            .comIngredientes(entrada.ingredients)
            .comModoPreparo(entrada.preparationMethod)
            .comFotoUrl(entrada.photoUrl)
            .comDataPublicacao(new Date())
            .comAutor(autor) 
            .getResult();

        const receitaSalva = await this.receitaRepository.create(novaReceita);

        return receitaSalva;
    }
}