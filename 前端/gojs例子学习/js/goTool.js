/*
* gojs的api比较分散,这里就做了一个简单的自定义封装
* */
(function (go, _global) {

    if (window.goSamples) goSamples();

    var goTool = function (diagramId, opt) {
        this.init(diagramId, opt)
    }

    goTool.prototype = {
        constructor: this,
        init: function (diagramId, opt) {
            this.opt = opt;

            this.diagramId = diagramId;
            this.make = go.GraphObject.make;
            this.createDiagram()
        },
        createDiagram: function () {
            this.diagram = this.make(go.Diagram, this.diagramId, this.opt)
        },

    }

    if (!_global.GoTool) _global.GoTool = goTool;
})(go, window)