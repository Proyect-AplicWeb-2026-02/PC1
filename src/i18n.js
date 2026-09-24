import en from './locales/en.json';
import es from './locales/es.json';
import pt from './locales/pt.json';

import {createI18n} from 'vue-i18n';

/**
 * @summary Internationalization setup for the application.
 * @author Josue Antonio Flores Apaico (u20201f773)
 *
 * @remarks
 * English is the default locale. Spanish and Portuguese are also supported.
 */
const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: {en, es, pt}
});

export default i18n;
