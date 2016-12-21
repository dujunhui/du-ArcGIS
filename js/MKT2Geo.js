/*
    WKT数据转换成Geometry数据
 */
var MKTtoArr = function (wkt){
    var arr = new Array();
    //多边形
    if(wkt.indexOf("MULTIPOLYGON") != -1){
        wkt = wkt.substring(12);
        //初步加裁wkt
        var partArray = wkt.split(")),"); //按  面组 的规则进行切割，  如果是一个面将得到长度为1的数组，如果是面组将得到长度为n的数组
        var str = "";
        for(var i=0;i<partArray.length;i++){
            if(str==""){
                str = str + getGroupPOLYGONarr(partArray[i]);
            }else{
                str = str + "," + getGroupPOLYGONarr(partArray[i]);
            }
        }
        arr = eval("["+ str +"]");
    }
    //线
    if(wkt.indexOf("MULTILINESTRING") != -1){
        var partArray = wkt.split("),");
        var str = "";
        for(var i=0;i<partArray.length;i++){
            if(str==""){
                str = str + partParse(partArray[i]);
            }else{
                str = str + "," + partParse(partArray[i]);
            }
        }
        arr = eval("["+ str +"]");
    }
    return  arr;
}

//切割面组，把面组打散成多个单面，再拼接起来。
var getGroupPOLYGONarr = function (mkt){
    var g0 = mkt.split("),");//如果已经是单面了，那么得到的是长度为1的数组
    var str = "";
    for(var i=0;i<g0.length;i++){
        if(str == ""){
            str = str + partParse(g0[i]);
        }else{
            str = str +"," + partParse(g0[i]);
        }
    }
    return str;
}


//(11.1234 89.1234, 12312 12312    ->  [[11.1234,89.1234], [12312,12312]]
//(11.1234 89.1234, 12312 12312)   ->  [[11.1234,89.1234], [12312,12312]]
//(11.1234 89.1234, 12312 12312))  ->  [[11.1234,89.1234], [12312,12312]]
//(11.1234 89.1234, 12312 12312))) ->  [[11.1234,89.1234], [12312,12312]]
var partParse = function (wkt){
    var index0 = wkt.lastIndexOf("(");
    var index1 = wkt.indexOf(")");
    if(index1 == -1){
        var strcood = wkt.substring(index0 + 1);
    }else{
        var strcood = wkt.substring(index0 + 1, index1);
    }

    var strcood_trim = strcood.trim();

    var coods = strcood_trim.split(",");

    var cood_array = new Array();

    for(var item in coods){
        if(typeof coods[item] === "string"){
            var s = trim(coods[item]);
            var item_json = s.replace(" ", ",");
            cood_array.push("[" + item_json + "]");
        }
    }
    return "[" +  cood_array.join(",") +"]" ;
}



function trim(str){
    return str.replace(/(^\s*)|(\s*$)/g, '');
}