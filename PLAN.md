# 🚌 Bus Tracker Backend — Roadmap (NestJS)

## 🧱 0. Fundamentos

### Objetivo

Definir base técnica y estructura del proyecto con NestJS.

### Tareas

- [ ] Inicializar proyecto con Nest CLI
- [ ] Configurar TypeScript (strict)
- [ ] Configurar ESLint + Prettier
- [ ] Estructura por módulos:
    - `devices`
    - `stops`
    - `buses`
    - `detections`
    - `auth`
    - `crypto`

- [ ] Configurar Prisma + PostgreSQL
- [ ] Configurar variables de entorno (`@nestjs/config`)

---

## 🗄️ 1. Modelo de datos

### Objetivo

Definir entidades base.

### Prisma schema (resumen)

#### devices

- id (string)
- type (bus_beacon | stop_scanner)
- public_key
- status (active | revoked)
- created_at

#### stops

- id
- name
- lat
- lng
- device_id

#### buses

- id
- name

#### detections

- id
- bus_id
- stop_id
- scanner_id
- detected_at

---

## 🔐 2. Criptografía

### Objetivo

Validar identidad de scanners y beacons.

### Tareas

- [ ] Servicio `CryptoService`
- [ ] Verificación de firma (scanner)
- [ ] Validación de JWT (beacon)
- [ ] Definir algoritmos:
    - Scanner: Ed25519
    - JWT: ES256

---

## 📡 3. Endpoint core: detections

### POST `/detections`

### DTO

```ts
{
    device_id: string
    timestamp: number
    beacon_jwt: string
    signature: string
}
```

---

### Flujo de validación

#### 1. Validar scanner

- [ ] Buscar device
- [ ] Verificar status
- [ ] Verificar firma

#### 2. Validar timestamp

- [ ] Ventana ±60s

#### 3. Validar beacon JWT

- [ ] Firma
- [ ] Expiración
- [ ] Extraer bus_id

#### 4. Resolver parada

- [ ] Obtener stop por device_id

#### 5. Anti-duplicados

- [ ] Verificar última detección (bus + stop)

#### 6. Persistir

- [ ] Guardar detection

---

## 🗺️ 4. API cliente

### GET `/stops`

Devuelve estado de paradas

### Lógica

- [ ] Última detección por parada
- [ ] Calcular estado:

```ts
bus_passed = now - last_detection < threshold
```

---

## ⚙️ 5. Administración

### Devices

- [ ] POST `/devices`
- [ ] PATCH `/devices/:id/revoke`

### Stops

- [ ] POST `/stops`
- [ ] Asignar device

### Buses

- [ ] POST `/buses`

---

## 🧪 6. Simulación

### Objetivo

Probar sin hardware

### Tareas

- [ ] Script simulador scanner
- [ ] Generador JWT (beacon)

---

## 🔁 7. Tiempo real

### Opciones

- [ ] Polling (MVP)
- [ ] SSE (recomendado)
- [ ] WebSockets

---

## 🛡️ 8. Seguridad

- [ ] Rate limiting por device
- [ ] Validación DTO (`class-validator`)
- [ ] Logs de errores

---

## 📊 9. Observabilidad

- [ ] Logger estructurado
- [ ] Métricas básicas
- [ ] Alertas simples

---

## 🚀 10. Iteraciones futuras

- [ ] Dirección del bus
- [ ] Multi-bus
- [ ] Dashboard en tiempo real
- [ ] Historial

---

## ✅ Orden recomendado

1. Prisma + DB
2. CryptoService
3. POST /detections
4. Simulador
5. GET /stops
6. Seguridad
7. Tiempo real

---

## 🧠 Notas clave

- Sistema basado en eventos
- Fuente de verdad: paradas
- Validar:
    - scanner (quién reporta)
    - beacon (qué reporta)

- Tolerar duplicados y pérdidas
