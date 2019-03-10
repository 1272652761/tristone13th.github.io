---
categories: NS3
---

在`ns3`的源代码中，实现了一个用来控制TCP连接状态的类，名字叫做`TcpSocketState`，这个类实现于`ns3-gym/src/internet/model`目录下的`tcp-socket-state.cc`文件中，继承于`Object`类。

在该类中有若干公开变量，这些变量包括着可以进行设置的拥塞窗口大小、慢启动阈值等等。`可以通过外界调用动态进行改变`。

