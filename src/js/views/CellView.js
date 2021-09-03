export default class CellView {
  constructor(context, xPoint, yPoint) {
    this.context = context;
    this.xPoint = xPoint;
    this.yPoint = yPoint;

    this.alive = Math.random() < 0.5;
    this.width = 10;
    this.height = 10;
  }

  drawSquare() {
    this.context.fillStyle = this.alive ? "#6495ed" : "#000000";
    this.context.fillRect(
      this.xPoint * this.width,
      this.yPoint * this.height,
      this.width,
      this.height
    );
  }
}
