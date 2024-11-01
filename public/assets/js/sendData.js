function mandarDatos(objeto){

    // Enviar el objeto como JSON a tu script PHP
    fetch('http://localhost:8080/server/main.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objeto)
    })
    .then(response => response.text())
    .then(data => {
        console.log(data); // Manejar la respuesta del servidor
    })
    .catch(error => {
        console.error('Error:', error);
    });

}