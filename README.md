# Entrega Hito 3 / Pruebas de aplicaciones backend NodeJS

### LegalBound

Este proyecto es una API REST para la administración de casos legales de una empresa de abogados. Incluye autenticación y manejo de casos, estructurada en Node.js usando Express. La base de datos se puede replicar usando los archivos de esquema y semillas (seeds) disponibles en `src/db`. Las pruebas están implementadas usando **Jest** y **Supertest**.

---

## 1. Requisitos previos
Asegúrate de tener instalados:
- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [npm](https://www.npmjs.com/)
- Una base de datos compatible (Las pruebas se realizaron con **PostgreSQL**).

---

## 2. Instalación
Primero debes instalar las dependencias con el siguiente comando:

```bash
# Instala las dependencias
npm install
```

---

## 3. Configuración de la base de datos

### 3.1 Crear la base de datos
Debes tener configurado un servidor de base de datos (ej. MySQL o PostgreSQL). Luego:

1. Accede a tu cliente SQL y crea una base de datos:
   ```sql
   CREATE DATABASE nombre_de_tu_bd;
   ```

2. Usa los archivos de esquema y seeds disponibles en `src/db`:
   
   - **Esquema**: Para crear las tablas:
     ```bash
     psql -U <usuario> -d nombre_de_tu_bd -f src/db/schema.sql
     ```
   - **Seeds**: Para insertar datos de prueba:
     ```bash
     psql -U <usuario> -d nombre_de_tu_bd -f src/db/seed.sql
     ```

3. Configura las credenciales de tu base de datos en el archivo `.env`. Ejemplo:
   ```env
    # Configuración de la base de datos
    DB_HOST= localhost
    DB_PORT= tu_puerto
    DB_USER= tu_usuario
    DB_PASSWORD= tu_password
    DB_NAME= nombre_de_tu_bd

    # Puerto del servidor
    PORT= puerto

    # Secreto de JWT
    JWT_SECRET = tu_secreto
   ```

---

## 4. Ejecutar el proyecto
Puedes correr el servidor en modo desarrollo con el siguiente script:

```bash
npm run dev
```

Por defecto, el servidor corre en `http://localhost:3000`. Puedes ajustar el puerto en `src/config/appConfig.js`.

---

## 5. Probar la API
Puedes usar herramientas como **Postman** o **Thunder Client** para probar las rutas. Asegúrate de registrar un usuario y obtener un token para acceder a las rutas protegidas.

- **Registro**: `POST /api/register`
- **Login**: `POST /api/login`
- **Rutas protegidas**: Necesitas enviar el token en la cabecera `Authorization: Bearer <TOKEN>`.

---

## 6. Ejecutar pruebas
Las pruebas están ubicadas en `test/routes/test.js`. Utilizan **Jest** y **Supertest**.

Para ejecutar las pruebas:

```bash
npm test
```

o

```bash
npx jest
```

Esto ejecuta Jest y muestra los resultados de las pruebas. Asegúrate de que la base de datos esté configurada antes de correr las pruebas.

---

## 7. Estructura del proyecto

```plaintext
.
├── node_modules
├── src
│   ├── config           # Configuración del entorno y base de datos
│   ├── controllers      # Lógica de controladores (auth y casos)
│   ├── db               # Esquemas y seeds SQL
│   ├── middlewares      # Middlewares para validación y autenticación
│   ├── models           # Modelos de base de datos
│   ├── routes           # Definición de rutas (auth y casos)
│   └── app.js           # Configuración principal de la aplicación
├── test
│   └── routes           # Pruebas de las rutas
├── .env                 # Variables de entorno
├── package.json         # Dependencias y scripts
└── README.md            # Documentación
```

---

## 8. Scripts disponibles
- **Correr el servidor en desarrollo**:
  ```bash
  npm run dev
  ```
- **Ejecutar pruebas**:
  ```bash
  npm test
  ```

---

## 9. Dependencias principales
- **Express**: Framework para el servidor.
- **Jest**: Framework para ejecutar pruebas.
- **Supertest**: Herramienta para probar rutas HTTP.
- **PG**: Conexión a PostgreSQL
- **JWT**: Autenticación de usuario.

---

## 10. Notas finales
- Verifica que el servidor de base de datos esté activo antes de correr las pruebas o el servidor.
- Asegúrate de configurar correctamente el archivo `.env`.
---

© 2024 - LegalBound - Hito 3
