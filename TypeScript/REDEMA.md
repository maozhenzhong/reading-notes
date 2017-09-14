# TypeScript

+ 支持 ***ES6*** 规范
+ 强大的IDE支持（类型检查、语法提示、重构[修改变量、方法、文件的修改]）
+ angular2的开发语言（angular2由TypeScript语言编写）

### TypeScript开发环境

+ 什么是compiler？为什么需要compiler？（）
+ 使用在线compiler开发
+ 使用本地compiler开发

```
npm install -g typescript //安装全局 typescript

tsc --version //查看typescript 版本
tsc hello //编译ts文件‘hello’为文件名
```

#### TypeScript 字符串用“\`\`”实现多行字符串

+ 多行字符床
+ 字符串模版
+ 自动拆分字符串

```TypeScript
//多行字符串
var a = `Hello
  word
  !
  `;

  //直接解析表达式
  var myName = "Mao zhenzhong";
  var getName = function(){
    return "Lin Wei";
  }

  console.log(`hello ${myName}`);
  console.log(`hello ${getName()}`);

  //多行字符串案例，字符串模版
  console.log(`<div>
    <h3>Title</h3>
    <span>Text</span>
    <button>Button</button>
    </div>`);

    function test(template, name, age){
        console.log(template);
        console.log(name);
        console.log(age);
    }

//自动拆分字符串案例
    var my_name = "Lin Wei";

    var getAge = function(){
      return 18;
    };
    test `Hello my name is ${my_name}, I'm ${getAge()}`;
```

### 参数的新特性

+ 参数类型：
  + 在参数名称后面使用冒号来指定参数的类型
+ 默认参数：
  + 在参数声明后面用等号来指定参数的默认值
+ 可选参数：
  + 在方法的参数声明后面用问号来标明此参数为可选参数

#### 参数类型：

```TypeScript
  var my_name: string = "Lin Wei"; //可以赋字符串

  var alias: any = 'text' //可以赋任何类型的值
  var age: number = 13; //可以赋数字
  var man: boolean = true; //可以赋布尔
  function test(): void{ //void不需要任何返回值

  }

  function test(): string { //字符串返回值
    return "";
  }

  function test(name: string): void{ //参数类型

  }

  class Person {
    name: string;
    age: number;
  }
var zhangsan: Person = new Person();

```

#### 参数默认值

```TypeScript
var my_name = string = "Lin Wei";
//带默认值的参数，写在最后
function test (a: string, b: string, c: string = 'test')
{
  console.log(a);
  console.log(b);
  console.log(c);
}

test('111','222','333');
test('x','y');
```

#### 可选参数

```TypeScript
var my_name = string = "Lin Wei";
//当可选参数未传值的时候，处理未传值参数的错误
//可选参数不能出现在必选参数的前面
function test (a: string, b?: string, c: string = 'test')
{
  console.log(a);
  console.log(b);
  console.log(c);
}

test('111','222','333');
test('x','y');
```

## 函数新特性

+ Rest and Spread 操作符：
  + 用来声明任意数量的方法参数；
+ generator 函数
  + 控制函数的执行过程，手工暂停和恢复代码执行(通过‘\*’来声明一个generator函数)
+ destructuring 析构函数表达式：
  + 通过表达式将对象或数组拆解成任意数量的变量



```TypeScript
//传任意数量参数的方法
  function fun1(...args){
    args.forEach(function (arg) {
      console.log(arg);
    });
  }

  fun1(1,2,3);
  fun1(2,3,4,5,6,7,);
//固定参数的个数
  function fun2(a, b, c)
  {
    console.log(a);
    console.log(b);
    console.log(c);
  }
```

```TypeScript
  function* doSomething(){
    console.log('start');
    yield;
    console.log('finish');
  }

var fun = doSomething();

fun.next();
fun.next();
```

```TypeScript
function* getStockPrice(stock){
  while(true){
    yield Math.random()* 100;
  }
}

var priceGenerator = getStockPrice('IBM');

var limitPrice = 15;
var price = 100;

while(price > limitPrice){
  price = priceGenerator.next().value;
  console.log(`the generator return ${price}`);
}

console.log(`buying at ${price}`);
```

```TypeScript
function getStock(){
  return {
    code: 'IBM',
    price: 100
  }
}

var stock = getStock();
var code = stock.code;
var price = stock.price;

//上面等价于下面,'{}'中的变量跟对象中的属性一致，如果跟本地不一致的情况下{通过对象，把对象中的值，拆分到本地变量中}
var {code, price} = getStock();

//可以这样实现
var {code: codex, price} = getStock();
console.log(codex);
console.log(price);

//拿到对象嵌套的属性
function getStock2(){
  return {
    code: 'IPHONE',
    price: {
      price1: 200,
      price2: 300
    }
  }
}
var {code: codex, price: {price2}} = getStock2();
console.log(codex);
console.log(price2);

//数组析构表达式
var array1 = [1,2,3,4];
var [num1, , num2] = array1;

//把数组中第一个值放在num1，第二个值放在num2中，剩下的放在others数组中
var [num1, num2,...others] = array1;

console.log(num1);
console.log(num2);
console.log(others);

var array2 = [2,3,4,5,6,7];

function doSomething([num1, num2, ...others]) {
  console.log(num1);
  console.log(num2);
  console.log(others);
}

doSomething(array2);
```

## 表达式和循环

+ 箭头表达式（（）=>,箭头表达式最大的优点是消除this关键字）
  + 用来声明匿名函数，消除传统匿名函数的this指针问题


```TypeScript
/*
* functino(){}的写法，由于是匿名函数，上下文是调用时的上下文，即window，因为window.name未定义，所以访问不到。箭头函数的上下文是由创建时所在的上下文决定的，在getStock()函数中创建，所以this之中指向getStock()，故可以访问到name属性。
* 不知道讲师是自己没理解，还是怎样，真正重点的东西就这么非常含糊的略过了，只说“它会帮你去消除传统匿名函数声明里面，this关键字所带来的问题”，箭头函数并不是用来替代function(){}的，两者对上下文的定义不同，个人更倾向于“箭头函数是对函数声明的一种补充”的说法
*/
//匿名函数
var sum = (arg1, arg2) => {
  return art1 + arg2;
}

//无参数
var sum = () => {
  console.log();
}

//有一个参数,省略圆括号，直接用参数名
var sum = arg => {
  console.log(arg);
}

var myArray = [1,2,3,4,5,6];

console.log(myArray.filter(value => value%2 === 0));

function getStock(name: string){
  this.name = name;
  setInterval(function(){
      console.log('Name is: ' + this.name);
    },1000);
}

var stock = new getStock('IPHONE');

function getStock3(name: string){
  this.name = name;

  setInterval(() => {
      console.log('name is : ' + this.name);
    },1000);
}
```
