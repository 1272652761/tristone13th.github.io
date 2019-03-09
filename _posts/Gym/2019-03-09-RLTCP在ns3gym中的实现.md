---
categories: Gym NS3
---

# 目录结构

`RLTCP`位于目录`ns3-gym/scratch`下，共有8个源代码文件，除此之外，其还引用了事先实现好的环境文件`Ns3Env`，用来和`NS3`脚本进行交互。

这8个文件如下：

- `test_tcp.py`: 其中定义了Agent与环境定义的流程。
- `tcp_newreno`: 定义了`newreno`版的Agent类。
- `tcp_base`:  定义了两种Agent, 一种是基于时间的，一种是基于事件的。
- 

