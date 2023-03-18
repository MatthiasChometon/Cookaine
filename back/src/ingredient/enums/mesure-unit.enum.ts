import { registerEnumType } from '@nestjs/graphql'

export enum MesureUnit {
	Teaspoon = 'teaspoon',
	Tablespoon = 'tablespoon',
	Milliliter = 'milliliter',
	Liter = 'liter',
	Gram = 'gram',
	Kilogram = 'kilogram',
	Unity = 'unity',
	Pinch = 'pinch',
	Centiliters = 'centiliters',
	Sachet = 'sachet',
}

registerEnumType(MesureUnit, {
	name: 'MesureUnit',
})
