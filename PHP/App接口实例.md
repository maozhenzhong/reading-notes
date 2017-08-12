### 单例模式连接数据库

#### 单例模式三大原则

1. 构造函数需要标记为非``public``（防止外部使用new操作符创建对象），单例类不能在其他类中实例化，只能被其自身实例化；
2. 拥有一个保存类的实例的静态成员变量``$_instance``;
3. 拥有一个访问这个实例的公共的静态方法；

###### 示例：

```PHP
class Db
{
  static private $_instance;
  static private $_connectSource;
  private $_dbConfig = array(
    'host'=>'127.0.0.1',
    'username'=>'root',
    'password'=>'root',
    'database'=>'my_demo'
  );
  private function __construct()
  {

  }

  static public function getInstance()
  {
    if(!self::$_instance instanceof self)
    {
      self::$_instance = new self();
    }
    return self::$_instance;
  }

  public function connect()
  {
    if(!self::$_connectSource)
    {
      self::$_connectSource = mysqli_connect($$this->_dbConfig['host'],$$this->_dbConfig['user'],$$this->_dbConfig['password']);

      if(!self::$_connectSource)
      {
        die('MySQL connect error' . mysql_error());
      }

      mysqli_select_db($this->_dbConfig['database'], self::$_connectSource);
      mysqli_query('set names UTF8', self::_connectSource);
    }
    return self::$_connectSource;
  }
}
```

```PHP
Db::getInstance()->connect();
```
