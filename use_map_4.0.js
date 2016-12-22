
window.onload = function(){
    setViewCenter(117.119006,36.674414,1);
    setViewZoom(6)
    //添加线
    var json_Line = {
        "attribute":{
            "Name": "Keystone Pipeline",
            "Owner": "TransCanada",
            "Length": "3,456 km"
        },
        "paths": pathArr,
        "line":{"color":[255,0,0,1],"size":2,"style":"STYLE_SOLID"}
    }
    var gra =  getPolylineGraphic(json_Line);
    view.graphics.add(gra);


    //添加多边形
    var json_Polygon = {
        "attribute":null,
        "rings":ringsArr,//二维数组
        "line":{"color":[0,0,255,1],"size":2,"style":"STYLE_DASHDOT"},
        "fill":{"color":[255,0,0,1],"style":"STYLE_SOLID"}
    }
    var polygonGraphic = getPolygonGraphic(json_Polygon);
    view.graphics.add(polygonGraphic);


    //添加点
    var json_P = {
        "point":[116.669305,39.983965],
        "offset":[0,0],
        "attribute":{
            "name":"dujunhui",
            "age":"30",
            "job":"doctor"
        },
        "line":{"color":[0,0,255,1],"size":2,"style":""},
        "fill":{"color":[255,0,0,1],"size":20,"style":"square"}
    }
    var pointGraphic = getPointGraphic(json_P);
    view.graphics.add(pointGraphic);



    //添加文字
    var json_Text = {
        "point":[118.553996,37.250204],
        "offset":[10,20],
        "attribute":null,
        "text":{"color":[255,0,0,1],"font-size":"12px","font-weight":"WEIGHT_BOLD","font-family":"Microsoft Yahei","str":"文字"}
    }
    var textGraphic = getTextGraphic(json_Text);
    view.graphics.add(textGraphic);

    //添加图片
    var json_Img = {
        "point":[118.5,36.26],
        "offset":[20,20],
        "attribute":null,
        "img":{"url":"image/ylz.png","width":14,"height":50,"rainImg":true}
    }
    var imgGraphic = getImgGraphic(json_Img);
    view.graphics.add(imgGraphic);



}









    //







    //添加SVG
    //var json_SVG = {
    //    "point":[122.187462,37.338396],
    //    "offset":[0,0],
    //    "attribute":null,
    //    "svg":{"color":[255,0,0,1],"size":20,"path":"M250 150 L150 350 L350 350 Z"}
    //}
    //var svgGraphic = getSVGGraphic(json_SVG)
    //pointLayer.add(svgGraphic);



    //dojo.connect(graLayer, "onClick", showInfoWindow);







