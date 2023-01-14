# Ecommerce

El proyecto final es un e-Commerce estructurado del siguiente modo:

- Capas MVC bien definidas, con ruteo, controlador, capa de lógica de negocios y validaciones.
- DAOs/DTOs soportan el sistema de persistencia.
- Variables de entorno para ambiente de desarollo y producción en NODE_ENV al desplegar la aplicación.
- API RESTful con los verbos get, post, put y delete para cumplir con todas las acciones necesarias.
- Los productos ingresados se almacenan en una base de datos MongoDB. 
- Canal de chat basado en websockets, el cual permite atender las consultas del cliente.
- Se envia un mail a una casilla configurable, por cada registro nuevo de usuario y con cada orden de compra generada.
- Subir a Heroku o PASS de preferencia.

Login:
POST de registro de usuario: /signup
GET de inicio de sesión: /login
GET de cierre de sesión: /logout

Productos:
GET para mostrar todos los productos: /productos
GET de producto por id: /productos/:id
GET de productos por Categoria: /productos/categoria/:categoria
POST de producto: /productos/
PUT de producto: /productos/:id
DELETE de producto: /productos/:id

Carritos:
GET de todos los productos en carrito del usuario: /carrito/
POST para agregar producto al carrito: /carrito/:id/productos
DELETE de carrito por id: /carrito/:id
DELETE de producto en carrito: /carrito/:id/productos/

Órdenes:
GET de todas las ordenes: /orden/
GET de orden por id: /ordenes/:id
POST de creación de orden: /orden/
PUT de orden: /orden/:id
DELETE de orden por id: /orden/:id

Chat:
GET de todos los mensajes del chat: /chat/
GET de orden por usuario: /chat/:id
