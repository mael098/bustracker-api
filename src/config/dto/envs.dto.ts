import { IsEnum, IsNumber, IsString, IsNotEmpty } from 'class-validator'

enum Environment {
    Development = 'development',
    Production = 'production',
    Test = 'test',
}

export class Envs {
    @IsEnum(Environment)
    NODE_ENV: Environment = Environment.Development

    @IsNumber()
    PORT: number = 3000

    @IsString()
    @IsNotEmpty()
    DATABASE_URL!: string
}
