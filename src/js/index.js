import GamePlay from "./models/GamePlay";
import { elements } from "./views/base";
import CellView from "./views/cellView";

let GAME_RUNNING_STATUS = false;
let REACH_MAX_LIMIT = false;

// start game
let gameWorld = new GamePlay(elements.canvas);
let GAME_OBJECTS = gameWorld.gameObjects;

//console.log(GAME_OBJECTS);
elements.canvas.addEventListener("click", (e) => {
  //console.log("click on canvas");
  GamePlay.GAME_STATUS = !GamePlay.GAME_STATUS;
  //console.log(GamePlay.GAME_STATUS);
  gameWorld.gameObjects = GAME_OBJECTS;
  elements.gridLocation.textContent = '';
  if (GamePlay.GAME_STATUS && !GAME_RUNNING_STATUS) {
    gameWorld.gamePlay();
    GAME_RUNNING_STATUS = true;
    elements.playBtn.textContent = "pause";
  } else {
    GAME_RUNNING_STATUS = false;
    elements.playBtn.textContent = "play";
  }
});

//play btn
elements.playBtn.addEventListener("click", (e) => {
  //console.log("clicked play btn");
  GamePlay.GAME_STATUS = true;
  //console.log(GamePlay.GAME_STATUS);
  gameWorld.gameObjects = GAME_OBJECTS;
  elements.gridLocation.textContent='';
  if (GamePlay.GAME_STATUS && !GAME_RUNNING_STATUS) {
    gameWorld.gamePlay();
    GAME_RUNNING_STATUS = true;
    elements.playBtn.textContent = "pause";
  } else {
    GAME_RUNNING_STATUS = false;
    GamePlay.GAME_STATUS = false;
    elements.playBtn.textContent = "Play";
  }
});

//incease speed of animation frame
elements.speedUpBtn.addEventListener("click", (e) => {
  //console.log("clicked move fast btn");
  if (GamePlay.GAME_STATUS) {
    if (GamePlay.RATE_OF_FRAME >= 100 && !REACH_MAX_LIMIT) {
      if (GamePlay.RATE_OF_FRAME === 100) {
        elements.speedUpBtn.textContent = "move slow";
        REACH_MAX_LIMIT = true;
      } else {
        GamePlay.RATE_OF_FRAME -= 100;
      }
    } else {
      if (GamePlay.RATE_OF_FRAME <= 7000 && REACH_MAX_LIMIT) {
        if (GamePlay.RATE_OF_FRAME === 7000) {
          elements.speedUpBtn.textContent = "move fast";
          REACH_MAX_LIMIT = false;
        } else {
          GamePlay.RATE_OF_FRAME += 100;
        }
      }
    }
  }
});

//input field change Handler
elements.btn.addEventListener("click", (e) => {
  let size = elements.inputFieldHandler.value;
  if (size >= 60) {
    elements.notify.style.visibility = "visible";
    elements.notify.textContent = "Enter number between 0 to 50";
    setTimeout(() => {
      elements.notify.style.visibility = "hidden";
    }, 2000);
  } else if (size <= 0) {
    elements.notify.style.visibility = "visible";
    elements.notify.textContent = "neither negative nor zero";
    setTimeout(() => (elements.notify.style.visibility = "hidden"), 2000);
  } else {
    CellView.width = size;
    CellView.height = size;
  }
});

let i = 0;
let txt = "Game Of Life";
let speed = 50;

function typeWriter() {
  if (i < txt.length) {
    elements.headingTxt.innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

window.addEventListener("load", typeWriter);

//Randomly selecting Alive grid
elements.randomlySelectingGridBtn.addEventListener("click", (e) => {
  //console.log("clicked randomly selecting grid btn");
  if (GamePlay.GAME_STATUS) {
    let objectArr = gameWorld.getGameObject();
    let randomLocation = Math.floor(Math.random() * objectArr.length);
    if (objectArr[randomLocation].alive) {
      let xPoint = objectArr[randomLocation].xPoint;
      let yPoint = objectArr[randomLocation].yPoint;
      //console.log(xPoint);
      //console.log(yPoint);
      GamePlay.RANDOM_LOCATION = randomLocation;
      const newArr = objectArr.map((el, cur) => {
        if (cur === randomLocation) {
          return new CellView(elements.canvas.getContext("2d"), xPoint, yPoint);
        } else {
          return el;
        }
      });
      //console.log(newArr);
      //console.log(gameWorld.gameObjects);
      //console.log(GamePlay.RANDOM_LOCATION);
      gameWorld.gameObjects = newArr;
      GamePlay.GAME_STATUS = false;
      GAME_RUNNING_STATUS = false;
      elements.playBtn.textContent = "Play";
      //console.log(gameWorld.gameObjects);
      if (GamePlay.RANDOM_LOCATION > -1) {
        elements.gridLocation.textContent = `Randomly selected Grid located at ( ${xPoint} , ${yPoint} ).`;
      }
    }
  } else {
    alert("Please start game");
  }
});

//decrease speed of animation frame
/* elements.speedDownBtn.addEventListener("click", (e) => {
  //console.log("clicked move slow btn");
  if (GamePlay.GAME_STATUS) {
    if (GamePlay.RATE_OF_FRAME < 7000) {
      GamePlay.RATE_OF_FRAME += 100;
      console.log(GamePlay.RATE_OF_FRAME);
    } else {
      alert("Min Limit");
    }
  }
});
*/

/* //increase size of grid/cell
elements.incrementGridSizeBtn.addEventListener("click", (e) => {
  //console.log("clicked increase grid size btn");
  if (GamePlay.GAME_STATUS) {
    if (GRID_SIZE <= 50) {
      CellView.width += 10;
      CellView.height += 10;
      GRID_SIZE += 10;
    } else {
      alert("Max Grid Size");
    }
  }
}); */

/* //decrease size of grid/cell
elements.decrementGridSizeBtn.addEventListener("click", (e) => {
  //console.log("clicked decrease grid size btn");
  if (GamePlay.GAME_STATUS) {
    if (GRID_SIZE > 10) {
      CellView.width -= 10;
      CellView.height -= 10;
      GRID_SIZE -= 10;
    } else {
      alert("Min Grid Size");
    }
  }
});


//stop btn
// elements.pauseBtn.addEventListener("click", (e) => {
  //   //console.log("clicked stop btn");
  //   GAME_RUNNING_STATUS = fals;
  //   GamePlay.GAME_STATUS = false;
  //   //console.log(GamePlay.GAME_STATUS);
  // });
  */
