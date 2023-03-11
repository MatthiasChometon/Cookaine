import { faker } from '@faker-js/faker'
import { define } from 'typeorm-seeding'

define(User, (faker: typeof Faker) => {
	const gender = faker.datatype.number(1)
	const firstName = faker.name.firstName(gender)
	const lastName = faker.name.lastName(gender)

	const user = new User()
	user.name = `${firstName} ${lastName}`
	user.password = faker.random.word()
	return user
})
