import { plainToInstance } from 'class-transformer'
import { Envs } from './dto/envs.dto'
import { validateSync } from 'class-validator'

export function validate(config: Record<string, unknown>) {
    const validated = plainToInstance(Envs, config, {
        enableImplicitConversion: true,
    })

    const errors = validateSync(validated, {
        skipMissingProperties: false,
    })

    if (errors.length > 0) {
        throw new Error(errors.toString())
    }
    return validated
}
