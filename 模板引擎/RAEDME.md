# mustache

- mustache 官方 git：https://github.com/janl/mustache.js
- mustache 是 “胡子” 的意思，因为它的嵌入标记 {{ }} 非常像胡子
- {{ }} 的语法也被 Vue 沿用
- mustache 是最早的模板引擎库，比 Vue 诞生的早多了，它的底层实现机理在当时是非常有创造性的、轰动性的，为后续模板引擎的发展提供了崭新的思路

### 历史上曾经出现的数据变为视图的方法

- 纯 DOM 法
- 数组 jion 法
- ES6 反引导法

### mustache 使用

```html
<div id="text"></div>
<script type="template" id="mytemplate"></script>
<script src="/模板引擎/mustache/node_modules/mustache/mustache.js"></script>
<script>
  //循环
  var tmeplateStr = `
       {{#arr}}
           <ul>
             <li>
               <div class="hd">{{name}}的基本信息</div>
               <div class="bd">
                 <p>姓名:{{name}}</p>
                 <p>年龄:{{age}}</p>
                 <p>性别:{{sex}}</p>
               </div>
             </li>
            </ul>
           {{/arr}}
      `;
  const data1 = {
    arr: [
      { name: 'ming', age: 12, sex: '男 ' },
      { name: 'hong', age: 11, sex: '女 ' },
      { name: 'qiang', age: 13, sex: '男 ' },
    ],
  };

  //不循环
  var tmeplateStr1 = `<h1>今天我买了一个{{good}},好{{mood}}</h1>`;
  const data2 = {
    good: '奶茶',
    mood: '开心',
  };
  //虚幻简单数组
  const data3 = {
    arr: ['a', 'b', 'c'],
    arr2: [
      {
        name: 'ming',
        age: 12,
        sex: '男 ',
        hobbies: ['吃饭', '睡觉', '编程'],
      },
      {
        name: 'hong',
        age: 11,
        sex: '女 ',
        hobbies: ['画画', '唱歌', '编程'],
      },
      {
        name: 'qiang',
        age: 13,
        sex: '男 ',
        hobbies: ['健身', '睡觉', '编程'],
      },
    ],
  };
  var tmeplateStr2 = `
               <ul>
                   {{#arr}}
                       <li>{{.}}</li>
                   {{/arr}}
               </ul>
         `;
  //数组的嵌套
  var tmeplateStr3 = `
              <ul>
                 {{#arr2}}
                     <li>
                       {{name}}的爱好是:
                       <ol>
                         {{#hobbies}}
                             <li>{{.}}</li>
                         {{/hobbies}}
                       </ol>
                     </li>
                 {{/arr2}}
             </ul>
         `;
  const domStr = Mustache.render(tmeplateStr, data1);
  const domStr2 = Mustache.render(tmeplateStr1, data2);
  const domStr3 = Mustache.render(tmeplateStr2, data3);
  const domStr4 = Mustache.render(tmeplateStr3, data3);
  const text = document.getElementById('text');
  text.innerHTML = domStr4;
</script>
```

### mustache 底层核心机理

- replace() 方法实现简单地模板数据填充
- mustache 库不能用简单的正则表达式思路实现
- ![cmd-markdown-logo](/img/mus原理.png)
- mustache 库底层重点要做 2 个事情
  - 将模板字符串编译为 tokens 形式
  - 将 tokens 结合数据，解析为 dom 字符串

### 什么是 token？

- tokens 就是 JS 的嵌套数组，说白了，就是模板字符串的 JS 表示
- 它是“抽象语法树”、“虚拟节点”等等的开山鼻祖
- 模板字符串
  ```html
  <h1>我买了一个{{thing}}，好{{mood}}啊</h1>
  ```
- tokens

  ```js
  [
    ['text', '<h1>我买了一个'],
    ['name', 'thing'],
    ['text', '好'],
    ['name', 'mood'],
    ['text', '啊</h1>'],
  ];
  ```

#### 循环情况下的 token

- 当模板字符串中有循环存在时，它将被编译为嵌套更深的 tokens
- 模板字符串

  ```html
  <div>
    <ul>
      {{#arr}}
      <li>{{.}}</li>
      {{/arr}}
    </ul>
  </div>
  ```

- tokens

  ```js
  [
  ["text", "<div><ul>"],
  [
    "#",
    "arr",
    [
      ["text", "li"],
      ["name", "."],
      ["text": "</li>"]
    ]
  ],
  ["text", "</ul></div>"]
  ]

  ```

#### 双重循环下的 tokens

- 当循环是双重的，那么 tokens 会更深一层
- 模板字符串

  ```html
  <div>
    <ol>
      {{#students}}
      <li>
        学生{{name}}的爱好是
        <ol>
          {{#hobbies}}
          <li>{{.}}</li>
          {{/hobbies}}
        </ol>
      </li>
      {{/students}}
    </ol>
  </div>
  ```

- tokens

  ```js
  [
    ['text', '<div><ol>'],
    [
      '#',
      'students',
      [
        ['text', '<li>学生'],
        ['name', 'name'],
        ['text', '的爱好是<ol>'],
        [
          '#',
          'hobbies',
          [
            ['text', '<li>'],
            ['name', '.'],
            ['text', '</li>'],
          ],
        ],
        ['text', '</ol></li>'],
      ],
    ],
    ['text', '</ol></div>'],
  ];
  ```

## mustache 的实现

### 1 实现 Scanner 扫描器类

### 2 生成 token 数组

### 3 将 tokens 结合数据，解析为 dom 字符串

## 补充一个 JavaScript 数组的栈和队列的操作方法。

### 堆栈和队列

- 要了解 JavaScript 数组的堆栈和队列方法的操作，需要先对堆栈和队列基础知识有所了解。在继续后面的内容之前，我们先简单的了解一下堆栈和队列的概念。

- 栈和队列都是动态的集合，在栈中，可以去掉的元素是最近插入的那一个。栈实现了后进先出。在队列中，可以去掉的元素总是在集合中存在的时间最长的那一个。队列实现了先进先出的策略。
- 堆栈![cmd-markdown-logo](/img/zhan.png)

  - 栈是一种 LIFO（Last-In-First-Out，后进先出）的数据结构，也就是最新添加的项最早被移除。而栈中项的插入（叫做推入）和移除（叫做弹出），只发生在一个位置——栈的顶部。
  - 最开始栈中不含有任何数据，叫做空栈，此时栈顶就是栈底。然后数据从栈顶进入，栈顶栈底分离，整个栈的当前容量变大。数据出栈时从栈顶弹出，栈顶下移，整个栈的当前容量变小。
  - 比如说，我们在一个箱子中放了很多本书，如果你要拿出第二书，那么你要先把第一本书拿出来，才能拿第二本书出来；拿出第二本书之后，再把第一本书放进去。
  - ECMAScript 为数组专门提供了 push() 和 pop() 方法，以便实现类似栈的行为。 push()
  - 方法可以接收任意数量的参数，把它们逐个添加到数组末尾，并返回修改后数组的长度。而
  - pop() 方法则从数组末尾移除最后一项，减少数组的 length 值，然后返回移除的项。

- 队列![cmd-markdown-logo](/img/rulie.png)
  - 栈数据结构的访问规则是 LIFO(后进先出)，而队列数据结构的访问规则是 FIFO(Fist-In-First-Out,先进先出)。队列在列表的末端添加项，从列表的前端移除项。
  - ECMAScript 为数组专门提供了 shift() 和 unshift() 方法，以便实现类似队列的行为。由于 push() 是向数组末端添加数组项的方法，因此要模拟队列只需一个从数组前端取得数组项的方法。实现这一操作的数组方法就是 shift() ，它能够移除数组中的第一个项并返回该项，同时将数组长度减 1。
