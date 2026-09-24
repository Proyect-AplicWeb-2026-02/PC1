/**
 * @summary Application entry point. Configures i18n, PrimeVue and global components.
 * @author Josue Antonio Flores Apaico (u20201f773)
 */
import {createApp} from 'vue';
import './style.css';
import App from './App.vue';
import i18n from "@/i18n.js";
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Material from '@primeuix/themes/material';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import {Button, Card, ProgressSpinner, Rating, SelectButton, Tag, Toast, Toolbar} from "primevue";

const primeUiLicenseKey = import.meta.env.VITE_PRIME_UI_LICENSE_KEY;

createApp(App)
    .use(i18n)
    .use(PrimeVue, {
        ripple: true,
        theme: {preset: Material},
        license: primeUiLicenseKey
    })
    .use(ToastService)
    .component('pv-button', Button)
    .component('pv-card', Card)
    .component('pv-progress-spinner', ProgressSpinner)
    .component('pv-rating', Rating)
    .component('pv-select-button', SelectButton)
    .component('pv-tag', Tag)
    .component('pv-toast', Toast)
    .component('pv-toolbar', Toolbar)
    .mount('#app');
