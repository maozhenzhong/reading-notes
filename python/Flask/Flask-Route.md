# Flask route

---

## 示例

```
from flask import Flask
app = Flask(__name__)

@app.route('/')
def index():
	return 'Hello world!'

if __name__ == '__main__':
	app.run(host="0.0.0.0", port="5000", debug=True);
```

## 目录

* [路由](#route)
* [HTTP 方法](#httpMethod)
* [静态文件](#staticFile)
* [模板渲染](#renderTemplate)
* []()
* []()
* []()

## 内容

### <a href="#route" id="route">路由</a>

```
@app.route('/')
def index():
    return 'Index Page'

@app.route('/hello')
def hello():
    return 'Hello World'
    
@app.route('/user/<username>')
def show_user_profile(username):
    # show the user profile for that user
    return 'User %s' % username

@app.route('/post/<int:post_id>')
def show_post(post_id):
    # show the post with the given id, the id is an integer
    return 'Post %d' % post_id
```

| 转换器 | 描述 |
|:------|:----|
| `int`	| 接受整数 |
| `float`	| 同 int ，但是接受浮点数 |
| `path`	| 和默认的相似，但也接受斜线 |

### <a href="#httpMethod" id="httpMethod">HTTP 方法</a>

```
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        do_the_login()
    else:
        show_the_login_form()
```

* `GET` 浏览器告知服务器：只 获取 页面上的信息并发给我。这是最常用的方法。
* `HEAD` 浏览器告诉服务器：欲获取信息，但是只关心 消息头 。应用应像处理 GET 请求一样来处理它，但是不分发实际内容。在 Flask 中你完全无需 人工 干预，底层的 Werkzeug 库已经替你打点好了。
* `POST` 浏览器告诉服务器：想在 URL 上 发布 新信息。并且，服务器必须确保 数据已存储且仅存储一次。这是 HTML 表单通常发送数据到服务器的方法。
* `PUT` 类似 POST 但是服务器可能触发了存储过程多次，多次覆盖掉旧值。你可 能会问这有什么用，当然这是有原因的。考虑到传输中连接可能会丢失，在 这种 情况下浏览器和服务器之间的系统可能安全地第二次接收请求，而 不破坏其它东西。因为 POST 它只触发一次，所以用 POST 是不可能的。
* `DELETE` 删除给定位置的信息。
* `OPTIONS` 给客户端提供一个敏捷的途径来弄清这个 URL 支持哪些 HTTP 方法。 从 Flask 0.6 开始，实现了自动处理。

### <a href="#staticFile" id="#staticFile">静态文件</a>

```
url_for('static', filename='style.css')
```

### <a href="#renderTemplate" id="renderTemplate">模板渲染</a>

```
from flask import render_template

@app.route('/hello/')
@app.route('/hello/<name>')
def hello(name=None):
    return render_template('hello.html', name=name)
```

### <a href="#" id=""></a>

```
# 管理环境变量
$ pipenv install python-dotenv
# 设置环境变量个
$ FLASK_ENV=production | development
# 监测文件变动的Python库
$ pipenv install watchdog --dev
```