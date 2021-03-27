let calculated, scored, scoreBoard, frames, rolls;

const limitFrames = 10;
const limitTries = 2;

function init() {
  calculated = false;
  scored = 0;
  scoreBoard = [];
  frames = [];
  rolls = [];
}

function checkScore(rolls) {
  init();
  for (var i = 0; i < rolls.length; i++) {
    if (rolls[i] !== null) {
      roll(rolls[i]);
    }
  }
  return scoreBoard;
}

function roll(value) {
  storeRoll(value);
  if (isFrameFinished()) {
    nextFrame();
    score();
  }
}

function score() {
  if (calculated === false) {
    calculate();
  }
  return scored;
}

function calculate() {
  var score = 0;

  for (let i = 0; i < frames.length; i++) {
    const current = frames[i];
    const next = getIndex(frames, i + 1);

    if (isStrike(current) && i !== 9) {
      if (isStrike(next) && i === 8) {
        let nextFrameCopy = [...next];
        let secondToLastRoll = nextFrameCopy.slice(0, 2);
        score += sumIndexes(secondToLastRoll) + getIndex(current);
      } else if (isStrike(next)) {
        score += checkLastFrame(frames, i) + getIndex(next) + getIndex(current);
      } else {
        score += sumIndexes(next) + getIndex(current);
      }
    } else if (isSpare(current)) {
      score += sumIndexes(current) + getIndex(next);
    } else {
      score += sumIndexes(current);
    }
    scoreBoard[i] = score;
  }

  scored = score;
  calculated = true;
}

function checkLastFrame(frames, index) {
  if (getIndex(frames, index + 2)[0] !== undefined) {
    return getIndex(frames, index + 2)[0];
  } else {
    return 0;
  }
}

function isNotLastFrame() {
  return frames.length < limitFrames;
}

function isStrike(roll) {
  return roll[0] === 10;
}

function isSpare(roll) {
  return roll[0] + roll[1] === 10;
}

function isFrameFinished() {
  if (isLastFrame()) {
    if (isSpare(rolls) || isStrike([rolls[1]])) {
      return rolls.length >= 3;
    } else {
      return rolls.length >= limitTries;
    }
  } else {
    return rolls.length >= limitTries || isStrike(rolls);
  }
}

function isLastFrame() {
  return frames.length === 9;
}

function nextFrame() {
  if (isNotLastFrame()) {
    frames.push(rolls);
  }
  rolls = [];
}

function storeRoll(value) {
  rolls.push(value);
  calculated = false;
}

function getIndex(frame, index = 0) {
  return Array.isArray(frame) && !!frame[index] ? frame[index] : false;
}

function sumIndexes(frame) {
  return Array.isArray(frame)
    ? frame.reduce((previous, current) => previous + current)
    : 0;
}

export { checkScore, score, roll, init, isSpare, isStrike };
