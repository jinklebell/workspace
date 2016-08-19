var index_win =Ti.UI.currentWindow;
var news_win = Ti.UI.createWindow({
	backgroundColor : '#DFDFDF',
	theme : 'Theme.AppCompat.NoTitleBar.Fullscreen',
	touchEnabled : false,
	url : 'news.js'
});
var board_win = Ti.UI.createWindow({
	backgroundColor : '#DFDFDF',
	theme : 'Theme.AppCompat.NoTitleBar.Fullscreen',
	touchEnabled : false,
	url : 'board.js'
});

var complain_win = Ti.UI.createWindow({
	backgroundColor : '#DFDFDF',
	theme : 'Theme.AppCompat.NoTitleBar.Fullscreen',
	touchEnabled : false,
	url : 'complain.js'
});
// --------------------------------------- check screen orientation ----------------------------------------------------
var pWidth = Ti.Platform.displayCaps.platformWidth;
var pHeight = Ti.Platform.displayCaps.platformHeight;

if (pWidth > pHeight) {
    var oriCurrent = 'landscape';
} else {
    var oriCurrent = 'portrait';    
}
// ---------------------------------------------------------------------------------------------------------------------

if(oriCurrent == 'portrait'){
	var logo = Ti.UI.createImageView({
		image : '/Images/logo.png',
		width : '70%',
		height : Ti.UI.SIZE,
		top : 10,
		left : 10
	});
	
	var news_img = Ti.UI.createImageView({
		image : 'Images/news.png',
		width : '40%',
		height : Ti.UI.SIZE,
		top : '20%'
	});
	var board_img = Ti.UI.createImageView({
		image : 'Images/board.png',
		width : '40%',
		height : Ti.UI.SIZE,
		top : '45%'
	});
	var complain_img = Ti.UI.createImageView({
		image : 'Images/complain.png',
		width : '40%',
		height : Ti.UI.SIZE,
		top : '70%'
	});
}else{
	var logo = Ti.UI.createImageView({
		image : '/Images/logo.png',
		width : '40%',
		height : Ti.UI.SIZE,
		top : 10,
		left : 10
	});
	var news_img = Ti.UI.createImageView({
		image : 'Images/news.png',
		width : '30%',
		height : Ti.UI.SIZE,
		top : '30%',
		left : 0
	});
	var board_img = Ti.UI.createImageView({
		image : 'Images/board.png',
		width : '30%',
		height : Ti.UI.SIZE,
		top : '30%',
		left : '35%'
	});
	var complain_img = Ti.UI.createImageView({
		image : 'Images/complain.png',
		width : '30%',
		height : Ti.UI.SIZE,
		top : '30%',
		left : '70%'
	});
}
index_win.add(logo); 
index_win.add(news_img);
index_win.add(board_img);
index_win.add(complain_img);
var website_label = Ti.UI.createLabel({
	color : '#000',
	text : 'Go to website',
	bottom : 10,
	right : 10
});

Ti.Gesture.addEventListener('orientationchange',function(e){
	if(Ti.Gesture.orientation == Ti.UI.PORTRAIT){
		logo.width = '70%';
		logo.height = Ti.UI.SIZE;
		news_img.width ='40%';
		news_img.height =Ti.UI.SIZE;
		news_img.top = '20%';
		news_img.left = '30%';
		board_img.width ='40%';
		board_img.height =Ti.UI.SIZE;
		board_img.top = '45%';
		board_img.left = '30%';
		complain_img.width ='40%';
		complain_img.height =Ti.UI.SIZE;
		complain_img.top = '70%';	
		complain_img.left = '30%';
	}
	else{
		logo.width = '40%';
		logo.height = Ti.UI.SIZE;
		news_img.width ='30%';
		news_img.height =Ti.UI.SIZE;
		news_img.top = '30%';
		news_img.left = 0;
		board_img.width ='30%';
		board_img.height =Ti.UI.SIZE;
		board_img.top = '30%';
		board_img.left = '35%';
		complain_img.width ='30%';
		complain_img.height =Ti.UI.SIZE;
		complain_img.top = '30%';
		complain_img.left = '70%';	
	}
});
website_label.addEventListener('click',function(){
	Titanium.Platform.openURL('http://obt.endutot.com/');
});
index_win.add(website_label);

board_img.addEventListener('click',function(){
	board_win.open();
});

