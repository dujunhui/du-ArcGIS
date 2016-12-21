dojo.addOnLoad(function(){

    var PointGraphicsLayer = new esri.layers.GraphicsLayer({opacity:0.8,id:"poiGraLayer"});//点layer
    map.addLayer(PointGraphicsLayer);

    setMapCenterAndZoom(117.119006,36.674414,1);

    var jsonP1 = {
        "point":[118.5,36.26],
        "offset":[0,0],
        "attribute":null,
        "line":{"color":[0,255,0,1],"size":2,"style":"STYLE_SOLID"},
        "fill":{"color":[255,0,0,1],"size":10,"style":"STYLE_CIRCLE"}
    }
    PointGraphicsLayer.add(getPointGraphic(jsonP1));

    var jsonP2 = {
        "point":[122.187462,37.338396],
        "offset":[0,0],
        "attribute":null,
        "svg":{"color":[255,0,0,1],"size":20,"path":"M250 150 L150 350 L350 350 Z"}
    }
    PointGraphicsLayer.add(getSVGGraphic(jsonP2));

    //PointGraphicsLayer.add(getSVGGraphic(jsonP2));
})
