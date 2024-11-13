function mandarDatos(objeto) {
    return fetch('http://localhost:8080/server/main.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objeto)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error in the request');
        }
        return response.text(); 
    })
    .then(data => {
        console.log('Data sent successfully:', data);
    })
    .catch(error => {
        console.error('Error:', error);
        throw error; 
    });
}