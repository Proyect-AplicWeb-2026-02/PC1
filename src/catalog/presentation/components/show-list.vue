<script setup lang="js">
import {useI18n} from "vue-i18n";
import ShowItem from "@/catalog/presentation/components/show-item.vue";

/**
 * @summary Presentation component for the "Show List" section.
 * @author Josue Antonio Flores Apaico (u20201f773)
 *
 * @remarks
 * Renders the collection of shows as a responsive grid of cards: four cards
 * per row on large screens, two on tablets and one on mobile.
 */

/**
 * Properties for the ShowList component.
 *
 * @typedef {Object} ShowListProps
 * @property {import('@/catalog/domain/model/show.entity.js').Show[]} shows - The shows to display.
 * @property {boolean} loading - Whether the shows are still being loaded.
 */
const {t} = useI18n();

/** @type {ShowListProps} */
const {shows, loading} = defineProps({
  shows: {type: Array, required: true},
  loading: {type: Boolean, default: false}
});
</script>

<template>
  <section aria-labelledby="show-list-title" :aria-busy="loading">
    <h1 id="show-list-title" class="mt-0 mb-4">{{ t('show-list.title') }}</h1>

    <div v-if="loading" class="flex justify-content-center p-6">
      <pv-progress-spinner :aria-label="t('show-list.loading')"/>
    </div>

    <ul v-else class="grid list-none p-0 m-0">
      <li v-for="show in shows" :key="show.id" class="col-12 sm:col-6 lg:col-3">
        <show-item :show="show"/>
      </li>
    </ul>
  </section>
</template>

<style scoped>
</style>
