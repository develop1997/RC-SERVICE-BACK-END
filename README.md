<!-- @format -->

# RC-SERVICE

Este es un proyecto que usa Node.js, Express, MongoDB y otras dependencias para crear una aplicación web.

## Instalación

Para instalar las dependencias del proyecto, ejecuta el siguiente comando:

```shell
npm install
```

## Configuración

Para configurar el proyecto, necesitas crear un archivo llamado `.env` en la raíz de tu proyecto y añadir las siguientes variables de entorno:

```dotenv
PORT= El puerto donde se ejecutará tu aplicación (por ejemplo, 3000)
MG_DATABASE_LINK= La cadena de conexión a tu base de datos MongoDB (por ejemplo, mongodb://localhost/testname)
```

## Uso

Para iniciar la aplicación, ejecuta el siguiente comando:

```shell
npm start
```

Esto iniciará el servidor en el puerto especificado y se conectará a la base de datos MongoDB.

Para poblar la base de datos con algunos datos de prueba, ejecuta el siguiente comando:

```shell
npm run db:seed
```

Esto ejecutará el script `db/seed.js` que creará algunas colecciones y documentos en tu base de datos.

## Controladores y Rutas

A continuación se presenta una lista de controladores y las rutas correspondientes en la aplicación:

### Controlador: countriesController

Países
GET /countries/country-names-codes: Obtener nombres de países y sus códigos de llamada.
GET /countries: Obtener la lista de todos los países.
GET /countries/:alpha3Code: Obtener información sobre un país específico mediante su código alfa3.
GET /countries/search/:searchTerm: Buscar países por nombre.
GET /countries/region/:regionName: Obtener una lista de países dentro de una región específica.
GET /countries/:alpha3Code/summary: Obtener un resumen de información sobre un país mediante su código alfa3.

### Controlador: rolController

Roles y Permisos

-   `GET /admin-rol/roles`: Obtener todos los roles.
-   `GET /admin-rol/permisos`: Obtener todos los permisos.
-   `GET /admin-rol/usuarios-por-rol/:rolId`: Obtener usuarios por rol.
-   `GET /admin-rol/usuarios-por-permiso/:permisoId`: Obtener usuarios por permiso.
-   `GET /admin-rol/lista-roles-usuarios`: Obtener una lista de roles y los usuarios asociados.
-   `GET /admin-rol/lista-permisos-usuarios`: Obtener una lista de permisos y los usuarios que los tienen.
-   `POST /admin-rol/roles`: Crear un nuevo rol.
-   `POST /admin-rol/permisos`: Crear un nuevo permiso.
-   `POST /admin-rol/usuarios/:id_usuario/permisos/:id_permiso`: Asignar un permiso a un usuario.
-   `DELETE /admin-rol/usuarios/:userId/permisos/:permisoId`: Revocar un permiso de un usuario.
-   `POST /admin-rol/usuarios/:id_usuario/roles/:roleId`: Asignar un rol a un usuario.
-   `DELETE /admin-rol/usuarios/:userId/roles`: Revocar un rol de un usuario.
-   `GET /admin-rol/usuarios/:userId/permisos`: Obtener todos los permisos de un usuario.

### Controlador: sesionController

#### Usuarios

-   `POST /users`: Crear un nuevo usuario.
-   `GET /users`: Obtener todos los usuarios.
-   `GET /users/all`: Obtener todos los usuarios (incluyendo contraseñas).
-   `GET /users/:correo`: Obtener un usuario por su correo electrónico.
-   `POST /users/login`: Iniciar sesión de usuario.
-   `GET /users/:id`: Obtener un usuario por su ID.
-   `PUT /users/:id`: Actualizar un usuario por su ID.
-   `DELETE /users/:id`: Eliminar un usuario por su ID.

### Otras Rutas

-   `GET /`: Inicio o presentación de la API.
-   `POST /send-message`: Enviar mensajes a WhatsApp.
-   `404`: Ruta no encontrada (Página no encontrada).

## Autor

Este proyecto fue creado por Santiago.

## Licencia

Este proyecto está licenciado bajo la licencia ISC.
