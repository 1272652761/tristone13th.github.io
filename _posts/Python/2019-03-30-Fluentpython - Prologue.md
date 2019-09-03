---
categories: Python
title: Fluentpython - Prologue
---

# Python数据模型

## 特殊/魔法函数（Special/Magic Method）

Python中的魔法函数一词也是从Ruby Community中借用过来，而非自生的。

首先以以下代码为例：

```python
import collections
Card = collections.namedtuple('Card', ['rank', 'suit'])
class FrenchDeck:
	ranks = [str(n) for n in range(2, 11)] + list('JQKA')
	suits = 'spades diamonds clubs hearts'.split()
def __init__(self):
	self._cards = [Card(rank, suit) for suit in self.suits
	for rank in self.ranks]
def __len__(self):
	return len(self._cards)
def __getitem__(self, position):
	return self._cards[position]
```

一些操作如下：

```python
>>> beer_card = Card('7', 'diamonds')
>>> beer_card
Card(rank='7', suit='diamonds')
>>> deck = FrenchDeck()
>>> len(deck)
52
>>> deck[0]
Card(rank='2', suit='spades')
>>> deck[-1]
Card(rank='A', suit='hearts')
>>> from random import choice
>>> choice(deck)
Card(rank='3', suit='hearts')
>>> choice(deck)
Card(rank='K', suit='spades')
>>> choice(deck)
Card(rank='2', suit='clubs')
```

我们可以使用**前后双下划线**来表明一个函数是特殊的成员函数，比如`__init__()`函数表示自动初始化函数，`__len__()`函数会当外界调用`len()`时自动调用，`__getitem__()`函数会当外界调用`[]`时自动调用等等。前后双下划线是一种Python中的约定俗成，这种约定俗成叫做特殊方法，有两个好处：

- 你的类的使用者不需要记住特定的名称，比如你在类里实现了一个得到长度的函数，外界并不知道你的函数名字是什么（`length()`或者`lenofself()`），这样的实现使得类对外统一暴露了某些接口。
- 更简单地从Python丰富的标准库中受益，避免重复造轮子（`choice(deck)`）。

### 更多的特殊函数

- `__init__`：构造函数。
- `__repr__`：该函数返回一个字符串，用以将该类在控制台中的显示。如果不实现这个函数，那么在控制台中将以默认的形式展示。
- `__abs__`：绝对值函数，可以在外界通过`abs()`调用。
- `__bool__`：绝对值函数，可以在外界通过`bool()`调用。默认情况下，用户定义的类的实例都会被认为是`True`，除非`__bool__`或者`__len__`得到了实现。一般来说，`bool(x)`先调用`__bool__`，如果这个函数没有实现，那么会调用`__len__`，如果是0，那么返回`False`，否则返回`True`。
- `__add__`：两个相同变量相加的函数。
- `__mul__`：两个相同变量相乘的函数。

- `__str__`：字符串函数，可以在外界通过`str()`调用。

Python的数据模型页列出了83个特殊方法。