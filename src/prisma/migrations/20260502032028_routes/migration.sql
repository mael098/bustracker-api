-- ! Migration customized for snowflake
-- ! This migration is not compatible with the default migration
-- ! You need to run this migration first

--Fecha base: 01 /06 / 2025
CREATE OR REPLACE FUNCTION snowflake(node_id int DEFAULT 0)
RETURNS text AS $$
DECLARE
    our_epoch bigint:= 1748736000000; --milisegundos desde 01 /06 / 2025
    seq_id bigint;
    now_millis bigint;
    safe_node_id int;
    snowflake_id bigint;
BEGIN
--Asegurar que node_id esté entre 0 y 1023(10 bits)
safe_node_id:= GREATEST(0, LEAST(node_id, 1023));

--Usar la secuencia para obtener un número siempre único
    SELECT nextval('snowflake_seq') % 4096 INTO seq_id; --12 bits
    SELECT FLOOR(EXTRACT(EPOCH FROM clock_timestamp()) * 1000) INTO now_millis;

snowflake_id:= ((now_millis - our_epoch) << 22)-- timestamp(41 bits)
    | ((safe_node_id & 1023) << 12)-- node id(10 bits)
        | (seq_id & 4095); --secuencia(12 bits)

    RETURN snowflake_id:: text; --Convertir a string
END;
$$ LANGUAGE plpgsql;

--Crear secuencia si no existe
DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM pg_class WHERE relname = 'snowflake_seq') THEN
        CREATE SEQUENCE snowflake_seq;
    END IF;
END$$;

-- ! Prisma generation

-- CreateEnum
CREATE TYPE "RouteNodeType" AS ENUM ('stop', 'route');

-- CreateTable
CREATE TABLE "Route" (
    "id" TEXT NOT NULL DEFAULT snowflake(),
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RouteNode" (
    "id" TEXT NOT NULL DEFAULT snowflake(),
    "type" "RouteNodeType" NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "order" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "route_id" TEXT NOT NULL,

    CONSTRAINT "RouteNode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Route_name_key" ON "Route"("name");

-- AddForeignKey
ALTER TABLE "RouteNode" ADD CONSTRAINT "RouteNode_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "Route"("id") ON DELETE CASCADE ON UPDATE CASCADE;
