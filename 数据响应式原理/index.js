import observe from './observe';
import Watcher from './Watcher';
var obj = {
  a: {
    m: {
      n: 5,
    },
  },
  b: 2,
  g: [22, 3, 677, 433],
};

observe(obj);

// obj.g.splice(2, 1, [88, 99]);
// console.log(obj.g);
new Watcher(obj, 'a.m.n', (val) => {
  console.log('@@@@', val);
});
obj.a.m.n = 99;
console.log(obj);
