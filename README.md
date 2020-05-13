## Ejemplo de persistencia Políglota en Docker

Este ejemplo muestra 5 contenedores:
1) Angular
2) NodeJS
3) Mongo
4) Redis
5) Redis Comander (ide de Redis para ver los campos)

Primero descargar o clonar el ejemplo, se tiene que instalar las depencias en los proyectos de Node y Angular.

```
 npm install
```
Segundo, dentro de la carpeta del proyecto tiene que ejecutar el siguiente comando (para crear y conectar los contenedores).
```
docker-compose up --build
```

Tercero, conectarse con "Robo 3T" o "Mongo Compass" al localhost:27019

Cuarto: hacer peticiones en redis utilizando el Postman:
```
http://localhost:3000/redis/set/key1/?key1=Dato 1
```
```
http://localhost:3000/redis/get/key1
```