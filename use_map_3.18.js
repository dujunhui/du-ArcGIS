dojo.addOnLoad(function(){

    var graLayer = new esri.layers.GraphicsLayer({opacity:0.8,id:"graLayer"});//点layer
    map.addLayer(graLayer);

    //setMapCenterAndZoom(117.119006,36.674414,1);


    //添加点
    var json_P = {
        "point":[118.5,36.26],
        "offset":[0,0],
        "attribute":{"key1":"val1","key2":"val2","key3":"val3"},
        "line":{"color":[0,0,255,1],"size":2,"style":"STYLE_SOLID"},
        "fill":{"color":[255,0,0,1],"size":10,"style":"STYLE_CIRCLE"}
    }
    var pointGraphic = getPointGraphic(json_P);
    graLayer.add(pointGraphic);

    //添加SVG
    var json_SVG = {
        "point":[122.187462,37.338396],
        "offset":[0,0],
        "attribute":null,
        "svg":{"color":[255,0,0,1],"size":20,"path":"M250 150 L150 350 L350 350 Z"}
    }
    var svgGraphic = getSVGGraphic(json_SVG)
    graLayer.add(svgGraphic);

    //添加文字
    var json_Text = {
        "point":[118.553996,37.250204],
        "offset":[10,20],
        "attribute":null,
        "text":{"color":[255,0,0,1],"font-size":"12px","font-weight":"WEIGHT_BOLD","str":"文字"}
    }
    var textGraphic = getTextGraphic(json_Text);
    graLayer.add(textGraphic);

    //添加图片
    var json_Img = {
        "point":[118.5,36.26],
        "offset":[20,20],
        "attribute":null,
        "img":{"url":"image/ylz.png","width":14,"height":50,"rainImg":false}
    }
    var imgGraphic = getImgGraphic(json_Img);
    graLayer.add(imgGraphic);

    //添加多边形
    var json_Polygon = {
        "attribute":null,
        "rings":ringsArr,//二维数组
        "line":{"color":[0,0,255,1],"size":2,"style":"STYLE_DASHDOT"},
        "fill":{"color":[255,0,0,1],"style":"STYLE_SOLID"}
    }
    var polygonGraphic = getPolygonGraphic(json_Polygon);
    graLayer.add(polygonGraphic);

    //添加线
    var json_Line = {
        "attribute":null,
        "paths": pathArr,//二维数组
        "line":{"color":[255,0,0,1],"size":2,"style":"STYLE_SOLID"}
    }
    var lineGraphic = getPolylineGraphic(json_Line);
    graLayer.add(lineGraphic);


    //dojo.connect(graLayer, "onClick", showInfoWindow);


})


