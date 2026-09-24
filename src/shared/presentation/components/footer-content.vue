<script setup lang="js">
import {useI18n} from "vue-i18n";

/**
 * @summary Presentation component for the application footer.
 * @author Josue Antonio Flores Apaico (u20201f773)
 *
 * @remarks
 * Displays the copyright notice and the developer's information on two lines.
 */
const {t} = useI18n();

/** Developer information shown on the second footer line. */
const developer = Object.freeze({code: 'u20201f773', name: 'Josue Antonio Flores Apaico'});
</script>

<template>
  <div class="p-4 bg-primary text-primary-contrast text-center">
    <p class="m-0">{{ t('footer.copyright') }}</p>
    <p class="mt-2 mb-0">{{ t('footer.developed-by', {code: developer.code, name: developer.name}) }}</p>
  </div>
</template>

<style scoped>
</style>
