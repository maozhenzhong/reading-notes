# HTML标签命名/CSS标准化命名
---

## 页面结构命名

+ page：代表整个页面，用于最外层。
+ wrap：外套，将所有元素包在一起的一个外围包，用于最外层
+ wrapper：页面外围控制整体布局宽度，用于最外层
+ container：一个整体容器，用于最外层
+ head、header：页头区域，用于头部
+ nav：导航条
+ content：内容，网站中最重要的内容区域，用于网页中部主体
+ main：网站中的主要区域（表示最重要的一块位置），用于中部主体内容
+ column：栏目
+ sidebar：侧栏
+ foot、footer：页尾、页脚。网站一些附加信息放置区域，（或命名为copyright）用于底部

## 导航命名

+ nav、navbar、navigation、nav-wrapper：导航条或导航包，代表横向导航
+ topnav：顶部导航
+ mainbav：主导航
+ subnav：子导航
+ sidebar：边导航
+ leftsidebar 或 sidebar_a ：左导航
+ rightsidebar 或 sidebar_b：右导航
+ title：标题
+ summary：摘要
+ menu：菜单。区域包含一般的链接和菜单
+ submenu：子菜单
+ drop：下拉
+ dorpmenu：下拉菜单
+ links：链接菜单

## 功能命名

+ logo：标记网站logo标志
+ banner：标语、广告条、顶部广告条
+ login：登陆，（例如登录表单：form-login）
+ loginbar：登录条
+ regsiter：注册
+ tool、toolbar：工具条
+ search：搜索
+ searchbar：搜索条
+ searchlnput：搜索输入框
+ shop：功能区，表示现在的
+ icon：小图标
+ label：商标
+ homepage：首页
+ subpage：二级页面子页面
+ hot：热门热点
+ list：文章列表，（例如新闻列表：list-news）
+ scroll:滚动
+ tab：标签
+ sitemap：网站地图
+ msg 或 message：提示信息
+ current：当前的
+ joinus：加入
+ status：状态
+ btn：按钮，（例如搜索按钮可写成：btn-search）
+ tips：小技巧
+ note：注释
+ guild：指南
+ arr、arrow：标记箭头
+ service：服务
+ breadcrumb：(即页面所处位置导航提示）
+ download：下载
+ vote：投票
+ siteinfo：网站信息
+ partner：合作伙伴
+ link、friendlink：友情链接
+ copyright：版权信息
+ siteinfoCredits：信誉
+ siteinfoLegal：法律信息

## CSS样式命名

+ 对齐样式命名：left（左边内容）、center（中间内容）、right（右边内容）等；
+ 颜色英文命名：red（红色）、green（绿色）、yellow（黄色），又或者border_red（红色边框）等；
+ 颜色代码命名：f00（红色）、ff0（黄色）、f90（橙色）等；
文字大小命名：font12px（字体12像素）、font16px（字体16像素）等；
+ 页面线条命名：line_x （横线）、line_y （纵线）或 line_red（红线）、line_black（黑线）
+ 图片图标命名：pic_1.jpg、pic_2.jpg 或 ico_1.gif、ico_2.gif
+ 页面广告命名：ad_01、ad_02
+ 背景框架命名：nav_bg（代表导航条的背景图片位置）、tool_bg（代表工具栏的背景图片位置）

## CSS样式表命名

+ index.css：单独为首页建立样式
+ head.css：头部样式，多个页面头部设计风格相同时使用。
+ base.css：共用样式。
+ style.css：独立页面所使用的样式文件。
+ global.css：页面样式基础，全局公用样式，页面中必须包含。
+ layout.css：布局、版面样式，公用类型较多时使用，一般用在首页级页面和产品类页面中
+ module.css：模块，用于产品类页，也可与其它样式配合使用。
+ master.css：主要的样式表
+ columns.css：专栏样式
+ themes.css：主体样式
+ forms.css：表单样式
+ mend.css：补丁，基于以上样式进行的私有化修补。