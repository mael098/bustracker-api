import { Module } from '@nestjs/common'
import { AppController } from './app.controller.js'
import { AppService } from './app.service'
import { RoutesModule } from './routes/routes.module'
import { PrismaService } from './prisma/prisma.service'
import { ConfigModule } from '@nestjs/config'

@Module({
    imports: [
        RoutesModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
    ],
    controllers: [AppController],
    providers: [AppService, PrismaService],
})
export class AppModule {}
