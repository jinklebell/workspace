var news_win = Ti.UI.currentWindow;
var news_detail_win = Ti.UI.createWindow({
	backgroundColor : '#DFDFDF',
	theme : 'Theme.AppCompat.NoTitleBar.Fullscreen',
	touchEnabled : false,
});
var url = 'http://172.16.129.180/pattani/title_news.php';
var table = Ti.UI.createTableView();
var main_table = Ti.UI.createTableView();
var rowarr = [];

var client = Ti.Network.createHTTPClient({
	onload : function(){
		var json = JSON.parse(this.responseText);
		
		// --------------------------------------- check screen orientation ----------------------------------------------------

		var pWidth = Ti.Platform.displayCaps.platformWidth;
		var pHeight = Ti.Platform.displayCaps.platformHeight;
		
		if (pWidth > pHeight) {
		    var oriCurrent = 'landscape';
		} else {
		    var oriCurrent = 'portrait';    
		}
		
		// ---------------------------------------------------------------------------------------------------------------------
		
		var isToggled = false;
		if(oriCurrent == 'portrait'){
			var animateLeft	= Ti.UI.createAnimation({
				left: '60%',
				duration: 500
			});
			var animateRight	= Ti.UI.createAnimation({
				left: 0,
				duration: 500
			});
			var main_view = Ti.UI.createView({
				backgroundColor : '#E6E6E6',
				width : '100%',
				height : '90%',
				top : '10%',
				left : 0,
			});
			var view_actionbar = Ti.UI.createView({
				backgroundColor : '#23BE94',
				width : '100%',
				height : '10%',
				top : 0,
				left : 0
			});
			
			var slide_menu_view = Ti.UI.createView({
				backgroundColor : '#484848',
				width : '60%',
				height : '100%',
				left : 0,
				top : '10%',
			});
			var view_empty = Ti.UI.createView({
				backgroundColor : '#484848',
				width : '60%',
				height : '10%',
				top : 0,
				left : 0
			});
		}else{
			var animateLeft	= Ti.UI.createAnimation({
				left: '40%',
				duration: 500
			});
			var animateRight	= Ti.UI.createAnimation({
				left: 0,
				duration: 500
			});
			var main_view = Ti.UI.createView({
				backgroundColor : '#E6E6E6',
				width : '100%',
				height : '85%',
				top : '15%',
				left : 0,
			});
			var view_actionbar = Ti.UI.createView({
				backgroundColor : '#23BE94',
				width : '100%',
				height : '15%',
				top : 0,
				left : 0
			});
			var slide_menu_view = Ti.UI.createView({
				backgroundColor : '#484848',
				width : '60%',
				height : '100%',
				left : 0,
				top : '15%',
			});
			var view_empty = Ti.UI.createView({
				backgroundColor : '#484848',
				width : '60%',
				height : '15%',
				top : 0,
				left : 0
			});		
		}
		Ti.Gesture.addEventListener('orientationchange',function(e){
			if(Ti.Gesture.orientation == Ti.UI.PORTRAIT){
				isToggled = false;
				animateLeft.left = '60%';
				main_view.top = '10%';
				main_view.left = 0;
				main_view.height = '90%';
				view_actionbar.height = '10%';
				view_actionbar.left =0;
				slide_menu_view.top = '10%';
				view_empty.height = '10%';
			}else{
				isToggled = false;
				animateLeft.left = '40%';
				main_view.top = '15%';
				main_view.left = 0;
				main_view.height = '85%';
				view_actionbar.height = '15%';
				view_actionbar.left =0;
				slide_menu_view.top = '15%';
				view_empty.height = '15%';
			}
		});
		var home_icon = Ti.UI.createImageView({
			image : '/Images/home.png',
			height : '70%',
			width : Ti.UI.SIZE,
			left : 10
		});
		var back_label = Ti.UI.createLabel({
			text : 'กลับสู่หน้าหลัก',
			color : 'white',
			left : 70
		});
		var title_label = Ti.UI.createLabel({
			color : 'white',
			font : {fontSize : 20},
			text : 'ข่าว',
			textAlign : 'center',		
		});
		var menu_icon = Ti.UI.createImageView({
				image : '/Images/menu.png',
				left : 10,
				height : '70%',
			});
		view_empty.addEventListener('click',function(){
			news_win.close();
			isToggled = false;
			main_view.left = 0;
			view_actionbar.left =0;
		});
		menu_icon.addEventListener('click',function(e){
			
			if( !isToggled ){
				main_view.animate(animateLeft);	
				view_actionbar.animate(animateLeft);
				isToggled = true;
			} else {
				main_view.animate(animateRight);
				view_actionbar.animate(animateRight);
				isToggled = false;
			}
		});
		for(var i=0;i<json.menu.length;i++){
			var mydata = json.menu[i];
			var row = Ti.UI.createTableViewRow({
				index : mydata.id,
				text_index : mydata.title 
			});
			var view = Ti.UI.createView({
				backgroundColor : '#484848',
				width : '100%',
				height : 50,
				left : 0,
				index : mydata.id	,
				text_index : mydata.title 
			});
			var label = Ti.UI.createLabel({
				color : 'white',
				text : mydata.title,
				left : 40,
				index : mydata.id,
				text_index : mydata.title 
			});
			var list_icon = Ti.UI.createImageView({
				image : '/Images/list_icon.png',
				height : '50%',
				left : 10,
				index : mydata.id,
				text_index : mydata.title 
			});
			view.add(label);
			view.add(list_icon);
			row.add(view);
			rowarr.push(row);
			
			view.addEventListener('click',function(e){
			var main_rowarr=[];
			var html_detail =[];
				for(var j=0;j<json.news.length;j++){
					var detail = json.news[j];
					html_detail.push(detail.detail);
					if(e.source.index == detail.reference){
						var main_row = Ti.UI.createTableViewRow({
							text_title : e.source.text_index,	
							index : j			
						});
						var main_bgview = Ti.UI.createView({
							background : '#484848',
							width : '100%',
							height : 100,
							left : 0,
							borderColor : 'black',
							borderWidth : '0.5',
							text_title : e.source.text_index,
							index : j
						});
						var main_label = Ti.UI.createLabel({
							color : 'black',
							text : detail.title,
							top : 10,
							left : 10,
							text_title : e.source.text_index,
							index : j
						});	
						var main_date_label = Ti.UI.createLabel({
							color : '#777',
							text : detail.start_date.slice(0,10),
							bottom : 10,
							right : 10,
							text_title : e.source.text_index,
							index : j
						});									
						main_bgview.add(main_label);
						main_bgview.add(main_date_label);
						main_row.add(main_bgview);
						main_rowarr.push(main_row);
						main_bgview.addEventListener('click',function(e){
							var detail_view_actionbar = Ti.UI.createView({
								backgroundColor : '#23BE94',
								width : '100%',
								height : '10%',
								top : 0,
								left : 0
							});
							var back_icon = Ti.UI.createImageView({
								image : '/Images/back_icon.png',
								height : '70%',
								width : Ti.UI.SIZE,
								left : 10
							});
							var detail_title_label = Ti.UI.createLabel({
								color : 'white',
								font : {fontSize : 20},
								textAlign : 'center',	
								text : e.source.text_title,
							});
							var detail_webview = Ti.UI.createWebView({
								html : html_detail[e.source.index],
								top : '10%',
								height : '90%',
								width : '100%'
							});							
							
							
							back_icon.addEventListener('click',function(){
								news_detail_win.close();
							});
							detail_view_actionbar.add(detail_title_label);
							detail_view_actionbar.add(back_icon);
							news_detail_win.add(detail_view_actionbar);
							news_detail_win.add(detail_webview);
							news_detail_win.open();
						});
					}
				}
				main_table.setData(main_rowarr);
				main_view.add(main_table);
				isToggled = false;
				main_view.animate(animateRight);
				view_actionbar.animate(animateRight);
				title_label.text = e.source.text_index;
			});
			
		}
		table.setData(rowarr);
		view_empty.add(back_label);
		view_empty.add(home_icon);
		slide_menu_view.add(table);
		news_win.add(slide_menu_view);
		view_actionbar.add(menu_icon);
		view_actionbar.add(title_label);
		news_win.add(view_empty);
		news_win.add(view_actionbar);
		news_win.add(main_view);
		
		
	// -------------------------------------------------------------------------------------------	
	
		
		
	}
});
client.open('GET',url);
client.send();

