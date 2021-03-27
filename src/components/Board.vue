<template>
  <div class="board">
    <div
      v-for="(round, index) in getSetsFromRolls"
      :key="index"
      class="round-cell"
    >
      <div class="round-title">{{ index + 1 }}</div>
      <div class="round-scores">
        <div class="round-score round-score-first">{{ round[0] }}</div>
        <div class="round-score round-score-second">{{ round[1] }}</div>
        <div v-if="round.length === 3" class="round-score round-score-third">
          {{ round[2] }}
        </div>
      </div>
      <div class="round-total">{{ score[index] }}</div>
    </div>
    <div class="round-cell">
      <div class="round-title">Hdcp score</div>
      <div class="round-scores">
        <div class="round-score">
          {{ score[score.length - 1] }}
        </div>
      </div>
    </div>
    <div class="round-cell">
      <div class="round-title">Max possible</div>
      <div class="round-scores">
        <div class="round-score">300</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  computed: {
    getSetsFromRolls() {
      return this.$store.getters.getSetsFromRolls;
    },
    ...mapState(["historicRolls", "score"]),
  },
};
</script>
