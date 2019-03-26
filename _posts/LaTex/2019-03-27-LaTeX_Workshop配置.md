---
categories: LaTex
title: LaTeX Workshop配置
---

# LaTeX Workshop

LaTex Workshop是一个VSCode上的插件，用来支持LaTex相关操作，其配置JSON文件如下：

```json
{
    "latex-workshop.latex.autoClean.run": "onFailed",
    "latex-workshop.view.pdf.viewer": "tab",
    "latex-workshop.latex.tools": [
        {
            "name": "xelatex",
            "command": "xelatex",
            "args": [
                "-synctex=1",
                "-interaction=nonstopmode",
                "-file-line-error",
                "%DOC%"
            ]
        },
    ],
    "latex-workshop.latex.recipes": [
        {
            "name": "xelatex",
            "tools": [
                "xelatex"
            ]
        },
    ],
    "latex-workshop.synctex.afterBuild.enabled": true,
}
```

# 自动清理

中间文件可能需要自动清理，这便可以通过以下代码进行配置：

```json
{"latex-workshop.latex.autoClean.run": "onFailed"}
```

其值有三种，分别为：

- `never`：表示从不清理
- `onFailed`：当编译失败时清理
- ``onBuilt`：当编译后（无论成功或者失败）都进行清理。

# 预览

可以通过如下代码设置编译生成的PDF自动预览：

```json
{"latex-workshop.view.pdf.viewer": "tab"}
```

其值有四种，分别为：

- `browser`：在浏览器中打开。
- `external`：在外部编辑器中打开。
- `none`：不打开。
- `tab`：在右侧打开。

# 编译工具

```json
{
    "latex-workshop.latex.tools": [
        {
            "name": "xelatex",
            "command": "xelatex",
            "args": [
                "-synctex=1",
                "-interaction=nonstopmode",
                "-file-line-error",
                "%DOC%"
            ]
        },
    ],
}
```

其中：

- `name`：工具名称，在后面`recipes`中会进行引用。
- `command`：命令，该工具执行的命令。
- `args`：执行命令带的参数。

# 编译菜单

```json
{
    "latex-workshop.latex.recipes": [
        {
            "name": "xelatex",
            "tools": [
                "xelatex"
            ]
        },
    ],
}
```

这个菜单决定了编译的顺序。

# 预览同步

```json
{
    "latex-workshop.synctex.afterBuild.enabled": true,
}
```

允许在编译后预览的PDF文件定向到tex文件中上次更改的位置。