# 通用控件规范

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
1. `INPUT_TITLE`       //通用标题控件规范
2. `INPUT_SOURCE`      //来源输入控件规范
3. `INPUT_CONTENT`     //内容输入控件规范
4. `INPUT_IMAGES`      //多张图片控件规范
5. `INPUT_IMAGE`       //单张图片控件规范
6. `INPUT_ATTACHMENTS` //新闻附件控件规范


### 1.`INPUT_TITLE`

#### 名称: 

+ 标题控件规范

#### 描述: 

+ **标题** 控件规范，用于表述标题

#### 类型：

+ `INPUT_TEXT`

#### 规则：

+ string min:1 | max:50

#### 错误提示：

+ `ER-0102` 标题长度范围为1-50

### 2.`INPUT_SOURCE`

#### 名称: 

+ 资源来源控件规范

#### 描述: 

+ **来源** 控件规范,用于表述新闻来源

#### 类型：

+ `INPUT_TEXT`

#### 规则：

+ string min:2 | max 15

#### 错误提示：

+ `ER-0103`: 来源范围为2-15位的汉字

### 3.`INPUT_CONTENT`

#### 名称: 

+ 内容输入控件规范

#### 描述: 

+ **内容** 控件规范,用于表述新闻来源

#### 类型：

+ `INPUT_TEXT`

#### 规则：

+ string min:2 | max 15

#### 错误提示：

+ `ER-0103`: 来源范围为2-15位的汉字

### 4.`INPUT_IMAGES`

#### 名称: 

+ 多张图片控件规范

#### 描述: 

+ **多张图片** 控件规范，用于上传新闻图片

#### 类型：

+ `INPUT_FILE | multiple`

#### 规则：

+ `jpg` | `jpeg` | `png` | `gif`
+ size 2M
+ ratio: width | height
+ max 5

#### 错误提示：

+ `ER-0104`: 图片格式错误
+ `ER-0105`: 图片数量不超过最大数量

### 5.`INPUT_IMAGE`

#### 名称: 

+ 单张图片控件规范

#### 描述: 

+ **单张图片** 控件规范，用于上传新闻图片

#### 类型：

+ `INPUT_FILE`

#### 规则：

+ `jpg` | `jpeg` | `png` | `gif`
+ size 2M
+ ratio: width | height
+ max 1

#### 错误提示：

+ `ER-0104`: 图片格式错误
+ `ER-01056`: 图片大小不超过最大值 !!!

### 6.`INPUT_ATTACHMENTS`

#### 名称: 

+ 附件控件规范

#### 描述: 

+ **附件** 控件规范，用于上传新闻附件

#### 类型：

+ `INPUT_FILE`

#### 规则：

+ `zip` | `doc` | `docx` | `xls` | `xlsx`
+ size 2M !!!

#### 错误提示：

* `ER-0106`:附件格式错误
* `ER-0107`: 附件数量不正确 