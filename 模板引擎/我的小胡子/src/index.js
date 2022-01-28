import renderTem from './renderTem';
import parsetokens from './parsetokens';
import lookup from './lookup';
//全局提供myMustache
window.myMustache = {
  render(tmeplateStr, data) {
    //调用tokens函数，让模板字符串弄够变为token数组
    var tokens = parsetokens(tmeplateStr);
    //调用函数，让tokens数组变为dom字符串
    var domStr = renderTem(tokens, data);
    return domStr;
  },
};
