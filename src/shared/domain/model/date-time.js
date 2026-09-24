/**
 * @summary Value object representing a date and time within the domain.
 * @author Josue Antonio Flores Apaico (u20201f773)
 *
 * @remarks
 * Ensures that date-time values are valid and provides consistent,
 * locale-aware formatting. It is immutable.
 */
export class DateTime {
    /** @type {Date} */
    #date;

    /**
     * Creates a new DateTime instance.
     *
     * @param {string|Date|number} value - The value to initialize the date with.
     * @throws {Error} If the provided value results in an invalid date.
     */
    constructor(value) {
        const date = new Date(value);
        if (isNaN(date.getTime())) throw new Error('Invalid date-time value');
        this.#date = date;
        Object.freeze(this);
    }

    /**
     * Formats the date for display.
     *
     * @param {string} [locale='en'] - The locale to use for formatting.
     * @param {Intl.DateTimeFormatOptions} [options] - Formatting options.
     * @returns {string} The formatted date string.
     */
    format(locale = 'en', options = {year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'}) {
        return this.#date.toLocaleDateString(locale, options);
    }

    /**
     * Returns the ISO string representation of the date-time.
     * @returns {string}
     */
    toISOString() {
        return this.#date.toISOString();
    }

    /**
     * Returns the primitive value of the DateTime (the timestamp).
     * @returns {number}
     */
    valueOf() {
        return this.#date.getTime();
    }
}
