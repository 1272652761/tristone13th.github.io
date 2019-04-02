---
categories: FluentPython
title: Data Structures
---

# 序列

## 内建序列

标准库提供了一个丰富的序列类型选择：

**Container sequences**包括`list`, `tuple`, `collections.deque`能够包含不同的类型。

**Flat sequences**包括`str`, `bytes`, `bytearray`, `memoryview`, `array.array`只能包含相同的类型。

Container sequences保存着对于其中元素的引用，这些引用能够是任何的类型；然而flat sequences在他自己的空间中物理存储了其中每个元素的值，后者更加紧凑，然而却被限制了只能存储相同的值。

**Mutable sequences**包括`list`, `bytearray`, `array.array`, `collections.deque` 和 `memoryview`，这些序列是可以改变的。

**Immutable sequences**包括`tuple`, `str` and `bytes`，这些序列是无法改变的。

## 递推式列表和生成器表达式

**递推式列表**（List Comprehension）和**生成器表达式**（generator expression）都是很快速的构建一个序列的方式。

### 递推式列表

递推式列表可以简写为Listcomp。

#### 递推式列表改进

在原来的Python2的版本中，递推式列表有一个很大的缺陷，如下：

```python
Python 2.7.6 (default, Mar 22 2014, 22:59:38)
[GCC 4.8.2] on linux2
Type "help", "copyright", "credits" or "license" for more information.
>>> x = 'my precious'
>>> dummy = [x for x in 'ABC']
>>> x
'C'
```

在这个例子中，`x`的值被更改了。

而在`Python3`中，递推式列表和生成器表达式有了自己的本地域，就像函数一样。而且本地的变量不会掩盖外部的变量。如下：

```python
>>> x = 'ABC'
>>> dummy = [ord(x) for x in x]
>>> x
'ABC'
>>> dummy
[65, 66, 67]
```

### 生成器表达式

生成器表达式可以简写为Genexp。

生成器表达式和递推式列表使用了相同的语法，**但是它是包含在圆括号中而非方括号中**。

**Genexp的优点在于更加节省内存**，因为它使用迭代器协议一个又一个地向外yield元素，而不是直接建立一个列表。

```python
>>> symbols = '$¢£¥€¤'
>>> tuple(ord(symbol) for symbol in symbols)
(36, 162, 163, 165, 8364, 164)
>>> import array
>>> array.array('I', (ord(symbol) for symbol in symbols))
array('I', [36, 162, 163, 165, 8364, 164])
```

如果它是一个函数调用中单一的参数，那就没有必要再写冗余的括号了，**就像上面代码中的第二行**。

## 元组不只是不可更改的列表

元组不只是不可更改的列表，它还可以是没有域名的纪录。

### 作为纪录的元组

请看下面的例子：

```python
>>> traveler_ids = [('USA', '31195855'), ('BRA', 'CE342567'),
... ('ESP', 'XDA205856')]
>>> for country, _ in traveler_ids:
... 	print(country)
USA
BRA
ESP
```

在for循环中，其知道怎样将元组拆开取出其中的数据，这种机制叫做unpacking，我们不关心第二个变量，所以把它置为了哑变量。

### Tuple Unpacking

这个机制工作于任何**可以迭代**的对象。我们可以使用*来得到任何溢出的元素，例子如下：

```python
>>> a, b, *rest = range(5)
>>> a, b, rest
(0, 1, [2, 3, 4])
>>> a, b, *rest = range(3)
>>> a, b, rest
(0, 1, [2])
>>> a, b, *rest = range(2)
>>> a, b, rest
(0, 1, [])
```

这个星星前缀很神奇，它可以放在任何一个位置。

```python
>>> a, *body, c, d = range(5)
>>> a, body, c, d
(0, [1, 2], 3, 4)
>>> *head, b, c, d = range(5)
>>> head, b, c, d
([0, 1], 2, 3, 4)
```

### 嵌套的Tuple Unpacking

请看下面的例子：

```python
metro_areas = (
    ('Tokyo', 'JP', 36.933, (35.689722, 139.691667)),
    ('Delhi NCR', 'IN', 21.935, (28.613889, 77.208889)),
    ('Mexico City', 'MX', 20.142, (19.433333, -99.133333)),
    ('New York-Newark', 'US', 20.104, (40.808611, -74.020386)),
    ('Sao Paulo', 'BR', 19.649, (-23.547778, -46.635833)),
)

for name, cc, pop, (latitude, longitude) in metro_areas:
    pass
```

其中，通过赋予最后一个域一个元组，我们unpack了坐标。

### Named tuples

在`collections.namedtuple`函数中，提供了一个加强的元组，这个元组有了自己的名字和类。

