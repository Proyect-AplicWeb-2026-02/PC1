/**
 * @summary Axios response interceptor for centralized HTTP error handling.
 * @author Josue Antonio Flores Apaico (u20201f773)
 *
 * @remarks
 * Logs technical details to the console and rejects the promise with a
 * simple, readable message so the application layer can display it.
 */
export const errorInterceptor = {

    /**
     * Passes successful responses through unchanged.
     * @param {import('axios').AxiosResponse} response
     * @returns {import('axios').AxiosResponse}
     */
    onResponse: (response) => response,

    /**
     * Normalizes an Axios error into a readable message.
     * @param {import('axios').AxiosError} error
     * @returns {Promise<never>} A rejected promise carrying the error message.
     */
    onError: (error) => {
        let message;

        if (error.response) {
            console.error('Data:', error.response.data);
            console.error('Status:', error.response.status);
            console.error('Headers:', error.response.headers);
            message = error.response.data?.['message'] || `Error: ${error.response.status}: ${error.response.statusText}`;
        } else if (error.request) {
            console.error('Request:', error.request);
            message = 'No response returned.';
        } else {
            console.error('Error Message:', error.message);
            message = error.message;
        }

        return Promise.reject(message);
    }
};
