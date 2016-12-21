var map, navToolbar, editToolbar, tileLayer, toolbar;
//var mapBaseUrl = "http://localhost:8399/arcgis/rest/services/pdsTile/MapServer";
//var mapDyUrl = "http://localhost:8399/arcgis/rest/services/pds/MapServer";
//var mapDyUrl = "http://10.19.110.130:8080/arcgis/rest/services/BaseMAP/MapServer";
var mapDyUrl = "http://10.19.110.130:8080/arcgis/rest/services/baseMAP/MapServer";
var mapBjUrl = "http://10.19.110.130:8080/arcgis/rest/services/YCBJ/MapServer";
var dynamicMapServiceLayerBj;


function init() {
    try{
        map = new esri.Map("map");

        //tileLayer = new esri.layers.ArcGISTiledMapServiceLayer(mapBaseUrl);
        //map.addLayer(tileLayer);

        var dynamicMapServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(mapDyUrl);
        map.addLayer(dynamicMapServiceLayer);

        dynamicMapServiceLayerBj = new esri.layers.ArcGISDynamicMapServiceLayer(mapBjUrl);
        map.addLayer(dynamicMapServiceLayerBj);

        //初始化
        dojo.connect(map, "onLoad", dxInit);



    }catch(e){alert("地图初始化失败:"+e.message);}
}

function dxInit()
{
    try{
        //alert(map.isDoubleClickZoom);
        //map.disableDoubleClickZoom();

        //比例尺显示
        //window.setTimeout("queryMapScale.init(map);", 1000);

        //禁止双击放大
        map.disableDoubleClickZoom();

        //初始化导航工具条
        navToolbar = new esri.toolbars.Navigation(map);
        dojo.connect(navToolbar, "onExtentHistoryChange", extentHistoryChangeHandler);

        //初始化在线编辑工具条
        editToolbar = new esri.toolbars.Edit(map);
        dojo.connect(map.graphics, "onClick", function(evt) {
            dojo.stopEvent(evt);
            activateToolbar(evt.graphic);
        });

        //初始化绘制工具条
        toolbar = new esri.toolbars.Draw(map);
        //dojo.connect(toolbar, "onDrawEnd", addToMap);

        //显示坐标
        dojo.connect(map, "onMouseMove", showCoordinates);
        dojo.connect(map, "onMouseOut", hideCoordinates);

        //加载鹰眼图、加载图层列表
        dojo.connect(map, "onLayerAdd", showLayers);

        //加载之前记录标注
        //window.setTimeout("getBz();", 1000);------------------------------

        //地图窗口更新
        //alert(document.getElementById('map1'));
        resizeMap();
        dojo.connect(document.getElementById('map1'), 'resize', resizeMap);

        //双击map，定位街景
        dojo.connect(map, 'onDblClick', zoomTo3D);

        //图层控制
        layersCotrol([0]);
    }catch(e){
        alert("地图初始化失败："+e.message);
    }
}

//图层控制
function layersCotrol(visible){

    try{
        dynamicMapServiceLayerBj.setVisibleLayers(visible);
    }catch(e){
        alert(e.message);
    }
}

//显示图层列表
function showLayers(){

    try{
        //在下拉框中显示所有图层名称
        var layers = dynamicMapServiceLayerBj.layerInfos;
        var obj1 = new Option("", -1);
        for(var i=0; i<layers.length; i++){
            var obj = new Option(layers[i].name, i);
            dojo.byId("layers").add(obj);
        }
    }catch(e){
        alert(e.message);
    }
}

//选择图层
function selectLayer(){

    try{
        layersCotrol([dojo.byId("layers").value]);
    }catch(e){
        alert(e.message);
    }
}

//刷新map
function resizeMap(){
    map.resize();
    map.reposition();
}

//定位街景
function zoomTo3D(evt)
{
    var point = evt.mapPoint;

    var x = point.x.toFixed(4);
    var y = point.y.toFixed(4);


    //window.top.addmark(x, y);
    //alert(x + '|' + y);
    // 定位街景
    LocationTrueMap(x, y);
}
// 根据坐标加载街景
function LocationTrueMap(x, y) {
    window.top.frames["mapframe"].frames["ldframe"].showVisionByLngLat(x, y); //定位到街景
}

