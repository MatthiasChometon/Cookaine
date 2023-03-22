import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql'
import { UserService } from './user.service'
import { UseGuards } from '@nestjs/common'
import { UpdateUserInput } from './dto/update-user.input'
import { User } from './methods/user.methods'
import { UserStatus } from './enums/user-status.enum'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { IsAdminGuard } from './guards/is-admin.guard'

@Resolver(User)
export class UserResolver {
	constructor(
		private readonly userService: UserService,
		@InjectRepository(User)
		private userRepository: Repository<User>,
	) {}

	@Mutation(() => User)
	updateAccount(
		@Args('updateUserInput') updateUserInput: UpdateUserInput,
		@Context() context,
	): Promise<User> {
		return this.userService.updateAndGet(context.req.user.id, updateUserInput)
	}

	@Query(() => User)
	account(@Context() context): Promise<User> {
		return context.req.user
	}

	@Mutation(() => User)
	banUser(@Args('id') id: string): Promise<User> {
		return this.userService.updateAndGet(id, { status: UserStatus.isBanned })
	}

	@Query(() => [User])
	@UseGuards(IsAdminGuard)
	users(): Promise<User[]> {
		return this.userRepository.find()
	}

	@Query(() => User)
	@UseGuards(IsAdminGuard)
	user(@Args('id') id: string): Promise<User> {
		return this.userRepository.findOneByOrFail({ id })
	}
}
