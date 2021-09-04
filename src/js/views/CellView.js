export default class CellView {

  static width = 10 ;
  static height = 10 ;
  static COLOR_FOR_LIVE = "#6495ed" ;
  static COLOR_FOR_DEAD = "#000000" ;

  constructor(context, xPoint, yPoint) {
    this.context = context;
    this.xPoint = xPoint;
    this.yPoint = yPoint;

    this.alive = Math.random() < 0.5;
    // this.width = 60;
    // this.height = 60;
  }

  drawSquare() {
    this.context.fillStyle = this.alive ? CellView.COLOR_FOR_LIVE : CellView.COLOR_FOR_DEAD;
    this.context.fillRect(
      this.xPoint * CellView.width,
      this.yPoint * CellView.height,
      CellView.width,
      CellView.height
    );
  }
}
