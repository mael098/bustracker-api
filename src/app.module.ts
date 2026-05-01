import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { RoutesModule } from './routes/routes.module'
import { PrismaService } from './prisma/prisma.service'

@Module({
    imports: [RoutesModule],
    controllers: [AppController],
    providers: [AppService, PrismaService],
})
export class AppModule {}
