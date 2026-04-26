# ANEXO 1: Principios de Diseño Empleados para Diseñar un FrontEnd

## 1. El Paradigma "Uncodixify" (Diseño Funcional y Humano)
El proyecto ha sido diseñado bajo los lineamientos del manifesto "Uncodixify". Esto significa que hemos evitado deliberadamente estéticas genéricas ("AI-driven UI") caracterizadas por grandes sombras difuminadas (glassmorphism), bordes excesivamente redondeados ("pill shapes") y gradientes suaves.
En su lugar, hemos apostado por una estética inspirada en plataformas profesionales como Linear o GitHub:
- **Radios Estandarizados:** Rehusamos los bordes de 20px-30px y adoptamos un máximo estricto de `8px` (0.5rem) para elementos interactivos como botones (`btn`) y contenedores (`card`).
- **Sombras Funcionales:** En lugar de sombras exageradas o brillos (glows), usamos sombras muy sutiles (`0 2px 8px rgba(0,0,0,0.05)`) únicamente cuando hay elevación necesaria (jerarquía).

## 2. Paleta de Colores Restringida y Accesible
Aplicamos el esquema de color **Pearl Minimal** definido en las reglas del diseño:
- **Background / Superficies:** Colores claros e inmaculados (`#f8f9fa`, `#ffffff`).
- **Acentos:** El color principal (`#0066cc`) marca las acciones primarias, acompañado por el naranja vibrante (`#ff6b35`) como acento secundario para alertas o interacciones especiales. Esto asegura un **contraste de color** que cumple con estándares WCAG para legibilidad.

## 3. Composición, Disposición y Jerarquía
- **Diseño a 3 columnas (Three-Column Layout):** Utilizado en la sección de "Especialidades" o en el listado de productos usando la grilla natural de Bootstrap (`Col md=4`). Ayuda al ojo humano a explorar de forma equilibrada la oferta de productos.
- **Barra de Navegación Fija (Sticky):** Elemento clave para usabilidad, asegurando que el usuario pueda saltar de la visualización de la portada, al catálogo privado o contacto sin perder el índice principal (implementado con `fixed="top"` en la `Navbar`).
- **Multimedia No Invasiva:** Uso balanceado de carruseles de presentación y controles explícitos para video y audio (permitiendo al usuario pausar el audio en lugar de forzar reproducción persistente intrusiva).
- **Tipografía "Drop Cap":** Regla clásica de editoriales donde se utiliza la primera letra grande y con color para capturar la atención en secciones largas de texto.

## 4. Modularidad y Organización
Separación total de preocupaciones ("Separation of Concerns").
- `.tsx`: Los scripts y el markup interactivo utilizando React y Next.js.
- `.css`: Estilos sobreescritos y tipografía en hojas globales.
- Componentes organizados lógicamente (Cabecera, pie de página, contexto de autenticación).
