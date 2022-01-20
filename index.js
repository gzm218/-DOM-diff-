import h from './mysnabbdom/h';

var myVode1 = h('div', {}, [
  h('p', {}, 'haha'),
  h('p', {}, 'gigi'),
  h('p', {}, 'xixi'),
  h('p', {}, [
    h('span', {}, 'xi'),
    h('span', {}, 'i'),
    h('span', {}, h('div', {}, '1')),
  ]),
]);

console.log(myVode1);
