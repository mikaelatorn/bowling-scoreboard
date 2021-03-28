import { shallowMount } from "@vue/test-utils";

import Title from "@/components/Title.vue";
import { roll, score, init } from "@/js/bowlingLogic.js";

describe("Title.vue", () => {
  test("renders props.text when passed", () => {
    const text = "new message";
    const wrapper = shallowMount(Title, {
      propsData: { text },
    });
    expect(wrapper.text()).toMatch(text);
  });
});

describe("Regular rolling.", function () {
  test("Play one roll", () => {
    init();

    roll(4);
    expect(score()).toBe(0);
  });

  test("Finish first set, score shall be updated", () => {
    roll(1);
    expect(score()).toBe(5);
  });

  test("Start new set, score shall not be updated", () => {
    roll(3);
    expect(score()).toBe(5);
  });

  test("Finish second set, score shall be updated", () => {
    roll(5);
    expect(score()).toBe(13);
  });
});

describe("Spare rolling.", function () {
  test("Roll 4 + 6, expect score to be 10", () => {
    init();

    roll(4);
    roll(6);
    expect(score()).toBe(10);
  });

  test("Roll a 2 + 3, expect score to have been updated with the previous spare", () => {
    roll(2);
    roll(3);
    expect(score()).toBe(17);
  });
});

describe("Strike rolls.", function () {
  test("Player has rolled 10. Frame has been fihished. Wait for next bowl in the next roll", () => {
    init();

    roll(10);
    expect(score()).toBe(10);
  });

  test("Player rolls second time of 5 and 4. Score must be recalculated based on strike", () => {
    roll(2);
    roll(3);
    expect(score()).toBe(20);
  });

  test("Player has rolled 10. Frame has been fihished. Wait for next bowl in the next roll", () => {
    init();

    roll(10);
    roll(10);
    roll(10);
    roll(10);
    roll(10);
    roll(10);
    roll(10);
    roll(10);
    roll(10);
    roll(10);
    roll(10);
    roll(10);
    expect(score()).toBe(300);
  });
});

describe("Spare + Strike rolls.", function () {
  test("Roll a strike, then a spare, then 4", () => {
    init();

    roll(10);

    roll(3);
    roll(7);

    roll(4);
    roll(0);

    expect(score()).toBe(38);
  });

  test("Roll a spare, then a strike, then 4", () => {
    init();

    roll(5);
    roll(5);

    roll(10);

    roll(8);
    roll(0);

    expect(score()).toBe(46);
  });
});

describe("Roll a full game", function () {
  test("Roll 10 frames and check score", () => {
    init();

    roll(5);
    roll(1);

    roll(5);
    roll(1);

    roll(5);
    roll(1);

    roll(5);
    roll(1);

    roll(5);
    roll(1);

    roll(5);
    roll(1);

    roll(5);
    roll(1);

    roll(5);
    roll(1);

    roll(5);
    roll(1);

    roll(5);
    roll(1);

    expect(score()).toBe(60);
  });

  test("After game is finished, rolling more times does not change the score", () => {
    roll(2);
    expect(score()).toBe(60);
  });
});
