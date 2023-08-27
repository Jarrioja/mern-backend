# mern-backend

# Comandos

### Inicializar app

Crea el usuario admin y los roles predeterminados

user: `admin@coder.com` \
password: `admin`

```bash
npm run command init
```

### Crear usuario

```bash
npm run command add-user --email admin@mail.com --password admin123 --firstName John --lastName Doe -age 99 -isAdmin true
```

## Para ejecutar con nodemon

```bash
npm run dev
```

## Uso

La aplicación maneja dos rutas de solicitud GET:

- `/products`: devuelve una lista de productos. Si se proporciona un parámetro de consulta `limit`, la lista se limitará a ese número de productos.
- `/products/:productId`: devuelve los detalles del producto con el ID especificado en la URL.

## Tecnologías utilizadas

- Node.js
- Express.js
- dotenv
