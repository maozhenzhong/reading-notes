# 受理单位控件规范

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

1. `SELECT_ACCEPT_DEPARTMENT`   //受理单位控件规范
	+ `INPUT_IMAGES`             //受理单位图片控件规范 		
2. `INPUT_CARDID_IMAGES`        //异议申诉身份证图片输入控件规范?
3. `INPUT_ITERACTION_SUBJECT`   //表扬主体/反馈主体/输入控件规范
4. `SELECT_ITERACTION_CATEGORY` //表扬类型/反馈类型/承诺类型输入控件规范


### 1. `SELECT_ACCEPT_DEPARTMENT `

#### 名称: 

+ 受理单位控件规范

#### 描述: 

+ **受理单位** 控件规范,用于表述受理单位

#### 类型：

+ `INPUT_SELECT`

#### 规则：

+ int positive

#### 错误提示：

+ `ER-0101`,不能为空  


### 1-1. `INPUT_IMAGES`

#### 名称：
+ 受理单位图片控件规范

#### 描述：
+ **受理单位图片** 控件规范,用于表述受理单位图片

#### 类型：
+ `INPUT_FILES`

#### 规则: 
+ jpg | png | jpeg | gif

#### 错误提示：
+ `ER-0101` 不能为空 
+ `ER-5001` 图片格式错误  
+ `ER-5002` 不能超过五张  

### 2. `INPUT_CARDID_IMAGES`

#### 名称: 

+ 异议申诉身份证图片控件规范

#### 描述: 

+ **身份证图片** 控件规范,用于表述异议申诉身份证图片

#### 类型：

+ `INPUT_FILE`

#### 规则：

+ jpg | png | jpeg | gif
+ 正 反两张

#### 错误提示：

+ `ER-0101` 不能为空
+ `ER-5001` 图片格式错误

### 3. `INPUT_ITERACTION_SUBJECT`

#### 名称: 

+ 表扬主体/反馈主体控件规范

#### 描述: 

+ **主体** 控件规范,用于表述表扬主体/反馈主体

#### 类型：

+ `INPUT_TEXT`

#### 规则：

+ string min:2 | max:30

#### 错误提示：

+ `ER-0101`,不能为空
+ `ER-5003`,长度不能超过30位


### 4. `SELECT_ITERACTION_CATEGORY`

#### 名称: 

+ 表扬类型/反馈类型/承诺类型控件规范

#### 描述: 

+ **类型** 控件规范,用于表述表扬类型/反馈类型/承诺类型

#### 类型：

+ `INPUT_SELECT`

#### 规则：

+ int positive

#### 错误提示：

+ `ER-0101`,不能为空 