---
categories: 算法
title: LeetCode Solutions
---

# 1

可以使用Hashmap加快速度。

因为在该数组中我们保证了不同的数字$nums[i]$只有一个下标$i$，所以我们可以使用Map数据结构，而Hashmap可以通过空间来换取时间，通过计算$target-nums[i]$作为键值来快速定位其坐标$j$。

```c++
// 普通暴力解法
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        for(int i = 0; i < nums.size(); i++){
            for(int j = i + 1; j < nums.size(); j++){
                if(nums[i] + nums[j] == target) {
                    vector<int> res;
                    res.push_back(i);
                    res.push_back(j);
                    return res;
                }
            }
        }
        vector<int> res;
        res.push_back(0);
        res.push_back(0);
        return res;
    }
};
```

# 2

使用指针对每一位进行迭代相加即可，注意进位问题。

注意，这里的计算次序不能反：

```c++
val = (add1 + add2 + flag) % 10;
flag = (add1 + add2 + flag) / 10;
```

这道题目的代码如下：

```c++
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        struct ListNode* l3 = new ListNode(0);
        struct ListNode* res = l3;
        int add1 = 0;
        int add2 = 0;
        int flag = 0;
        int val = 0;
        while(l1 || l2){
            if (l1){
                add1 = l1->val;
                l1 = l1->next;
            } 
            else add1 = 0;
            if (l2){
                add2 = l2->val;
                l2 = l2->next;
            }
            else add2 = 0;
            val = (add1 + add2 + flag) % 10;
            flag = (add1 + add2 + flag) / 10;
            l3->val = val;
            if(l1 || l2){
                struct ListNode* temp = new ListNode(0);
                l3->next = temp;
                l3 = l3->next;
            }
        }
        if (flag){
            struct ListNode* temp = new ListNode(0);
            l3->next = temp;
            l3 = l3->next;
            l3->val = 1;
        }
        return res;
    }
};
```

# 3

这是一个缩小规模问题，该问题可以通过不断缩小问题规模来解决。设开始下标为$start$，结束下标为$end$，从头到尾扫描整个字符串，当发现有字符$s[j]$与前面字符$s[i]$相同时，有：
$$
res_{start, end} = max(j-start, res_{i+1,end})
$$
于是，我们将问题不断缩小，最终通过一遍遍历得到答案。

这道题目的代码如下：

```python
class Solution(object):
    def lengthOfLongestSubstring(self, s):
        """
        :type s: str
        :rtype: int
        """
        start = 0
        end = len(s)
        res = 0
        while start < end:
            flag = 1
            se = set()
            for j in range(start, end):
                if s[j] in se:
                    for i in range(start, j):
                        if s[i] == s[j]:
                            res = max(res, j - start)
                            start = i + 1
                            flag = 0
                            break
                else:
                    se.add(s[j])
            if flag:
                res = max(res, end - start)
                break
        return res
```

# 4

首先理清这道题的**核心思想**：

> 中位数：可以把中位数理解成为一个分隔符，这个分隔符的左半部分与右半部分相等，且左半部分的最大值不大于右半部分的最小值。
>
> 在一个长度为$m$的数组中，$i$共有$m+1$个可能的位置，即$i \in [0,m]$，对于任意的$i$，其将$a[0]...a[i-1]$与$a[i]...a[m-1]$分割开来。对于一个中位数，需要满足以下两点：
>
> - $len(a[0]...a[i-1])=len(a[i]...a[m-1])$，即$len(a_{left})=len(a_{right})$;
> - 当数组$a$有序时，$a[i-1]<a[i]$.

由于我们有两个长度分别为$m,n$的数组$a,b$，所以我们需要同时确定两个分隔符$i$和$j$，使得

- $len(a_{left})+len(b_{left})=len(a_{right})+len(b_{right})$；
- $a[i-1]<b[j],b[j-1]<a[i]$.

当然，同时求解两个变量$i,j$有些繁琐，所以我们使用其中的条件一来作为一个约束，使得整个问题编程只有一个条件一个变量的问题。

>- 当$m+n$为偶数时，$len(a_{left})+len(b_{left})=i+j=(m+n)/2$，即$j=(m+n)/2-i$；
>
>- 当$m+n$为奇数时，我们可以把中位数包含在左边，也可以包含在右边。当在左边时$i+j=(m+n+1)/2=(m+n)/2$，当在右边时，$i+j=(m+n)/2-1=(m+n-2)/2$，显然，为了保持一致，将中位数放在左边的位置比较好，此时中位数即为：
>  $$
>  max(a[i-1],b[j-1])
>  $$

