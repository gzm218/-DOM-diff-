import Dep from './Dep';
import observe from './observe';
export default function defineReactive(data, key, val) {
  //defineReative中的new的Dep是obj每个key中dep,它收集这个key的数据变化
  const dep = new Dep();
  // console.log('defineReactive', key);
  if (arguments.length == 2) {
    val = data[key];
  }
  // 子元素要进行observe,此处形成递归。这个递归不是函数自己调用自己，而是多个函数、类循环调用
  let childOb = observe(val);
  Object.defineProperty(data, key, {
    enumerableL: true,
    configurable: true,
    //getter
    get() {
      console.log('访问' + key);
      // 如果处于依赖收集阶段
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
      }
      return val;
    },
    //setter
    set(newValue) {
      console.log('改变' + key, newValue);
      if (val === newValue) {
        return;
      }
      val = newValue;
      // 设置了新的值也要observe
      childOb = observe(newValue);
      // 发布订阅模式 通知dep
      dep.notify();
    },
  });
}
