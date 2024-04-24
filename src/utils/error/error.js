// Función para formatear errores y no repetir estas líneas constantemente
const setError = (code, message) => {
    const error = new Error;
    error.code = code;
    error.message = message;
    return error
}

module.exports = { setError };