/*
  tokens变dom字符串
*/

import lookup from './lookup';
import parseArr from './parseArr.JS';

export default function renderTem(tokens, data) {
  //设置一个结果字符串
  var resultStr = '';
  //遍历tokens
  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];

    //判断类型
    if (token[0] == 'text') {
      //拼接字符串
      resultStr += token[1];
    } else if (token[0] == 'name') {
      resultStr += lookup(data, token[1]);
    } else if (token[0] == '#') {
      var v = lookup(data, token[1]);
      for (let i = 0; i < v.length; i++) {
        //难点在于如何兼顾普通数组的复杂数组
        resultStr += renderTem(token[2], { ...v[i], '.': v[i] });
      }
    }
  }
  return resultStr;
}
