<template>
  <span>
    <button
      class="btn"
      :value="value"
      :disabled="disabled"
      @click="onClick(value)"
    >
      {{ value }}
    </button>
  </span>
</template>

<script>
export default {
  props: {
    value: {
      required: true,
    },
    onClick: {
      type: Function,
      required: true,
    },
    disabled: {
      type: Boolean,
    },
  },
};
</script>
