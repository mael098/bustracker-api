import { Transform } from 'class-transformer'
import { IsEnum, IsArray } from 'class-validator'

export enum Include {
    PATH = 'path',
}

export class FindRouteQueryDto {
    @Transform(({ value }) => {
        if (value == null) return []

        if (Array.isArray(value)) return value.map(v => `${v}`.trim())

        if (typeof value === 'string') {
            return value.split(',').map(v => v.trim())
        }

        return [String(value)]
    })
    @IsArray()
    @IsEnum(Include, { each: true })
    include: Include[] = []
}
