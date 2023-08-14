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

### General

-   `GET /`: Inicio o presentacion de la api.
-   `POST /send-message`: Enviar mensajes a WhatsApp.

### Controlador: sesionController

#### Usuarios

-   `POST /users`: Crear un nuevo usuario.
-   `GET /users`: Obtener todos los usuarios.
-   `GET /users/:id`: Obtener un usuario por su ID.
-   `PUT /users/:id`: Actualizar un usuario por su ID.
-   `DELETE /users/:id`: Eliminar un usuario por su ID.

### Controlador: rolController

#### Roles y Permisos

-   `GET /admin-rol/roles`: Obtener todos los roles.
-   `GET /admin-rol/permisos`: Obtener todos los permisos.
-   `POST /admin-rol/roles`: Crear un nuevo rol.
-   `POST /admin-rol/permisos`: Crear un nuevo permiso.
-   `POST /admin-rol/usuarios/:userId/permisos/:permisoId`: Asignar un permiso a un usuario.
-   `DELETE /admin-rol/usuarios/:userId/permisos/:permisoId`: Revocar un permiso de un usuario.
-   `POST /admin-rol/usuarios/:userId/roles/:roleId`: Asignar un rol a un usuario.
-   `DELETE /admin-rol/usuarios/:userId/roles`: Revocar un rol de un usuario.
-   `GET /admin-rol/usuarios/:userId/permisos`: Obtener todos los permisos de un usuario.

## Autor

Este proyecto fue creado por Santiago.

## Licencia

Este proyecto está licenciado bajo la licencia ISC.
