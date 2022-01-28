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

const vonde1 = h('ul', {}, [
  h('li', { key: 'a' }, 'a'),
  h('li', { key: 'b' }, 'b'),
  h('li', { key: 'c' }, 'c'),
  h('li', { key: 'd' }, 'd'),
]);
//得到盒子和按钮
const container = document.getElementById('container');
const btn = document.getElementById('btn');
patch(container, vonde1);

//key 是节点的唯一标识,在最小量更新中起到重要作用
const vonde2 = h('ul', {}, [
  h('li', { key: 'e' }, 'e'),
  h('li', { key: 'a' }, 'a'),
  h('li', { key: 'b' }, 'b'),
  h('li', { key: 'c' }, 'c'),
  h('li', { key: 'd' }, 'd'),
]);

//点击按钮,将vnode1变为2
btn.onclick = function () {
  patch(vonde1, vonde2);
};
