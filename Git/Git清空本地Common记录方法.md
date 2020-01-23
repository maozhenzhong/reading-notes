# Git清空本地Common记录方法

---

## 1. Checkout

```bash
[root@spring ~]# git checkout --orphan latest_branch
```

## 2. Add all the files

```bash
[root@spring ~]# git add -A
```

## 3. Commit the changes

```bash
[root@spring ~]# git commit -am "commit message"
```

## 4. Delete the branch

```bash
[root@spring ~]# git branch -D master
```

## 5. Rename the current branch to master

```bash
[root@spring ~]# git branch -m master
```

## 6. Finally, force update your repository

```bash
[root@spring ~]# git push -f origin master
```

