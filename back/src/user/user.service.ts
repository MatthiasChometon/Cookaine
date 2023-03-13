import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm/repository/Repository'
import { CreateUserInput } from './dto/create-user.input'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './methods/user.methods'
import { UpdateUserInput } from './dto/update-user.input'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
	) {}

	async update(
		user: Partial<UpdateUserInput> | number,
		payload: Partial<User>,
	): Promise<void> {
		await this.userRepository.update(user, { ...payload })
	}

	async insertOneAndGet(createUserInput: CreateUserInput): Promise<User> {
		const user = await this.userRepository.insert(createUserInput)
		return await this.userRepository.findOneBy({
			id: user.identifiers[0].id,
		})
	}

	async updateAndGet(id: number, payload: Partial<User>): Promise<User> {
		await this.userRepository.update({ id }, { ...payload })
		return await this.userRepository.findOneBy({ id })
	}
}
