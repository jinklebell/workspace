var complain_win = Ti.UI.currentWindow;
var pWidth = Ti.Platform.displayCaps.platformWidth;
var pHeight = Ti.Platform.displayCaps.platformHeight;

if (pWidth > pHeight) {
	var oriCurrent = 'landscape';
}else{
	var oriCurrent = 'portrait';    
}
if(oriCurrent == 'portrait'){
	var complain_view_actionbar = Ti.UI.createView({
		backgroundColor : '#23BE94',
		width : '100%',
		height : '10%',
		top : 0,
		left : 0
	});		
	var main_view = Ti.UI.createView({
		backgroundColor : '#DFDFDF',
		width : '100%',
		height : '90%',
		top : '10%'
	});
}else{
	var complain_view_actionbar = Ti.UI.createView({
		backgroundColor : '#23BE94',
		width : '100%',
		height : '15%',
		top : 0,
		left : 0
	});	
	var main_view = Ti.UI.createView({
		backgroundColor : '#DFDFDF',
		width : '100%',
		height : '85%',
		top : '15%'
	});
}
var complain_back_icon = Ti.UI.createImageView({
		image : '/Images/back_icon.png',
		height : '70%',
		width : Ti.UI.SIZE,
		left : 10
});	
var complain_title_label = Ti.UI.createLabel({
	color : 'white',
	font : {fontSize : 20},
	textAlign : 'center',	
	text : 'ร้องทุกข์',
});

Ti.Gesture.addEventListener('orientationchange',function(e){
	if(Ti.Gesture.orientation == Ti.UI.PORTRAIT){
		complain_view_actionbar.height = '10%';
		main_view.height = '90%';
		main_view.top = '10%';
	}else{
		complain_view_actionbar.height = '15%';
		main_view.height = '85%';
		main_view.top = '15%';
	}
});
complain_back_icon.addEventListener('click',function(){
	complain_win.close();
});

complain_view_actionbar.add(complain_back_icon);
complain_view_actionbar.add(complain_title_label);
complain_win.add(complain_view_actionbar);



var table = Ti.UI.createTableView();
var url = 'http://172.16.129.180/pattani/complain.php';
var rowarr = [];
var client = Ti.Network.createHTTPClient({
	onload : function(){
		var json = JSON.parse(this.responseText);
		for(var i=0;i<json.info.length;i++){
			var info = json.info[i];
			if(info.reid==0){
				var row = Ti.UI.createTableViewRow({
					index : i
				});
				var view = Ti.UI.createView({
					backgroundColor : '#DFDFDF',
					width : '100%',
					height : 100,
					left : 0,
					borderColor : 'black',
					borderWidth : '0.5',
					index : i, 
				});
				var title_label = Ti.UI.createLabel({
					color : '#000',
					text : 'เรื่อง : '+info.title,
					top : 10,
					left : 10,
					index : i
				});
				var user_label = Ti.UI.createLabel({
					color : '#000',
					font : {fontSize : 12},
					text : 'โดย : '+info.sender,
					top : '80%',
					left : 10,
					index : i
				});
				var start_date_label = Ti.UI.createLabel({
					color : '#777',
					font : {fontSize : 8},
					text : 'วันที่ตั้งกระทู้ : '+info.date,
					top : '60%',
					right : 10,
					index : i
				});
				var modify_date_label = Ti.UI.createLabel({
					color : '#777',
					font : {fontSize : 8},
					text : 'วันที่ตอบล่าสุด : '+info.date_mod,
					top : '80%',
					right : 10,
					index : i
				});
				view.add(title_label);
				view.add(user_label);
				view.add(start_date_label);
				view.add(modify_date_label);
				row.add(view);
				rowarr.push(row);
			}
		}
		table.setData(rowarr);
		main_view.add(table);
		complain_win.add(main_view);
	}
});
client.open('GET',url);
client.send();
