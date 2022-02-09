import defineReactive from './defineReactive';
import { def } from './untils';
import { arrayMethood } from './array';
import observe from './observe';
import Dep from './Dep';

// Observer的目的时将一个正常的obj转换为每个层级的的属性都是响应式的obj
export default class Observer {
  constructor(value) {
    //每一个Observer的实例对象上都有一个dep
    //Oberver类中的new的Dep是整个obj中的dep,收集obj中的整体变化,
    this.dep = new Dep();
    // 给实例（this 添加了__ob__属性，值是这次new的实例
    def(value, '__ob__', this, false);
    // console.log('构造器', value);
    // 判断是数组还是对象
    if (Array.isArray(value)) {
      // 如果是数组，将责怪数组的原型指向arrayMethood
      Object.setPrototypeOf(value, arrayMethood);
    } else {
      this.walk(value);
    }
  }

  // 深层遍历子属性
  walk(value) {
    for (let k in value) {
      defineReactive(value, k);
    }
  }
  // 数组的遍历
  observeArray(arr) {
    for (let i = 0; i < arr.length; i++) {
      // 逐项进行observe
      observe(arr[i]);
    }
  }
}
