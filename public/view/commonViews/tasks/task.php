<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tarea</title>
    <script src="/public/assets/class/user.js"></script>
    <script src="/public/assets/class/coursesTask.js"></script>
    <script src="/public/assets/js/menu.js"></script>
    <script src="/public/assets/js/loader.js"></script>
    <script src="/public/assets/js/footer.js"></script>
    <link rel="stylesheet" type="text/css" href="/public/assets/css/menu.css" />
    <link rel="stylesheet" type="text/css" href="task.css" />
    <link rel="stylesheet" type="text/css" href="/public/assets/css/footer.css" />
</head>
<body>

    <script> 
        async function init() {

            let currentUser = new User(JSON.parse(sessionStorage.getItem("user")));
            let currentTask = new CoursesTask(JSON.parse(sessionStorage.getItem("task")));

            let loader = new Loader();
            await loader.loadDocumentCoursesTasks(currentTask.getTaskId());

            loadMenu(currentUser);

        }

        window.onload = init;
    </script>

    <!-- main menu-->
    <div id="menu">
    </div>
    
    <div id="upload">
        <form action="/server/main.php" method="post" enctype="multipart/form-data">
            <p>
                70MB max
                <input type="hidden" name="MAX_FILE_SIZE" value="<?php echo 70000000 ?>">
                <input type="file" name="Ficheros[]" multiple="multiple">
            </p>
            <p>
                <button type="submit" name="Enviar">Enviar</button>
                <button type="reset">Limpiar</button>
            </p>
        </form>
    </div>

    <div id="dowload">
    </div>

    <div id="footer">
    </div>

</body>
</html>