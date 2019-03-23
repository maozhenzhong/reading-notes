# 文件命名规范（File naming convention）

---

## 简介

Web前端开发规范：文件命名规范

## 文件命名规则

### 驼峰式命名法介绍
+ Pascal Case 大驼峰式命名法：首字母大写。eg：StudentInfo、UserInfo、ProductInfo
+ Camel Case 小驼峰式命名法：首字母小写。eg：studentInfo、userInfo、productInfo

### 文件资源命名

+ 统一用小写的英文字母，数字和下划线组成，
+ 不得包含汉字、空格和特殊字符。

### 索引文件的命名规则

+ index.tpl
+ index.html
+ index.php
+ index.jsp


### 各个子页面的命名规则

1. 统一用英文命名
2. 如果文件过长，提前约定好一份缩写的规范，如pro-product

**例如：**

+ 首页--index
+ 产品
	+ 列表--proList
	+ 产品详情--proDetail
+ 新闻
	+ 列表--newsList
	+ 新闻详情--newsDetail
	+ 新闻编辑--newsEdit
	+ 新闻信息--newsInfo
	+ 新闻报告--newsReport
+ 发展历史--history
+ 关于我们--aboutUs
+ 联系我们--linkus/contactus
+ 信息反馈--feedback
+ 留言--leaveAMessage

### 图片命名规范

图片的名称分为头尾两部分，用下划线隔开，头部表示此图片的大类性质，例如广告、标志、菜单、按钮等。

+ banner：放置在页面顶部的广告，装饰图案等长方形的图片
+ logo：标志性的图片
+ button：在页面上位置不固定，并且带有链接的小图片。
+ menu：在页面中某一位置连续出现，性质相同的链接栏目的图片。
+ pic：装饰用的图片

### 变量命名

+ 命名方式 : 小驼峰式命名方法 
+ 命名规范 : 类型+对象描述的方式，如果没有明确的类型，就可以使前缀为名词

|    类型   |   小写字母   |
|:--------:|:-----------:|
| array    | a           |
| boolean  | b           |
| function | fn          |
| int      | i           |
| object   | o           |
| regular  | r           |
| string   | s           |

### 函数

+ 命名方式 : 小驼峰方式 ( 构造函数使用大驼峰命名法 ) 
+ 命名规则 : 前缀为动词

| 动词 | 含义 | 返回值 |
|:---:|:----:|:----:|
| can | 判断是否可执行某个动作 ( 权限 ) | 函数返回一个布尔值。true：可执行；false：不可执行|
| has | 判断是否含有某个值 | 函数返回一个布尔值。true：含有此值；false：不含有此值 |
| is  | 判断是否为某个值 | 函数返回一个布尔值。true：为某个值；false：不为某个值|
| get | 获取某个值 | 函数返回一个非布尔值 |
| set | 设置某个值 | 无返回值、返回是否设置成功或者返回链式对象 |

 