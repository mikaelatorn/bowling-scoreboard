import Vue from "vue";
import Vuex from "vuex";
import { checkScore, isSpare, isStrike } from "@/config/checkScore";

Vue.use(Vuex);

const initialState = () => ({
  historicRolls: [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  currentRoll: 0,
  score: [],
});

export default new Vuex.Store({
  state: initialState,
  mutations: {
    addScore(state, score) {
      Vue.set(state.historicRolls, state.currentRoll, score);
      state.currentRoll++;
      state.score = checkScore(state.historicRolls, state.score);
    },
    clearScore(state) {
      Object.assign(state, initialState());
    },
  },
  actions: {
    updateScore(context, score) {
      return new Promise((resolve, reject) => {
        if (
          this.state.currentRoll === 21 ||
          (this.state.currentRoll === 20 &&
            !isStrike([score]) &&
            !isSpare([
              this.state.historicRolls[this.state.currentRoll - 1],
              score,
            ]))
        ) {
          reject(
            "No more frames to play this game. Start a new round by clicking on the New Game button"
          );
        } else if (this.state.currentRoll < 21) {
          context.commit("addScore", score);
          resolve();
        }
      });
    },
    resetScore(context) {
      return new Promise((resolve) => {
        context.commit("clearScore");
        resolve();
      });
    },
  },
  getters: {
    getSetsFromRolls(state) {
      let sets = state.historicRolls.reduce((acc, item, index) => {
        if (index % 2 === 0 && index !== 20) {
          acc.push([item]);
        } else {
          acc[acc.length - 1].push(item);
        }
        return acc;
      }, []);
      return sets;
    },
  },
  modules: {},
});
