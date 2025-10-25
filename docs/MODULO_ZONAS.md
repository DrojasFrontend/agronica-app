# Módulo 1 - Zonas de Cultivo

## Contexto funcional

El módulo Zonas gestiona las áreas de cultivo de cada campo, visible en la sección "Dashboard" del portal.
Desde aquí, los usuarios pueden:
- Ver la lista de zonas activas con sus métricas en tiempo real.
- Seleccionar una zona específica para ver su detalle completo.
- Consultar el estado actual de riego (Óptimo, Necesita Riego, Regando).
- Visualizar datos históricos de humedad, temperatura y riego.
- Controlar manualmente los sistemas de riego por zona.

---

## Objetivo técnico

Implementar los endpoints necesarios para:
1. Obtener todas las zonas de un campo específico (con filtros y paginación).
2. Consultar el detalle completo de una zona individual.
3. Actualizar las métricas en tiempo real de una zona.
4. Obtener datos históricos de una zona (últimas 24h, 7 días, 30 días).
5. Cambiar el estado de riego de una zona (activar/pausar/detener).
6. Asegurar la integridad multiempresa mediante validación de campo_id del usuario autenticado.

El módulo no gestiona la creación física de zonas (eso es configuración inicial del sistema); solo consulta y actualiza métricas.

---

