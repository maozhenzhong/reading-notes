# python 学习笔记

---

## pythod 环境变量配置

```bash
sudo launchctl load -w /System/Library/LaunchDaemons/ssh.plist
sudo launchctl list |grep ssh
```

## 基本操作

### 进入python3

```
python3
```

### 退出命令

```
exit() // control + d 快捷键
```

## Python字符串

```python
>>> ord('A') # 函数获取自负的整数表示
65
>>> ord('毛')
27611
>>> chr(66) # 函数把编码转换为对应的字符
'B'
>>> chr(25391)
'振'
```

由于Python的字符串类型是`str`，在内存中以Unicode表示，一个字符对应若干个字节。如果要在网络上传输，或者保存到磁盘上，就要把`str`变为以字节为单位的`bytes`。Python对`bytes`类型的数据用b前缀的单引号或双引号表示：

```python
>>> x = b'ABC'
>>> 'ABS'. encode('ascii') # 以Unicode表示的`str`通过encode()方法可以编码为指定的`bytes`
```

```python
>>> b'ABS'.decode('ascii') # 要把`bytes`变为`str`，就要用`decode()`方法
'ABS'
```

```python
>>> b'\xe4\xb8\xad\xff'.decode('utf-8', errors='ignore') # 如果`bytes`中只有一小部分无效的字节，可以传入`errors='ignore'`忽略错误的字节
'中'
```

```python
>>> len('ABS') # 计算`str`包含多少字符，可以用`len()`函数
3
>>> len(b'ABS') # 计算字节数
3
```

文件开头写上以下两行，Python解释器读取源代码时候，就可以按UTF-8编码读取

```python
# xxx.py

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
```

第一行注释告诉Linux/OS X系统，这是一个Python可执行程序，Windows系统回忽略这个注释

第二行注释是为了告诉Python解释器，按照UTF-8编码读取源代码，否则，你再源代码中写的中文输出可能会有乱码。


### 字符串格式化

常见的占位符，`%`运算符就是用来格式化字符串的

|  占位符  |   替换内容    |
|:-------:|:------------:|
|    %d   |   整数        |
|    %f   |   浮点数      |
|    %s   |   字符串      |
|    %x   |   十六进制整数 |

## 列表 

### List 有序列表

append()往list中追加元素到末尾

```
>>> classMates = ['苹果', '香蕉', '梨']
>>> classMates
['苹果', '香蕉', '梨']
>>> classMates.append('哈密瓜')
>>> classMates
['苹果', '香蕉', '梨', '哈密瓜']
```

`insert()` 把元素插入到指定的位置，比如索引号为'1'的位置

```python
>>> classMates.insert(1, '弥胡桃')
>>> classMates
['苹果', '弥胡桃', '香蕉', '梨', '哈密瓜']
```

`pop()`删除list末尾的元素,要删除指定位置的元素，用pop(i)方法

```python
>>> classMates.pop()
['苹果', '弥胡桃', '香蕉', '梨']
```

### tuple 元组，一旦初始化就不能修改

## 条件判断

```python
if <条件判断1>:
	<执行1>
elif <条件判断2>:
	<执行2>
elif <条件判断3>:
	<执行3>
else: 
	<执行4>
```

### BMI值，BMI指数是–个用高度及重量，计算出是否正常、超重及肥胖。

体质指数（BMI）=体重（kg）÷ 身高²（m）

### BMI指标

* 女性 男性
* 一般体重 18.5到24.9之间
* 理想体重 22到24
* 超重 25到29.9之间
* 极度超重 30到39.9之间
* 严重超重 40以上

### 成人BMI数值

* 轻体重：BMI<18.5
* 健康体重：18.5<=BMI<24
* 超重：24<=BMI<28
* 肥胖：28<=BMI
* 最理想的体重指数是22

## 循环

```python
>>> names = ['Michael', 'Bob', 'Tracy']
>>> for name in names:
... 	print(name)
Michael
Bob
Tracy
```

`range()`可以生成一个整数序列，再通过`list()`函数可以转换为list

## dict 和 set

### dict

`dict` 全称 `dictionary`，在其他语言中称为map，使用键-值对（key-value）存储，具有极快的查找速度。

通过in判断key是否存在

```python
>>> names = {'Michael': 95, 'Bob': 75, 'Tracy': 85}
>>> 'Thomas' in names
>>> False
```

get()方法获取值，如果key不存在，可以返回None，或者自己指定的value

```python
>>> names.get('Thomas')
>>> names.get('Thomas', -1)
-1
```

pop(key)，删除key，对应的value也会从dict中删除

```python
>>> names.pop('Michael')
95
>>> names
{'Bob': 75, 'Tracy': 85}

```


### set

创建一个set，需要提供一个list作为输入集合

通过add(key)方法可以添加元素到set中

通过remove(key)方法可以删除元素

```python
>>> s = set([1,2,3])
>>> s
{1,2,3}
>>> s.add(4)
>>> s
{1,2,3,4}
>>>s.remove(3)
>>>s
{1,2,4}
```

