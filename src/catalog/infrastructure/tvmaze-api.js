import axios from "axios";
import {errorInterceptor} from "@/shared/infrastructure/error.interceptor.js";
import {ShowsRequest} from "@/catalog/infrastructure/shows.request.js";

const tvMazeApiUrl = import.meta.env.VITE_TVMAZE_API_URL;
const showsEndpointPath = import.meta.env.VITE_SHOWS_ENDPOINT_PATH;

const http = axios.create({
    baseURL: tvMazeApiUrl
});

http.interceptors.response.use(errorInterceptor.onResponse, errorInterceptor.onError);

/**
 * @summary API client for the TVMaze public API.
 * @author Josue Antonio Flores Apaico (u20201f773)
 *
 * @remarks
 * Encapsulates HTTP access to the TVMaze service. The base URL and endpoint
 * paths are read from environment variables.
 */
export class TvMazeApi {
    /**
     * Retrieves a page of shows from the catalog.
     *
     * @param {ShowsRequest} [request] - The request parameters.
     * @returns {Promise<import('axios').AxiosResponse<import('./shows.response.js').ShowsResponse>>}
     */
    getShows = (request = new ShowsRequest()) => http.get(showsEndpointPath, {params: request.toParams()});
}
