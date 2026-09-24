<script setup lang="js">
import {watchEffect} from "vue";
import {useI18n} from 'vue-i18n';

/**
 * @summary Presentation component for switching the application's locale.
 * @author Josue Antonio Flores Apaico (u20201f773)
 *
 * @remarks
 * Displays the available locales (EN | ES | PT) as select buttons and updates
 * the vue-i18n locale, so every translated text reacts to the change. It also
 * keeps the document language attribute in sync for assistive technologies.
 */
const {t, locale, availableLocales} = useI18n();

watchEffect(() => {
  document.documentElement.lang = locale.value;
});
</script>

<template>
  <pv-select-button v-model="locale"
                    :options="availableLocales"
                    :allow-empty="false"
                    :aria-label="t('toolbar.language-selector')">
    <template #option="slotProps">
      <span>{{ slotProps.option.toUpperCase() }}</span>
    </template>
  </pv-select-button>
</template>

<style scoped>
</style>
