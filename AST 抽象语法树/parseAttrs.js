//  把attrsString 变成数组返回
export default function parseAttrs(attrsString) {
  if (attrsString == undefined) return [];
  console.log(attrsString);
  //判断引号
  let isQuotes = false;
  // 断点
  var point = 0;
  // 结果数组
  var res = [];
  // 遍历attrsString
  for (let i = 0; i < attrsString.length; i++) {
    let char = attrsString[i];
    if (char == '"') {
      isQuotes = !isQuotes;
    } else if (char == ' ' && !isQuotes) {
      //引号外的空格
      console.log(i);
      if (!/^\s*$/.test(attrsString.substring(point, i))) {
        res.push(attrsString.substring(point, i).trim());
        point = i;
      }
    }
  }

  // 循环结束之后，最后一个属性k=v
  res.push(attrsString.substring(point).trim());
  // 将纯属组转变为数组内对象
  res = res.map((item) => {
    // 根据等号拆分
    const o = item.match(/^(.+)="(.+)"$/);
    return {
      name: o[1],
      value: o[2],
    };
  });
  return res;
}
