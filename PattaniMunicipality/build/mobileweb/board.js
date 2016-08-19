var board_win = Ti.UI.currentWindow;
var label1 = Ti.UI.createLabel({
	color : '#F00',
	text : 'โครงสร้างบุคลากร',
	font : {fontSize :'100px'},
	top : 0,
});
board_win.add(label1);
url = 'http://172.16.129.180/pattani/json.php';
var img_arr=[];
var client = Ti.Network.createHTTPClient({
	onload : function(){
		var json = JSON.parse(this.responseText);
		var view_arr = [];
		var pWidth = Ti.Platform.displayCaps.platformWidth;
		var pHeight = Ti.Platform.displayCaps.platformHeight;
		
		if (pWidth > pHeight) {
		    var oriCurrent = 'landscape';
		} else {
		    var oriCurrent = 'portrait';    
		}

		if(json.resultset.length>0){
			for(var i=0;i<json.resultset.length;i++){
				var mydata = json.resultset[i];
				if(oriCurrent == 'portrait'){
					var person_img = Ti.UI.createImageView({
						image : 'http://172.16.129.180/pattani/'+mydata.struc_img,
						width : '40%',
						height : Ti.UI.SIZE,
						borderRadius : '200',
						top : 10
					});
				}else{
					var person_img = Ti.UI.createImageView({
						image : 'http://172.16.129.180/pattani/'+mydata.struc_img,
						height : '60%',
						width : Ti.UI.SIZE,
						borderRadius : '200',
						top : 10
					});
				}
				img_arr.push(person_img);
				
				Ti.Gesture.addEventListener('orientationchange',function(e){
					if(Ti.Gesture.orientation == Ti.UI.PORTRAIT){
						for(var j=0;j<json.resultset.length;j++){
							img_arr[j].width = '40%';
							img_arr[j].height = Ti.UI.SIZE;		
							//alert(person_img.width);
						}
								
					}else{
						for(var j=0;j<json.resultset.length;j++){
							img_arr[j].height = '60%';
							img_arr[j].width = Ti.UI.SIZE;
							//alert(person_img.height);
						}
					}
				});
				var name_label = Ti.UI.createLabel({
					text : mydata.struc_name+' '+mydata.struc_lastname,
					color : '#000',
					top : '70%',
					font : {fontSize : '50px'}
				});
				var role_label = Ti.UI.createLabel({
					text : mydata.struc_role,
					color : '#000',
					top : '80%',
					font : {fontSize : '50px'}
				});
				var view = Ti.UI.createView({
					backgroundColor : 'white',
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
				views : view_arr,
				showPagingControl : true,
				height : '40%',
				width : Ti.UI.SIZE,
				top : '15%'
			});			
		}else{
			var board_scroll = Ti.UI.createScrollableView({
				views : view_arr,
				showPagingControl : true,
				height : '60%',
				width : Ti.UI.SIZE,
				top : '20%'
			});				
		}

		board_win.add(board_scroll);
		Ti.Gesture.addEventListener('orientationchange',function(e){
			if(Ti.Gesture.orientation == Ti.UI.PORTRAIT){
				board_scroll.height = '40%';
				board_scroll.width = Ti.UI.SIZE;
				board_scroll.top = '15%';	
			}else{
				board_scroll.height = '60%';
				board_scroll.width = Ti.UI.SIZE;
				board_scroll.top = '20%';
			}
		});
	}
});
client.open('GET',url);
client.send();

