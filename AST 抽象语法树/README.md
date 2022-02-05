# AST 抽象语法树

    抽象语法树（Abstract Syntax Tree）本质上是一个 js 对象

### 本质上是一个 js 对象

## 抽象语法树和虚拟节点的关系

    模板语法 → 抽象语法树AST → 渲染函数(h函数)

![cmd-markdown-logo](/img/AST.png)

## 指针思想 双指针 来源生活

指针就是下标位置

## 递归

- 使用的场景技巧：规则复习
- 递归案例
  ```js
  //斐波那契数列，求前N项的和
  1 1 2 3 5 8 13 21 34 55
  ```
- 递归案例二

  ```js
  //将高维数组 [1, 2, [3, [4, 5], 6], 7, [8], 9] ）
  {
    children: [
      { value: 1 },
      { value: 2 },
      {
        children: [
          { value: 3 },
          {
            children: [{ value: 4 }, { value: 5 }],
          },
          { value: 6 },
        ],
      },
      { value: 7 },
      {
        children: [{ value: 8 }],
      },
      { value: 9 },
    ];
  }
  ```

## 栈

- 使用的场景技巧：词法分析、模板字符串
- 案例
  ```js
  // smartRepeat 智能重复字符串问题
  将 '3[abc]' 变为 'abcabcabc'
  将 '3[2[a]2[b]]' 变成 'aabbaabbaabb'
  将 '2[1[a]3[b]2[3[c]4[d]]]' 变成 'abbbcccddddcccddddabbbcccddddcccdddd'
  ```
  - 思路 遍历每一个字符
    - 创建两个栈
    - 如果这个字符是数字，那么就把数字压入 [栈 1]，把空字符串压入 [栈 2]
    - 如果这个字符是字母，那么此时就把 [栈 2 ]的栈顶这项改为这个字母
    - 如果这个字符是 ] ，那么就将数字从 栈 1 弹栈，就把 栈 2 的栈顶的元素重复 栈 1 弹出数字的次数，栈 2 弹栈，拼接到 栈 2 的新的栈顶

## 关于正则表达式

- replace()

```js
'asdasdgfasd1212451234'.replace(/\d/g, ''); //"asdasdgfasd"
```

- serach()

```js
'asdasdgfasd1212451234'.search(/\d/g); //11
'asdasdgfasd1212451234'.search(/\d/); //11
```

- match()

```js
'asdasdgfasd1212451234'.match(/\d/); //['1', index: 11, input: 'asdasdgfasd1212451234', groups: undefined]

'asdasdgfasd1212451234'.match(/\d/g); //['1', '2', '1', '2', '4', '5', '1', '2', '3', '4']
```

## 工作机理

```html
<div>
  <h3 class="box" title="标题" data-type="3">你好</h3>
  <ul>
    <li>A</li>
    <li>B</li>
    <li>C</li>
  </ul>
</div>
```

转换为 AST 树

```js
{
    tag: "div",
    attrs: [],
    children: [
        {
            tag: "h3",
            attrs: [
                { name: "name", value: "box" },
                { name: "title", value: "标题" },
                { name: "data-type", value: "3" }
            ],
            children: [
                {
                    text: "你好",
                    type: "3"
                }
            ]
        },
        {
            tag: "ul",
            attrs: [],
            children: [
                { tag: 'li', children: [{ text: "A", type: "3" }], attrs: [] },
                { tag: 'li', children: [{ text: "B", type: "3" }], attrs: [] },
                { tag: 'li', children: [{ text: "C", type: "3" }], attrs: [] }
            ]
        }
}

```
