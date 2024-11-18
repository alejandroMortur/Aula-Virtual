/**
 * Function: sendData
 * Description:
 * Sends data to a specified server endpoint using a POST request. The function is designed to handle both
 * sending and deleting data, determined by the `deleteFlag` parameter.
 * 
 * Parameters:
 * - objeto: The object containing the data to be sent. It is serialized into a JSON string for transmission.
 * - deleteFlag: A boolean flag indicating the action:
 *   - `true`: Indicates a request to delete the provided object.
 *   - `false`: Indicates a request to add or update the provided object.
 * 
 * Functionality:
 * - Makes an asynchronous HTTP POST request to the server.
 * - Sends a JSON payload containing the object (`objeto`) and the delete action (`deleteFlag`).
 * - Logs a success message to the console if the request is successful.
 * - Throws and logs an error if the request fails.
 */
async function sendData(objeto, deleteFlag) {
    try {
        // Perform the HTTP POST request
        const response = await fetch('http://localhost:8080/Aula-Virtual/server/main.php', {
            method: 'POST', // Use POST method to send data
            headers: {
                'Content-Type': 'application/json' // Set the content type to JSON
            },
            body: JSON.stringify({
                objeto: objeto, // Include the object in the request body
                delete: deleteFlag // Include the delete flag in the request body
            })
        });

        // Check if the response is not successful
        if (!response.ok) 
            throw new Error('Error en la solicitud'); // Throw an error for non-OK status
        
        // Parse and log the response data as text
        const data = await response.text();
        console.log('Datos enviados con éxito:', data); // Log success message with server response

    } catch (error) {
        // Handle and log any errors that occur during the request
        console.error('Error:', error);
        throw error; // Re-throw the error for further handling if needed
    }
}
