$("#search").on('click',function(){
    var btn = document.getElementById('search');
    var ipt = document.getElementById('searchname').value;
    searchst = mysubway.getIdByName(ipt,'station');
    if(searchst!=-1){
        var id = searchst;
        mysubway.stopAnimation();
        var tb = document.getElementById('fluent-data');
        $.ajax({
        type:"get",
        dataType:"json",
        url:"10.108.122.213:7000/inform?station="+ipt,
        success:function(msg){
            tb.rows[0].cells[1].innerHTML = ipt;
            var lines = "";
            var rownum = tb.rows.length-1;
                while(rownum>=4){
                    tb.deleteRow(rownum);
                    rownum-=1;
                }
            for(var line in msg.upqueue){
                var temp = line
                if(line=='line1') temp= "一号线";
                if(line=='line2') temp= "二号线";
                if(line=='line3') temp= "三号线";
                if(line=='line3b') temp= "三北线";
                if(line=='line4') temp= "四号线";
                if(line=='line5') temp= "五号线";
                if(line=='line6') temp= "六号线";
                if(line=='line7') temp= "七号线";
                if(line=='line8') temp= "八号线";
                if(line=='lineApm') temp= "APM线";
                if(line=='lineGuang') temp= "广佛线";
                lines = temp + ' ' + lines;
                temp + '候车';
                rownum = tb.rows.length;
                tb.insertRow(rownum);
                tb.insertRow(rownum);
                tb.insertRow(rownum);
                tb.rows[rownum].insertCell(0);
                tb.rows[rownum].insertCell(1);
                tb.rows[rownum].insertCell(2);
                tb.rows[rownum+1].insertCell(0);
                tb.rows[rownum+1].insertCell(1);
                tb.rows[rownum+1].insertCell(2);
                tb.rows[rownum+2].insertCell(0);
                tb.rows[rownum+2].insertCell(1);
                tb.rows[rownum+2].insertCell(2);
                tb.rows[rownum].cells[1].innerHTML = temp;
                tb.rows[rownum].cells[2].innerHTML = msg.upqueue[line][0] + msg.upqueue[line][1];
                tb.rows[rownum+1].cells[1].innerHTML = '上行↑';
                tb.rows[rownum+1].cells[2].innerHTML = msg.upqueue[line][0];
                tb.rows[rownum+2].cells[1].innerHTML = '下行↓';
                tb.rows[rownum+2].cells[2].innerHTML = msg.upqueue[line][1]
            }
            tb.rows[1].cells[1].innerHTML = lines;
            tb.rows[2].cells[1].innerHTML = msg.num;
            rownum = tb.rows.length;
            tb.insertRow(rownum);
            tb.rows[rownum].insertCell(0);
            tb.rows[rownum].insertCell(1);
            tb.rows[rownum].insertCell(2);
            tb.rows[rownum].cells[1].innerHTML = '出站客流';
            tb.rows[rownum].cells[2].innerHTML = msg.downqueue;
            content = ipt + "&nbsp;";
            if(msg.num<100)
                content += '<font color="Lime"><b>正常</b></font>';
            else{ 
                if(msg.num<500) content += '<font color="Gold"><b>拥挤</b></font>';
                else content += '<font color=#ff3333><b>爆满</b></font>'
            }
            // var detial = document.getElementById('detial');
            $("#detial").show();
            mysubway.addInfoWindow(id,{
            isCustom: true,
            content: '<div class="tip_out"><div class="tip"><div class="tip_name">'+content+'</div><div class="tip_footer"></div></div>'
            });
        }
    });
    center = mysubway.getStCenter(id);
    center.x = center.x + 175;
    mysubway.setCenter(center);
}});
$(window).keydown(function(event){
    if(event.keyCode ==13){
        $("#search").trigger("click");
    }
});

function GetQueryString(name)
    {
         var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
         var r = window.location.search.substr(1).match(reg);
         if(r!=null)return  unescape(r[2]); return null;
    }

