import {Show} from "@/catalog/domain/model/show.entity.js";

/**
 * @summary Assembler that maps TVMaze show resources into Show domain entities.
 * @author Josue Antonio Flores Apaico (u20201f773)
 *
 * @remarks
 * Responsible for translating the API naming conventions (e.g. image.medium,
 * rating.average, network.name, webChannel.name) into the attributes of the
 * domain entity. Invalid resources are skipped so a single malformed record
 * does not break the whole catalog.
 */
export class ShowAssembler {
    /**
     * Converts an Axios response of the shows endpoint into Show entities.
     *
     * @param {import('axios').AxiosResponse<import('./shows.response.js').ShowsResponse>} response
     * @returns {Show[]} The list of valid Show entities.
     */
    toEntitiesFromResponse(response) {
        if (!Array.isArray(response.data)) {
            console.error('Unexpected shows response format:', response.data);
            return [];
        }
        return response.data.map(resource => {
            try {
                return this.toEntityFromResource(resource);
            } catch (error) {
                console.error('Validation error for show:', error.message, resource);
                return null;
            }
        }).filter(show => show !== null);
    }

    /**
     * Converts a single show resource into a Show entity.
     *
     * @param {import('./show.resource.js').ShowResource} resource
     * @returns {Show}
     */
    toEntityFromResource(resource) {
        return new Show({
            id: resource.id,
            name: resource.name,
            genres: resource.genres,
            language: resource.language,
            broadcaster: resource.network?.name ?? resource.webChannel?.name ?? '',
            premiered: resource.premiered,
            summary: ShowAssembler.#stripHtml(resource.summary),
            imageUrl: resource.image?.medium ?? '',
            rating: resource.rating?.average ?? null,
            status: resource.status,
            url: resource.url
        });
    }

    /**
     * Removes HTML tags from the API summary, keeping plain text only.
     *
     * @param {string|null} html - The HTML-formatted summary.
     * @returns {string} The plain-text summary.
     */
    static #stripHtml(html) {
        if (!html) return '';
        return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    }
}
