
# Balance Eléctrico API Service

Este proyecto implementa un servicio en NestJS que consume la API pública de **REE (Red Eléctrica de España)** para obtener el **balance eléctrico**. El servicio transforma los datos recibidos y los guarda en una base de datos utilizando un repositorio.

## Descripción

Este servicio permite recuperar los datos de balance eléctrico, transformarlos y almacenarlos en un modelo de dominio dentro de la base de datos. Los datos que se recuperan incluyen información de **generación renovable**, **demanda**, y otros valores de balance.

### Funcionalidades principales:
- Recuperar datos de balance eléctrico de la API pública de REE.
- Transformar los datos de la API a un modelo de dominio personalizado.
- Almacenar los datos transformados en una base de datos.

## Instalación

Sigue estos pasos para instalar y ejecutar el proyecto localmente:

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/IvanMoreFlores/back-tech-delivery.git
   cd back-tech-delivery
   ```

2. **Instalar dependencias**:

   Asegúrate de tener Node.js instalado. Luego ejecuta:

   ```bash
   npm install
   ```

3. **Configurar variables de entorno**:

   Asegúrate de que las variables de entorno necesarias estén configuradas correctamente. Crea un archivo `.env` con las siguientes variables (si es necesario):

   ```bash
   API_REE_URL=https://apidatos.ree.es/es/datos/balance/balance-electrico
   ```

4. **Ejecutar el proyecto**:

   Para ejecutar el proyecto en desarrollo, usa:

   ```bash
   npm run start
   ```

   O si prefieres usar `docker`, puedes construir y ejecutar el contenedor con los siguientes comandos:

   ```bash
   docker-compose up --build
   ```

## Uso

### Método principal: `getBalanceElectric`

Este servicio expone un método para obtener el balance eléctrico de la API pública de REE. Este método requiere dos parámetros: `startDate` y `endDate`.

```ts
async getBalanceElectric(startDate: string, endDate: string): Promise<BalanceElectric[]>;
```

- **startDate**: Fecha de inicio en formato `YYYY-MM-DDTHH:mm`.
- **endDate**: Fecha de fin en formato `YYYY-MM-DDTHH:mm`.

Ejemplo de uso:

```ts
const balance = await balanceElectricService.getBalanceElectric('2019-01-01T00:00', '2019-01-31T23:59');
console.log(balance);
```

### Transformación de datos

El servicio transforma los datos de la API para ajustarlos a nuestro modelo de dominio. Los datos transformados incluyen los siguientes campos:

- **datetime**: Fecha y hora de la medición.
- **generation**: Generación renovable.
- **demand**: Demanda eléctrica (puede asignarse un valor predeterminado si no está disponible).
- **imbalance**: Imbalance eléctrico (valor predeterminado).
- **exchange**: Intercambio eléctrico (valor predeterminado).
- **forecast**: Pronóstico eléctrico (valor predeterminado).

## Estructura del proyecto

El proyecto sigue la arquitectura de **NestJS** con una estructura modular:

```
src/
│
├── infrastructure/
│   ├── services/
│   │   └── balance-electric.service.ts  # Lógica para obtener y transformar datos de balance eléctrico
│   ├── repositories/
│   │   └── balance-electric.repository.ts  # Repositorio para guardar los datos en la base de datos
│
├── domain/
│   └── models/
│       └── balance-electric.model.ts  # Modelo de datos transformado
│
├── app.module.ts  # Configuración principal del módulo de la aplicación
├── main.ts  # Punto de entrada de la aplicación
```

## Testing

### Pruebas unitarias

El proyecto incluye pruebas unitarias utilizando el framework de pruebas de **NestJS**. Para ejecutar las pruebas, usa:

```bash
npm run test
```

### Pruebas de integración

Puedes escribir pruebas de integración para validar la funcionalidad de los métodos del servicio, asegurando que los datos se recuperan y se almacenan correctamente.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas colaborar en este proyecto, por favor abre un **pull request** o **issue**.

### Proceso para contribuir:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b nueva-funcionalidad`).
3. Realiza tus cambios.
4. Haz commit y push (`git commit -am 'Añadir nueva funcionalidad'`).
5. Crea un **pull request**.

## Licencia

Este proyecto está bajo la **Licencia MIT**.
