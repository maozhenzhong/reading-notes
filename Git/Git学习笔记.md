# Git学习笔记
---

## 分支操作

**git默认分支为master**

1. `git branch dev` // 创建分支`dev`
2. `git branch dev -b` // 创建并切换到新建的分支`dev`
3. `git branch` // 查看分支列表
4. `git branch -v` // 查看所有分支的最后一次操作
5. `git branch -vv` // 查看当前分支
6. `git branch -b origin origio/dev` // 创建远程分支`dev`到本地`dev`
7. `git branch --merged` // 查看别的分支和当前分支合并过的分支
8. `git branch --no-merged` // 查看未与当前分支合并的分支
9. `git branch -d dev` // 删除本地分支`dev`
10. `git branch -D dev` // 强行删除分支`dev`
11. `git merge master` // 合并分支`master`到当前分支上
12. `git merge --no-ff -m '合并描述' 分支名` // 不使用Fast forward方式合并，采用这种方式合并可以看到合并记录
13. `git merge <remotename> <branch>` // 合并源代码
12. `git checkout dev` // 切换分支`dev`
13. `git checkout dev` // 切换分支
14. `git checkout -b dev` // 删除分支
15. `git checkout -- fileName`  // 撤销工作区修改，未执行git add命令前的所有修改

## 暂存操作

1. `git stash` // 暂存当前修改
2. `git stash apply` // 恢复最近的一次暂存
3. `git stash pop` // 恢复暂存并删除暂存记录
4. `git stash list` // 查看暂存列表
5. `git stash drop` // 暂存名(例：stash@{0}) 移除某次暂存
6. `git stash clear` // 清除暂存

## 回退操作

1. `git tag` // 标签名 添加标签(默认对当前版本)
2. `git tag` // 标签名 commit_id 对某一提交记录打标签
3. `git tag -a` // 标签名 -m '描述' 创建新标签并增加备注
4. `git tag` // 列出所有标签列表
5. `git show` // 标签名 查看标签信息
6. `git tag -d` // 标签名 删除本地标签
7. `git push origin` // 标签名 推送标签到远程仓库
8. `git push origin --tags` // 推送所有标签到远程仓库
9. `git push origin :refs/tags/标签名` // 从远程仓库中删除标签

## 常规操作

1. `git push origin test` // 推送本地分支到远程仓库
2. `git rm -r --cached 文件/文件夹名字` // 取消文件被版本控制
3. `git reflog` // 获取执行过的命令
4. `git log` // 版本日志
5. `git log --graph` // 查看分支合并图
7. `git check-ignore -v 文件名` // 查看忽略规则
8. `git add -f` // 文件名 强制将文件提交

## git创建项目仓库

1. `git init` // 初始化
2. `git add . || git add file` // 添加文件到缓存区中
3. `git commit -m '描述'` // 
4. `git status` // 查看文件状态
5. 	`git diff` // 比较工作区与暂存区
6. `git diff -cached` // 比较暂存区与本地版本库中最近一次commit的内容
7. `git diff HEAD` // 比较工作区与本地版本库中最近一次commit的内容
8. `git diff <commit-id> <commit-id>` // 比较两个commit之间的差异
9. `git reset HEAD^` // 回退一个版本,
10. `git reset HEAD^^^` // 几个尖角号会退几个版本
11. `git reset HEAD~1|2|3` // 直接回退到某一个版本号
12. `git remote add origin url` // 关联远程仓库
13. `git remote -v` // 查看远程仓库
14. `git remote add <name> <remote>` // 添加源仓库地址为远程仓库
15. `git remote rename origin jquery` // 修改origin为jquery
16. `git pull` // 拉取远程仓库中所有分支的内容
17. `git pull origin dev` // 拉取远程仓库中`dev`分支的内容
18. `git fetch` // 获取远程仓库中所有的分支到本地

## 忽略已加入到版本库中的文件

1. `git update-index --assume-unchanged file` // 忽略单个文件
2. `git rm -r --cached 文件/文件夹名字` // (. 忽略全部文件)

## 取消忽略文件

1. `git update-index --no-assume-unchanged file`

## 拉取、上传免密码

1. `git config --global credential.helper store`
