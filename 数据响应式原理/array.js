import { def } from './untils';
// 得到 Array.prototype
const arrayPrototpe = Array.prototype;

// 以 Array.prototype 为原型 创建了一个 arrayMethood 对象
export const arrayMethood = Object.create(arrayPrototpe);

//改写的7个方法
const changeMenthood = [
  'push',
  'pop',
  'shifit',
  'unshifit',
  'splice',
  'sort',
  'reverse',
];

changeMenthood.forEach((methodName) => {
  //备份
  const original = arrayPrototpe[methodName];

  //定义新的
  def(
    arrayMethood,
    methodName,
    function () {
      // 恢复原来功能
      const result = original.apply(this, arguments);

      const args = [...arguments];
      // 取出__ob__ 在遍历obj这个对象的时候已经给g加了__ob__这个属性
      const ob = this.__ob__;
      // push unshifit spliceb 能够插入新项，现在要把插入的新项也要变为observe的
      let inserted = [];

      switch (methodName) {
        case 'push':
        case 'unshifit':
          inserted = arguments;
          break;
        case 'splice':
          // spice格式是spice(下标，数量，插入新项)
          inserted = args.slice(2);
          break;
      }
      // 判断有没有要插入的新项，让新项也变为响应的
      if (inserted) {
        ob.observeArray(inserted);
      }

      console.log(1);

      return result;
    },
    false
  );
});
