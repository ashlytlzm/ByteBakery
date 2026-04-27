ByteBakery — Repostería Artesanal


Portal web completo construido con React + Bootstrap 5 + Vite.


·· Instalación

** En la terminal del entorno de desarrollo en el que abre el proyecto **
npm install // Instala dependencias y módulos que no se incluyen en el zip/github.
npm run dev // Abre en su navegador http://localhost:port, el puerto puede variar de su archivo local.

Nota: Es importante tener instalado en el equipo NodeJS y git (Si accede al proyecto por medio de github)
pues estas aplicaciones permitirán la ejecución satisfactoria de la aplicación web.

** En el navegador de su preferencia **

Ahora se encuentra en la página principal de la aplicación, puede navegar a través del menú de navegación libremente.
Tener en cuenta que aún no se implementa la base de datos en relación al proyecto, por lo que funciones de registro
o realización de pedidios están en una etapa de simulación.

Acceda a rutas privadas usando las credenciales a continuación.


·· Credenciales de prueba


Usuario: Admin
Contraseña: 1234


·· Estructura del Proyecto

	ByteBakery/
├── .next/                  
├── app/
│   ├── admin/
│   ├── carrito/
│   ├── catalogo/
│   ├── contacto/
│   ├── dashboard/
│   ├── login/
│   ├── nosotros/
│   ├── pedidos/
│   ├── promociones/
│   ├── recetas/
│   ├── registro/
│   ├── globals.css
│   ├── layout.jsx
│   └── page.jsx
├── components/
│   ├── bytebakery/
│   ├── ui/
│   ├── auth-context.jsx
│   ├── cart-context.jsx
│   └── theme-provider.jsx
├── hooks/
│   └── use-toast.js
├── lib/
│   └── utils.js
├── node_modules/           
├── public/
│   ├── images/
│   └── (íconos y logos estáticos)
├── styles/
│   └── globals.css
├── .gitignore
├── ANEXO1_PRINCIPIOS.md
├── ANEXO2_FUNCIONALIDADES.md
├── components.json
├── jsconfig.json
├── next.config.mjs
├── package.json
├── package-lock.json
└── postcss.config.mjs