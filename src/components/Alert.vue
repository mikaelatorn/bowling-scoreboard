<template functional>
  <div :class="messageType">
    {{ text }}
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
    },
    messageType: {
      type: String,
    },
  },
};
</script>
