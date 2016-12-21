var getPoint,getPointGraphic,getSVGGraphic,getTextGraphic,getImgGraphic,
    getPolygon,getPolygonGraphic,setMapCenter,setMapCenterAndZoom,showInfoWindow;

require(["esri/map","esri/graphic","esri/InfoTemplate",
        "esri/geometry/Point",
        "esri/geometry/Polygon",
        "esri/geometry/Polyline",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/Font",
        "esri/symbols/TextSymbol",
        "esri/symbols/PictureMarkerSymbol",
        "esri/symbols/SimpleFillSymbol",
        "dojo/domReady!"],
    function (Map,Graphic,InfoTemplate,
              Point,Polygon,Polyline,
              SimpleLineSymbol,SimpleMarkerSymbol,Font,TextSymbol,PictureMarkerSymbol,SimpleFillSymbol
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
         点标注Graphic
         */
        getPointGraphic = function(obj){
            var simpleLineSymbol = new SimpleLineSymbol(SimpleLineSymbol[obj["line"]["style"]], new dojo.Color(obj["line"]["color"]), obj["line"]["size"]);//边线
            var simpleMarkerSymbol =  new SimpleMarkerSymbol(SimpleMarkerSymbol[obj["fill"]["style"]], obj["fill"]["size"], simpleLineSymbol, new dojo.Color(obj["fill"]["color"])); //圆点标记样式
            simpleMarkerSymbol.setOffset(obj["offset"][0],obj["offset"][1]);

            var point = getPoint(obj["point"][0],obj["point"][1]);
            //var infoTemplate = new InfoTemplate("Vernal Pool Locations ${Plant}","Latitude: ${Ycoord} <br/>Longitude: ${Xcoord} <br/>Plant Name:${Plant}");
            var infoTemplate = new InfoTemplate();
            infoTemplate.setTitle("Vernal Pool Locations ${key1}");
            infoTemplate.setContent("<b>key1 </b>${key2}<br/>" +
                "<b>2007 density: </b>${key3}<br/>" +
                "<b>2000: </b>${key3}<br/>" +
                "<b>2000 density: </b>${key3}");

            var graphic = new Graphic(point, simpleMarkerSymbol, obj["attribute"], infoTemplate);
            //graphic.setAttributes(obj["attribute"]);
            return graphic;
        }
        /*
         SVG标注Graphic
         */
        getSVGGraphic = function(obj){
            var simpleMarkerSymbol =  new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_PATH, obj["svg"]["size"], null, new dojo.Color(obj["svg"]["color"])); //圆点标记样式
            //参数STYLE_PATH时设置svg图形
            simpleMarkerSymbol.setPath(obj["svg"]["path"]);
            simpleMarkerSymbol.setOffset(obj["offset"][0],obj["offset"][1]);
            var point = getPoint(obj["point"][0],obj["point"][1]);
            var graphic = new Graphic(point, simpleMarkerSymbol);
            graphic.setAttributes(obj["attribute"]);
            return graphic;
        }


        /*
         文字标注Graphic
         */
        getTextGraphic = function(obj){
            //设置字体
            var font = new Font();
            font.setSize(obj["text"]["font-size"]);
            font.setWeight(Font[obj["text"]["font-weight"]]);//设置粗体
            //设置文本样式
            var textSym = new TextSymbol(obj["text"]["str"]);
            textSym.setFont(font);
            textSym.setColor(new dojo.Color(obj["text"]["color"]));
            textSym.setOffset(obj["offset"][0], obj["offset"][1]);
            //返回graphic
            var point = getPoint(obj["point"][0],obj["point"][1]);
            var graphic = new Graphic(point, textSym);
            graphic.setAttributes(obj["attribute"]);
            return graphic;
        }


        /*
         图片标注Graphic
         */
        getImgGraphic = function(obj){
            var pictureMarkerSymbol = new PictureMarkerSymbol(obj["img"]["url"], obj["img"]["width"], obj["img"]["height"]);
            var top = 0;
            //判断图片是否是雨柱
            if(obj["img"]["rainImg"]){
                top = (obj["img"]["height"]/2);
            }
            //设置图片偏移量
            pictureMarkerSymbol.setOffset(obj["offset"][0],obj["offset"][1]+top);

            //var attr = {"Xcoord":point.x,"Ycoord":point.y,"Plant":"Mesa Mint"};
            //var infoTemplate = new esri.InfoTemplate("Vernal Pool Locations","Longitude: ${Xcoord} <br/> Latitude: ${Ycoord} <br/>Plant Name:${Plant}");

            //返回graphic
            var point = getPoint(obj["point"][0],obj["point"][1]);
            var graphic = new Graphic(point, pictureMarkerSymbol);
            graphic.setAttributes(obj["attribute"]);
            return graphic;
        }

        /*
         多边形Polygon
        */
        getPolygon = function(arr){
            var polygonJson  = {"rings":arr,"spatialReference":{"wkid":4326}};
            var polygon = new Polygon(polygonJson);
            return polygon;
        }
        /*
        多边形Graphic
        */
        getPolygonGraphic = function(obj){
            var polygon = getPolygon(obj["rings"]);
            var simpleLineSymbol =  new SimpleLineSymbol( SimpleLineSymbol[obj["line"]["style"]], new dojo.Color(obj["line"]["color"]), obj["line"]["size"]);
            var fillSymbol = new SimpleFillSymbol( SimpleFillSymbol[obj["fill"]["style"]], simpleLineSymbol, new dojo.Color(obj["fill"]["color"]) );
            var graphic = new Graphic(polygon, fillSymbol ,obj["attribute"]);
            return graphic;
        }

        /*
         线Polygon
        */
        getPolyline = function(arr){
            var polylineJson = {"paths":arr,"spatialReference":{"wkid":4326}};
            var polyline = new Polyline(polylineJson);
            return polyline;
        }
        /*
         线Graphic
         */
        getPolylineGraphic = function(obj){
            var polyline = getPolyline(obj["paths"]);
            var simpleLineSymbol =  new SimpleLineSymbol(SimpleLineSymbol[obj["line"]["style"]], new dojo.Color(obj["line"]["color"]), obj["line"]["size"]);
            var graphic = new Graphic(polyline, simpleLineSymbol, obj["attribute"]);
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

        showInfoWindow = function(evt){
            //map.setMapCursor("pointer");//设置鼠标样式

            evt.stopPropagation();
            var graphic = evt.graphic;   //获得点击的graphic
            var obj = graphic.attributes;//获得graphic属性

            //var scrPt = map.toScreen(graphic.geometry);
            //addInfoWindow(scrPt,obj);

            var geoPt = evt.mapPoint;
            var scrPt = evt.screenPoint;
            map.infoWindow.setTitle("新标注");
            map.infoWindow.setContent("<b>X坐标: </b>" + geoPt.y.toFixed(4)
                + "<br><b>Y坐标: </b>" + geoPt.x.toFixed(4)
                + "<table></table>"
                + "<br><input type='button' value='添加广告' onclick='map.infoWindow.hide();add(" + geoPt.x + "," + geoPt.y + ")'>"

            );
            map.infoWindow.show(geoPt, map.getInfoWindowAnchor(scrPt));
        }


    });



