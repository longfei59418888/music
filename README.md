# vueItems


### 一、音乐播放器（music）
 
#####  demo

http://119.29.192.69/#/find/index

##### 1.项目基本介绍
    
    前端主要技术 ： 
    
    vue2 + vue-router2 + axios + Vuex +webpack2 完成！
    
    项目中主要自己开发封装插件 ：
    
    actionSheet ( 下拉选项 )
    
    modal (页面出层)
    
    popup  (弹框)
    
    toast (提示框)
    
    upload (上传及其裁剪)
    
    item (列表项目操作)
    
    listItem (列表项目结构)
	
	table(pc表格列表)
	
	pagination(pc分页)
	
	popover(pc操作弹框)
	
	datepicker(pc的时间选择)
	
		参数 ：
		
		vModal ---   日期或者日期数组
		range  ---   设置是否是范围选择(vModal传数组)
		min  ---     最小日期
		max  ---     最大日期
	    time ---     是否可以选择时间 (传入时间)
		
		
	
	scroller(上拉加载/下拉刷新  移动pc兼容)
	   
	   参数 :
	   
	   touch  ---   	pc端是否可以拖拽(移动端默认可以)
	   refresh ---  	下拉刷新回调函数
	   infinite ---   	上拉加载回调函数
	   scroll  ---		滚动回调函数(e,position)

	   方法 ：
	   
	   finishInfinite(boolean) ---  结束上拉加载 (false:结束后可以执行下一次上拉加载,true:结束上拉加载)
	   finishRefresh	---   完成下拉刷新(可以等待下一次下拉刷新)
	

	
    
    后端 ： 
    
    express + mongdb + redis (数据主要来源酷我音乐网)
    
    打包：
    
    提出公共js文件  vendors.js   
    
    提出公共css文件并加版本号(使用的是css模块化开发)
    
    开发周期 ： 
    
    一个星期(7天左右)
    
    
###### 2.项目需要环境
    
    1.需要安装  node
    
    2.需要安装mongdb 和 redis
    
    3.确保 mongdb 和 redis 开启(端口号默认)
    
    
###### 3.开启项目
    
    1.进入项目目录执行
    
    npm install
    
    npm start (开启项目) (端口号 3331)
    
    npm built (发布项目)
    
    
    
    
    
    
    
    
    
    
    
    
    
    
