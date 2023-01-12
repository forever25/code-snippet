// 补帧
export class AnimationOfTween {
  constructor({ startPoint, endPoint, fps = 30 }) {
    this.index = 0;
    this.fps = fps;
    this.len = {
      x: endPoint.utm_x - startPoint.utm_x,
      y: endPoint.utm_y - startPoint.utm_y,
    };
    this.pointList = [];
    for (let i = 0; i < fps; i++) {
      this.pointList.push({
        x: +startPoint.utm_x + (this.len.x / fps) * i,
        y: +startPoint.utm_y + (this.len.y / fps) * i,
      });
    }
  }
  popPointList() {
    return this.index >= this.fps
      ? this.pointList[this.pointList.length - 1]
      : this.pointList[this.index++];
  }
}