import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

console.log('envs', process.env.NODE_ENV)
async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    )
    await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
