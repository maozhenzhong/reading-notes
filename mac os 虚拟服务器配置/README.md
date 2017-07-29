# Mac os 系统apache 虚拟服务器配置

```
 sudo vi /etc/hosts
```
//分配域名

```
127.0.0.1  www.example.com
```

//找到apache目录

```
cd /Applications/MAMP/conf/apache
```

//编辑'sudo vi httpd.conf'文件
//找到 Virtual hosts 去掉注释，执行虚拟域名的配置


```
sudo vi httpd.conf  
#Virtual hosts  
#Include /Applications/MAMP/conf/apache/extra/httpd-vhosts.conf
```

//找到 'httpd-vhosts.conf'


```
cd /Applications/MAMP/conf/apache/extra
sudo vi httpd-vhosts.conf
```

//编辑
```
<VirtualHost *:80>
  ServerAdmin www.example.com //这里是在hosts中配置的域名  
  DocumentRoot "/Users/spring/root/thinkphp-demo/public" //这里是你的项目的位置
  ServerName www.example.com //服务器名
  ErrorLog "logs/www.example.com" //错误日志目录
  CustomLog "logs/www.example.com" common //自定义目录
</VirtualHost>
```

执行完以后重启服务器，配置完成
