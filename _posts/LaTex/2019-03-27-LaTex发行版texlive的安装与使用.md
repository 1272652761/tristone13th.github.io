---
categories: LaTex
title: LaTex发行版texlive的安装与使用
---

# Texlive

Texlive是一个latex的发行版，其中封装了很多常用的包，比如用来支持latex缩进的`latexindent`等等，可以直接到官方网站下载安装程序进行网络安装，也可以在清华大学的镜像网站下载，该镜像可以直接在Windows中打开。

## 命令

### tlmgr

`tlmgr`命令是`texlive manager`的缩写，用来管理texlive的一些相关配置，比如可以通过运行`tlmgr update --self`来对自己进行更新，也可以通过运行`tlmgr update <package name>`来对某一个包进行更新。