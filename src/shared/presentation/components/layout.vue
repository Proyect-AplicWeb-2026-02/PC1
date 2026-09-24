<script setup lang="js">
import {computed, onMounted} from "vue";
import {catalogStore} from "@/catalog/application/catalog.store.js";
import ToolbarContent from "@/shared/presentation/components/toolbar-content.vue";
import FooterContent from "@/shared/presentation/components/footer-content.vue";
import ShowList from "@/catalog/presentation/components/show-list.vue";
import UnavailableContent from "@/catalog/presentation/components/unavailable-content.vue";

/**
 * @summary Presentation component that defines the main application layout.
 * @author Josue Antonio Flores Apaico (u20201f773)
 *
 * @remarks
 * Composes the toolbar, the main view (show list or fallback content) and the
 * general footer. It loads the catalog through the application store.
 */
const shows = computed(() => catalogStore.shows);
const errors = computed(() => catalogStore.errors);
const loading = computed(() => catalogStore.loading);

onMounted(() => {
  catalogStore.loadShows();
});
</script>

<template>
  <div class="layout-container">
    <header class="sticky-header">
      <toolbar-content/>
    </header>
    <main class="content-padding">
      <show-list v-if="loading || shows.length" :shows="shows" :loading="loading"/>
      <unavailable-content v-else :errors="errors"/>
    </main>
    <footer>
      <footer-content/>
    </footer>
    <pv-toast position="bottom-center"/>
  </div>
</template>

<style scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.sticky-header {
  position: sticky;
  top: 0;
  z-index: 1000;
}

.content-padding {
  padding: 1rem;
  flex: 1;
}

@media screen and (min-width: 768px) {
  .content-padding {
    padding: 2rem;
  }
}
</style>
