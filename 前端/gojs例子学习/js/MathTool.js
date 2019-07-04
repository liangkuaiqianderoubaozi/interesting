var MathTool = {}

/*
* point ： 点
* center ： 原点
* angle ：旋转度数
* */
MathTool.rotate = function (center, point, angle) {
    var x = (point.x - center.x) * Math.cos(Math.PI / 180 * angle) - (point.y - center.y) * Math.sin(Math.PI / 180 * angle) + center.x;
    var y = (point.x - center.x) * Math.sin(Math.PI / 180 * angle) + (point.y - center.y) * Math.cos(Math.PI / 180 * angle) + center.y;
    x = Math.floor(x * 100) / 100;
    y = Math.floor(y * 100) / 100;
    return {x: x, y: y}
}