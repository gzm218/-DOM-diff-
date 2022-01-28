import vnode from './vnode';

// 编写一个低配版本的h函数
// 重载功能较弱
// 调用时必须是下面三种
// h('div', {}, 'wenzi');
// h('div', {}, []);
// h('div', {}, h());
export default function (sel, data, c) {
  // 检查参数个数
  if (arguments.length != 3) {
    throw new Error('我是低配的h函数');
  }
  // 检查c的类型
  if (typeof c == 'string' || typeof c == 'number') {
    //说明是h('div', {}, 'wenzi');
    return vnode(sel, data, undefined, c, undefined);
  } else if (Array.isArray(c)) {
    let children = [];
    //说明是h('div', {}, []);
    // 遍历c ,收集children
    for (let i = 0; i < c.length; i++) {
      // 检查c[i]必须是一个对象，如果不满足
      if (!(typeof c[i] == 'object' && c[i].hasOwnProperty('sel'))) {
        throw new Error('传入的数组参数中有项不是h函数');
      }
      // 这里不用执行c[i],因为你的测试语句中已经执行了
      // 此时只需要收集就行
      children.push(c[i]);
    }
    //循环结束了，就说明收集完毕 返回虚拟节点
    return vnode(sel, data, children);
  } else if (typeof c == 'object' && c.hasOwnProperty('sel')) {
    //说明是 h('div', {}, h());
    //
    let children = [c];
    return vnode(sel, data, children);
  } else {
    throw new Error('第三个参数不对');
  }
}
