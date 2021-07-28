//引入express和path模块
var express=require("express");
var path=require("path");
var fs=require("fs");//文件模块


var app=express();//创建express
app.listen(6080);//监听6080端口
global.gameFood="10000";
global.gameGold="10000";
app.use("/",express.static(path.join(process.cwd(),"www_root")));//使用当前文件所在目录的www_root作为服务器根目录
app.get("/uploadData",function(req,res){//注册一个get请求，当服务器收到get请求后，客户端就会到http://127.0.0.1:6080/uploadData这个路径下找相应的数据
	//console.log(req.query);//req.query的意思是，获取客户端在填写get的地址时，'?'问号后面的数据,其中query是查询的意思{举例：http://127.0.0.1:6080/uploadData?user=wonkmy&pwd=123456}    这样控制台输出为{ user: 'wonkmy', pwd: '123456' }
	//var tempScore=req.query.gameScore==null?global.gameScore:req.query.gameScore;
	global.gameFood=req.query.gameFood==null?global.gameFood:req.query.gameFood;
	global.gameGold=req.query.gameGold==null?global.gameGold:req.query.gameGold;
	console.log("食物还有:"+global.gameFood);
	console.log("黄金还有:"+global.gameGold);
	res.send("gameFood:"+global.gameFood+"|"+"gameGold:"+global.gameGold);
});

app.put("/uploadData",function(req,res){//服务器接收到客户端的put响应后
	//打开一个文件
	console.log(req.query);
	var fd=fs.openSync("./uploadFileDB/"+req.query.uploadname+".png","w");//w 的意思是以写的模式打开，注意：这里文件的路径和文件名已经写死
	req.on("data",function(data){//监听“data”事件
		//把数据写入到文件中去
		fs.write(fd,data,0,data.length,function(){});
	});
	
	req.on("end",function(){//监听“end”事件
		res.send("zhongbiao文件上传成功");
		fs.close(fd,function(){})
	})
});