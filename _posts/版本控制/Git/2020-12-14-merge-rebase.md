---
categories: Git
title: Merge vs. Rebase
---

[Merging vs. Rebasing | Atlassian Git Tutorial](https://www.atlassian.com/git/tutorials/merging-vs-rebasing)

> The first thing to understand about `git rebase` is that it solves the same problem as `git merge`. Both of these commands are designed to integrate changes from one branch into another branch—they just do it in very different ways.
>
> Merging is nice because it’s a *non-destructive* operation. The existing branches are not changed in any way. On the other hand, this also means that the `feature` branch will have an extraneous merge commit every time you need to incorporate upstream changes. If `master` is very active, this can pollute your feature branch’s history quite a bit.
>
> The major benefit of rebasing is that you get a much cleaner project history. First, it eliminates the unnecessary merge commits required by `git merge`.
>
> The golden rule of `git rebase` is to never use it on *public* branches.