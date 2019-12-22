# CentOS7.4 install python3.7

---

```
[root@localhost ~]# yum install gcc make zlib  zlib-devel openssl openssl-devel libffi-devel bzip2-devel ncurses-devel gdbm-devel readline-devel xz-devel sqlite-devel tk-devel -y

[root@localhost ~]# wget https://www.python.org/ftp/python/3.7.4/Python-3.7.4.tgz

[root@localhost ~]# tar -zxvf Python-3.7.4.tgz

[root@localhost ~]# cd Python-3.7.4/

[root@localhost ~]# ./configure prefix=/usr/local/python3

[root@localhost ~]# make && make install

[root@localhost ~]# ln -s /usr/local/python3/bin/python3 /usr/bin/python3

[root@localhost ~]# ln -s /usr/local/python3/bin/pip3 /usr/bin/pip3
```