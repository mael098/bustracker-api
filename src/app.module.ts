import { Module } from '@nestjs/common'
import { AppController } from './app.controller.js'
import { AppService } from './app.service'
import { PrismaService } from './prisma/prisma.service'
import { ConfigModule } from '@nestjs/config'
import { validate } from './config/env.validation.js'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validate,
        }),
    ],
    controllers: [AppController],
    providers: [AppService, PrismaService],
})
export class AppModule {}
