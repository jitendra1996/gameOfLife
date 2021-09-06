export default class CellView {
  static width = 10;
  static height = 10;

  constructor(context, xPoint, yPoint) {
    this.context = context;
    this.xPoint = xPoint;
    this.yPoint = yPoint;

    this.alive = Math.random() < 0.5;
    this.COLOR_FOR_LIVE = "#6495ed";
    this.COLOR_FOR_DEAD = "#000000";
  }

  drawSquare() {
    this.context.StrokeStyle = "#6495ed";
    this.context.fillStyle = this.alive
      ? this.COLOR_FOR_LIVE
      : this.COLOR_FOR_DEAD;
    this.context.fillRect(
      this.xPoint * CellView.width,
      this.yPoint * CellView.height,
      CellView.width,
      CellView.height
    );
    this.context.strokeRect(
      this.xPoint * CellView.width,
      this.yPoint * CellView.height,
      CellView.width,
      CellView.height
    );
  }

  drawNewSquare() {
    this.context.StrokeStyle = "#6495ed";
    this.context.fillStyle = this.alive ? "#8a2be2" : "#ffffff";
    this.context.fillRect(
      this.xPoint,
      this.yPoint,
      CellView.width,
      CellView.height
    );
    this.context.strokeRect(
      this.xPoint * CellView.width,
      this.yPoint * CellView.height,
      CellView.width,
      CellView.height
    );
  }
}
