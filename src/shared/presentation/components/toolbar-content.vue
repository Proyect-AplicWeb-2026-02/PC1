<script setup lang="js">
import {ref} from "vue";
import {useI18n} from "vue-i18n";
import {LogoDevApi} from "@/shared/infrastructure/logo-dev-api.js";
import LanguageSwitcher from "@/shared/presentation/components/language-switcher.vue";

/**
 * @summary Presentation component for the application toolbar.
 * @author Josue Antonio Flores Apaico (u20201f773)
 *
 * @remarks
 * Shows the client's logo (obtained from Logo.dev) and the application title
 * on the left, and the language switcher on the right.
 */
const {t} = useI18n();

const logoDevApi = new LogoDevApi();
const logoUrl = logoDevApi.getUrlToLogo(import.meta.env.VITE_CLIENT_DOMAIN);

/** Tracks whether the logo image failed to load, to avoid a broken image icon. */
const logoFailed = ref(false);
</script>

<template>
  <pv-toolbar class="border-noround">
    <template #start>
      <div class="flex align-items-center gap-3">
        <img v-if="!logoFailed"
             :src="logoUrl"
             :alt="t('toolbar.logo-alt')"
             class="toolbar-logo border-round"
             @error="logoFailed = true"/>
        <span class="text-xl font-bold">{{ t('toolbar.title') }}</span>
      </div>
    </template>
    <template #end>
      <language-switcher/>
    </template>
  </pv-toolbar>
</template>

<style scoped>
.toolbar-logo {
  width: 2.5rem;
  height: 2.5rem;
  object-fit: contain;
}
</style>
