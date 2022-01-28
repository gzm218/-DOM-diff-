import h from './mysnabbdom/h';
import patch from './mysnabbdom/patch';

const container = document.getElementById('container');
const btn = document.getElementById('btn');
// const myVnode1 = h('h1', {}, 'nihao');
const myVnode1 = h('ul', {}, [
  h('li', { key: 'a' }, 'a'),
  h('li', { key: 'b' }, 'b'),
  h('li', { key: 'c' }, 'c'),
  h('li', { key: 'd' }, 'd'),
  h('li', { key: 'e' }, 'e'),
]);
const myVnode2 = h('div', {}, [h('h1', {}, '新1'), h('h2', {}, '新2')]);
const myVnode3 = h('section', {}, 'nihao');
const myVnode4 = h('ul', {}, [
  h('li', { key: 'd' }, 'd'),
  h('li', { key: 'e' }, 'e'),
  h('li', { key: 'b' }, 'b'),
  h('li', { key: 'a' }, 'a'),
  h('li', { key: 'q' }, 'q'),
  h('li', { key: 'c' }, 'c'),
]);

patch(container, myVnode1);
//点击按钮,将vnode1变为2
btn.onclick = function () {
  patch(myVnode1, myVnode4);
};
