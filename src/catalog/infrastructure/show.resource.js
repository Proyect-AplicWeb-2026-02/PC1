/**
 * @summary Resource types describing a TV show as returned by the TVMaze API.
 * @author Josue Antonio Flores Apaico (u20201f773)
 *
 * @remarks
 * These typedefs mirror the raw JSON structure of the TVMaze API. They keep the
 * API naming conventions and are only used by the infrastructure layer.
 */

/**
 * Image data structure as returned by the TVMaze API.
 *
 * @typedef {Object} ImageResource
 * @property {string} [medium] - URL of the medium-size image.
 * @property {string} [original] - URL of the original-size image.
 */

/**
 * Rating data structure as returned by the TVMaze API.
 *
 * @typedef {Object} RatingResource
 * @property {number|null} average - Average rating of the show (0 to 10).
 */

/**
 * Broadcaster (network or web channel) data structure as returned by the TVMaze API.
 *
 * @typedef {Object} BroadcasterResource
 * @property {number} id - Unique identifier of the broadcaster.
 * @property {string} name - Name of the network or streaming platform.
 */

/**
 * Show data structure as returned by the TVMaze API.
 *
 * @typedef {Object} ShowResource
 * @property {number} id - Unique identifier of the show.
 * @property {string} url - URL of the show's page on TVMaze.
 * @property {string} name - Title of the show.
 * @property {string[]} genres - Genres of the show.
 * @property {string} status - Current status of the show.
 * @property {string|null} language - Original language of the show.
 * @property {string|null} premiered - Premiere date in YYYY-MM-DD format.
 * @property {RatingResource} rating - Rating information.
 * @property {BroadcasterResource|null} network - Television network, if any.
 * @property {BroadcasterResource|null} webChannel - Streaming platform, if any.
 * @property {ImageResource|null} image - Images of the show.
 * @property {string|null} summary - HTML-formatted summary of the show.
 */

export {};