//鹰眼图
function showOverview() {
    var layer = new esri.layers.ArcGISDynamicMapServiceLayer(mapDyUrl);
    layer.setImageFormat("png24");
    try{
        var createOverviewMap = function() {
            overviewMapDijit = new dijits.overview.OverviewMap({
                map: map,
                baseLayer: layer,
                width: 150,
                height: 150,
                attachTo: "bottom-right",
                expandFactor: 1.42,
                color: "#80A8C1",
                opacity: 0.5
            });
            overviewMapDijit.startup();
        };
    }catch(e){
        alert("加载鹰眼图失败："+e.message);
    }

    if (layer.loaded) {
        createOverviewMap();
    }
    else {
        dojo.connect(layer, "onLoad", createOverviewMap);
    }
}

//前一视图、后一视图
function extentHistoryChangeHandler() {
    dijit.byId("zoomprev").disabled = navToolbar.isFirstExtent();
    dijit.byId("zoomnext").disabled = navToolbar.isLastExtent();
}

//显示坐标值
function showCoordinates(evt)
{
    try{
        var mp = evt.mapPoint;
        dojo.byId("info").innerHTML = mp.x.toFixed(4) +","+ mp.y.toFixed(4);

    }catch(e){
        alert("显示坐标值错误："+e.message);
    }
}

//隐藏坐标
function hideCoordinates(evt){
    dojo.byId("info").innerHTML = "";
}

//平移
function pan(){
    try{
        toolbar.deactivate();
        map.setMapCursor('default');
        navToolbar.activate(esri.toolbars.Navigation.PAN);
    }catch(e){
        alert(e.message);
    }
}

//清空地图
function clearMap(){
    navToolbar.deactivate();
    toolbar.deactivate();
    map.graphics.clear();
    map.setMapCursor('default');
}

//添加标注到地图方法1
var handler;
function addBzToMap1(){
    toolbar.deactivate();
    map.setMapCursor('crosshair');
    handler = dojo.connect(map, "onClick", addPoint);
}

function add(x, y) {

    window.parent.showdialog('add','', x,y);
}


function modify(id, x, y) {
    window.parent.showdialog('modify', id, x, y);
}


function del(id, x, y) {
    //alert(x + "--" + y);
    window.parent.showdialog('del', id, x, y);
}
function addPoint(evt) {
    try{
        var symbol = new esri.symbol.PictureMarkerSymbol('images/nav/bz.png', 25, 25);
        var point = new esri.geometry.Point(evt.mapPoint, new esri.SpatialReference({ wkid: 4326 }));
        var graphic = new esri.Graphic(point, symbol);
        map.graphics.add(graphic);

        map.infoWindow.setTitle("新标注");
        var geoPt = evt.mapPoint;
        map.infoWindow.setContent("<b>X坐标: </b>" + geoPt.y.toFixed(4)

            + "<br><b>Y坐标: </b>" + geoPt.x.toFixed(4)

            + "<table></table>"

            + "<br><input type='button' value='添加属性' onclick='window.top.addmark(" + geoPt.x.toFixed(4) + "," + geoPt.y.toFixed(4) + ")'>"

        );
        map.infoWindow.show(evt.mapPoint,map.getInfoWindowAnchor(evt.screenPoint));
        map.setMapCursor('default');
        dojo.disconnect(handler);




        window.top.frames["mapframe"].frames["ldframe"].showVisionByLngLat(geoPt.x.toFixed(4), geoPt.y.toFixed(4)); //定位到街景
    }catch(e){
        alert("添加标注出错："+e.message);
    }
}

//定位
function zoomToPoint(x, y){
    var geoPoint = new esri.geometry.Point({"x":x,"y":y}, map.spatialReference);
    map.centerAndZoom(geoPoint, 3);
}

//小汽车定位
//zoomCar(113.32,23.12);
function zoomCar(x, y) {
    navToolbar.deactivate();
    map.graphics.clear();
    try{
        var geoPoint = new esri.geometry.Point({"x":x,"y":y}, map.spatialReference);
        map.centerAndZoom(geoPoint);
        var symbol = new esri.symbol.PictureMarkerSymbol('images/nav/car.png', 24,24);
        var graphic = new esri.Graphic(geoPoint, symbol);
        map.graphics.add(graphic);
    }catch(e){
        alert("小汽车定位" + e.message);
    }
}


