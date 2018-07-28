# 百度地图javaScriptAPI

```html
//引入百度地图API文件
<script type="text/javascript" src="http://api.map.baidu.com/api?v=3.0&ak=您的密钥"></script>

//初始化地图逻辑
var map = new BMap.Map("container");          // 创建地图实例  
var point = new BMap.Point(116.404, 39.915);  // 创建点坐标  
map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别  

//开启鼠标滚轮缩放
map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
```

### 向地图添加控件

```javascript
//地图初始化
//添加控件前，地图需要进行初始化。例如，要将标准地图控件添加到地图中，可在代码中添加如下内容：
var map = new BMap.Map("container");    
map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);    
map.addControl(new BMap.NavigationControl());

//添加多个控件
//在本例中我们向地图添加一个平移缩放控件、一个比例尺控件和一个缩略图控件。在地图中添加控件后，它们即刻生效。

map.addControl(new BMap.NavigationControl());    
map.addControl(new BMap.ScaleControl());    
map.addControl(new BMap.OverviewMapControl());    
map.addControl(new BMap.MapTypeControl());    
map.setCurrentCity("北京"); // 仅当设置城市信息时，MapTypeControl的切换功能才能可用   
```