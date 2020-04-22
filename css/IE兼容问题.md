# IE兼容问题

---

## 问题描述

IE8及以下版本浏览器不支持CSS3 media queries

## 解决办法

```
<!--[if lt IE 9]>
    <script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script>
<![endif]-->
```

* [respond.min.js](https://github.com/scottjehl/Respond)
* [jquery-placeholder](https://github.com/mathiasbynens/jquery-placeholder)

IE8兼容问题造成的原因有以下几处：

1. IE8及以下版本不支持CSS3 Media Queries媒体查询
	* 解决办法：网上找了一个兼容JS组建<a href="https://github.com/scottjehl/Respond">respond.min.js</a>引入资源解决媒体查询兼容问题（已完成）
2. IE8及以下对色值rgba()不识别，导致半透明背景色缺失
	* 解决办法：新增`compatible.css`兼容样式，将IE独有的样式独立编写，并使用ie hack引入该文件
3. IE8及以下对属性display:inline-block;不支持，导致样式错乱
	* 解决办法：将‘display:inline-block;’实现的样式修改为float实现。
4. IE8及以下对CSS3动画支持不好，导致用户体验错误
	* 解决办法：实现不了动画保证功能正常使用
5. IE8及以下对表单Placeholder属性支持不够，导致表单属性显示不正确
	* 解决办法：`jquery-placeholder.js` 实现支持placeholder
6. IE9及以下不支持`validator.js`，导致校验效果没显示
	* 解决办法：使用`jQuery Validation`替换。
7. 响应式样式调整
	* 解决办法：UI设计重新设计一个设计稿，根据设计调整样式。
8. mini 系统字体缺失微软雅黑解析异常问题
	* 解决办法：body增加苹果专用字体“PingFang”，使字体解析优雅降级
9. 火狐浏览器投诉建议表单字数监控样式错乱
	* 解决办法：兼容性问题，调整样式
