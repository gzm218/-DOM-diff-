import Observe from './Observer';
export default function observe(value) {
  // 判断是否为对象
  if (typeof value != 'object') return;
  // 定义ob
  var ob;
  if (typeof value.__ob__ !== 'undefined') {
    ob = value.__ob__;
  } else {
    ob = new Observe(value);
  }
  return ob;
}
