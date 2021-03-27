<template functional>
  <div class="title-container">
    <img src="@/assets/img/bowling.svg" type="image/svg+xml" />
    <div class="title-text">
      <h1>{{ text }}</h1>
      <p>Click the number of pins to knock down</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>
