Carpeta de imagenes turisticas de Bucaramanga y area metropolitana
====================================================================
Colocar aqui hasta 3 imagenes de la ciudad (JPG, PNG, WEBP).

Estas imagenes se sirven via express.static en la ruta:
  GET http://localhost:4000/imagenes/<nombre-del-archivo>

Ejemplos:
  http://localhost:4000/imagenes/parque-santander.jpg
  http://localhost:4000/imagenes/mesa-los-santos.jpg
  http://localhost:4000/imagenes/girona-chicamocha.jpg

El servidor de contenidos estaticos esta configurado en server.js:
  app.use("/imagenes", express.static(path.join(__dirname, "public/imagenes-bucaramanga")))
