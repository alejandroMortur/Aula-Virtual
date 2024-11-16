async function sendData(objeto, deleteFlag) {
    try {
        const response = await fetch('http://localhost:8080/Aula-Virtual/server/main.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                objeto: objeto, // Incluye el objeto
                delete: deleteFlag // Incluye el parámetro delete (true o false)
            })
        });
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        const data = await response.text();
        console.log('Datos enviados con éxito:', data);
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
