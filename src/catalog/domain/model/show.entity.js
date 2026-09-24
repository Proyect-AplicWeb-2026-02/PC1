import {StringValidator} from "@/shared/domain/model/string-validator.js";
import {DateTime} from "@/shared/domain/model/date-time.js";
import {Url} from "@/shared/domain/model/url.js";

/**
 * Properties for creating a Show entity.
 *
 * @typedef {Object} ShowProps
 * @property {number} id - Unique identifier of the show.
 * @property {string} name - Title of the show.
 * @property {string[]} [genres] - Genres the show belongs to.
 * @property {string} [language] - Original language of the show.
 * @property {string} [broadcaster] - Network or streaming platform that airs the show.
 * @property {string|Date|DateTime|null} [premiered] - Premiere date of the show.
 * @property {string} [summary] - Plain-text summary of the show.
 * @property {string|Url} [imageUrl] - URL of the medium-size image of the show.
 * @property {number|null} [rating] - Average rating of the show (0 to 10).
 * @property {string} [status] - Current status of the show (e.g. 'Running', 'Ended').
 * @property {string|Url} [url] - URL of the show's page on TVMaze.
 */

/**
 * @summary Domain entity representing a TV show in the catalog.
 * @author Josue Antonio Flores Apaico (u20201f773)
 *
 * @remarks
 * Encapsulates the attributes and behavior of a TV show. It ensures data
 * integrity through validation in its constructor and remains independent
 * of the external API structure.
 */
export class Show {
    /** Maximum value of the rating scale used by TVMaze. */
    static MAX_RATING = 10;

    /**
     * Creates a new Show instance.
     *
     * @param {ShowProps} props - The properties to initialize the show with.
     * @throws {Error} If id is not a positive integer or name is empty.
     */
    constructor({id, name = '', genres = [], language = '', broadcaster = '', premiered = null,
                    summary = '', imageUrl = '', rating = null, status = '', url = ''}) {
        if (!Number.isInteger(id) || id <= 0) throw new Error('Show id must be a positive integer');
        if (!StringValidator.isNotEmptyString(name)) throw new Error('Show name must be a non-empty string');

        this.id = id;
        this.name = name;
        this.genres = Array.isArray(genres) ? genres : [];
        this.language = language ?? '';
        this.broadcaster = broadcaster ?? '';
        this.premiered = Show.#toDateTimeOrNull(premiered);
        this.summary = summary ?? '';
        this.imageUrl = imageUrl instanceof Url ? imageUrl : new Url(imageUrl);
        if (this.imageUrl.isEmpty()) {
            this.imageUrl = new Url('https://placehold.co/210x295?text=No+Image');
        }
        this.rating = typeof rating === 'number' ? rating : null;
        this.status = status ?? '';
        this.url = url instanceof Url ? url : new Url(url);
    }

    /**
     * Converts a raw value into a DateTime, or null if missing or invalid.
     *
     * @param {string|Date|DateTime|null} value - The raw date value.
     * @returns {DateTime|null}
     */
    static #toDateTimeOrNull(value) {
        if (value instanceof DateTime) return value;
        if (!value) return null;
        try {
            return new DateTime(value);
        } catch {
            return null;
        }
    }

    /**
     * Checks whether the show has a rating.
     * @returns {boolean}
     */
    hasRating() {
        return this.rating !== null;
    }

    /**
     * Returns the genres joined as a single display string.
     * @returns {string}
     */
    getGenresAsText() {
        return this.genres.join(', ');
    }

    /**
     * Formats the premiere date for display in the given locale.
     *
     * @param {string} locale - The locale to use (e.g. 'en', 'es', 'pt').
     * @returns {string} The formatted date, or an empty string if unknown.
     */
    getFormattedPremiered(locale) {
        return this.premiered ? this.premiered.format(locale) : '';
    }

    /**
     * Returns a stable key for the show status, suitable for i18n lookups.
     * For example, 'To Be Determined' becomes 'to-be-determined'.
     *
     * @returns {string}
     */
    getStatusKey() {
        return this.status.trim().toLowerCase().replace(/\s+/g, '-');
    }
}
