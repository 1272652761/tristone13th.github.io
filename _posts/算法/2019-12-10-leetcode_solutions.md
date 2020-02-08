---
categories: 算法
title: LeetCode Solutions
---

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



