import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'

export function NoDuplicates<T>(validationOptions?: ValidationOptions) {
	return function (object: T, propertyName: string): void {
		registerDecorator({
			name: 'noDuplicates',
			target: object.constructor,
			propertyName,
			options: validationOptions,
			validator: {
				validate(value: T[]) {
					return new Set(value).size === value.length
				},
				defaultMessage(args: ValidationArguments) {
					return `${args.property} should not contain duplicate values`
				},
			},
		})
	}
}
