# doT.js语法

---

## 目录

+ [doT.js仓库](#description)
+ [doT.js优势](#characteristic)
+ [doT.js语法](#grammar)
+ [doT.js使用注意](#note)
+ [doT.js使用方式](#use)
+ [doT.js示例](#example)

<span id="description"></span>
## doT.js仓库

[仓库官网](https://github.com/olado/doT)

<span id="characteristic"></span>
## doT.js 优势

+ 小巧精简，源代码不超过两百行，6KB的大小，压缩版只有4KB；
+ 支持表达式丰富，涵盖几乎所有应用场景的表达式语句；
+ 性能优秀
+ 不依赖第三方库

<span id="grammar"></span>
## doT.js语法

+ 插值  
	+ `{{=it.xxx }}`
+ 取值  
	+ `{{=xxx }}` 插值和取值差不多，取值一般用于for循环中，取值不用加it
+ JS运算  
	+ `{{...}}` 可以放js表达式，如for循环
+ 遍历数组  
	+ `{{~it.array :value:index}} ...{{~}}`
+ 遍历对象  
	+ `{{ for var key in data { }}`
	+ `{{= key }}`
	+ `{{ } }}`
+ 三木运算  
	+ `{{=(it.value=='somevalue'?'value1':'value2')}}` 常用于动态添加某个类名
+ 条件判断  
	+ `{{? }}` 表 if
	+ `{{??}}` 表 else if
	+ `{{??}}` 表 else
	+ exapmle:

```
//template
{{? it.name }}
<div>Oh, I love your name, {{=it.name}}!</div>
{{?? it.age === 0}}
<div>Guess nobody named you yet!</div>
{{??}}
You are {{=it.age}} and still don't have a name?
{{?}}
//data
{"name":"Jake","age":31}
```

+ encoding后再插值
	+ `{{!it.xxx}}` 
+ 编译时取值
	+ `{{# }}` for compile-time evaluation/includes and partials
+ 编译时定义 
	+ {{## #}} for compile-time defines

<span id="note"></span>
## doT.js使用注意

+ <font color=#ff5b05 >双括号中的前缀，如'?',"~","#"等要紧挨左边的双括号，不能有空格，这些前缀后面的表达式与前缀之间有没有空格无所谓；</font>
+ <font color=#ff5b05 >条件判断和数组遍历语法要有对应的结束符，如{{?it.xxx}}{{?}},
{{~it.array :value:index}}{{~}}</font>

<span id="note"></span>
## doT.js使用方式

+ 引入dot.js;
+ render=doT.template(tpl),这一步返回一个函数;
+ domString=render(data),这一步返回dom的string形式;
+ xxx.innerHTML=domString;


<span id="#example"></span>
## doT.js示例
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Test doT.js</title>
</head>
<body>
    <div id="content"></div>
    <template id="tmpl">
        {{ for(var prop in it) { }}
            <div>{{=prop}}</div>
        {{ } }}
    </template>
    <script src='doT.js'></script>
    <script>
        var data={"name":"Jake","age":31,"mother":"Kate","father":"John","interests":["basketball","hockey","photography"],"contact":{"email":"jake@xyz.com","phone":"999999999"}};
        var tmpl=document.getElementById('tmpl');
        var rendered=doT.template(tmpl.innerHTML)(data);
        var content=document.getElementById('content');
        content.innerHTML=rendered;
    </script>
</body>
</html>

//实例2：编译时定义与取值
<html>
    <head>

    <script id="headertmpl" type="text/x-dot-template">
        <h1>{{=it.title}}</h1>
    </script>

    <script id="pagetmpl" type="text/x-dot-template">
        <h2>Here is the page using a header template</h2>
        {{#def.header}}
        {{=it.name}}
    </script>

    <script id="customizableheadertmpl" type="text/x-dot-template">
         {{#def.header}}
         {{#def.mycustominjectionintoheader || ''}}
     </script>

    <script id="pagetmplwithcustomizableheader" type="text/x-dot-template">
        <h2>Here is the page with customized header template</h2>
        {{##def.mycustominjectionintoheader:
            <div>{{=it.title}} is not {{=it.name}}</div>
        #}}
        {{#def.customheader}}
        {{=it.name}}
    </script>

    <script src="./doT.js" type="text/javascript"></script>
    </head>

    <body>
        <div id="content"></div>
        <div id="contentcustom"></div>
    </body>

    <script type="text/javascript">
        var def = {
            header: document.getElementById('headertmpl').text,
            customheader: document.getElementById('customizableheadertmpl').text
        };
        var data = {
            title: "My title",
            name: "My name"
        };

        var pagefn = doT.template(document.getElementById('pagetmpl').text, undefined, def);
        document.getElementById('content').innerHTML = pagefn(data);

        pagefn = doT.template(document.getElementById('pagetmplwithcustomizableheader').text, undefined, def);
        document.getElementById('contentcustom').innerHTML = pagefn(data);

    </script>

</html>
```
