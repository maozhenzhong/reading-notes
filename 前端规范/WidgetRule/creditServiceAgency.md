# 信用服务机构控件规范

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
1. `INPUT_CREDIT_SERVICE_AGENCY_NAME`    //信用服务机构名称输入控件规范
2. `INPUT_CREDIT_SERVICE_AGENCY_PURPOSE` //信用服务机构宗旨输入控件规范
3. `INPUT_CREDIT_SERVICE_AGENCY_URL`     //信用服务机构网址输入控件规范


### 1.`INPUT_CREDIT_SERVICE_AGENCY_NAME `

#### 名称: 

+ 信用服务机构名称控件规范

#### 描述: 

+ **信用服务机构名称** 控件规范，用于表述信用服务机构名称

#### 类型：

+ `INPUT_TEXT`

#### 规则：

+ string min:2 | max:30

#### 错误提示：

+ `ER-9001` 信用服务机构名称长度范围为2-20

### 2.`INPUT_CREDIT_SERVICE_AGENCY_NAME`

#### 名称: 

+ 信用服务机构宗旨

#### 描述: 

+ **来源** 控件规范,用于表述信用服务机构宗旨

#### 类型：

+ `INPUT_TEXTAREA`

#### 规则：

+ string min:6 | max:200

#### 错误提示：

+ `ER-9002`,信用服务机构名称长度范围为6-200

### 3.`INPUT_CREDIT_SERVICE_AGENCY_URL`

#### 名称: 

+ 信用服务机构网址控件规范

#### 描述: 

+ **信用服务机构网址** 控件规范,用于表述信用服务机构网址

#### 类型：

+ `INPUT_TEXT | INPUT_URL`

#### 规则：

+ string URL格式验证    !!![待讨论是否加http || https]

#### 错误提示：

+ `ER-9003`,信用服务机构网址格式不正确