import GamePlay from "./models/GamePlay";
import { elements } from "./views/base";
import CellView from "./views/cellView";

let GAME_RUNNING_STATUS = false;
let GRID_SIZE = 10;
let RATE_OF_FRAME = 100;

// start game
let gameWorld = new GamePlay(elements.canvas);


elements.canvas.addEventListener("click", (e) => {
  console.log("click on canvas");
  GamePlay.GAME_STATUS = !GamePlay.GAME_STATUS ;
  console.log(GamePlay.GAME_STATUS);
  if(GamePlay.GAME_STATUS && !GAME_RUNNING_STATUS){
    gameWorld.gamePlay();
    GAME_RUNNING_STATUS = true;
  }else{
    GAME_RUNNING_STATUS = false;
  }
});

//play btn
elements.playBtn.addEventListener("click", (e) => {
  //console.log("clicked play btn");
  GamePlay.GAME_STATUS = true;
  //console.log(GamePlay.GAME_STATUS);
    if(GamePlay.GAME_STATUS && !GAME_RUNNING_STATUS){
    gameWorld.gamePlay();
    GAME_RUNNING_STATUS = true ;
  }
});

//stop btn
elements.pauseBtn.addEventListener("click", (e) => {
  //console.log("clicked stop btn");
  GAME_RUNNING_STATUS = false ;
  GamePlay.GAME_STATUS = false ;
  //console.log(GamePlay.GAME_STATUS);
});

//incease speed of animation frame
elements.speedUpBtn.addEventListener("click", (e) => {
  //console.log("clicked move fast btn");
  if(GamePlay.GAME_STATUS){
    if (GamePlay.RATE_OF_FRAME > 100) {
      GamePlay.RATE_OF_FRAME -= 100;
      console.log(GamePlay.RATE_OF_FRAME);
    } else {
      alert("Max Limit");
    }
  }
});

//decrease speed of animation frame
elements.speedDownBtn.addEventListener("click", (e) => {
  //console.log("clicked move slow btn");
  if(GamePlay.GAME_STATUS){
    if (GamePlay.RATE_OF_FRAME < 7000) {
      GamePlay.RATE_OF_FRAME += 100;
      console.log(GamePlay.RATE_OF_FRAME);
    } else {
      alert("Min Limit");
    }
  }
});

//increase size of grid/cell
elements.incrementGridSizeBtn.addEventListener("click", (e) => {
  //console.log("clicked increase grid size btn");
  if(GamePlay.GAME_STATUS){
    if (GRID_SIZE <= 50) {
      CellView.width += 10;
      CellView.height += 10;
      GRID_SIZE += 10;
    } else {
      alert("Max Grid Size");
    }
  }
});

//decrease size of grid/cell
elements.decrementGridSizeBtn.addEventListener("click", (e) => {
  //console.log("clicked decrease grid size btn");
  if(GamePlay.GAME_STATUS){
    if (GRID_SIZE > 10) {
      CellView.width -= 10;
      CellView.height -= 10;
      GRID_SIZE -= 10;
    } else {
      alert("Min Grid Size");
    }
  }
});

//Randomly selecting Alive grid
elements.randomlySelectingGridBtn.addEventListener("click", (e) => {
  //console.log("clicked randomly selecting grid btn");
  if(GamePlay.GAME_STATUS){
    let objectArr = gameWorld.getGameObject();
    let randomLocation = Math.floor(Math.random()*objectArr.length);
  
    if(objectArr[randomLocation].alive){
        CellView.COLOR_FOR_RANDOM_SELECTED_CELL += '#8a2be2';
        objectArr[randomLocation].context.fillStyle = '#8a2be2' ;
        GamePlay.GAME_STATUS = false ;
        console.log(objectArr[randomLocation])
    }
    console.log(objectArr[randomLocation].context.fillStyle);
    console.log(objectArr[randomLocation].COLOR_FOR_LIVE);
    console.log(objectArr[randomLocation].alive);
    console.log(objectArr.length);
  
  }
});


let i = 0;
let txt = 'Game Of Life';
let speed = 50;

function typeWriter() {
  if (i < txt.length) {
    elements.headingTxt.innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

window.addEventListener('load', typeWriter);

// console.log(GamePlay.GAME_STATUS);

// //gameObject values
//let objectArr = gameWorld.getGameObject();
// // console.log(objectArr);
// // console.log(objectArr[0]);
// // console.log(objectArr[0].alive);
// // console.log(objectArr.length);

// //get game status
// // gameWorld.setIsGamePlay(isGamePlay);
// // console.log(`game status ${gameWorld.getIsGamePlay()}`)

// function getData() {
//   for (let i = 0; i < objectArr.length - 958720; i++) {
//     if (objectArr[i].alive) {
//       console.log(`result : ${objectArr[i].alive}`);
//     }
//   }
// }

// getData();
