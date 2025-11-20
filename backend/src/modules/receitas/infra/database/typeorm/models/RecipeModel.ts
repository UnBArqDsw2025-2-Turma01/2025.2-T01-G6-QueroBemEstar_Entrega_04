import { 
    Entity, 
    PrimaryColumn, 
    Column, 
    CreateDateColumn, 
    ManyToOne, 
    JoinColumn,
    OneToMany
} from 'typeorm';
//import { UsuarioModel } from '../../../../../users/infra/database/typeorm/models/UsuarioModel'; 
//import { ComentarioModel } from '../../../../../social/infra/database/typeorm/models/ComentarioModel';
//import { CurtidaModel } from '../../../../../social/infra/database/typeorm/models/CurtidaModel';

/**
 * @class ReceitaModel
 * Mapeamento da Entidade Receita para a tabela 'receitas' no PostgreSQL.
 */
@Entity('receitas')
export class ReceitaModel {
    
    @PrimaryColumn({ type: 'uuid' })
    id!: string; // Usando string (UUID) para consistência

    @Column()
    titulo!: string;

    @Column('text')
    descricao!: string;

    @Column('text', { array: true }) // Armazenado como array de texto (depende da sua configuração PostgreSQL)
    ingredientes!: string[]; 

    @Column('text')
    modoPreparo!: string;

    @Column()
    fotoUrl!: string;

    @CreateDateColumn({ name: 'data_publicacao' })
    dataPublicacao!: Date;

    // Relação N:1 (Muitas receitas para um autor)
    @ManyToOne(() => UsuarioModel)
    @JoinColumn({ name: 'autor_id' })
    autor!: UsuarioModel;
    
    // Coluna para armazenar a FK (necessária para queries)
    @Column({ name: 'autor_id' })
    autorId!: string;
    
    // Relação 1:N com Comentários e Curtidas
    @OneToMany(() => ComentarioModel, comentario => comentario.receita)
    comentarios!: ComentarioModel[];

    @OneToMany(() => CurtidaModel, curtida => curtida.receita)
    curtidas!: CurtidaModel[];
}