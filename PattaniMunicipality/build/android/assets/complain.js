var complain_win=Ti.UI.currentWindow,pWidth=Ti.Platform.displayCaps.platformWidth,pHeight=Ti.Platform.displayCaps.platformHeight;if(pWidth>pHeight)var oriCurrent="landscape";else var oriCurrent="portrait";if("portrait"==oriCurrent)var complain_view_actionbar=Ti.UI.createView({backgroundColor:"#23BE94",width:"100%",height:"10%",top:0,left:0}),main_view=Ti.UI.createView({backgroundColor:"#DFDFDF",width:"100%",height:"90%",top:"10%"});else var complain_view_actionbar=Ti.UI.createView({backgroundColor:"#23BE94",width:"100%",height:"15%",top:0,left:0}),main_view=Ti.UI.createView({backgroundColor:"#DFDFDF",width:"100%",height:"85%",top:"15%"});var complain_back_icon=Ti.UI.createImageView({image:"/Images/back_icon.png",height:"70%",width:Ti.UI.SIZE,left:10}),complain_title_label=Ti.UI.createLabel({color:"white",font:{fontSize:20},textAlign:"center",text:"ร้องทุกข์"});Ti.Gesture.addEventListener("orientationchange",function(e){Ti.Gesture.orientation==Ti.UI.PORTRAIT?(complain_view_actionbar.height="10%",main_view.height="90%",main_view.top="10%"):(complain_view_actionbar.height="15%",main_view.height="85%",main_view.top="15%")}),complain_back_icon.addEventListener("click",function(){complain_win.close()}),complain_view_actionbar.add(complain_back_icon),complain_view_actionbar.add(complain_title_label),complain_win.add(complain_view_actionbar);var table=Ti.UI.createTableView(),url="http://172.16.129.180/pattani/complain.php",rowarr=[],client=Ti.Network.createHTTPClient({onload:function(){for(var e=JSON.parse(this.responseText),i=0;i<e.info.length;i++){var t=e.info[i];if(0==t.reid){var a=Ti.UI.createTableViewRow({index:i}),r=Ti.UI.createView({backgroundColor:"#DFDFDF",width:"100%",height:100,left:0,borderColor:"black",borderWidth:"0.5",index:i}),o=Ti.UI.createLabel({color:"#000",text:"เรื่อง : "+t.title,top:10,left:10,index:i}),n=Ti.UI.createLabel({color:"#000",font:{fontSize:12},text:"โดย : "+t.sender,top:"80%",left:10,index:i}),l=Ti.UI.createLabel({color:"#777",font:{fontSize:8},text:"วันที่ตั้งกระทู้ : "+t.date,top:"60%",right:10,index:i}),d=Ti.UI.createLabel({color:"#777",font:{fontSize:8},text:"วันที่ตอบล่าสุด : "+t.date_mod,top:"80%",right:10,index:i});r.add(o),r.add(n),r.add(l),r.add(d),a.add(r),rowarr.push(a)}}table.setData(rowarr),main_view.add(table),complain_win.add(main_view)}});client.open("GET",url),client.send();