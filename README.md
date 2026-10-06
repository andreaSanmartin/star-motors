# StarMotors

Sistema de gestión para una concesionaria de vehículos: ventas, cotizaciones, facturación, taller, garantías, reclamos, repuestos y reportes.
Proyecto académico desarrollado como parte del examen complexivo.

---

## Índice

1. [Arquitectura](#arquitectura)
2. [Requisitos](#requisitos)
3. [Opción A: ejecutar todo con Docker (recomendado)](#opción-a-ejecutar-todo-con-docker-recomendado)
4. [Opción B: ejecutar sin Docker (modo desarrollo)](#opción-b-ejecutar-sin-docker-modo-desarrollo)
5. [Configuración](#configuración)
6. [Subir cambios a GitHub](#subir-cambios-a-github)
7. [Problemas frecuentes](#problemas-frecuentes)
8. [Licencia](#licencia)

---

## Arquitectura

```
                    ┌──────────────────────────┐
  Navegador  ─────▶ │  Front-end (Angular 11)  │  http://localhost:4200
                    └────────────┬─────────────┘
                     ┌───────────┴────────────┐
                     ▼                        ▼
      ┌───────────────────────┐   ┌────────────────────────┐
      │ Backend SQL           │   │ Backend NoSQL          │
      │ Spring Boot  :9898    │   │ Spring Boot  :8080     │
      └──────────┬────────────┘   └──────────┬─────────────┘
                 ▼                           ▼
         PostgreSQL :5432              MongoDB :27017
```

| Carpeta | Qué hace | Tecnología |
|---|---|---|
| `StarMotors_Front_end` | Aplicación web | Angular 11 + Firebase Authentication |
| `StarMotors_backend_sql` | API de clientes, vehículos, facturas, repuestos y empleados | Spring Boot 2.5 (Java 8) + PostgreSQL |
| `StarMotors_backend_no_sql` | API de cotizaciones, garantías, taller, reclamos y envío de correos | Spring Boot 2.5 (Java 8) + MongoDB |

Cada backend expone su documentación Swagger en `/swagger-ui.html`:

- Backend SQL: <http://localhost:9898/swagger-ui.html>
- Backend NoSQL: <http://localhost:8080/swagger-ui.html>

---

## Requisitos

**Para la opción A (Docker):** solo necesitas

- [Git](https://git-scm.com/downloads)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (incluye Docker Compose)

**Para la opción B (sin Docker):**

| Herramienta | Versión |
|---|---|
| Java JDK | 8 u 11 |
| Node.js | **14.x** (Angular 11 no funciona con Node 18 o superior; usa [nvm-windows](https://github.com/coreybutler/nvm-windows) o [nvm](https://github.com/nvm-sh/nvm) para cambiar de versión) |
| PostgreSQL | 12 o superior |
| MongoDB | 5 o superior (local o [MongoDB Atlas](https://www.mongodb.com/atlas)) |

Maven no hace falta instalarlo: cada backend incluye el wrapper `mvnw`.

---

## Opción A: ejecutar todo con Docker (recomendado)

Levanta las bases de datos, los dos backends y el front-end con un solo comando.

**1. Clonar el repositorio**

```bash
git clone https://github.com/andreaSanmartin/star-motors.git
cd star-motors
```

**2. Crear el archivo de variables de entorno**

```bash
cp .env.example .env
```

Abre `.env` y completa `MAIL_USERNAME` y `MAIL_PASSWORD` si quieres que funcione el envío de correos (ver [Configuración](#configuración)). Para todo lo demás, los valores por defecto ya funcionan.

**3. Configurar Firebase** en `StarMotors_Front_end/src/environments/environment.ts` (ver [Front-end](#front-end)). Sin esto no se puede iniciar sesión.

**4. Construir y arrancar**

```bash
docker compose up -d --build
```

La primera vez tarda varios minutos porque descarga imágenes y dependencias.

**5. Abrir la aplicación**

| Servicio | URL |
|---|---|
| Aplicación web | <http://localhost:4200> |
| API SQL (Swagger) | <http://localhost:9898/swagger-ui.html> |
| API NoSQL (Swagger) | <http://localhost:8080/swagger-ui.html> |

### Comandos útiles de Docker

| Acción | Comando |
|---|---|
| Ver el estado de los contenedores | `docker compose ps` |
| Ver los logs de un servicio | `docker compose logs -f backend-sql` |
| Detener todo | `docker compose down` |
| Detener y **borrar los datos** de las bases | `docker compose down -v` |
| Reconstruir tras cambiar código | `docker compose up -d --build` |
| Levantar solo las bases de datos | `docker compose up -d postgres mongo` |

> Los datos de PostgreSQL y MongoDB se guardan en volúmenes de Docker, así que no se pierden al hacer `docker compose down` (solo con `-v`).

---

## Opción B: ejecutar sin Docker (modo desarrollo)

Útil para programar con recarga automática. Abre **tres terminales**, una por proyecto.

> Atajo: puedes levantar solo las bases de datos con Docker (`docker compose up -d postgres mongo`) y correr los backends y el front-end a mano como se explica abajo.

**1. Bases de datos**

- PostgreSQL: crea una base de datos llamada `StarMotors`. Las tablas se crean solas al arrancar el backend (`ddl-auto=update`).
- MongoDB: no hace falta crear nada; la base `StarMotors` se crea sola.

**2. Backend SQL**

```bash
cd StarMotors_backend_sql
./mvnw spring-boot:run
```

En Windows (PowerShell / CMD) usa `mvnw.cmd spring-boot:run`. Queda disponible en <http://localhost:9898>.

**3. Backend NoSQL**

```bash
cd StarMotors_backend_no_sql
./mvnw spring-boot:run
```

En Windows usa `mvnw.cmd spring-boot:run`. Queda disponible en <http://localhost:8080>.

**4. Front-end**

```bash
cd StarMotors_Front_end
npm install
npm start
```

Abre <http://localhost:4200>.

---

## Configuración

El repositorio **no contiene credenciales**. Todo se configura con variables de entorno (backends) o con los archivos `environment` (front-end).

### Backend SQL

| Variable | Valor por defecto | Descripción |
|---|---|---|
| `DB_URL` | `jdbc:postgresql://localhost:5432/StarMotors` | URL JDBC de PostgreSQL |
| `DB_USERNAME` | `postgres` | Usuario de la base |
| `DB_PASSWORD` | `postgres` | Contraseña de la base |
| `PORT` | `9898` | Puerto HTTP |

### Backend NoSQL

| Variable | Valor por defecto | Descripción |
|---|---|---|
| `MONGODB_URI` | `mongodb://localhost:27017/StarMotors` | Cadena de conexión de MongoDB (local o Atlas) |
| `MAIL_HOST` | `smtp.gmail.com` | Servidor SMTP |
| `MAIL_PORT` | `587` | Puerto SMTP |
| `MAIL_USERNAME` | *(vacío)* | Cuenta desde la que se envían los correos |
| `MAIL_PASSWORD` | *(vacío)* | Con Gmail, usa una [contraseña de aplicación](https://support.google.com/accounts/answer/185833), no tu contraseña normal |
| `PORT` | `8080` | Puerto HTTP |

**Cómo definir variables sin Docker:**

```bash
# Linux / macOS / Git Bash
export MAIL_USERNAME=tu_correo@gmail.com
export MAIL_PASSWORD=tu_contraseña_de_aplicacion
```

```powershell
# Windows PowerShell (solo para la terminal actual)
$env:MAIL_USERNAME = "tu_correo@gmail.com"
$env:MAIL_PASSWORD = "tu_contraseña_de_aplicacion"
```

Con Docker se configuran en el archivo `.env` de la raíz (copiado de `.env.example`).

### Front-end

Edita estos archivos:

- `src/environments/environment.ts` → desarrollo y Docker (por defecto)
- `src/environments/environment.prod.ts` → producción (`ng build --configuration=production`)

| Campo | Descripción |
|---|---|
| `apiSqlUrl` | URL del backend SQL (por defecto `http://localhost:9898`) |
| `apiNoSqlUrl` | URL del backend NoSQL (por defecto `http://localhost:8080`) |
| `reportEmail` | Correo que recibe los informes de la concesionaria |
| `firebaseConfig` | Configuración de **tu propio** proyecto de Firebase |

**Obtener la configuración de Firebase:**

1. Entra a la [consola de Firebase](https://console.firebase.google.com/) y crea un proyecto.
2. En **Authentication → Método de inicio de sesión**, habilita **Correo electrónico/contraseña**.
3. En **Authentication → Usuarios**, crea los usuarios que van a entrar a la app.
4. En **Configuración del proyecto → Tus apps**, registra una app web y copia el objeto `firebaseConfig` en el archivo `environment`.

> Si cambias el `environment` y usas Docker, reconstruye el front-end: `docker compose up -d --build frontend`.

---

## Subir cambios a GitHub

**Primera vez** (repositorio ya creado en GitHub):

```bash
git remote add origin https://github.com/andreaSanmartin/star-motors.git
git add .
git commit -m "Initial commit"
git branch -M main
git push -u origin main
```

**Día a día:**

```bash
git status                       # ver qué cambió
git add .                        # preparar los cambios
git commit -m "Describe el cambio"
git push                         # subir a GitHub
```

**Traer cambios de otra persona:**

```bash
git pull
```

> Nunca subas el archivo `.env` ni contraseñas reales. El `.gitignore` de la raíz ya excluye `.env`.

---

## Problemas frecuentes

| Problema | Solución |
|---|---|
| `npm install` o `npm start` falla con errores de OpenSSL / `ERR_OSSL_EVP_UNSUPPORTED` | Estás usando Node 17 o superior. Cambia a Node 14 (`nvm install 14 && nvm use 14`) o usa Docker. |
| `./mvnw: Permission denied` (Linux / macOS) | `chmod +x mvnw` |
| `./mvnw: /bin/sh^M: bad interpreter` | El archivo tiene saltos de línea de Windows. Ejecuta `sed -i 's/\r$//' mvnw` o usa Docker. |
| El backend no conecta a la base de datos | Revisa que PostgreSQL / MongoDB estén corriendo y que `DB_URL` / `MONGODB_URI` sean correctos. |
| `Port 8080 is already in use` | Otro programa usa el puerto. Ciérralo o cambia la variable `PORT` (y la URL en el `environment` del front-end). |
| No se envían los correos | Revisa `MAIL_USERNAME` / `MAIL_PASSWORD`. Con Gmail necesitas una contraseña de aplicación y la verificación en 2 pasos activada. |
| No puedo iniciar sesión | Falta configurar `firebaseConfig` o el usuario no existe en Firebase Authentication. |

---

## Licencia

El front-end está basado en la plantilla *Light Bootstrap Dashboard Angular* de Creative Tim (licencia MIT, ver `StarMotors_Front_end/LICENSE.md`).
