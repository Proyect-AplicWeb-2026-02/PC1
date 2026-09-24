import {reactive} from "vue";
import {TvMazeApi} from "@/catalog/infrastructure/tvmaze-api.js";
import {ShowAssembler} from "@/catalog/infrastructure/show.assembler.js";
import {ShowsRequest} from "@/catalog/infrastructure/shows.request.js";

const tvMazeApi = new TvMazeApi();
const showAssembler = new ShowAssembler();

/**
 * @summary Application store for the catalog bounded context.
 * @author Josue Antonio Flores Apaico (u20201f773)
 *
 * @remarks
 * Holds the reactive state of the show catalog and orchestrates data loading
 * through the infrastructure layer (API client and assembler).
 */
export const catalogStore = reactive({
    /** @type {import('@/catalog/domain/model/show.entity.js').Show[]} */
    shows: [],
    /** @type {string[]} */
    errors: [],
    /** @type {boolean} */
    loading: false,

    /**
     * Loads the shows from the TVMaze API into the store.
     *
     * @param {number} [page=0] - Zero-based page number to retrieve.
     * @returns {void}
     */
    loadShows(page = 0) {
        this.errors = [];
        this.loading = true;
        tvMazeApi.getShows(new ShowsRequest(page))
            .then(response => {
                this.shows = showAssembler.toEntitiesFromResponse(response);
            })
            .catch(message => {
                this.errors.push(message);
                this.shows = [];
            })
            .finally(() => {
                this.loading = false;
            });
    }
});
