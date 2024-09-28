# Aula-Virtual 🎓

## Descripción

Aula-Virtual es un proyecto web diseñado para facilitar el aprendizaje en línea, proporcionando un entorno interactivo y accesible para estudiantes y profesores. La plataforma incluye diversas funcionalidades que permiten la gestión de cursos, materiales educativos y la interacción entre usuarios.

## Características

- **Interfaz Intuitiva** 🌐: Una interfaz fácil de usar que permite a los usuarios navegar por los cursos y materiales sin dificultad.
- **Gestión de Cursos** 📚: Los profesores pueden crear, editar y gestionar cursos, así como subir recursos multimedia.
- **Recursos Multimedia** 🎥: Integración de imágenes, videos y audios para enriquecer el contenido del curso.
- **Interacción** 💬: Sección para foros y comentarios donde estudiantes y profesores pueden interactuar.
- **Accesibilidad** 📱: Diseño responsive que se adapta a diferentes dispositivos y tamaños de pantalla.

## Instrucciones para Crear Contenedores y Ejecutar la Página Web

A continuación, se presentan los comandos necesarios para crear contenedores de Docker y ejecutar la aplicación web en sistemas operativos Windows y Linux.

### 1. Crear Contenedores

#### Para Linux:

Ejecuta el siguiente comando en la terminal en caso de tener un sistema Linux, sobre la carpeta del proyecto:

```bash
docker run --name miservidor -d -p 8080:80 -v $(pwd):/usr/share/nginx/html nginx

docker run --name miservidor -d -p 8080:80 -v $(pwd):/var/www/html php:7.0-apache
```
### Para windows:

Ejecuta el siguiente comando en la línea de comandos en caso de tener un sistema Windows, sobre la carpeta del proyecto:

```bash
docker run --name miservidor -d -p 8080:80 -v ${pwd}:/usr/share/nginx/html nginx

docker run --name miservidor -d -p 8080:80 -v ${pwd}:/var/www/html php:7.0-apache

```

### 2. Acceder a la Aplicación

Después de ejecutar los comandos anteriores, podrás acceder a la aplicación web abriendo un navegador y dirigiéndote a la siguiente dirección:

```bash
http://localhost:8080/index.html
```