## Endpoints a implementar

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/zones` | Lista todas las zonas con métricas actuales y filtros |
| GET | `/api/zones/:id` | Devuelve el detalle completo de una zona |
| PATCH | `/api/zones/:id/metrics` | Actualiza métricas en tiempo real de una zona |
| GET | `/api/zones/:id/history` | Obtiene datos históricos de una zona |
| PATCH | `/api/zones/:id/irrigation` | Cambia el estado de riego (iniciar/pausar/detener) |

---

## Tests orientados a desarrollo modular

Stack tecnológico:
- Next.js 14 con JavaScript
- API Routes de Next.js
- JSON como base de datos temporal (migrar a base de datos real más adelante)
- Jest como framework de testing

---

## Tests detallados

### ✅ Test 1 - Obtener lista de zonas devuelve todas las zonas activas

**Contexto:**
El usuario accede al dashboard y el sistema debe cargar todas las zonas de su campo.

**Campos esperados por zona:**
- `id`, `name`, `area`, `sensors`, `valves`, `icon`, `status`, `statusColor`, `statusTextColor`
- `metrics`: `humidity`, `temperature`, `waterFlow`, `waterFlowText`, `savings`, `temperatureRange`

**Requisitos:**
- Validar que el response contiene un array de zonas
- Cada zona debe tener todos los campos requeridos
- Los valores de `status` deben ser: "Óptimo", "Necesita riego", o "Regando"
- El campo `humidity` debe estar entre 0 y 100
- El campo `temperature` debe ser un número válido

**Resultado esperado:**
```json
{
  "success": true,
  "data": {
    "zones": [
      {
        "id": 0,
        "name": "Sector Norte - Paltos",
        "area": "2.5 ha",
        "sensors": "4 sensores",
        "valves": "2 válvulas",
        "icon": "✅",
        "status": "Óptimo",
        "statusColor": "#d1fae5",
        "statusTextColor": "#059669",
        "metrics": {
          "humidity": 65,
          "temperature": 22,
          "waterFlow": 0,
          "waterFlowText": "Sin riego",
          "savings": 45,
          "temperatureRange": "18-25°C"
        }
      }
    ],
    "total": 4
  }
}
```

---

### ✅ Test 2 - Obtener detalle de zona devuelve información completa

**Contexto:**
El usuario selecciona una zona específica y el sistema debe mostrar todos los detalles incluyendo estado del sistema, programación y datos históricos.

**Campos adicionales requeridos:**
- `systemStatus`: `sensorsActive`, `valvesOperational`, `pressure`, `connectivity`
- `schedule`: `lastIrrigation`, `nextIrrigation`
- `chartData`: `currentHumidity`, `currentTemperature`, `irrigationStatus`, `humidityData`

**Requisitos:**
- Validar que el ID de zona existe
- Devolver error 404 si la zona no existe
- Incluir todos los campos de métricas, sistema y programación
- El array `humidityData` debe contener 25 elementos (últimas 24 horas)
- El `irrigationStatus` debe ser "ACTIVO" o "INACTIVO"

**Resultado esperado:**
```json
{
  "success": true,
  "data": {
    "id": 0,
    "name": "Sector Norte - Paltos",
    "area": "2.5 ha",
    "sensors": "4 sensores",
    "valves": "2 válvulas",
    "status": "Óptimo",
    "metrics": {
      "humidity": 65,
      "temperature": 22,
      "waterFlow": 0,
      "waterFlowText": "Sin riego",
      "savings": 45
    },
    "systemStatus": {
      "sensorsActive": "4/4",
      "valvesOperational": "2/4",
      "pressure": "2.1 bar",
      "connectivity": "Excelente"
    },
    "schedule": {
      "lastIrrigation": "Hace 2 horas",
      "nextIrrigation": "En 4 horas"
    },
    "chartData": {
      "currentHumidity": "49.4%",
      "currentTemperature": "24.2°C",
      "irrigationStatus": "INACTIVO",
      "humidityData": [60, 58, 55, ...]
    }
  }
}
```

---

### ✅ Test 3 - Actualizar métricas de zona actualiza valores en tiempo real

**Contexto:**
Los sensores IoT envían nuevas lecturas cada minuto y el sistema debe actualizar las métricas de la zona correspondiente.

**Campos actualizables:**
- `humidity` (0-100)
- `temperature` (-10 a 50°C para agricultura)
- `waterFlow` (0-100 L/min)

**Requisitos:**
- Validar que el ID de zona existe
- Validar rangos de valores:
  - `humidity`: 0-100
  - `temperature`: -10 a 50
  - `waterFlow`: >= 0
- Actualizar automáticamente el `status` basado en reglas:
  - `humidity < 40`: "Necesita riego"
  - `humidity >= 40 && humidity < 70 && waterFlow > 0`: "Regando"
  - `humidity >= 40 && waterFlow == 0`: "Óptimo"
- Devolver error 400 si los valores están fuera de rango

**Request example:**
```json
{
  "humidity": 45,
  "temperature": 28,
  "waterFlow": 25.5
}
```

**Resultado esperado:**
```json
{
  "success": true,
  "message": "Métricas actualizadas correctamente",
  "data": {
    "id": 1,
    "status": "Necesita riego",
    "metrics": {
      "humidity": 45,
      "temperature": 28,
      "waterFlow": 25.5,
      "waterFlowText": "Riego activo"
    },
    "updatedAt": "2025-10-17T14:30:00Z"
  }
}
```

---

### ✅ Test 4 - Obtener datos históricos devuelve series de tiempo correctas

**Contexto:**
El usuario selecciona un rango temporal (24h, 7 días, 30 días) para ver el histórico de una métrica.

**Parámetros de consulta:**
- `metric`: "humidity" | "temperature" | "waterFlow"
- `range`: "24h" | "7d" | "30d"

**Requisitos:**
- Validar que el ID de zona existe
- Validar que `metric` es uno de los valores permitidos
- Devolver datos agrupados por:
  - 24h: cada hora (24 puntos)
  - 7d: cada 6 horas (28 puntos)
  - 30d: cada día (30 puntos)
- Incluir timestamps en formato ISO 8601

**Request example:**
```
GET /api/zones/0/history?metric=humidity&range=24h
```

**Resultado esperado:**
```json
{
  "success": true,
  "data": {
    "zoneId": 0,
    "zoneName": "Sector Norte - Paltos",
    "metric": "humidity",
    "range": "24h",
    "dataPoints": [
      {
        "timestamp": "2025-10-16T14:00:00Z",
        "value": 60
      },
      {
        "timestamp": "2025-10-16T15:00:00Z",
        "value": 58
      },
      ...
    ],
    "summary": {
      "min": 32,
      "max": 62,
      "avg": 47.5,
      "current": 42
    }
  }
}
```

---

### ✅ Test 5 - Cambiar estado de riego ejecuta acción correctamente

**Contexto:**
El usuario presiona el botón "Iniciar riego ahora" en el panel de control y el sistema debe activar las válvulas de esa zona.

**Acciones permitidas:**
- `start`: Iniciar riego
- `pause`: Pausar riego
- `stop`: Detener riego completamente

**Requisitos:**
- Validar que el ID de zona existe
- Validar que la acción es una de las permitidas
- Solo permitir `start` si `irrigationStatus === "INACTIVO"`
- Solo permitir `pause` o `stop` si `irrigationStatus === "ACTIVO"`
- Actualizar `waterFlow` automáticamente:
  - `start`: waterFlow > 0
  - `pause/stop`: waterFlow = 0
- Registrar el evento en el log de actividades

**Request example:**
```json
{
  "action": "start",
  "duration": 30,
  "flowRate": 18.5
}
```

**Resultado esperado:**
```json
{
  "success": true,
  "message": "Riego iniciado correctamente",
  "data": {
    "zoneId": 2,
    "zoneName": "Invernadero A - Lechugas",
    "irrigationStatus": "ACTIVO",
    "waterFlow": 18.5,
    "estimatedDuration": "30 minutos",
    "startedAt": "2025-10-17T14:30:00Z",
    "estimatedEndAt": "2025-10-17T15:00:00Z"
  }
}
```

---

### ✅ Test 6 - Filtrar zonas por estado devuelve resultados correctos

**Contexto:**
El usuario quiere ver solo las zonas que necesitan atención urgente (estado "Necesita riego").

**Parámetros de consulta:**
- `status`: "Óptimo" | "Necesita riego" | "Regando"
- `minHumidity`: número (filtro por humedad mínima)
- `maxHumidity`: número (filtro por humedad máxima)

**Requisitos:**
- Aplicar filtros de manera combinada (AND)
- Devolver array vacío si no hay resultados
- Mantener orden por prioridad: "Necesita riego" > "Regando" > "Óptimo"

**Request example:**
```
GET /api/zones?status=Necesita riego&minHumidity=0&maxHumidity=50
```

**Resultado esperado:**
```json
{
  "success": true,
  "data": {
    "zones": [
      {
        "id": 1,
        "name": "Sector Sur - Tomates",
        "status": "Necesita riego",
        "metrics": {
          "humidity": 45,
          "temperature": 28
        }
      }
    ],
    "total": 1,
    "filters": {
      "status": "Necesita riego",
      "minHumidity": 0,
      "maxHumidity": 50
    }
  }
}
```

---

### ✅ Test 7 - Validar integridad multiempresa mediante campo_id

**Contexto:**
Un usuario de la empresa A no debe poder acceder a las zonas de la empresa B.

**Requisitos:**
- Extraer `campo_id` del token JWT del usuario autenticado
- Validar que la zona solicitada pertenece al `campo_id` del usuario
- Devolver error 403 si intenta acceder a zona de otro campo
- Aplicar validación en todos los endpoints de zonas

**Request example con JWT:**
```
Headers:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
(campo_id: 1)

