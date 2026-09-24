/**
 * @summary Request parameters for the TVMaze shows endpoint.
 * @author Josue Antonio Flores Apaico (u20201f773)
 *
 * @remarks
 * The TVMaze /shows endpoint is paginated: each page returns up to 250 shows.
 */
export class ShowsRequest {
    /**
     * Creates a new ShowsRequest instance.
     *
     * @param {number} [page=0] - Zero-based page number to retrieve.
     */
    constructor(page = 0) {
        this.page = Number.isInteger(page) && page >= 0 ? page : 0;
    }

    /**
     * Converts the request into Axios query parameters.
     * @returns {{page: number}}
     */
    toParams() {
        return {page: this.page};
    }
}
