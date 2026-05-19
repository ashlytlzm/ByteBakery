# ByteBakery — Proyecto Full Stack

## URL de Acceso
- **Frontend (Next.js):** http://localhost:3000
- **Backend API (Express):** http://localhost:4000
- **API Docs:** http://localhost:4000
- **Imagenes Bucaramanga (static):** http://localhost:4000/imagenes/

---

## Usuarios del Sistema

| Usuario | Clave | Descripcion |
|---------|-------|-------------|
| admin@bytebakery.com | admin123 | Administrador con acceso total al panel |
| cliente@bytebakery.com | cliente123 | Cliente demo con acceso a dashboard y pedidos |
| ana@bytebakery.com | cliente123 | Cliente adicional para pruebas |

> Usuario MySQL: **un_usr** / Clave: **una_clave** / BD: **bytebakery**

---

## Estructura del Proyecto

```
ByteBakery/
├── frontend/          ← Aplicacion Next.js (React, Tailwind, Bootstrap)
│   ├── app/           ← Paginas de la app (App Router)
│   │   ├── page.jsx          (home - vista visitantes)
│   │   ├── login/            (autenticacion)
│   │   ├── registro/         (registro de usuarios)
│   │   ├── catalogo/         (productos - publico)
│   │   ├── carrito/          (carrito de compras)
│   │   ├── pedidos/          (pedidos - requiere login)
│   │   ├── dashboard/        (panel usuario - requiere login)
│   │   ├── admin/            (CRUD completo - solo admin)
│   │   ├── bucaramanga/      (imagenes estaticas del backend)
│   │   ├── promociones/      (requiere login)
│   │   └── recetas/          (requiere login)
│   ├── components/    ← Componentes reutilizables
│   │   ├── auth-context.jsx  (manejo de sesion JWT)
│   │   ├── cart-context.jsx  (carrito de compras)
│   │   └── bytebakery/       (Header, Footer, Hero, etc.)
│   ├── lib/
│   │   └── api.js            ← Helper para llamadas al backend
│   └── .env.local            (NEXT_PUBLIC_API_URL)
│
└── backend/           ← API REST con Express + MySQL
    ├── server.js             ← Servidor principal (entry point)
    ├── config/
    │   ├── database.js       ← Pool de conexiones MySQL
    │   ├── initDB.js         ← Creacion automatica de tablas y datos
    │   └── mysql_setup.sql   ← Script SQL para XAMPP/phpMyAdmin
    ├── middleware/
    │   ├── auth.js           ← Verificacion JWT (verifyToken, verifyAdmin)
    │   └── validateEmail.js  ← Validacion de correo con regex
    ├── routes/
    │   ├── authRoutes.js     ← POST /api/auth/login, /api/auth/registro
    │   ├── productosRoutes.js← CRUD /api/productos
    │   ├── usuariosRoutes.js ← CRUD /api/usuarios
    │   ├── pedidosRoutes.js  ← CRUD /api/pedidos
    │   └── archivosRoutes.js ← Upload/Download /api/archivos
    ├── uploads/              ← Archivos subidos por usuarios
    ├── public/
    │   └── imagenes-bucaramanga/ ← Imagenes servidas con express.static
    ├── package.json
    └── .env
```

---

## Instalacion y Ejecucion

### 1. Configurar MySQL en XAMPP