citycode = GetQueryString("city");
if(citycode == null){
    citycode = 4401;
}
var mysubway
window.cbk = function(){
    mysubway = subway("mysubway", {
        adcode: citycode,
        theme: "colorful",
        client: 0,
});
mysubway.event.on("subway.complete", function(ev, info) {
    var id = info.id;
});
mysubway.event.on("station.touch", function(ev, info) {
    var id = info.id;
    mysubway.stopAnimation();
    var tb = document.getElementById('fluent-data');

    $.ajax({
        type:"get",
        dataType:"json",
        url:"http://10.108.122.213:7000/inform?station="+info.name,
        success:function(msg){
            tb.rows[0].cells[1].innerHTML = info.name;
            var lines = "";
            var rownum = tb.rows.length-1;
                while(rownum>=4){
                    tb.deleteRow(rownum);
                    rownum-=1;
                }
            for(var line in msg.upqueue){
                var temp = line
                if(line=='line1') temp= "一号线";
                if(line=='line2') temp= "二号线";
                if(line=='line3') temp= "三号线";
                if(line=='line3b') temp= "三北线";
                if(line=='line4') temp= "四号线";
                if(line=='line5') temp= "五号线";
                if(line=='line6') temp= "六号线";
                if(line=='line7') temp= "七号线";
                if(line=='line8') temp= "八号线";
                if(line=='lineApm') temp= "APM线";
                if(line=='lineGuang') temp= "广佛线";
                lines = temp + ' ' + lines;
                temp = temp + '候车';
                rownum = tb.rows.length;
                tb.insertRow(rownum);
                tb.insertRow(rownum);
                tb.insertRow(rownum);
                tb.rows[rownum].insertCell(0);
                tb.rows[rownum].insertCell(1);
                tb.rows[rownum].insertCell(2);
                tb.rows[rownum+1].insertCell(0);
                tb.rows[rownum+1].insertCell(1);
                tb.rows[rownum+1].insertCell(2);
                tb.rows[rownum+2].insertCell(0);
                tb.rows[rownum+2].insertCell(1);
                tb.rows[rownum+2].insertCell(2);
                tb.rows[rownum].cells[1].innerHTML = temp;
                tb.rows[rownum].cells[2].innerHTML = msg.upqueue[line][0] + msg.upqueue[line][1];
                tb.rows[rownum+1].cells[1].innerHTML = '上行↑';
                tb.rows[rownum+1].cells[2].innerHTML = msg.upqueue[line][0];
                tb.rows[rownum+2].cells[1].innerHTML = '下行↓';
                tb.rows[rownum+2].cells[2].innerHTML = msg.upqueue[line][1]
            }
            tb.rows[1].cells[1].innerHTML = lines;
            tb.rows[2].cells[1].innerHTML = msg.num;
            rownum = tb.rows.length;
            tb.insertRow(rownum);
            tb.rows[rownum].insertCell(0);
            tb.rows[rownum].insertCell(1);
            tb.rows[rownum].insertCell(2);
            tb.rows[rownum].cells[1].innerHTML = '出站客流';
            tb.rows[rownum].cells[2].innerHTML = msg.downqueue;
            content = info.name + "&nbsp;";
            if(msg.num<100)
                content += '<font color="Lime"><b>正常</b></font>';
            else{ 
                if(msg.num<500) content += '<font color="Gold"><b>拥挤</b></font>';
                else content += '<font color=#ff3333><b>爆满</b></font>'
            }
            // var detial = document.getElementById('detial');
            $("#detial").show();
            mysubway.addInfoWindow(id,{
            isCustom: true,
            content: '<div class="tip_out"><div class="tip"><div class="tip_name">'+content+'</div><div class="tip_footer"></div></div>'
            });
        }
    });
    center = mysubway.getStCenter(id);
    center.x = center.x + 175;
    mysubway.setCenter(center);
});
}