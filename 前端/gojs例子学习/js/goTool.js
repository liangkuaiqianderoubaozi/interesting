/*
* gojs的api比较分散,这里就做了一个简单的自定义封装
* */
(function (go, _global) {

    var defaultOption = {
        allowDrop: true,
        allowZoom: true,
        allowVerticalScroll: false,
        //禁止动画效果
        "animationManager.isEnabled": false,
        "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
        initialContentAlignment: go.Spot.Center,
        "grid.visible": true,
        "undoManager.isEnabled": true,
    }


    var goTool = function (diagramId, opt) {
        if (window.goSamples) goSamples();
        this.opt = Object.assign(opt, defaultOption);
        this.diagramId = diagramId;
        this.maker = go.GraphObject.make;
        this.init()
    }

    goTool.prototype = {
        constructor: this,
        $: {},
        init: function () {
            let _ = this;
            if (!_.diagramId) throw new Error("No search document id width :" + _.diagramId)
            if (!_.maker) throw new Error("go.GraphObject.make error")
            this.diagram = _.maker(go.Diagram, _.diagramId, _.opt)
        },

        setBackground(options = {}) {
            let _ = this;
            let $ = _.maker
            let d = _.diagram
            let opt = Object.assign(options, {
                layerName: "Background", position: new go.Point(0, 0),
                selectable: false, pickable: false
            })

            let p = opt.image ? opt.image : ""
            if (p) delete opt.image

            d.add($(go.Part, opt, $(go.Picture, p)));
        }
    }

    if (!_global.GoTool) _global.GoTool = goTool;
})(go, window)