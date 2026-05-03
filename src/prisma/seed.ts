// @eslint-ignore
import { readFileSync } from 'node:fs'
import { PrismaClient } from './generated/prisma/client.ts'
import { PrismaPg } from '@prisma/adapter-pg'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
new PrismaClient({
    adapter: new PrismaPg(process.env.DATABASE_URL!),
}).routeNode
    .createMany({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        data: JSON.parse(readFileSync('test.json', 'utf-8')),
    })
    .then(() => {
        console.log('creados')
    })
