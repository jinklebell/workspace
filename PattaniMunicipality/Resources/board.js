var board_win = Ti.UI.currentWindow;
url = 'http://172.16.129.180/pattani/json.php';
var img_arr=[];

var pWidth = Ti.Platform.displayCaps.platformWidth;
var pHeight = Ti.Platform.displayCaps.platformHeight;

if (pWidth > pHeight) {
	var oriCurrent = 'landscape';
}else{
	var oriCurrent = 'portrait';    
}


var client = Ti.Network.createHTTPClient({
	onload : function(){
		var json = JSON.parse(this.responseText);
		var view_arr = [];
		var pWidth = Ti.Platform.displayCaps.platformWidth;
		var pHeight = Ti.Platform.displayCaps.platformHeight;
		
		

		if(json.resultset.length>0){
			for(var i=0;i<json.resultset.length;i++){
				var mydata = json.resultset[i];
				if(oriCurrent == 'portrait'){
					var person_img = Ti.UI.createImageView({
						image : 'http://172.16.129.180/pattani/'+mydata.struc_img,
						width : '60%',
						height : Ti.UI.SIZE,
						borderRadius : '200',
						top : '20%'
					});
				}else{
					var person_img = Ti.UI.createImageView({
						image : 'http://172.16.129.180/pattani/'+mydata.struc_img,
						height : '60%',
						width : Ti.UI.SIZE,
						borderRadius : '200',
						top : '10%'
					});
				}
				img_arr.push(person_img);
				
				Ti.Gesture.addEventListener('orientationchange',function(e){
					if(Ti.Gesture.orientation == Ti.UI.PORTRAIT){
						for(var j=0;j<json.resultset.length;j++){
							img_arr[j].width = '60%';
							img_arr[j].height = Ti.UI.SIZE;	
							img_arr[j].top = '20%';
						}
								
					}else{
						for(var j=0;j<json.resultset.length;j++){
							img_arr[j].height = '60%';
							img_arr[j].width = Ti.UI.SIZE;
							img_arr[j].top = '10%';
						}
					}
				});
				var name_label = Ti.UI.createLabel({
					text : mydata.struc_name+' '+mydata.struc_lastname,
					color : '#FFF',
					top : '80%',
					font : {fontSize : 20}
				});
				var role_label = Ti.UI.createLabel({
					text : mydata.struc_role,
					color : '#FFF',
					top : '90%',
					font : {fontSize : 20}
				});
				var view = Ti.UI.createView({
					backgroundColor : 'transparent',
					width : '100%',
					height : '100%',
					index : i,
				});
				view.add(person_img);
				view.add(name_label);
				view.add(role_label);
				view_arr.push(view);
				
			}
		}		
		
		if(oriCurrent == 'portrait'){
			var board_scroll = Ti.UI.createScrollableView({
				backgroundImage : '/Images/bg.png',
				views : view_arr,
				showPagingControl : true,
				height : '90%',
				width : Ti.UI.SIZE,
				top : '10%'
			});	
			var board_view_actionbar = Ti.UI.createView({
				backgroundColor : '#23BE94',
				width : '100%',
				height : '10%',
				top : 0,
				left : 0
			});		
		}else{
			var board_scroll = Ti.UI.createScrollableView({
				backgroundImage : '/Images/bg.png',
				views : view_arr,
				showPagingControl : true,
				height : '85%',
				width : Ti.UI.SIZE,
				top : '15%'
			});	
			var board_view_actionbar = Ti.UI.createView({
				backgroundColor : '#23BE94',
				width : '100%',
				height : '15%',
				top : 0,
				left : 0
			});			
		}
		var board_back_icon = Ti.UI.createImageView({
				image : '/Images/back_icon.png',
				height : '70%',
				width : Ti.UI.SIZE,
				left : 10
		});	
		var board_title_label = Ti.UI.createLabel({
			color : 'white',
			font : {fontSize : 20},
			textAlign : 'center',	
			text : 'คณะผู้บริหาร',
		});
		board_view_actionbar.add(board_back_icon);
		board_view_actionbar.add(board_title_label);
		board_win.add(board_view_actionbar);
		board_win.add(board_scroll);
		Ti.Gesture.addEventListener('orientationchange',function(e){
			if(Ti.Gesture.orientation == Ti.UI.PORTRAIT){
				board_scroll.height = '90%';
				board_scroll.width = Ti.UI.SIZE;
				board_scroll.top = '10%';	
				board_view_actionbar.height = '10%';
			}else{
				board_scroll.height = '85%';
				board_scroll.width = Ti.UI.SIZE;
				board_scroll.top = '15%';
				board_view_actionbar.height = '15%';;
			}
		});
		board_back_icon.addEventListener('click',function(){
			board_win.close();
		});
	}
});
client.open('GET',url);
client.send();

