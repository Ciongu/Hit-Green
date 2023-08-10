
// Select already created needed DOM elems
const main = document.querySelector("main");
const p = document.querySelector("h2");
const scoreHolder = document.querySelector(".score-holder");
const timerHolder = document.querySelector(".timer-holder");
const playBtn = document.querySelector(".play-button");
const resetBtn = document.querySelector(".reset-button");

// Function that returns an element based on the given arg
const createElem = (type) => {
  return document.createElement(type);
};

// Function that returns a random color
const randomGenerator = (howLong) => {
  return Math.floor(Math.random() * howLong);
};

function randomColor() {
  return colors[randomGenerator(3) + 1];
}

// Object containing all the posible colors of a square
const colors = {
  1: "red",
  2: "green",
  3: "blue",
};

// Function that calls the create elems list, gives them needed properties and returns them in a list
function createSquareList() {
  const squares = [];
  for (let i = 0; i < 9; i++) {
    const square = createElem("div");
    square.classList.add(`square`);
    square.classList.add(`${randomColor()}`);
    squares.push(square);
  }
  return squares;
}

// Function that updates the DOM
function pushToDOM(elements, parentElem) {
  if (elements.length) {
    for (let elem of elements) {
      parentElem.appendChild(elem);
    }
  } else {
    parentElem.appendChild(elements);
  }
}

// Create the square container, add it to the DOM and giv it the wanted class
const squareContainer = createElem("div");
pushToDOM(squareContainer, main);
squareContainer.classList.add("squareContainer");

// Create the squares and push them to DOM
let squareList = createSquareList();
pushToDOM(squareList, squareContainer);

// Function that creates a timer and updates the DOM
let interval;

function timer() {
  let seconds = 5;

  interval = setInterval(() => {
    seconds--;
    p.innerText = `${seconds} seconds`;
    if (seconds <= 0) {
      clearInterval(interval);
      for (let square of squareList) {
        square.removeEventListener("click", clickHandler);
      }
      setTimeout(() => alert("Round Over!"), 100);
    }
  }, 1000);
}

let score = 0;
function checkIfGreen(elem) {
  if (elem.classList.contains("green")) {
    score++;
    scoreHolder.innerText = `Score: ${score}`;
    makeRandomElemGreen();
    while (elem.classList.contains("green")) {
      elem.classList.replace("green", randomColor());
    }
  }
}

function clickHandler() {
  checkIfGreen(this);
}

function randomSquare() {
  return squareList[randomGenerator(squareList.length - 1)];
}

function makeRandomElemGreen() {
  let square = randomSquare();
  while (square.classList[1] === "green") {
    square = randomSquare();
  }
  square.classList.replace(square.classList[1], "green");
}

function removeDOMElems(elements) {
  if (elements.length) {
    for (let elem of elements) {
      elem.remove();
    }
  } else {
    elements.remove;
  }
}

function attachClickEventListener() {
  const squareElem = document.querySelectorAll(".square");
  for (let elem of squareElem) {
    elem.addEventListener("click", clickHandler);
  }
}

playBtn.addEventListener("click", function () {
  seconds = 5;
  timer();
  score = 0;
  scoreHolder.innerText = "Score: 0";
  attachClickEventListener();
});

resetBtn.addEventListener("click", function () {
  scoreHolder.innerText = "Score: 0";
  timerHolder.innerText = "5 seconds";
  seconds = 0;
  clearInterval(interval);
  removeDOMElems(squareList);
  squareList = createSquareList();
  pushToDOM(squareList, squareContainer);
});