这个时候，我们只需要在$[0,m]$内遍历变量$i$，即可求得结果。

当然，遍历的时间复杂度是$O(m)$，离我们所要求的$O(\log (m+n))$还有差距，所以我们可以使用基于分治思想的二分查找法，即当$a[i-1]>b[j]$时，说明$i$过大，应当向左移动二分之一；当$b[j-1]>a[i]$时，说明$i$过小，应当向右移动二分之一，才能实现对数级的时间复杂度。

接下来加入**边界条件**考虑问题：

主要的边界条件有：

- $m+n$的奇偶问题，当其为奇数时，$res=max(left)$，当为偶数时，$res=(max(left)+min(right))/2$；
- 当$i=0$或者$j=0$时，可以计算$max(left)$，否则$min(right)$也可以计算；
- 当$i=m$或者$j=n$时，可以计算$min(right)$，从而$res=(max(left)+min(right))/2$。

整道题目的代码如下：

```python
class Solution(object):
    def findMedianSortedArrays(self, nums1, nums2):
        """
        :type nums1: List[int]
        :type nums2: List[int]
        :rtype: float
        """
        m = len(nums1)
        n = len(nums2)
        if m > n:
            nums1, nums2, m, n = nums2, nums1, n, m

        odd = (m + n) % 2
        start = 0  # 开始元素下标
        end = len(nums1)  # 结束元素下标

        while start <= end:
            i = (start + end) / 2
            j = (m + n + 1) / 2 - i

            if j != 0 and i != m and nums2[j-1] > nums1[i]:
                start = i + 1

            elif i != 0 and j != n and nums1[i-1] > nums2[j]:
                end = i - 1

            else:
                if i == 0:
                    max_left = nums2[j-1]
                elif j == 0:
                    max_left = nums1[i-1]
                else:
                    max_left = max(nums1[i-1], nums2[j-1])
                if odd:
                    return max_left

                if i == m:
                    min_right = nums2[j]
                elif j == n:
                    min_right = nums1[i]
                else:
                    min_right = min(nums1[i], nums2[j])

                return (float(max_left) + min_right) / 2
```

# 5

可以将给定字符串反转，从而成为一个最长子串问题。

在记录最长子串时，由于$aacdecaa$翻转过来后会判定$aac$成为最长回文串，所以在记录时要首先判断是不是回文串。

整道题目的代码如下：

```python
class Solution(object):
    def longestPalindrome(self, s):
        """
        :type s: str
        :rtype: str
        """
        s2 = s[::-1]
        length = len(s)
        res_list = [[0 for j in range(length + 1)] for i in range(length + 1)]
        res = 0
        res_s = ""

        for i in range(1, length + 1):
            for j in range(1, length + 1):
                if s[i - 1] == s2[j - 1]:
                    res_list[i][j] = res_list[i-1][j-1] + 1
                    if res_list[i][j] > res:
                        temp_s = s[i-res_list[i][j]:i]
                        if temp_s == temp_s[::-1]:
                            res = res_list[i][j]
                            res_s = temp_s

        return res_s
```

# 6

对每一行进行计算，算出来每一行当中每一个位置对应的字母即可。

整道题目的代码如下：

```python
class Solution(object):
    def convert(self, s, numRows):
        """
        :type s: str
        :type numRows: int
        :rtype: str
        """
        if numRows == 1:
            return s

        res = ""
        n = len(s)
        for i in range(numRows):
            if i > 0 and i < numRows - 1:
                first = i
                second = i + (numRows - i - 1) * 2
                while first < n:
                    res += s[first]
                    if second < n:
                        res += s[second]
                    first += (2*numRows - 2)
                    second += (2*numRows - 2)
            else:
                index = i
                while index < n:
                    res += s[index]
                    index += (2*numRows - 2)

        return res
```

# 7

转化成字符串，反转之后再转化回来。

整道题目的代码如下：

```python
class Solution(object):
    def reverse(self, x):
        """
        :type x: int
        :rtype: int
        """
        x = str(x)
        flag = False
        if x[0] == '-':
            x = x[1::]
            flag = True
        x = x[::-1]
        if flag:
            res = -int(x)
        else:
            res = int(x)
        minv = -(1 << 31)
        maxv = (1 << 31) - 1
        if res < minv or res > maxv:
            return 0
        return res
```

# 8

没什么技术含量，但是需要考虑很多细节。

整道题目的代码如下：

