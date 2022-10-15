# Culturas Gastronomicas

## Configuraciones para ejecutar proyecto
1. Version de nodejs usada: v16.17.0
2. Version de npm usada: 8.15.0
3. Installe dependencias luego de clonar el repo con el comando ```npm i```.
2. Configurar base de datos postgres. La conexion a la base de datos por defecto que usa la aplicacion es ```localhost:5432```, con usuarion ```postgres``` y contraseña ```postgres```. Deberá crear una base de datos que se llame ```gastronomia```. Si desea cambiar estos parámetros por defecto valla al archivo ```src/app.module.ts```.

## Ejecucion de proyecto
1. Puede usar el comando: ```npm run start```
2. Importe en Postman las los archivos que se encuentran en la carpeta ```collections``` para validar los multiples endpoints expuestos por el API y sus resultados.
3. Los endpoints expuestos por el API requieren autenticacion Bearer en header. Deberá optener el token usando el enpoint {{server}}/api/v1/login. El siguiente curl muestra como se puede uptener un token usando el usario ```admin```:  
```
curl --location --request POST 'localhost:3000/api/v1/users/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "admin",
    "password": "admin"
}'
```
Para validar los usuasrios que permite la aplicacion consulte el archivo ```src/usuario/usuario.service.ts```.