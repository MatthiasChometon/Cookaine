import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ValidationPipe } from '@nestjs/common'
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard'

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		cors: true,
	})
	app.useGlobalPipes(new ValidationPipe())
	app.enableCors({
		origin: process.env.CORS_ORIGIN,
	})
	app.useGlobalGuards(new JwtAuthGuard(new Reflector()))
	const port = process.env.PORT || 4000

	await app.listen(port)
	console.log(`server listen on http://localhost:${port}/graphql`)
}
bootstrap()
