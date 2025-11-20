import { Repository } from 'typeorm';
import { ReceitaModel } from '../models/RecipeModel';
import { Recipe } from '../../../domain/entities/recipe';
import { ICreateRecipeRepository } from '../../../../application/repositories/ICreateRecipeRepository';
import { TypeOrmConnection } from '../../../../../shared/infra/database/TypeOrmConnection'; 


/**
 * @class ReceitaRepository
 * Implementação do Repositório de Receitas usando TypeORM e PostgreSQL.
 * Este é o Adaptador que implementa a porta de saída ICriarReceitaRepository.
 */
export class ReceitaRepository implements ICreateRecipeRepository {
    
    private ormRepository: Repository<ReceitaModel>;

    constructor() {
        // Usa o Singleton para obter o DataSource e o Repositório TypeORM.
        this.ormRepository = TypeOrmConnection.getInstance().getDataSource().getRepository(ReceitaModel);
    }

    /**
     * Implementa o método 'criar' do protocolo.
     * @param receita A Entidade Receita pura vinda do Use Case.
     * @returns Receita A Entidade salva.
     */
    public async criar(receita: Recipe): Promise<Recipe> {
        
        // 1. Converte a Entidade de Domínio (Receita) para o Modelo ORM (ReceitaModel)
        const receitaModel = this.ormRepository.create({
            id: receita.id,
            titulo: receita.titulo,
            descricao: receita.descricao,
            ingredientes: receita.ingredientes,
            modoPreparo: receita.modoPreparo,
            fotoUrl: receita.fotoUrl,
            dataPublicacao: receita.dataPublicacao,
            autorId: receita.autor.id, // Acessa o ID do autor para salvar a FK
        });
        
        // 2. Salva no banco de dados
        await this.ormRepository.save(receitaModel);
        
        // 3. Retorna a Entidade original (ou uma nova Entidade se houver dados gerados no DB)
        return receita; 
    }
}