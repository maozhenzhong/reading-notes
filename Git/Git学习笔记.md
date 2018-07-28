# Git学习笔记

```Bash
//添加文件到缓存区中
git add File

git add .

git status

git commit -m '描述'

//撤销工作区修改，未执行git add命令前的所有修改
git checkout -- fileName 

//回退一个版本,
git reset HEAD^
git reset HEAD^^^//几个尖角号会退几个版本
git reset HEAD~1|2|3 //直接回退到某一个版本号

//版本日志
git log

//
git reflog

//查看远程仓库
git remote -v

//添加源仓库地址为远程仓库
git remote add <name> <remote>

//修改origin为jquery
git remote rename origin jquery

//合并源代码
git merge <remotename> <branch>

//比较工作区与暂存区
git diff

//比较暂存区与本地版本库中最近一次commit的内容
git diff -cached

//比较工作区与本地版本库中最近一次commit的内容
git diff HEAD

//比较两个commit之间的差异

git diff <commit-id> <commit-id>

//创建分支
git branch dev

//默认分支 master

//切换分支
git checkout dev

//删除分支
git checkout -b dev
```