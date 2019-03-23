# 前端开发翻译器实现

----

### 简介

原则上所有要使用的数据，在使用前都要判断是否合法。从后端接口获取的数据，称为数据对象。我们认为，数据对象是用户无法识别的。所以要把数据对象转换为展示对象，也就是`view model`每一行记录，是一个对象，一页记录，就是一个对象集合。所以理论上标准写法就是遍历数据模型集合，生成展示对象集合。其中每一个数据对象转换为展示对象的过程，我们通常管它叫`convert`。在这个转换过程中，需要进行合法性判断和降级处理。合法性判断就是判断空、数据格式、类型检测之类的。降级就是，一旦数据异常，我们为了保证用户体验，保证数据不报错，尽量降级。

1. 从接口获取一个json数组
2. 定义一个展示对象
3. 通过循环数组，每次循环都new 一个定义的对象
4. 写一个convert方法，遍历数据模型json对象的数据，赋值给业务对象

```JavaScript
//引入jq文件
//https://code.juqery.com/jquery-3.1.1.min.js

var sexEnum = ['女', '男']

//业务对象
var Student = function(name, sex) {
	this.name = name;
	this.sex = sex;
}

//`convert`方法
var dataToStudent = function(data) {
	var paramName = '',
		paramSex = '';
		
	if (data.name) {//名字的合法判断
		paramName = data.name;
	} else {
		paramName = '名字未知';//名字降级
	}
	
	if (data.sex && (data.sex === 1 || data.sex === 0)) {//性别合法判断
		paramSex = sexEnum[data.sex];
	} else {
		paramSex = '男';//性别非法，降级为男
	}
	return new Student(paramName, paramSex);
}

$.ajax({
	url: '/data.json',
	type: 'GET',
	dataType: 'JSON',
	success: function(result) {
		//result 是数据对象
		var studentArray = new Array();
		
		if (result.data) {
			var dataArray = result.data,
				dataLength = dataArray.length;
			for(var i = 0; i < dataLength; i++) {
				var obj = dataToStudent(dataArray[i]);
				studentArray.push(obj);
			}
			console.log(studentArray);
		}
	}
});

```