> namedtuple和普通的tuple占用空间完全相同，因为名字被存储在了类中。

举个例子：

```python
>>> from collections import namedtuple
>>> City = namedtuple('City', 'name country population coordinates')
>>> tokyo = City('Tokyo', 'JP', 36.933, (35.689722, 139.691667))
>>> tokyo
City(name='Tokyo', country='JP', population=36.933, coordinates=(35.689722, 139.691667))
>>> tokyo.population
36.933
>>> tokyo.coordinates
(35.689722, 139.691667)
>>> tokyo[1]
'JP'
```

## 切片

列表、元组、字符串等序列类型的一个共有特性是都支持切片操作。

### 为什么切片和区间将最后一个元素排除在外

- 很容易看到切片或者区间的长度，当只给出截至的项时。`range(3)`和`my_list[:3]`都只生产三个元素。
- 很容易计算切片或者区间的长度，直接使用stop减去start。
- 当分成多部份时，不会出现区间交叉的情况。

### 切片对象

一个有趣的例子：

```python
>>> s = 'bicycle'
>>> s[::3]
'bye'
>>> s[::-1]
'elcycib'
>>> s[::-2]
'eccb'
```

其实，切片也是一个对象，也可以对它进行命名，它允许我们更加灵活地使用切片而不是硬编码切片。请看下面的例子：

```python
>>> invoice = """
... 0.....6.................................40........52...55........
... 1909 Pimoroni PiBrella $17.50 3 $52.50
... 1489 6mm Tactile Switch x20 $4.95 2 $9.90
... 1510 Panavise Jr. - PV-201 $28.00 1 $28.00
... 1601 PiTFT Mini Kit 320x240 $34.95 1 $34.95
... """
>>> SKU = slice(0, 6)
>>> DESCRIPTION = slice(6, 40)
>>> UNIT_PRICE = slice(40, 52)
>>> QUANTITY = slice(52, 55)
>>> ITEM_TOTAL = slice(55, None)
>>> line_items = invoice.split('\n')[2:]
>>> for item in line_items:
... 	print(item[UNIT_PRICE], item[DESCRIPTION])
...
$17.50 Pimoroni PiBrella
$4.95 6mm Tactile Switch x20
$28.00 Panavise Jr. - PV-201
$34.95 PiTFT Mini Kit 320x240
```

### 对切片赋值

可更改的序列可以通过切片来更改，可以直接使用赋值，代码如下：

```python 
>>> l = list(range(10))
>>> l
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
>>> l[2:5] = [20, 30]
>>> l
[0, 1, 20, 30, 5, 6, 7, 8, 9]
>>> del l[5:7]
>>> l
[0, 1, 20, 30, 5, 8, 9]
>>> l[3::2] = [11, 22]
>>> l
[0, 1, 20, 11, 5, 22, 9]
>>> l[2:5] = 100
Traceback (most recent call last):
File "<stdin>", line 1, in <module>
TypeError: can only assign an iterable
>>> l[2:5] = [100]
>>> l
[0, 1, 100, 22, 9]
```

## 对列表使用操作符

对于乘号，我们可以使用下面的代码进行测验：

```python
>>> l = [1, 2, 3]
>>> l * 5
[1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3]
>>> 5 * 'abcd'
'abcdabcdabcdabcdabcd'
```

对于加号，可以使用下面的代码进行测验：

```python
>>> a = [1, 2]
>>> b = [3, 4]
>>> print(a + b)
[1, 2, 3, 4]
```

不管是加号还是乘号，都会直接创造出一个新对象，并且不会更改它们的参数。

### 构建列表的列表（大雾）

有时候我们需要使用固定数量的嵌套列表初始化一个列表，比如下面这个例子：

```python
>>> board = [['_'] * 3 for i in range(3)]
>>> board
[['_', '_', '_'], ['_', '_', '_'], ['_', '_', '_']]
>>> board[1][2] = 'X'
>>> board
[['_', '_', '_'], ['_', '_', 'X'], ['_', '_', '_']]
```

一个错误的用法是：

```python
>>> weird_board = [['_'] * 3] * 3
>>> weird_board
[['_', '_', '_'], ['_', '_', '_'], ['_', '_', '_']]
>>> weird_board[1][2] = 'O'
>>> weird_board
[['_', '_', 'O'], ['_', '_', 'O'], ['_', '_', 'O']]
```

另一个错误的用法是：

```python
row = ['_'] * 3
board = []
for i in range(3):
	board.append(row)
```

正确的用法是：

