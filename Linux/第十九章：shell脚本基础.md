# 第十九章：shell脚本基础

---

## 目录

* []()
* []()
* []()
* []()

## 内容

```
[root@spring ~]# vim test.sh

#!/bin/bash
# this is shell
mkdir /tmp/test
touch /tmp/test/test.txt
echo "Hello World! the 'test' dir is created and the 'test.txt' file is created."
[root@spring ~]# chmod +x test.sh
[root@spring ~]# ./test.sh
```