import { registerEnumType } from '@nestjs/graphql'

export enum Difficulty {
    'easy' = 'easy',
    'medium' = 'medium',
    'hard' = 'hard',
}

registerEnumType(Difficulty, {
    name: 'Difficulty',
})
