# ByteBakery 🎂 — Repostería Artesanal

Portal web completo construido con React + Bootstrap 5 + Vite.

## Instalación

```bash
npm install
npm run dev
# Abre http://localhost:5173
```

## Credenciales de prueba
- **Usuario:** Admin  
- **Contraseña:** 1234

## Estructura del Proyecto

```
bytebakery/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx                       # Bootstrap + AuthProvider + Router
    ├── App.jsx                        # Rutas públicas/privadas + PrivateRoute
    ├── context/AuthContext.jsx        # Login simulado Admin/1234
    ├── styles/global.css              # Paleta cálida, animaciones, drop-cap
    ├── components/
    │   ├── NavbarComponent.jsx        # Navbar fija + Modal Login + Dropdown
    │   └── Footer.jsx                 # Equipo + Modal perfil + 5 redes
    ├── pages/
    │   ├── Home.jsx        (pública)  # Hero, 3 cols, carrusel, video, audio, acordeón, form
    │   ├── Menu.jsx        (pública)  # Carta de productos con categorías
    │   ├── Contacto.jsx    (pública)  # Formulario + mapa
    │   ├── Dashboard.jsx   (privada)  # Panel con stats y pedidos del día
    │   ├── Pedidos.jsx     (privada)  # Gestión de pedidos con tabla
    │   └── Recetas.jsx     (privada)  # Recetas secretas en acordeón
    └── assets/
        ├── images/                    # (imágenes locales opcionales)
        ├── audio/                     # (audio local opcional)
        └── video/                     # (video local opcional)
```

---

## ANEXO 1 — Principios de Diseño Aplicados

### 1. Paleta de Color y Contraste
Paleta cálida temática: `--choco #3b1f0e` (chocolate oscuro) como color dominante,
`--caramel #b5651d` como acento, `--rose #e8a0a0` como complemento suave y
`--cream #fdf6ee` como fondo base. Contraste WCAG AA garantizado en todos los textos.

### 2. Identidad de Marca Coherente
Tipografía `Cormorant Garamond` (serif italiana) para títulos evoca artesanía y elegancia.
`Nunito` para cuerpo de texto garantiza legibilidad. El ícono 🎂 y la paleta cálida
refuerzan la identidad de repostería en cada componente.

### 3. Jerarquía Visual
H1 en cursiva (italic) tamaño fluido `clamp(3rem, 7vw, 6rem)` crea impacto en el hero.
Subtítulos con `font-style: italic` mantienen coherencia. Drop-cap en texto editorial
guía la lectura con elegancia.

### 4. Responsive Design Mobile-First
Bootstrap 5 con breakpoints `sm`, `md`, `lg`. Imágenes del carrusel con altura adaptativa
via media query. Navbar colapsa en mobile con hamburger. Cards pasan de 1 a 3 columnas
según el viewport.

### 5. Navegación Fija y Persistente
`fixed-top` + `paddingTop: 76px` garantizan que la navbar permanezca visible en todo
momento, independientemente del scroll o la página activa.

### 6. Efectos de Movimiento con Propósito
`float-anim` en el emoji del hero crea profundidad orgánica. `fadeIn/fadeInLeft/fadeInRight`
con delay escalonado dirigen la atención de forma natural. Hover en cards con
`translateY(-8px) rotate(-0.5deg)` da calidez artesanal.

### 7. Ribbon de Productos
Etiquetas de cinta (`ribbon`) en cards del menú comunican jerarquía de productos
(Top ventas, Nuevo, Premium) sin interrumpir el flujo visual.

### 8. Feedback y Affordance
Formularios con validación HTML5 integrada, spinner en el botón de login, confirmaciones
de envío con emoji y texto personalizado. El usuario siempre sabe qué está pasando.

### 9. Economía y Proximidad
Un solo CTA principal en el Hero ("Ver Menú"). Información agrupada por categorías en
el menú y el footer. Dropdowns para opciones secundarias sin contaminar la UI principal.

### 10. Accesibilidad
`aria-label` en redes sociales, `alt` en imágenes, `role` semántico implícito de Bootstrap,
contraste de color AA/AAA, `autoComplete` en formularios para facilitar el acceso.

---

## ANEXO 2 — Funcionalidades Implementadas y No Implementadas

### ✅ Implementadas

| Funcionalidad | Dónde |
|---|---|
| Responsive (móvil/tablet/desktop) | Bootstrap grid + media queries global.css |
| Navbar fija con logo e identidad | `fixed-top` en NavbarComponent.jsx |
| Layout 3 columnas | Home (especialidades), Menu (productos) |
| Efecto Fade (in, left, right) | Animaciones CSS con delay escalonado |
| Modal | Login, detalle productos, video, perfil equipo, detalle pedido |
| Collapse | Panel "Nuestros ingredientes" en Hero |
| Popover | Botón de ingredientes con detalle emergente |
| Dropdown | Opciones por especialidad + Área privada + Usuario |
| Carrusel con fade | 3 slides de productos con Bootstrap Carousel |
| Acordeón | FAQ en Home + Recetas secretas en /recetas |
| Video embebido | YouTube iframe en Home y Modal |
| Audio con controles | `<audio controls>` con pista ambiental |
| Drop-cap (primera letra) | Clase `.drop-cap` con `::first-letter` a color caramel |
| Formulario react-bootstrap | Home (pedido), Contacto, Menú |
| Modal de Login | NavbarComponent con validación, spinner, error |
| Rutas públicas | `/`, `/menu`, `/contacto` |
| Rutas privadas | `/dashboard`, `/pedidos`, `/recetas` con PrivateRoute |
| Sin puertas traseras | `<Navigate to="/" replace>` en PrivateRoute |
| AuthContext global | context/AuthContext.jsx con useState |
| Simulación Login Fase 1 | Admin/1234 hardcoded sin BD |
| Footer con equipo (3 miembros) | Foto + Modal detalle por click |
| 5 Redes sociales | Facebook, Instagram, TikTok, Pinterest, YouTube |
| Estilos en carpeta separada | src/styles/global.css |
| Componentes en carpeta separada | src/components/ |
| Páginas en carpeta separada | src/pages/ |
| Assets organizados | src/assets/{images,audio,video} |
| Mapa Google Maps embebido | Página de Contacto |
| Tabla de gestión (Pedidos) | /pedidos con filtro y modal detalle |
| Identidad visual coherente | Paleta, tipografía y tono únicos de ByteBakery |
| Comentarios JSDoc | Todos los archivos documentados |

### ⚠️ No Implementadas (Fase 1 — sin BD)

| Funcionalidad | Motivo |
|---|---|
| Conexión a Base de Datos | Fuera de alcance Fase 1 |
| Registro / Alta de usuarios | Requiere BD (Fase 2) |
| Persistencia de sesión (reload) | Requiere JWT + localStorage (Fase 2) |
| Carrito de compras funcional | Requiere estado persistente y pagos (Fase 2) |
| Pasarela de pago | Requiere integración PSE/Wompi (Fase 3) |
| Subida de fotos de productos | Requiere Storage en nube (Fase 2) |
| Notificaciones en tiempo real | Requiere WebSockets (Fase 3) |
| Tests unitarios y E2E | Jest + Cypress (Fase 2) |
| SEO y Open Graph | Meta tags y SSR (Fase 3) |
| PWA / instalable | Service Worker (Fase 3) |
