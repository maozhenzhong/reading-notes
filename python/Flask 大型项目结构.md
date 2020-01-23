# Flask 大型项目结构

---

工厂函数和蓝本

蓝本描述了程序某一部分的细节，定义了相应的路由、错误处理、上下文处理器、请求处理器等一系列操作

* blueprints
* `utils.py` 用来存储各种辅助函数(即utilities的简写)
* `fakes.py` 脚本存储虚拟数据生成函数
* `emails.py` 用来存储发送电子邮件的函数
* `extensions.py` 用来存储扩展实例化等操作

## 错误处理函数

`errorhandler()` 装饰器可以把错误处理器注册到蓝本上

## 请求处理函数

`before_request`、`after_request`、`teardown_request`。`before_app_request`、`after_app_request`、`teardown_app_request`

## 模版上下文处理函数

`context_processor`、 `app_context_processor`装饰器注册程序全局的模版上下文处理器

`app_template_global()`、`app_template_filter()`、`app_template_test()`分别用来注册全局的模版全局函数、模块过滤器和模版测试器。

蓝本使用 `Flask.register_blueprint()` 方法注册，必须传入的参数是我们在上面创建的蓝本对象。其他的参数可以用来控制蓝本的行为。比如我们用`url_prefix`参数为`auth`蓝本下的所有视图URL附加一个URL前缀。

```
app.register_blueprint(auth_bp, url_prefix='/auth')
```

这时，`auth`蓝本下的视图的URL前都会添加一个`/auth`前缀，比如`login`视图的URL规则会变为`/auth/login`，使用`subdomain`参数可以为蓝本下的路哟设置子域名。

```
app.register_blueprint(auth_bp, subdomain='auth')
```

这时访问蕾丝auth.example.com/login的URL才会触发auth蓝本的login视图

## 蓝本资源

要使用蓝本独有的静态文件，你需要在定义蓝本时使用static_folder关键字指定蓝本的静态文件文件夹的路径

```
auth_bp = Blueprint('auth', __name__, static_floder='static', static_url_path='/auth/static')
```

> **注意：**如果你在注册蓝本时为蓝本定义了URL前缀，即设置了url_prefix参数，那么最终的蓝本静态文件路径会自动设置为' /蓝本前缀/static '，这时可以省略static_url_path等定义

在生成用来获取蓝本静态文件的URL时需要写出包含蓝本名称的完整端点，即“蓝本名.static”下面会调用返回“admin/static/style.css”

```
url_for('admin.static', filename='style.css')
```

当蓝本包含独有的模版文件夹时，我们可以在实例化蓝本类时使用template_folder关键字指定模板文件夹的位置：

```
admin = Blueprint('admin', __name__, template_floder='templates')
```

extensions.py 脚本用于集中化管理扩展类

> **注意：** current_app是程序上下文全局变量，所以只有在激活了程序上下文之后才可以使用。比如在视图函数中，或是在视图函数中调用的函数和对象中，具体可以参考第2章的相关内容。


