# ANEXO 2: Funcionalidades Implementadas

## Funcionalidades Exitosamente Implementadas

1. **Diseño Web Responsivo (Responsive Design):** Empleando React-Bootstrap (`Container`, `Row`, `Col`) se asegura la adaptabilidad a dispositivos móviles, tablets y escritorio de extremo a extremo.
2. **Portada (Landing Page):** 
   - Logo expuesto.
   - Componentes integrados como el `Carousel` de presentación, diseño a 3 columnas para productos clave.
   - Navegación global fija (`fixed="top"` en Navbar).
3. **Efectos Interactivos e UI:** 
   - Modales (Implementados en el Login y en la Vista Rápida del Estudiante en el Pie de Página).
   - Acordeón (`Accordion`) implementado para las "Preguntas Frecuentes" de la empresa.
   - Despegables (`NavDropdown`) en la barra superior.
4. **Router Compartimentado (Rutas Públicas y Privadas):**
   - Utilizando la magia nativa de React y Next.js App Router combinada con un High Order Component (Componente de Contexto) en `AuthContext`.
   - Se bloquea la navegación al módulo `Catalogo` o `Carrito` sin haber introducido las credenciales simuladas.
5. **Autenticación Simulada Exigida:**
   - La cabecera despliega un `Modal` con un `Form` de Bootstrap para permitir entrada por el frente sin "puertas traseras". Autenticación fija implementada usando usuario: **Admin** y password: **1234**.
6. **Agrupación Modular Separada:**
   - Hoja de estilos en `/app/globals.css`.
   - Lógica de componentes JSX segregada en `/components/bytebakery/`.
7. **Diseño de Pie de Página:**
   - Incorpora información de contacto.
   - Enlaza 3 redes sociales funcionales visualmente (Instagram, Facebook, Twitter).
   - Módulo interactivo "Nuestro Equipo", que despliega un componente extra Modal con fotografía e información de estudiantes al dar clic sobre ellos.
8. **Multimedia Básica y Texto con Estilo:**
   - Uso de `<video>` y `<audio>` embebidos en el Home (Portada).
   - Texto de "Nuestra Filosofía" configurado con Drop Cap (primera letra amplificada y resaltada).
9. **Bonus / Funcionalidades Adicionales (Innovación):**
   - **Ojo Revelador de Contraseña:** Un control visual que funciona alterando el `type` de texto a password, permitiendo validar la entrada visualmente.
   - **Captcha "Simulado" Defensivo:** Un Checkbox simple dentro del formulario de autenticación que debe llenarse a modo de reto lógico superficial para evitar (conceptualmente) ataques automatizados.

## Funcionalidades No Implementadas Parcial o Totalmente

- **Conexión a Base de Datos (SQL Server, MySQL, MongoDB, etc):** Como exigía la especificación de FASE 1 explícitamente: *"en esta primera FASE no es necesario realizar la conexion a la BD"*, por tanto la lógica de inicio de sesión reposa a nivel Frontend con persistencia simulada temporal en el almacenamiento local del navegador (`localStorage`).
