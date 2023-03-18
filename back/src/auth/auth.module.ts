import { Global, Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'
import { LocalStrategy } from './strategies/local.strategy'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './strategies/jwt-strategy'
import { EmailModule } from 'src/email/email.module'
import { ConfigModule } from '@nestjs/config'
import { TokenService } from './token.service'

@Global()
@Module({
	imports: [
		ConfigModule.forRoot(),
		PassportModule,
		JwtModule.register({
			signOptions: {
				expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
			},
			secret: process.env.ACCESS_TOKEN_SECRET,
		}),
		EmailModule,
	],
	providers: [
		AuthService,
		TokenService,
		LocalStrategy,
		JwtStrategy,
		AuthResolver,
	],
	exports: [AuthService, TokenService],
})
export class AuthModule {}
