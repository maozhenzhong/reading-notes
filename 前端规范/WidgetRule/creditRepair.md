# 信用修复控件规范

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

### 目录：
1. `SELECT_ACCEPT_USERGROUP`          //受理单位控件规范
2. `INPUT_RESOURCECATALOGDATA`        //资源目录控件规范
3. `INPUT_NAME`                       //姓名/单位名称控件规范
4. `INPUT_CARDID`                     //身份证控件规范
5. `INPUT_UNIFIED_SOCIAL_CREDIT_CODE` //统一社会信用代码控件规范


### 1.`SELECT_ACCEPT_USERGROUP`

#### 名称: 

+ 受理单位控件规范

#### 描述: 

+ **受理单位** 控件规范，用于表述受理单位

#### 类型：

+ `INPUT_SELECT`

#### 规则：

+ int positive

#### 错误提示：

+ `ER-0101` 不能为空

### 2.`INPUT_RESOURCECATALOGDATA`

#### 名称: 

+ 资源目录控件规范

#### 描述: 

+ **来源** 控件规范,用于表述新闻来源

#### 类型：

+ `INPUT_HIDDEN`

#### 规则：

+ int positive

#### 错误提示：

+ `ER-0101`,不能为空

### 3.`INPUT_NAME`

#### 名称: 

+ 姓名单位控件规范

#### 描述: 

+ **姓名/单位名称** 控件规范,用于表述姓名/单位名称

#### 类型：

+ `INPUT_TEXT`

#### 规则：

+ string min:2 | max 30

#### 错误提示：

+ `ER-0101` 不能为空
+ `ER-10001` 2-30位

### 4.`INPUT_CARDID`

#### 名称: 

+ 身份证号控件规范

#### 描述: 

+ **身份证号** 控件规范，用于表述身份证号

#### 类型：

+ `INPUT_TEXT`

#### 规则：

+ string 
+ 15位或18位

#### 错误提示：

+ `ER-0101` 不能为空
+ `ER-10002` 15位或18位

### 5.`INPUT_UNIFIED_SOCIAL_CREDIT_CODE`

#### 名称: 

+ 统一社会信用代码控件规范

#### 描述: 

+ **统一社会信用代码** 控件规范,用于表述统一社会信用代码

#### 类型：

+ `INPUT_TEXT`

#### 规则：

+ string 
+ 18位

#### 错误提示：

+ `ER-0101`,不能为空
+ `ER-10003`,18位