```python
class Solution(object):
    def myAtoi(self, str):
        """
        :type str: str
        :rtype: int
        """
        str = str.lstrip()

        if str == "":
            return 0
        if str[0] == '-':
            flag = True
            str = str[1::]
        elif str[0] == '+':
            flag = False
            str = str[1::]
        else:
            flag = False
        res = ""
        for item in str:
            if item.isdigit():
                res += item
            else:
                break
        if res == "":
            return 0
        minv = -(1 << 31)
        maxv = (1 << 31) - 1
        res = -int(res) if flag else int(res)
        if res < minv:
            return minv
        if res > maxv:
            return maxv
        return res
```

# 8

乏善可陈。

整道题目的代码如下：

```python
class Solution(object):
    def isPalindrome(self, x):
        """
        :type x: int
        :rtype: bool
        """
        x = str(x)
        return (True if x == x[::-1] else False)
```

# 9

这道题采用动态规划的思想。下面按照动态规划四要素逐一进行考虑：

**状态定义**：$(i,j)$代表第$i$个字符与第$i$个模式字符之前的匹配结果，值为布尔值，代表匹配是否成功，我们需要找到一个正确的映射：
$$
(i,j) \Rightarrow \{0,1\} 
$$
**最终结果**：我们的结果可以表示成$(len(s),len(p))$的值。

**初始化**：由于任何空的$p$都无法匹配任何非空的$s$：故$(*,0)=0$，又因为空串能够和空模式匹配，故$(0,0)=1$，因为任何非空的$p$与空的$s$存在匹配的可能性，所以需要计算$(0,j)$的值，当$j=1$时，无法匹配，故$(0,1)=0$，当$j>1$时，如果为星号，则重复次数取零，即$(0,j)=(0,j-2)$，否则为0。

**状态转移方程**：这道题目的重点在于状态转移方程，在代码中已经列出，概括如下，在状态$(i,j)$：

- 如果当前模式字符不是星号：

  - 如果当前模式字符是点号或者两个字符相等，那么匹配成功：
    $$
    (i,j)=(i-1,j-1)
    $$

  - 否则，匹配失败：
    $$
    (i,j)=0
    $$

- 如果当前模式字符是星号：
  
  - 如果前一个模式字符能匹配当前字符，即$s[i-1]=p[j-2]$或者$p[j-2]=.$，那么：
    - 匹配零个：$(i,j)=(i,j-2)$；
    - 匹配一个：$(i,j)=(i,j-1)$；
    - 匹配多个：$(i,j)=(i-1,j)$。
  - 如果不能匹配，即强行匹配零个，那么$(i,j)=(i,j-2)$。

整道题目的代码如下：

```python
class Solution(object):
    def isMatch(self, s, p):
        """
        :type s: str
        :type p: str
        :rtype: bool
        """
        len_s = len(s)
        len_p = len(p)

        # initialization
        res_m = [[False for j in range(len_p + 1)] for i in range(len_s + 1)]

        for i in range(len_s + 1):
            res_m[i][0] = False

        res_m[0][0] = True
        if len_p != 0:
            res_m[0][1] = False

        for j in range(2, len_p + 1):
            if p[j-1] == '*':
                res_m[0][j] = res_m[0][j-2]
            else:
                res_m[0][j] = False

        # iterate
        for i in range(1, len_s + 1):
            for j in range(1, len_p + 1):
                if p[j-1] != '*':
                    if p[j-1] == s[i-1] or p[j-1] == '.':
                        res_m[i][j] = res_m[i-1][j-1]
                    else:
                        res_m[i][j] = False
                else:
                    if p[j-2] == s[i-1] or p[j-2] == '.':
                        res_m[i][j] = res_m[i][j -
                                               1] or res_m[i][j-2] or res_m[i-1][j]
                    else:
                        res_m[i][j] = res_m[i][j-2]

        return res_m[len_s][len_p]
```







# 129

可以把这道题形式化地表述一下：

> 给定一棵二叉树，遍历寻找这条树中从**根节点**到所有**叶子节点**的路径，统计每个路径当中数字所组成的数，并将所有路径的该数求和。

首先，我们可以使用DFS负责整个树的遍历，这解决了我们对于路径的遍历问题。

其次，我们可以把它看成一个动态规划问题。传统的动态规划用自然语言来定义的话，是以下的形式：

- 主要的问题可以分为若干个子问题，当解决了这些子问题后，主要问题也可通过子问题的答案得到解决。
- **问题**与**子问题**有着相同的形式，只是问题规模不同。当问题规模小到一定程度后（通常为1），问题则可以直接解决，不需要再依赖子问题。
- 通过从小问题到大问题的顺序解决问题，因为每一个问题的求解都依赖于小问题，这样可以省略很多空间和时间。

