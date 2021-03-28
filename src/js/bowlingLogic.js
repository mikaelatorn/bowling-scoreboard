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

// iterate through current score/rolls and return the scoreboard
function checkScore(rolls) {
  init();
  for (var i = 0; i < rolls.length; i++) {
    if (rolls[i] !== null) {
      roll(rolls[i]);
    }
  }
  return scoreBoard;
}

// save the roll and check if the current frame is finished
function roll(value) {
  storeRoll(value);
  if (isFrameFinished()) {
    nextFrame();
    score();
  }
}

// calculate score if new roll has been added, return total score
function score() {
  if (calculated === false) {
    calculate();
  }
  return scored;
}

// calculate the score
function calculate() {
  var score = 0;

  for (let i = 0; i < frames.length; i++) {
    const current = frames[i];
    const next = getIndex(frames, i + 1);

    // if the value is a strike and we are not in the final frame 
    if (isStrike(current) && i !== 9) {
      if (isStrike(next) && i === 8) {
        // if we are on the second to last frame, check the two first values in the last frame
        let nextFrameCopy = [...next];
        let secondToLastRoll = nextFrameCopy.slice(0, 2);
        score += sumIndexes(secondToLastRoll) + getIndex(current);
      } else if (isStrike(next)) {
        // if the next frame is also a strike, add the score for the current frame with the two upcoming ones
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

// check how many rolls has been done for the current frame
// add one extra roll on the last frame if a spare or second roll is a strike
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