GET /api/zones/5
(zona 5 pertenece a campo_id: 2)
```

**Resultado esperado:**
```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "No tienes permisos para acceder a esta zona",
    "statusCode": 403
  }
}
```

---

## Reglas de negocio

### Estados automáticos de zona
1. **Óptimo**: `humidity >= 40 && humidity <= 80 && waterFlow === 0`
2. **Necesita riego**: `humidity < 40`
3. **Regando**: `waterFlow > 0`

### Alertas automáticas
- Enviar notificación si `humidity < 30` (crítico)
- Enviar notificación si sensor desconectado por más de 10 minutos
- Enviar notificación si válvula no responde al comando

### Límites del sistema
- Máximo 10 zonas por campo
- Máximo 20 sensores por zona
- Histórico: mantener últimos 90 días
- Frecuencia de actualización: cada 60 segundos

---

## Estructura de datos (zones.json)

```json
{
  "zones": [
    {
      "id": 0,
      "campoId": 1,
      "name": "Sector Norte - Paltos",
      "area": "2.5 ha",
      "sensors": "4 sensores",
      "valves": "2 válvulas",
      "icon": "✅",
      "status": "Óptimo",
      "statusColor": "#d1fae5",
      "statusTextColor": "#059669",
      "metrics": {
        "humidity": 65,
        "temperature": 22,
        "waterFlow": 0,
        "waterFlowText": "Sin riego",
        "savings": 45,
        "temperatureRange": "18-25°C"
      },
      "systemStatus": {
        "sensorsActive": "4/4",
        "valvesOperational": "2/4",
        "pressure": "2.1 bar",
        "connectivity": "Excelente"
      },
      "schedule": {
        "lastIrrigation": "Hace 2 horas",
        "nextIrrigation": "En 4 horas"
      },
      "chartData": {
        "currentHumidity": "49.4%",
        "currentTemperature": "24.2°C",
        "irrigationStatus": "INACTIVO",
        "humidityData": [60, 58, 55, ...]
      }
    }
  ]
}
```

---

## Próximos pasos

1. Implementar endpoints REST API
2. Migrar de JSON a base de datos (Supabase/PostgreSQL)
3. Implementar autenticación JWT
4. Crear tests unitarios con Jest
5. Implementar WebSocket para actualizaciones en tiempo real
6. Agregar sistema de notificaciones push