对应到我们的问题当中，**一个问题就是一个节点$n$到root节点的路径中的（组成数）的计算，它的子问题则是这个节点的父节点到root节点的路径中的（组成数）的计算**，总的问题则通过这些问题的求解结果的比较得出。

由以上定义可得，问题（不包括子问题）的个数与叶子节点的个数相当。一个叶子节点对应一个问题中的节点$n$。

于是，我们采用从小问题到大问题的顺序，从根节点往下通过DFS遍历，在DFS的每一个调用过程中传入当前问题的计算结果，作为更大的问题的计算所必须的参数。当遍历到叶子节点时，我们得到了一条路径的（组成数），通过求它们的差得到最终计算结果，并与现有结果求和即可。

整个算法和传统的动态规划中使用**返回值**作为子问题的计算结果的方式不同，它在子问题计算完后，并不返回，而是直接调用函数，并将计算结果作为该函数的参数传递。

仔细想想，和FP里的Continuation还有点像呢。

整道题目的代码如下：

```c++
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    int sumNumbers(TreeNode* root) {
        if(!root) return 0;
        if(!root->left && !root->right) return root->val;
        int l = root->left?sumNumbers(root->left, root->val): 0;
        int r = root->right?sumNumbers(root->right, root->val): 0;
        return l + r;
    }

    int sumNumbers(TreeNode* root, int val){
        val = val * 10 + root->val;
        if(!root->left && !root->right) return val;
        int l = root->left?sumNumbers(root->left, val): 0;
        int r = root->right?sumNumbers(root->right, val): 0;
        return l + r;
    }
};
```

# 1026

可以把这道题形式化地表述一下：

> 给定一棵二叉树，遍历寻找这条树中从**根节点**到所有**叶子节点**的路径，统计每个路径当中最大值减去最小值的差值，并给出所有路径中最大的差值。

首先，我们可以使用DFS负责整个树的遍历，这解决了我们对于路径的遍历问题。

其次，我们可以把它看成一个动态规划问题。传统的动态规划用自然语言来定义的话，是以下的形式：

- 主要的问题可以分为若干个子问题，当解决了这些子问题后，主要问题也可通过子问题的答案得到解决。
- **问题**与**子问题**有着相同的形式，只是问题规模不同。当问题规模小到一定程度后（通常为1），问题则可以直接解决，不需要再依赖子问题。
- 通过从小问题到大问题的顺序解决问题，因为每一个问题的求解都依赖于小问题，这样可以省略很多空间和时间。

对应到我们的问题当中，**一个问题就是一个节点$n$到root节点的路径中的（最大值与最小值）的计算，它的子问题则是这个节点的父节点到root节点的路径中的（最大值与最小值）的计算**，总的问题则通过这些问题的求解结果的比较得出。

由以上定义可得，问题（不包括子问题）的个数与叶子节点的个数相当。一个叶子节点对应一个问题中的节点$n$。

于是，我们采用从小问题到大问题的顺序，从根节点往下通过DFS遍历，在DFS的每一个调用过程中传入当前问题的计算结果，作为更大的问题的计算所必须的参数。当遍历到叶子节点时，我们得到了一条路径的（最大值与最小值），通过求它们的差得到最终计算结果，并与现有结果比较即可。

整个算法和传统的动态规划中使用**返回值**作为子问题的计算结果的方式不同，它在子问题计算完后，并不返回，而是直接调用函数，并将计算结果作为该函数的参数传递。

仔细想想，和FP里的Continuation还有点像呢。

再仔细想象，这道题和129题也有点像呢。

整道题目的代码如下：

```c++
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
 
// 计算每一个深度路径的最大值与最小值，然后比较每一条路的最大差值，选取差值最大的返回
class Solution {
public:
    int maxAncestorDiff(TreeNode* root) {
        // 包含该节点在内的左部分树的最大差值
        int left = maxAncestorDiff(root->left, root->val, root->val);

        // 包含该节点在内的右部分树的最大差值
        int right = maxAncestorDiff(root->right, root->val, root->val);

        // 返回最大的差值
        return left > right? left: right;
    }

    // 传入的参数表示当执行到节点root时的状态（从根节点DFS到该节点时路径中的最大值与最小值，不包括这个节点），状态仅在末节点有用，用来计算末节点时的最大差值
    // 返回值为以root为根的树的最大差值
    int maxAncestorDiff(TreeNode* root, int max, int min) {
        if(!root) return 0;
        if(max < root->val) max = root->val;
        if(min > root->val) min = root->val;
        if(!root->left && !root->right) return max - min;
        int left = maxAncestorDiff(root->left, max, min);
        int right = maxAncestorDiff(root->right, max, min);
        return left > right? left: right;
    }
};
```



