<template>
  <div>
    <transition name="fade">
      <Alert
        v-if="alert.visible"
        :text="alert.text"
        :messageType="alert.type"
      />
    </transition>
    <div class="button-container">
      <Button
        v-for="n in 11"
        :key="n - 1"
        :value="n - 1"
        :onClick="addNewScore"
        :disabled="
          (!isLastFrame(latestScore) &&
            currentRoll % 2 === 1 &&
            latestScore + n > 11) ||
          isGameFinished
        "
      />
      <Button value="New game" :onClick="startNewGame" />
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import Alert from "@/components/Alert.vue";
import { mapState } from "vuex";

export default {
  name: "ScoreInput",
  components: {
    Button,
    Alert,
  },
  computed: {
    ...mapState(["currentRoll"]),
  },
  data() {
    return {
      latestScore: null,
      alert: {
        type: "",
        text: "",
        visible: false,
      },
      isGameFinished: false,
    };
  },
  methods: {
    addNewScore(score) {
      this.$store
        .dispatch("updateScore", score)
        .then(() => {
          this.hideAlert();
        })
        .catch((err) => {
          this.showAlert("error", err);
          this.isGameFinished = true;
          setTimeout(() => {
            this.hideAlert();
          }, 5000);
        });
      this.latestScore = score;

      if (this.currentRoll < 18 && score == 10) {
        this.latestScore = null;
        this.$store.dispatch("updateScore", null);
      }
    },
    isLastFrame(score) {
      return this.currentRoll > 18 && score == 10;
    },
    startNewGame() {
      this.$store.dispatch("resetScore").then(() => {
        this.isGameFinished = false;
        this.hideAlert();
      });
    },
    showAlert(alertType, message) {
      this.alert = {
        type: alertType,
        text: message,
        visible: true,
      };
    },
    hideAlert() {
      this.alert.visible = false;
    },
  },
};
</script>