```python
>>> board = []
>>> for i in range(3):
... 	row = ['_'] * 3 #
... 	board.append(row)
...
>>> board
[['_', '_', '_'], ['_', '_', '_'], ['_', '_', '_']]
>>> board[2][0] = 'X'
>>> board #
[['_', '_', '_'], ['_', '_', '_'], ['X', '_', '_']]
```

## 序列增广赋值

符号`+=`和符号`*=`表现非常不同，下面开始讨论：

能够让`+=`运行的特殊函数是`__iadd__`，然而，如果`__iadd__`没有被实现，Python会转而调用函数`__add__`，考虑下面的表达式：

```python
>>> a += b
```

如果a实现了`__iadd__`方法，那么它就会被调用。如果没有，那么会按照`a = a + b`来调用`a + b`，这将会创造一个新的对象并赋予a。请看下面这个例子：

```python
>>> l = [1, 2, 3]
>>> id(l)
4311953800
>>> l *= 2
>>> l
[1, 2, 3, 1, 2, 3]
>>> id(l)
4311953800
>>> t = (1, 2, 3)
>>> id(t)
4312681568
>>> t *= 2
>>> id(t)
4301348296
```

### +=赋值谜题

下面让我们来讨论元组不可变中的奥秘。

```python
>>> t = (1, 2, [30, 40])
>>> t[2] += [50, 60]
Traceback (most recent call last):
File "<stdin>", line 1, in <module>
TypeError: 'tuple' object does not support item assignment
>>> t
(1, 2, [30, 40, 50, 60])
```

简单来说，第一步赋值成功了，第二次写回的赋值失败了。

## 排序内置函数

```python
>>> fruits = ['grape', 'raspberry', 'apple', 'banana']
>>> sorted(fruits)
['apple', 'banana', 'grape', 'raspberry']
>>> fruits
['grape', 'raspberry', 'apple', 'banana']
>>> sorted(fruits, reverse=True)
['raspberry', 'grape', 'banana', 'apple']
>>> sorted(fruits, key=len)
['grape', 'apple', 'banana', 'raspberry']
>>> sorted(fruits, key=len, reverse=True)
['raspberry', 'banana', 'grape', 'apple']
>>> fruits
['grape', 'raspberry', 'apple', 'banana']
>>> fruits.sort()
>>> fruits
['apple', 'banana', 'grape', 'raspberry']
```

使用sorted函数会创造一个新的对象，而使用内置的sort()函数会直接进行内置的排序。

## 管理排好序的序列

`bisect`模块提供两个主要的函数：`bisect`和`insort`。

### 使用bisect搜索

`bisect(haystack, needle)`对`needle`在`haystack`中进行一次查找，后者必须是一个有序序列。

这个函数不止可以用作搜索，也可以用作插入：

```python
import bisect
import random
SIZE = 7
random.seed(1729)
my_list = []
for i in range(SIZE):
    new_item = random.randrange(SIZE*2)
    bisect.insort(my_list, new_item)
    print('%2d ->' % new_item, my_list)
```

我们看到的这么多应用在列表中的其实也应用于其他序列类型。

## 当不只是列表

### 数组（Arrays）

```python
>>> from array import array
>>> from random import random
>>> floats = array('d', (random() for i in range(10**7)))
>>> floats[-1]
0.07802343889111107
>>> fp = open('floats.bin', 'wb')
>>> floats.tofile(fp)
>>> fp.close()
>>> floats2 = array('d')
>>> fp = open('floats.bin', 'rb')
>>> floats2.fromfile(fp, 10**7)
>>> fp.close()
>>> floats2[-1]
0.07802343889111107
>>> floats2 == floats
True
```

### Deques and other queues

Deque代表双向队列，请看下面代码：

```python
>>> from collections import deque
>>> dq = deque(range(10), maxlen=10)
>>> dq
deque([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], maxlen=10)
>>> dq.rotate(3)
>>> dq
deque([7, 8, 9, 0, 1, 2, 3, 4, 5, 6], maxlen=10)
>>> dq.rotate(-4)
>>> dq
deque([1, 2, 3, 4, 5, 6, 7, 8, 9, 0], maxlen=10)
>>> dq.appendleft(-1)
>>> dq
deque([-1, 1, 2, 3, 4, 5, 6, 7, 8, 9], maxlen=10)
>>> dq.extend([11, 22, 33])
>>> dq
deque([3, 4, 5, 6, 7, 8, 9, 11, 22, 33], maxlen=10)
>>> dq.extendleft([10, 20, 30, 40])
>>> dq
deque([40, 30, 20, 10, 3, 4, 5, 6, 7, 8], maxlen=10)
```

注意，这上面的`rotate`函数，表示将所有元素向后移动，`appendleft`函数表示在左边增加一个元素，`extend`表示从右边扩展队列，`extendleft`表示从左边拓展队列。

