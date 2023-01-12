/**
 * @description: 获取两点之间长度
 * @param {*} startPoint 起始点
 * @param {*} endPoint 结束点
 * @return {*} 返回长度
 */
function getLength(startPoint, endPoint) {
  return Math.sqrt(
    Math.pow(Math.abs(endPoint.utm_x - startPoint.utm_x), 2) +
    Math.pow(Math.abs(endPoint.utm_y - startPoint.utm_y), 2)
  );
}


/**
 * @description: 根据坐标和方位角，计算边线点坐标
 * @param {*} x x坐标
 * @param {*} y y坐标
 * @param {*} angle 角度弧度
 * @param {*} roadWith  路面宽度
 * @param {*} isLeft  是否是左边
 * @return {*} 返回坐标点
 */
function calcSidePoint(x, y, angle, roadWith, isLeft) {
  var k = isLeft ? -1 : 1;
  var stakesDto = {};
  stakesDto.x = x + roadWith * Math.cos(angle + k * Math.PI / 2);
  stakesDto.y = y + roadWith * Math.sin(angle + k * Math.PI / 2);

  // 桩号路程、路线解析
  stakesDto.x = stakesDto.x.toFixed(3);
  stakesDto.y = stakesDto.y.toFixed(3);
  return stakesDto;
}


/**
 * @description: 判断两个点的角度
 * @param {*} startPoint 起始点
 * @param {*} endPoint 结束点
 * @return {Number} 返回角度值(弧度)
 */
function getCarAngle(startPoint, endPoint) {
  return Math.atan2(endPoint.utm_y - startPoint.utm_y, endPoint.utm_x - startPoint.utm_x);
}


/**
 * @description: 生成一个直线方程,然后判断一个点是否在一条直线附近
 * @param {Object} s 起始点
 * @param {Object} e 结束点
 * @param {Number} offset 需要判断的那个点距离直线的偏移量
 * @return {Function} 返回一个函数
 */
function createStraightEquation(s, e, offset = 1) {
  const k = (s.utm_y - e.utm_y) / (s.utm_x - e.utm_x);
  return ({ utm_x, utm_y }) => {
    const res = (utm_y - s.utm_y + k * s.utm_x) / k;
    return res > utm_x - offset && res < +utm_x + offset;
  };
}