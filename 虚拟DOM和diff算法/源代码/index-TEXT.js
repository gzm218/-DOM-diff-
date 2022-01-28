import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from 'snabbdom';

//创建patch函数
var patch = init([
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
]);

//创建虚拟节点
var myVnode1 = h(
  'a',
  { props: { href: 'http://www.baidu.com', target: '_blank' } },
  'baidu'
);
console.log(myVnode1);

//创建虚拟节点
var myVnode2 = h('div', {}, '空');
//创建虚拟节点
var myVnode3 = h('ul', [
  h('li', '苹果'),
  h('li', '西瓜'),
  h('li', '香蕉'),
  h('li', '橙子'),
]);
console.log(myVnode1);
console.log(myVnode1);
//让虚拟节点上树
const container = document.getElementById('container');
patch(container, myVnode3);
