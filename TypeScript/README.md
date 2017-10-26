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

+ forEach() for in and for of


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

```TypeScript
//忽略掉属性
  var myArray = [1,2,3,4];

  myArray.desc = 'four number';

  myArray.forEach(value => console.log(value));
```

```TypeScript
//显示属性
  var myArray = [1,2,3,4];

  myArray.desc = 'four number';

  for(var i in myArray)
  {
    console.log(i);
    console.log(myArray[i]);
  }
```

```TypeScript
//忽略掉属性，可以打断循环
  var myArray = [1,2,3,4];

  myArray.desc = 'four number';

  for(var i of myArray)
  {
    if(i > 2) break;
    console.log(i);
    console.log(myArray[i]);
  }
```

## 面向对象的特性

+ 类（Class）
  + 类是TypeScript的核心，使用TypeScript开发时，大部分代码都是写在类里面的。
+ 泛型（generic）
  + 参数化的类型，一般用来限制集合的内容
+ 接口（Interface）
  + 用来建立某种代码约定，使得其它开发者在调用某个方法或创建新的类时，必须遵循接口所定义的代码约定。
+ 模块（Module）
  + 模块可以帮助开发者将代码分割为可重用的单元。开发者可以自己决定将模块中的哪些资源（类、方法、变量）暴露出去供外部使用，哪些资源只在模块内使用。
+ 注解（annotation）
  + 注解为程序的元素（类、方法、变量）加上更直观更明了的说明，这些说明信息与程序的业务逻辑无关，而是供指定的工具或框架使用的。
+ 类型定义文件（\*.d.ts）
  + 类型定义文件用来帮助开发者在TypeScript中使用已有的JavaScript的工具包。如：JQuery


```TypeScript
class Person {
  name;

  eat(){
    console.log('Im eating');
  }
}

var person1 = new Person();
person1.name = 'Batman';
person1.eat();

var person2 = new Person();
person2.name = 'Superman';
person2.eat();
```

```TypeScript
//访问控制符

／**
* public //可以在类的外部访问
* private //只能在累的内部访问
* protected //受保护的，只能在类的内部，和类的子类中访问
*／

class Person {
  public name;
  private age;
  protected sayHi: function (){

  }
}
```

```TypeScript

//类的构造函数

／**
*
*
*／

class Person {
  //构造函数不能在外部访问，在实例化一个类的时候必须为它指定一个属性值
  constructor(public name: string) {
    this.name = name;
  }

  eat(){
    console.log(this.name);
  }
}

//类的继承 extends, super
class Employee extends Person {
  public code: string;

  constructor (name: string, code: string){
    super(name);
    this.code = code;
  }

  public work(){

  }
}

var e = new Employee('Lin Wei', 1);
e.eat();
e.code;
e.work();

//尖括号中的Person是指定数组只能放该类中的值，不能放其他值。
var workers: Array<Person> = [];
workers[0] = new Person('Zhangsan');
workers[1] = new Employee('Lisi', '2');

//接口 方法参数的声明

interface IPerson {
  name: string;
  age: number;
}

class Person() {
  constructor(public config: IPerson){

  }
}

var p1 = new Person({
  name: 'Zhangsan',
  age: 18
  });

//接口 声明方法,必须实现接口的属性，和方法
interface Animal{
  eat();
}

class Sheep implements Animal {
  eat(){
    console.log('I eat grass');
  }
}

class Tiger implements Animal {
  eat(){
    console.log('I eat meat');
  }
}

//模块（Module）export import
```TypeScript
//export 对外暴露数据
//
//a.ts
export var prop1;
var prop2;

export function func()
{

}

function func2()
{

}

export class c1 {

}

class c2 {

}

//b.ts
import {prop1} from '.a';
console.log(prop1);


```
