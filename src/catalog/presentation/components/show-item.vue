<script setup lang="js">
import {computed} from "vue";
import {useI18n} from "vue-i18n";
import {useToast} from "primevue/usetoast";
import {Show} from "@/catalog/domain/model/show.entity.js";

/**
 * @summary Presentation component for rendering a single show card.
 * @author Josue Antonio Flores Apaico (u20201f773)
 *
 * @remarks
 * Displays the show image, name and genres, its main details with translated
 * labels, and a footer with the rating and status on the left and the share
 * action on the right.
 */

/**
 * Properties for the ShowItem component.
 *
 * @typedef {Object} ShowItemProps
 * @property {Show} show - The show entity to display.
 */
const {t, te, locale} = useI18n();
const toast = useToast();

/** @type {ShowItemProps} */
const {show} = defineProps({show: {type: Show, required: true}});

/** Status translated to the current locale, falling back to the raw API value. */
const statusLabel = computed(() => {
  const key = `show.statuses.${show.getStatusKey()}`;
  return te(key) ? t(key) : show.status || t('show.not-available');
});

/** PrimeVue tag severity according to the show status. */
const statusSeverity = computed(() => ({
  'running': 'success',
  'ended': 'secondary',
  'to-be-determined': 'warn',
  'in-development': 'info'
}[show.getStatusKey()] ?? 'secondary'));

/** Rating converted from the 0-10 scale to a 5-star scale. */
const stars = computed(() => show.hasRating() ? Math.round(show.rating / 2) : 0);

/** Premiere date formatted according to the current locale. */
const premieredLabel = computed(() => show.getFormattedPremiered(locale.value) || t('show.not-available'));

/**
 * Shares the show using the Web Share API when available; otherwise copies
 * the show URL to the clipboard and notifies the user.
 *
 * @returns {Promise<void>}
 */
const shareShow = async () => {
  const shareData = {title: show.name, text: show.getGenresAsText(), url: show.url.toString()};
  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (error) {
      if (error?.name !== 'AbortError') console.error('Error sharing the show:', error);
    }
    return;
  }
  try {
    await navigator.clipboard.writeText(shareData.url);
    toast.add({severity: 'success', summary: t('show.link-copied'),
      detail: t('show.link-copied-detail', {name: show.name}), life: 3000});
  } catch (error) {
    console.error('Failed to copy the show URL:', error);
    toast.add({severity: 'error', summary: t('show.share-failed'), life: 3000});
  }
};
</script>

<template>
  <pv-card class="h-full flex flex-column overflow-hidden" :aria-label="show.name">
    <template #header>
      <img :src="show.imageUrl.toString()"
           :alt="t('show.image-alt', {name: show.name})"
           class="show-image"
           loading="lazy"/>
    </template>

    <template #title>
      <h2 class="text-xl m-0">{{ show.name }}</h2>
    </template>

    <template #subtitle>
      {{ show.genres.length ? show.getGenresAsText() : t('show.no-genres') }}
    </template>

    <template #content>
      <dl class="m-0 flex flex-column gap-2 text-sm">
        <div>
          <dt class="font-semibold">{{ t('show.language') }}</dt>
          <dd class="m-0">{{ show.language || t('show.not-available') }}</dd>
        </div>
        <div>
          <dt class="font-semibold">{{ t('show.broadcaster') }}</dt>
          <dd class="m-0">{{ show.broadcaster || t('show.not-available') }}</dd>
        </div>
        <div>
          <dt class="font-semibold">{{ t('show.premiered') }}</dt>
          <dd class="m-0">{{ premieredLabel }}</dd>
        </div>
        <div>
          <dt class="font-semibold">{{ t('show.summary') }}</dt>
          <dd class="m-0 show-summary">{{ show.summary || t('show.not-available') }}</dd>
        </div>
      </dl>
    </template>

    <template #footer>
      <div class="flex justify-content-between align-items-center gap-2">
        <div class="flex flex-column gap-1" role="group" :aria-label="t('show.rating-status')">
          <span class="text-xs font-semibold text-color-secondary">{{ t('show.rating-status') }}</span>
          <div class="flex align-items-center gap-2">
            <pv-rating :model-value="stars" :stars="5" readonly
                       :aria-label="show.hasRating() ? t('show.rating-value', {value: show.rating}) : t('show.not-rated')"/>
            <span class="text-sm">{{ show.hasRating() ? `${show.rating}/10` : t('show.not-rated') }}</span>
          </div>
          <pv-tag :value="statusLabel" :severity="statusSeverity" class="align-self-start"/>
        </div>
        <pv-button v-if="!show.url.isEmpty()"
                   :label="t('show.share')"
                   :aria-label="t('show.share-aria', {name: show.name})"
                   icon="pi pi-share-alt"
                   size="small"
                   text
                   @click="shareShow"/>
      </div>
    </template>
  </pv-card>
</template>

<style scoped>
.show-image {
  display: block;
  width: 100%;
  aspect-ratio: 210 / 295;
  object-fit: cover;
}

.show-summary {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

:deep(.p-card-body) {
  flex: 1;
  display: flex;
  flex-direction: column;
}

:deep(.p-card-content) {
  flex: 1;
}
</style>
