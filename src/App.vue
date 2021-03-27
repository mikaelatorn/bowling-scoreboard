<template>
  <div id="app">
    <Title />
    <div class="content-container">
      <ScoreInput />
      <Board />
    </div>
  </div>
</template>

<script>
import Title from "@/components/Title.vue";
import ScoreInput from "@/components/ScoreInput.vue";
import Board from "@/components/Board.vue";

export default {
  name: "App",
  components: {
    Title,
    ScoreInput,
    Board,
  },
};
</script>
