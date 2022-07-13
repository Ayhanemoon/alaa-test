<template>
  <q-layout view="lHh Lpr lFf">
    <router-view v-slot="{ Component }">
      <transition
        appear
        mode="out-in"
        enter-active-class="animated slideInRight"
        leave-active-class="animated slideOutLeft"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  components: {},

  setup() {
    return {};
  },
});
</script>
