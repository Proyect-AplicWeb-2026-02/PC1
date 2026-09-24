const logoApiUrl = import.meta.env.VITE_LOGO_API_URL;
const apiKey = import.meta.env.VITE_LOGO_PUBLISHABLE_API_KEY;

/**
 * @summary Infrastructure helper for building Logo.dev image URLs.
 * @author Josue Antonio Flores Apaico (u20201f773)
 *
 * @remarks
 * Encapsulates the logic for constructing URLs to retrieve company logos
 * from the Logo.dev external service.
 */
export class LogoDevApi {
    /**
     * Builds the logo URL for a given website domain.
     *
     * @param {string} domain - The website domain (e.g. 'tvmaze.com').
     * @returns {string} The fully qualified URL to the logo image.
     */
    getUrlToLogo = domain => `${logoApiUrl}/${domain}?token=${apiKey}`;
}
