var getPoint,getPointGraphic,getSVGGraphic,getTextGraphic,getImgGraphic,
    getPolygon,getPolygonGraphic,getPolyline,getPolylineGraphic,
    setViewCenter,setViewZoom;
require([
    "esri/Map","esri/Graphic","esri/PopupTemplate",
    "esri/geometry/Point",
    "esri/geometry/Polyline",
    "esri/geometry/Polygon",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/TextSymbol",
    "esri/symbols/PictureMarkerSymbol",
    "dojo/domReady!"
], function(
    Map,Graphic,PopupTemplate,
    Point,Polyline,Polygon,
    SimpleLineSymbol,SimpleMarkerSymbol,SimpleFillSymbol,TextSymbol,PictureMarkerSymbol
) {

    //线
    getPolyline = function(arr){
        var polyline = new Polyline({
            paths:arr
        })
        return polyline;
    }
    /*
     线Graphic
     */
    getPolylineGraphic = function(obj){
        var polyline = getPolyline(obj["paths"]);

        var lineSymbol = new SimpleLineSymbol({
            color: obj["line"]["color"],
            width: obj["line"]["size"]
        })
        var pop = new PopupTemplate({
            title: "{Name}",
            content: [{
                type: "fields",
                fieldInfos: [{
                    fieldName: "Name",
                    label: "名字",
                    visible: true
                },{
                    fieldName: "Owner",
                    label: "名字",
                    visible: true
                },{
                    fieldName: "Length",
                    label: "名字",
                    visible: true
                }]
            }]
        })

        var polylineGraphic = new Graphic({
            geometry: polyline,
            symbol: lineSymbol,
            attributes: obj["attribute"]
        })
        return polylineGraphic;
    }


    //点
    getPoint = function(long,lat){
        var point = new Point({
            longitude: long,
            latitude: lat
        });
        return point;
    }
    /*
     点Graphic
     */
    getPointGraphic = function(obj){
        var markerSymbol = new SimpleMarkerSymbol({
            color: obj["fill"]["color"],
            outline: {
                color: obj["line"]["color"],
                width: obj["line"]["size"]
            }
        });
        var point = getPoint(obj["point"][0],obj["point"][1]);
        var pop = new PopupTemplate({
            title: "{name}",
            content: [{
                type: "fields",
                fieldInfos: [{
                    fieldName: "name",
                    label: "姓名",
                    visible: true
                },{
                    fieldName: "age",
                    label: "年龄",
                    visible: true
                },{
                    fieldName: "job",
                    label: "工作",
                    visible: true
                }]
            }]
        })
        var pointGraphic = new Graphic({
            geometry: point,
            symbol: markerSymbol,
            popupTemplate: pop,
            attributes: obj["attribute"]
        });
        return pointGraphic;
    }


    //多边形
    getPolygon = function(arr){
        var polygon = new Polygon({
            rings: arr
        });
        return polygon;
    }
    /*
    多边形Graphic
    */
    getPolygonGraphic = function(obj){
        var fillSymbol = new SimpleFillSymbol({
            color: obj["fill"]["color"],
            outline: {
                color: obj["line"]["color"],
                width: obj["line"]["size"]
            }
        });
        var polygon = getPolygon(obj["rings"]);
        var polygonGraphic = new Graphic({
            geometry: polygon,
            symbol: fillSymbol,
            attributes: obj["attribute"]
        });
        return polygonGraphic
    }

    //获得文字graphic
    getTextGraphic = function(obj){
        var textSymbol = new TextSymbol({
            color: obj["text"]["color"],
            haloColor: "white",
            haloSize: "0px",
            text: obj["text"]["str"],
            xoffset: obj["offset"][0],
            yoffset: obj["offset"][1],
            font: {
                size: obj["text"]["font-size"],
                family: obj["text"]["font-family"]
            }
        });
        var point = getPoint(obj["point"][0],obj["point"][1]);
        var textGraphic = new Graphic({
            geometry: point,
            symbol: textSymbol,
            attributes: obj["attribute"]
        });
        return textGraphic;
    }

    /*
     图片标注Graphic
     */
    getImgGraphic = function(obj){
        var top = 0;
        //判断图片是否是雨柱
        if(obj["img"]["rainImg"]){
            top = (obj["img"]["height"]/2);
        }
        var symbol = new PictureMarkerSymbol({
            url: obj["img"]["url"],
            width: obj["img"]["width"]+"px",
            height: obj["img"]["height"]+"px",
            xoffset: obj["offset"][0],
            yoffset: top + obj["offset"][1]
        });

        var point = getPoint(obj["point"][0],obj["point"][1]);
        var imgGraphic = new Graphic({
            geometry: point,
            symbol: symbol,
            attributes: obj["attribute"]
        });
        return imgGraphic;
    }





    //设置中心点
    setViewCenter = function (long,lat){
        var p = getPoint(long,lat);
        view.center = p;
    }
    //设置中心点和级别
    setViewZoom = function(level){
        view.zoom = level;
    }

});