var url = "http://192.168.1.11:8080";

//接收主题名称、坐标值
function getBz(aa) {
    var graphicsLayer = new esri.layers.GraphicsLayer();
    try {
        for (var i = 0; i < aa.length; i++) {
            a_x = aa[i][1];
            a_y = aa[i][2];
            // alert(a_x+"---"+a_y);
            var point = new esri.geometry.Point(a_x, a_y, map.spatialReference);
            var symbol = new esri.symbol.PictureMarkerSymbol('images/nav/bz.png', 25, 25);
            var textSym = new esri.symbol.TextSymbol(aa[i][0]);
            textSym.setAlign(esri.symbol.TextSymbol.ALIGN_END);
            var graphic = new esri.Graphic(point, symbol);


            var infoTemplate = new esri.InfoTemplate();
            infoTemplate.setTitle("广告信息");
            infoTemplate.setContent(
//                "<div style='text-align:center;'><img src='" + url + aa[i][5] + "' alt='" + url + aa[i][5] + "' style='width:100px;height:42px;'/></div>" +
//                "<b>广告名称: </b>" + aa[i][3] + "<br/>" +
//                "<b>广告位置: </b>" + aa[i][4] + "<br/>" +
//             "<br><input type='button' value='修改广告' onclick='map.infoWindow.hide();modify(" + aa[i][0] + "," + a_x + "," + a_y + ")'>" +
//             "    <input type='button' value='删除广告' onclick='map.infoWindow.hide();del(" + aa[i][0] + "," + a_x + "," + a_y + ")'>"


            );
            graphic.setInfoTemplate(infoTemplate);
            var graphicText = new esri.Graphic(point, textSym);
            graphicsLayer.add(graphic);
            graphicsLayer.add(graphicText);

            if (aa.length == 1) {
                //  zoomToPoint(a_x, a_y); 
            }
        }
    } catch (e) {
        alert("获取坐标点数组出错：" + e.message + "---aa:" + aa);
    }
    map.addLayer(graphicsLayer);
}

//在线编辑--移动要素
function activateToolbar(graphic) {
    try{
        var tool = 0;
        tool = tool | esri.toolbars.Edit.MOVE;
        //tool = tool | esri.toolbars.Edit.EDIT_VERTICES;
        //tool = tool | esri.toolbars.Edit.SCALE;
        //tool = tool | esri.toolbars.Edit.ROTATE;

        var options = {
            allowAddVertices: true,
            allowDeleteVertices: true
        };
        editToolbar.activate(tool, graphic, options);
        dojo.connect(map.graphics, "onDblClick", showInfoWindow);
    }catch(e){
        alert("移动要素问题："+e.message);
    }
}

function showInfoWindow(evt){
    evt.stopPropagation();

    map.infoWindow.setTitle("新标注");
    var geoPt = evt.mapPoint;
    map.infoWindow.setContent("<b>X坐标: </b>" + geoPt.y.toFixed(4)
        + "<br><b>Y坐标: </b>" + geoPt.x.toFixed(4)
        + "<table></table>"
        + "<br><input type='button' value='添加广告' onclick='map.infoWindow.hide();add(" + geoPt.x + "," + geoPt.y + ")'>"

    );
    map.infoWindow.show(evt.mapPoint,map.getInfoWindowAnchor(evt.screenPoint));
}

//框选
function queryBz()
{
    map.setMapCursor('crosshair');
    navToolbar.deactivate();
    toolbar.activate(esri.toolbars.Draw.EXTENT);
    toolbar.onDrawEnd = function doQueryExtent(extent) {
        window.parent.stat(extent.xmin, extent.ymin, extent.xmax, extent.ymax);
//  //获取框选区域的坐标范围
//  alert("xmax:"+extent.xmax+",xmin:"+extent.xmin+",  ymax:"+extent.ymax+",ymin:"+extent.ymin);
    };

}