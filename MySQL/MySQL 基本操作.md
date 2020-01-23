# MySQL 基本操作

---

## 登录MySQL

```
# 登录MySQL
[root@localhost root]# mysql -u root -p
Enter password: # 请输入密码

Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 2
Server version: 5.7.28 MySQL Community Server (GPL)

Copyright (c) 2000, 2019, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql>
```

## 数据库简单操作

```
# 创建数据库
mysql> create database my_blog charset=utf8;
# 查看数据库
mysql> show databases;
# 删除数据库
mysql> drop database my_blog;
# 打开、切换数据库`my_blog`
mysql> use my_blog;
# 查看当前选择的数据库
mysql> select database();
```

## 数据表简单操作

```
# 显示数据库中的所有表
mysal> show tables;
# 显示数据表的结构
mysql> desc tt_news; # 表名tt_news
# 查看建表语句
mysql> show create table 表名;
# 重命名表明
mysql> rename table 原表明 to 新表名;
# 创建数据表
mysql> create table tt_logs(字段名称 字段类型, ......) # 表名tt_logs
# 添加新列
mysql> alter table 列名 add 字段名称 字段类型;
# 删除数据表
mysql> drop table 表名;
# 复制表
mysql> create table 新表明 like 被复制表名;
```

## 数据操作

```
# 新增数据
mysql> insert into 表名 values(...);
# 删除数据
mysql> delete from 表明 where 条件;
# 修改数据
mysql> update 表名 set 列1=值1,列2=值2,…… where 条件;
# 查询数据
mysql> select * from 表名
```