import { User } from '../../domain/entities/user'

export interface ISearchUserRepository {
    findById(id: number): Promise<User | null>
}
