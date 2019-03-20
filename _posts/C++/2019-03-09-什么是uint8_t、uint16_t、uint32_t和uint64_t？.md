---
categories: C++
title: 什么是uint8_t、uint16_t、uint32_t和uint64_t？
---

事实证明它们分别等于：`unsigned char`、`unsigned short`、`unsigned int`和`unsigned long long`。

这些数据类型中都带有`_t`，` _t `表示这些数据类型是通过`typedef`定义的，而不是新的数据类型。也就是说，它们其实是我们已知的类型的别名。即在`stdint.h`中，会有如下定义：

```c++
typedef unsigned char uint8_t；
typedef unsigned short uint16_t；
typedef unsigned int uint32_t；
typedef unsigned long long uint64_t；
```

