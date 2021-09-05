import CellView from "../views/cellView";

export default class GamePlay {

  static RATE_OF_FRAME = 1000 ;
  static GAME_STATUS = false ;

  constructor(canvasId) {
    this.canvasId = canvasId ;
    this.context = this.canvasId.getContext("2d");
    this.cols = this.canvasId.width;
    this.rows = this.canvasId.height;

    this.gameObjects = [];
    this.createGrid();
  }

  gamePlay(){    
    window.requestAnimationFrame(() => this.gameLoop());
  }

  createGrid() {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        this.gameObjects.push(new CellView(this.context, x, y));
      }
    }
  }

  isAlive(x, y) {
    if (x < 0 || x >= this.cols || y < 0 || y >= this.rows) {
      return false;
    }
    return this.gameObjects[this.gridToIndex(x, y)].alive ? 1 : 0;
  }

  gridToIndex(x, y) {
    return x + y * this.cols;
  }

  checkNeighbours() {
    // Loop over all cells
    for (let x = 0; x < this.cols; x++) {
      for (let y = 0; y < this.rows; y++) {
        // Count the nearby population
        let numAlive =
          this.isAlive(x - 1, y - 1) +
          this.isAlive(x, y - 1) +
          this.isAlive(x + 1, y - 1) +
          this.isAlive(x - 1, y) +
          this.isAlive(x + 1, y) +
          this.isAlive(x - 1, y + 1) +
          this.isAlive(x, y + 1) +
          this.isAlive(x + 1, y + 1);
        let centerIndex = this.gridToIndex(x, y);

        if (numAlive == 2) {
          // Do nothing
          this.gameObjects[centerIndex].nextAlive =
            this.gameObjects[centerIndex].alive;
        } else if (numAlive == 3) {
          // Make alive
          this.gameObjects[centerIndex].nextAlive = true;
        } else {
          // Make dead
          this.gameObjects[centerIndex].nextAlive = false;
        }
      }
    }

    // Apply the new state to the cells
    for (let i = 0; i < this.gameObjects.length; i++) {
      this.gameObjects[i].alive = this.gameObjects[i].nextAlive;
    }
  }

  gameLoop() {
    if(GamePlay.GAME_STATUS){
      // Check the surrounding of each cell
      this.checkNeighbours();
  
      // Clear the screen
      this.context.clearRect(0, 0, this.canvasId.width, this.canvasId.height);
  
      // Draw all the gameobjects
      this.drawGameObjects();
  
      //requesting new frames
        setTimeout(() => {
          window.requestAnimationFrame(() => this.gameLoop());
        }, GamePlay.RATE_OF_FRAME);

    }else{
      this.drawGameObjects();
    }
  }

  getGameObject() {
    return this.gameObjects;
  }

  drawGameObjects(){
    for (let i = 0; i < this.gameObjects.length; i++) {
        this.gameObjects[i].drawSquare();
    }    
  }
}
