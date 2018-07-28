# 信用刊物控件规范

> #### 名称: 
> + name
> 
> #### 描述: 
> 
> + **title** //details
> 
> #### 类型: 
> 	+ (input, select...)
> 
> #### 规则: 
> 
> 	+ 控件规则
>  + ...
> 
> #### 错误提示: 
> + `ER-id` details
> + ...

----

### 目录

1. `INPUT_PUBLISH_DEPARTMENT`    //发布单位
2. `INPUT_YEARS` //年份

### 1. `INPUT_PUBLISH_DEPARTMENT`

#### 名称: 

+ 发布单位控件规范

#### 描述: 

+ **发布单位** 控件规范,用于表述发布单位

#### 类型：

+ `INPUT_TEXT DISABLED`

#### 规则：

+ string

#### 错误提示：

+ `ER-0101`,不能为空  

### 2. `INPUT_YEARS`

#### 名称: 

+ 信用刊物发布年份控件规范

#### 描述: 

+ **信用刊物发布年份** 控件规范,用于表述信用刊物发布年份

#### 类型：

+ `INPUT_TEXT time_plugins`

#### 规则：

+ number

#### 错误提示：

+ `ER-0101` 不能为空