1. Abrir XAMPP y arrancar Apache + MySQL
2. Abrir phpMyAdmin (http://localhost/phpmyadmin)
3. Ir a **SQL** y ejecutar el contenido de `backend/config/mysql_setup.sql`
4. Esto crea la BD `bytebakery` y el usuario `un_usr` / `una_clave`
5. Las tablas se crean automaticamente al arrancar el backend

### 2. Iniciar el Backend

```bash
cd backend
npm install
npm run dev       # con nodemon (recarga automatica)
# o
npm start         # produccion
```

El servidor arranca en http://localhost:4000 y crea las tablas + datos iniciales.

### 3. Iniciar el Frontend

```bash
cd frontend
npm install
npm run dev
```

El frontend arranca en http://localhost:3000

---

## Endpoints de la API

### Autenticacion
| Metodo | Ruta | Acceso | Descripcion |
|--------|------|--------|-------------|
| POST | /api/auth/registro | Publico | Registrar nuevo usuario |
| POST | /api/auth/login | Publico | Iniciar sesion (retorna JWT) |

### Productos
| Metodo | Ruta | Acceso | Descripcion |
|--------|------|--------|-------------|
| GET | /api/productos | Publico | Listar productos (filtros: ?categoria=&buscar=) |
| GET | /api/productos/:id | Publico | Ver un producto |
| POST | /api/productos | Admin | Crear producto |
| PUT | /api/productos/:id | Admin | Actualizar producto |
| DELETE | /api/productos/:id | Admin | Eliminar producto (baja logica) |

### Usuarios
| Metodo | Ruta | Acceso | Descripcion |
|--------|------|--------|-------------|
| GET | /api/usuarios | Admin | Listar todos los usuarios |
| GET | /api/usuarios/perfil | Autenticado | Ver perfil propio |
| GET | /api/usuarios/:id | Admin | Ver usuario por ID |
| PUT | /api/usuarios/:id | Autenticado | Actualizar usuario |
| DELETE | /api/usuarios/:id | Admin | Desactivar usuario |

### Pedidos
| Metodo | Ruta | Acceso | Descripcion |
|--------|------|--------|-------------|
| GET | /api/pedidos | Autenticado | Listar pedidos (admin ve todos) |
| GET | /api/pedidos/:id | Autenticado | Ver detalle del pedido |
| POST | /api/pedidos | Autenticado | Crear nuevo pedido |
| PUT | /api/pedidos/:id/estado | Admin | Actualizar estado del pedido |
| DELETE | /api/pedidos/:id | Autenticado | Cancelar pedido |

### Archivos
| Metodo | Ruta | Acceso | Descripcion |
|--------|------|--------|-------------|
| POST | /api/archivos/subir | Autenticado | Subir archivo (multipart/form-data, campo: archivo) |
| GET | /api/archivos | Autenticado | Listar archivos subidos |
| GET | /api/archivos/descargar/:filename | Publico | Descargar archivo |
| DELETE | /api/archivos/:id | Autenticado | Eliminar archivo |

### Contenido Estatico
| Ruta | Descripcion |
|------|-------------|
| GET /imagenes/:archivo | Imagenes de Bucaramanga (express.static) |
| GET /uploads/:archivo | Archivos subidos por usuarios |

---

## Tablas de la Base de Datos

1. **usuarios** — id, nombre, correo, password (bcrypt), rol, activo, creado_en
2. **productos** — id, nombre, descripcion, precio, categoria, imagen_url, estrellas, disponible, creado_en
3. **pedidos** — id, usuario_id (FK), total, estado (ENUM), direccion, notas, creado_en
4. **detalle_pedidos** — id, pedido_id (FK), producto_id (FK), cantidad, precio_unidad, subtotal (GENERATED)
5. **archivos** — id, nombre_original, nombre_server, tipo, tamanio, subido_por (FK), creado_en

---

## Funcionalidades Implementadas

- Vista de visitantes (sin login): Home, Catalogo, Nosotros, Contacto
- Vista de usuarios registrados (con login): Dashboard, Pedidos, Promociones, Recetas, Admin
- CRUD completo de Productos, Usuarios, Pedidos desde el Panel Admin
- Autenticacion real con JWT y bcrypt (verificacion en MySQL)
- Validacion de correo electronico con expresion regular (middleware)
- Subida y descarga de archivos (texto, imagenes, videos) con multer
- Servidor de contenido estatico para imagenes de Bucaramanga (express.static)
- Router de Express para todas las rutas del backend
- Creacion automatica de tablas y datos iniciales desde scripts del app
