/*
	功能时可以在dataObj对象中，寻找用连续点符号的keyName属性

	例如 
	{
		a:{
			b:{
				c:100
			}
		}
	}
	lookup(dataobj,"a.b.c")的结果就是100
*/
export default function lookup(dataObj, keyName) {
  //判断keyName中有没有.符号 且不能是本身
  if (keyName.indexOf('.') != -1 && keyName != '.') {
    //有，拆开
    var keys = keyName.split('.');
    // 用于周转的临时变量
    var temp = dataObj;
    // 每找一层，就把它设置为新的临时变量
    for (let i = 0; i < keys.length; i++) {
      temp = temp[keys[i]];
    }
    return temp;
  }
  //如果没有
  return dataObj[keyName];
}
