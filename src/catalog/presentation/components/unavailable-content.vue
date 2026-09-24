<script setup lang="js">
import {useI18n} from "vue-i18n";

/**
 * @summary Presentation component for displaying fallback content when the catalog cannot be loaded.
 * @author Josue Antonio Flores Apaico (u20201f773)
 *
 * @remarks
 * Rendered when no shows are available or an error occurs while fetching data.
 */

/**
 * Properties for the UnavailableContent component.
 *
 * @typedef {Object} UnavailableContentProps
 * @property {string[]} errors - A list of error messages to display.
 */
const {t} = useI18n();

/** @type {UnavailableContentProps} */
const {errors} = defineProps({errors: {type: Array, default: () => []}});
</script>

<template>
  <div class="flex flex-column align-items-center justify-content-center mt-8 text-center" role="alert">
    <i class="pi pi-exclamation-circle text-6xl mb-4 text-color-secondary" aria-hidden="true"/>
    <h2 class="m-0">{{ t('unavailable.title') }}</h2>
    <p class="text-color-secondary">{{ t('unavailable.hint') }}</p>
    <p v-for="error in errors" :key="error" class="text-sm text-color-secondary m-1">{{ error }}</p>
  </div>
</template>

<style scoped>
</style>
