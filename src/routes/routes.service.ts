import { Injectable } from '@nestjs/common'
// import { CreateRouteDto } from './dto/create-route.dto'
// import { UpdateRouteDto } from './dto/update-route.dto'
import { PrismaService } from '../prisma/prisma.service'
import { FindRouteQueryDto, Include } from './dto/find-all-query.dto'

@Injectable()
export class RoutesService {
    constructor(private prisma: PrismaService) {}

    // create(createRouteDto: CreateRouteDto) {
    //     return 'This action adds a new route'
    // }

    async findAll({ include }: FindRouteQueryDto) {
        return await this.prisma.route.findMany({
            omit: {
                created_at: true,
                updated_at: true,
            },
            include: {
                path:
                    include.includes(Include.PATH) ?
                        {
                            omit: {
                                updated_at: true,
                                created_at: true,
                                route_id: true,
                            },
                        }
                    :   false,
            },
        })
    }

    async findOne(id: string, { include }: FindRouteQueryDto) {
        return await this.prisma.route.findUnique({
            where: { id },
            omit: {
                created_at: true,
                updated_at: true,
            },
            include: {
                path:
                    include.includes(Include.PATH) ?
                        {
                            omit: {
                                updated_at: true,
                                created_at: true,
                                route_id: true,
                            },
                        }
                    :   false,
            },
        })
    }

    async getNodes(route_id: string) {
        return await this.prisma.routeNode.findMany({
            where: { route_id },
            orderBy: { order: 'asc' },
            omit: { updated_at: true, created_at: true, route_id: true },
        })
    }

    // update(id: number, updateRouteDto: UpdateRouteDto) {
    //     return `This action updates a #${id} route`
    // }

    remove(id: number) {
        return `This action removes a #${id} route`
    }
}
