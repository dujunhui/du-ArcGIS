/**
 * arcgis4.0地图初始化
 */
var map;
var view;
require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/TileLayer",
    "esri/geometry/Extent",
    "esri/geometry/Polyline",
    "esri/symbols/SimpleLineSymbol",
    "esri/Graphic",
    "esri/PopupTemplate",
    "dojo/domReady!"
], function(
    Map,
    MapView,
    TileLayer,
    Extent,
    Polyline,
    SimpleLineSymbol,
    Graphic,
    PopupTemplate
) {
    //设置缩放范围
    var lods = [
        //{"level" : 0, "resolution" : 0.703125, "scale" : 295497593.05875003},
        //{"level" : 1, "resolution" : 0.3515625, "scale" : 147748796.52937502},
        //{"level" : 2, "resolution" : 0.17578125, "scale" : 73874398.264687508},
        //{"level" : 3, "resolution" : 0.087890625, "scale" : 36937199.132343754},
        //{"level" : 4, "resolution" : 0.0439453125, "scale" : 18468599.566171877},
        //{"level" : 5, "resolution" : 0.02197265625, "scale" : 9234299.7830859385},
        {"level" : 0, "resolution" : 0.010986328125, "scale" : 4617149.8915429693},
        {"level" : 1, "resolution" : 0.0054931640625, "scale" : 2308574.9457714846},
        { "level": 2, "resolution" : 0.002746582031250464, "scale": 1154287.4728859374 },
        { "level": 3, "resolution" : 0.001373291015625232, "scale":577143.7364429687 },
        { "level": 4, "resolution" : 0.000686645507812616, "scale": 288571.86822148436 },
        { "level": 5, "resolution": 0.000343322753906308, "scale": 144285.93411074218 },
        { "level": 6, "resolution": 0.000171661376953154, "scale": 72142.96705537109 },
        { "level": 7, "resolution": 0.000085830688476577, "scale": 36071.483527685545 },
        { "level": 8, "resolution": 0.0000429153442382885, "scale": 18035.741763842772 },
        { "level": 9, "resolution": 0.00002145767211914425, "scale": 9017.870881921386 },
        { "level": 10, "resolution": 0.000010728836059572125, "scale": 4508.935440960693 },
        { "level": 11, "resolution": 0.0000053644180297860626, "scale": 2254.4677204803465 }
    ];

    map = new Map({});

    view = new MapView({
        center: [116.404269, 39.917149],
        container: "mapDiv",
        map: map,
        zoom: 0
    });
    //改变参数设置地图范围
    view.extent = new Extent({xmin:119.6,ymin:36.6,xmax:122.2,ymax:37.9,spatialReference:{wkid:4326}});
    view.constraints = {
        lods:lods,
        minZoom:0,
        maxZoom:11,
        snapToZoom:false,
        rotationEnabled: false  // Disables map rotation
    };

    //添加底图
    var tLayer = new TileLayer({
        url: wmsurl
    });
    map.layers.add(tLayer);




});