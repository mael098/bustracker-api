import { Module } from '@nestjs/common'
import { AppController } from './app.controller.js'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { validate } from './config/env.validation.js'
import { RoutesModule } from './routes/routes.module'
import { PrismaModule } from './prisma/prisma.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            ignoreEnvFile: process.env.NODE_ENV === 'production',
            isGlobal: true,
            validate,
        }),
        RoutesModule,
        PrismaModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
