import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/prisma/client'
import { ConfigService } from '@nestjs/config'
import { Envs } from '@/config/dto/envs.dto'

@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy
{
    constructor(configService: ConfigService<Envs, true>) {
        super({
            adapter: new PrismaPg(configService.get('DATABASE_URL')),
        })
    }

    async onModuleInit() {
        await this.$connect()
    }

    async onModuleDestroy() {
        await this.$disconnect()
    }
}
