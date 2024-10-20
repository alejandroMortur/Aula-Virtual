# Virtual-Academy 🎓

## Description

Aula-Virtual is a web project designed to facilitate online learning, providing an interactive and accessible environment for students and teachers. The platform includes various features that allow the management of courses, educational materials, and user interaction.

## Features

- **Intuitive Interface** 🌐: A user-friendly interface that allows users to navigate through courses and materials with ease.
- **Course Management** 📚: Teachers can create, edit, and manage courses, as well as upload multimedia resources.
- **Multimedia Resources** 🎥: Integration of images, videos, and audio to enrich the course content.
- **Interaction** 💬: A section for forums and comments where students and teachers can interact.
- **Accessibility** 📱: A responsive design that adapts to different devices and screen sizes.

## Instructions to Create Containers and Run the Web Page

Below are the necessary commands to create Docker containers and run the web application on both Windows and Linux operating systems.

### 1. Create Containers

#### For Linux:

Run the following command in the terminal while in the project folder:

```bash
docker run --name miservidor -d -p 8080:80 -v $(pwd):/usr/share/nginx/html nginx

docker run --name miservidor -d -p 8080:80 -v $(pwd):/var/www/html php:7.0-apache
```
### For Windows:

Run the following command in the command line while in the project folder:

```bash
docker run --name miservidor -d -p 8080:80 -v ${pwd}:/usr/share/nginx/html nginx

docker run --name miservidor -d -p 8080:80 -v ${pwd}:/var/www/html php:7.0-apache

```

### 2. Access the Application:

After running the above commands, you can access the web application by opening a browser and navigating to the following address:

```bash
http://localhost:8080/login/login.html
```