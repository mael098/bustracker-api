import { Controller, Get, Param, Query } from '@nestjs/common'
import { RoutesService } from './routes.service'
import { FindRouteQueryDto } from './dto/find-all-query.dto'

@Controller('routes')
export class RoutesController {
    constructor(private readonly routesService: RoutesService) {}

    // @Post()
    // create(@Body() createRouteDto: CreateRouteDto) {
    //     return this.routesService.create(createRouteDto)
    // }

    @Get()
    findAll(@Query() { include }: FindRouteQueryDto) {
        return this.routesService.findAll({ include })
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Query() { include }: FindRouteQueryDto) {
        return this.routesService.findOne(id, { include })
    }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateRouteDto: UpdateRouteDto) {
    //     return this.routesService.update(+id, updateRouteDto)
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.routesService.remove(+id)
    // }
}
