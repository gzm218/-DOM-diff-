/*
	函数功能是折叠tokens，嵌套数组
*/

export default function nextTokens(tokens) {
  //结果数组
  var nestTokens = [];
  //设置栈顶 栈结构，存放小tokens。栈顶的tokens数组中当前操作的这个tokens的第三项小数组
  var sections = [];
  /**
   * 收集器，默认指向nestedTkens结果数组
   * 当匹配到 # 的时候，改变收集器的指向，指向到当前token中新开辟的下一个维度的token
   * 当匹配到 / 的时候，改变收集器的指向，判断当前栈sections是否有值？有值，则指向当前的栈顶；没值，则指向最终结果 nestedTokens
   */
  var collector = nestTokens;

  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];
    switch (token[0]) {
      case '#':
        //第一次遇到#时 nestTokens等同于collector
        collector.push(token);
        //入栈
        sections.push(token);
        // 给当前匹配到的 #开头的token数组，开辟下标为2的下一个维度的子项，并且值为[]修正当前的收集器指向 新开辟的子项
        collector = token[2] = [];
        break;
      case '/':
        //出栈
        sections.pop();
        collector =
          sections.length > 0 ? sections[sections.length - 1][2] : nestTokens;
        break;
      default:
        collector.push(token);
    }
  }
  return nestTokens;
}
