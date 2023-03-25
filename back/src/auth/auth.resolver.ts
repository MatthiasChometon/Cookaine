import { UseGuards } from '@nestjs/common'
import { Args, Context, Int, Mutation, Resolver } from '@nestjs/graphql'
import { User } from 'src/user/methods/user.methods'
import { CreateUserInput } from '../user/dto/create-user.input'
import { AuthService } from './auth.service'
import { LoginResponse } from './dto/login-response'
import { LoginUserInput } from './dto/login-user.input'
import { GqlAuthGuard } from './guards/gql-auth-guard'
import { TokenService } from './token.service'
import { IsPublic } from './guards/is-public.guard'

@Resolver()
export class AuthResolver {
	constructor(private authService: AuthService, private tokenService: TokenService) {}

	@Mutation(() => User)
	@IsPublic()
	register(@Args('createUserInput') input: CreateUserInput): Promise<User> {
		return this.authService.register(input)
	}

	@Mutation(() => User)
	@IsPublic()
	sendRegisterConfirmation(@Args('email') email: string): Promise<User> {
		return this.authService.sendRegisterConfirmation(email)
	}

	@Mutation(() => LoginResponse)
	@IsPublic()
	confirmEmail(
		@Args({ type: () => Int, name: 'emailCode' }) emailCode: number,
		@Args('email') email: string,
	): Promise<LoginResponse> {
		return this.authService.confirmEmail(emailCode, email)
	}

	@Mutation(() => LoginResponse)
	@UseGuards(GqlAuthGuard)
	@IsPublic()
	login(
		@Args('loginUserInput') _loginUserInput: LoginUserInput,
		@Context() context,
	): Promise<LoginResponse> {
		return this.authService.login(context.user)
	}

	@Mutation(() => LoginResponse)
	@IsPublic()
	refreshTokens(@Args('refreshToken') refreshToken: string): Promise<LoginResponse> {
		return this.tokenService.refresh(refreshToken)
	}

	@Mutation(() => String)
	sendResetPasswordCode(@Args('email') email: string): Promise<string> {
		return this.authService.sendForgotPasswordCode(email)
	}

	@Mutation(() => LoginResponse)
	resetPassword(
		@Args('email') email: string,
		@Args('emailCode') code: number,
		@Args('newPassword') password: string,
	): Promise<LoginResponse> {
		return this.authService.resetPassword(email, code, password)
	}
}
