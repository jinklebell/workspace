var index_win=Ti.UI.currentWindow,board_win=Ti.UI.createWindow({backgroundColor:"#DFDFDF",theme:"Theme.AppCompat.NoTitleBar.Fullscreen",touchEnabled:!1,url:"board.js"}),news_win=Ti.UI.createWindow({backgroundColor:"#DFDFDF",theme:"Theme.AppCompat.NoTitleBar.Fullscreen",touchEnabled:!1,url:"news.js"}),complain_win=Ti.UI.createWindow({backgroundColor:"#DFDFDF",theme:"Theme.AppCompat.NoTitleBar.Fullscreen",touchEnabled:!1,url:"complain.js"}),pWidth=Ti.Platform.displayCaps.platformWidth,pHeight=Ti.Platform.displayCaps.platformHeight;if(pWidth>pHeight)var oriCurrent="landscape";else var oriCurrent="portrait";if("portrait"==oriCurrent)var logo=Ti.UI.createImageView({image:"/Images/logo.png",width:"70%",height:Ti.UI.SIZE,top:10,left:10}),news_img=Ti.UI.createImageView({image:"Images/news.png",width:"40%",height:Ti.UI.SIZE,top:"20%"}),board_img=Ti.UI.createImageView({image:"Images/board.png",width:"40%",height:Ti.UI.SIZE,top:"45%"}),complain_img=Ti.UI.createImageView({image:"Images/complain.png",width:"40%",height:Ti.UI.SIZE,top:"70%"});else var logo=Ti.UI.createImageView({image:"/Images/logo.png",width:"40%",height:Ti.UI.SIZE,top:10,left:10}),news_img=Ti.UI.createImageView({image:"Images/news.png",width:"30%",height:Ti.UI.SIZE,top:"30%",left:0}),board_img=Ti.UI.createImageView({image:"Images/board.png",width:"30%",height:Ti.UI.SIZE,top:"30%",left:"35%"}),complain_img=Ti.UI.createImageView({image:"Images/complain.png",width:"30%",height:Ti.UI.SIZE,top:"30%",left:"70%"});index_win.add(logo),index_win.add(news_img),index_win.add(board_img),index_win.add(complain_img),Ti.Gesture.addEventListener("orientationchange",function(i){Ti.Gesture.orientation==Ti.UI.PORTRAIT?(logo.width="70%",logo.height=Ti.UI.SIZE,news_img.width="40%",news_img.height=Ti.UI.SIZE,news_img.top="20%",news_img.left="30%",board_img.width="40%",board_img.height=Ti.UI.SIZE,board_img.top="45%",board_img.left="30%",complain_img.width="40%",complain_img.height=Ti.UI.SIZE,complain_img.top="70%",complain_img.left="30%"):(logo.width="40%",logo.height=Ti.UI.SIZE,news_img.width="30%",news_img.height=Ti.UI.SIZE,news_img.top="30%",news_img.left=0,board_img.width="30%",board_img.height=Ti.UI.SIZE,board_img.top="30%",board_img.left="35%",complain_img.width="30%",complain_img.height=Ti.UI.SIZE,complain_img.top="30%",complain_img.left="70%")}),board_img.addEventListener("click",function(){board_win.open()}),news_img.addEventListener("click",function(){news_win.open()}),complain_img.addEventListener("click",function(){complain_win.open()});