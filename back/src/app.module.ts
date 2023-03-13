import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { ConfigModule } from '@nestjs/config/dist/config.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RecipeModule } from './recipe/recipe.module'
import { UserModule } from './user/user.module'
import { IngredientModule } from './ingredient/ingredient.module'
import { TagModule } from './tag/tag.module'
import { EmailModule } from './email/email.module'
import { AuthModule } from './auth/auth.module'

type DatabaseType = 'mysql' | 'postgres' | 'mariadb' | 'sqlite' | 'mssql'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
			sortSchema: true,
			introspection: true,
			playground: true,
		}),
		TypeOrmModule.forRoot({
			type: process.env.DATABASE_TYPE as DatabaseType,
			host: process.env.DATABASE_HOST,
			port: parseInt(process.env.DATABASE_PORT),
			username: process.env.DATABASE_USERNAME,
			password: process.env.DATABASE_PASSWORD,
			database: process.env.DATABASE_NAME,
			autoLoadEntities: true,
			synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
		}),
		RecipeModule,
		UserModule,
		IngredientModule,
		TagModule,
		EmailModule,
		UserModule,
		AuthModule,
	],
})
export class AppModule {}
