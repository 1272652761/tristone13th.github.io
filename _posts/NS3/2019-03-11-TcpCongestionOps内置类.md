---
categories: NS3
---

官方给出的定义如下：

> brief Congestion control abstract class
>
> The design is inspired on what `Linux v4.0` does (but it has been in place since years). The congestion control is split from the main socket code, and it is a pluggable component. An interface has been defined; variables are maintained in the `TcpSocketState` class, while subclasses of `TcpCongestionOps` operate over an instance of that class.
>
>  Only three methods has been utilized right now; however, Linux has many others, which can be added later in `ns-3`.

即，拥塞控制从主套接字代码中分离出来，它是成为了一个可插入的组件。 其变量在`TcpSocketState`类中维护，而`TcpCongestionOps`的子类需要基于该类的实例运行。

在`ns3`的源代码中，实现了一个拥塞控制相关的类，名字叫做`TcpCongestionOps`，这个类实现于`ns3/src/internet/model`目录下的`tcp-congestion-ops.cc`文件中，继承于`Object`类。

在该类中有很多拥塞控制相关的函数，下面挑选几个进行介绍。

# GetName

这个函数能够简单地得到一个字符串，表明了当前使用的拥塞控制算法的名称：

```c++
/**
* \brief Get the name of the congestion control algorithm
*
* \return A string identifying the name
*/
virtual std::string GetName () const = 0;
```

# GetSsThresh

在一个丢包事件发生后，得到新的阈值。

这个函数保证了拥塞控制状态会在调用这个方法之前就得到了改变。

实现者应当返回慢启动阈值（并不是直接改变它）。

```c++
  /**
   * \brief Get the slow start threshold after a loss event
   *
   * Is guaranteed that the congestion control state (TcpAckState_t) is
   * changed BEFORE the invocation of this method.
   * The implementator should return the slow start threshold (and not change
   * it directly) because, in the future, the TCP implementation may require to
   * instantly recover from a loss event (e.g. when there is a network with an high
   * reordering factor).
   *
   * \param tcb internal congestion state
   * \param bytesInFlight total bytes in flight
   * \return Slow start threshold
   */
  virtual uint32_t GetSsThresh (Ptr<const TcpSocketState> tcb,
                                uint32_t bytesInFlight) = 0;
```

# IncreaseWindow

简单的拥塞避免算法。

**这个函数允许直接拥塞窗口和阈值的大小。**

```c++
  /**
   * \brief Congestion avoidance algorithm implementation
   *
   * Mimic the function cong_avoid in Linux. New segments have been ACKed,
   * and the congestion control duty is to set
   *
   * The function is allowed to change directly cWnd and/or ssThresh.
   *
   * \param tcb internal congestion state
   * \param segmentsAcked count of segments acked
   */
  virtual void IncreaseWindow (Ptr<TcpSocketState> tcb, uint32_t segmentsAcked) = 0;
```



