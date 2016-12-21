var getPoint,getPointGraphic,getSVGGraphic,setMapCenter,setMapCenterAndZoom;

require(["esri/map",
        "esri/geometry/Point",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleMarkerSymbol",
        "dojo/domReady!"],
    function (Map,Point,SimpleLineSymbol,SimpleMarkerSymbol
    ) {

        //获得点
        getPoint = function (long,lat){
            var point = new Point({
                longitude: long,
                latitude: lat
            });
            return point;
        }

        /*
         返回点标注
         */
        getPointGraphic = function(obj){
            var simpleLineSymbol = new SimpleLineSymbol(SimpleLineSymbol[obj.line.style], new dojo.Color(obj.line.color), obj.line.size);//边线
            var simpleMarkerSymbol =  new SimpleMarkerSymbol(SimpleMarkerSymbol[obj.fill.style], obj.fill.size, simpleLineSymbol, new dojo.Color(obj.fill.color)); //圆点标记样式
            simpleMarkerSymbol.setOffset(obj.offset[0],obj.offset[1]);
            var point = getPoint(obj.point[0],obj.point[1]);
            var graphic = new esri.Graphic(point, simpleMarkerSymbol);
            graphic.setAttributes(obj.attribute);
            return graphic;
        }
        /*
         返回SVG标注
         */
        getSVGGraphic = function(obj){
            var simpleMarkerSymbol =  new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_PATH, obj.svg.size, null, new dojo.Color(obj.svg.color)); //圆点标记样式
            //参数STYLE_PATH时设置svg图形
            simpleMarkerSymbol.setPath(obj.svg.path);
            simpleMarkerSymbol.setOffset(obj.offset[0],obj.offset[1]);
            var point = getPoint(obj.point[0],obj.point[1]);
            var graphic = new esri.Graphic(point, simpleMarkerSymbol);
            graphic.setAttributes(obj.attribute);
            return graphic;
        }

        //设置中心点
        setMapCenter = function (long,lat){
            var p = getPoint(long,lat);
            map.centerAt(p);
        }
        //设置中心点和级别
        setMapCenterAndZoom = function(long,lat,level){
            var p = getPoint(long,lat);
            map.centerAndZoom(p,level);
        }



    });



