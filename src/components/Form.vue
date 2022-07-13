<template>
  <q-form @submit="onSubmit" class="q-gutter-md">
    <slot name="inputs"></slot>
    <div>
      <q-btn
        style="width: 100%"
        :label="submitLabel"
        type="submit"
        color="positive"
      />
    </div>
  </q-form>
</template>

<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "Form",
  props: {
    submitLabel: {
      type: String,
      required: true,
    },
  },
  emits: ["submitForm"],
  setup(props, { emit }) {
    const onSubmit = (e) => {
      emit("submitForm", e);
    };
    return {
      onSubmit,
    };
  },
});
</script>

<style></style>
