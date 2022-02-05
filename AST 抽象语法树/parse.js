import parseAttrs from './parseAttrs';
export default function parse(templateStr) {
  //指针
  var index = 0;
  //	标签栈
  var label = [];
  // 字符串栈
  var text = [{ children: [] }];
  // 剩余部分
  var rest = '';
  // 正则标签开始
  var startRegExp = /^\<([a-z]+[1-6]?)(\s[^\<]+)?\>/;
  // 标签结束正则
  var endRegExp = /^\<\/([a-z]+[1-6]?)\>/;
  // 抓取结束标记前的文字
  var wordRegExp = /^([^\<]+)\<\/[a-z]+[1-6]?\>/;
  while (index < templateStr.length - 1) {
    //剩余部分
    rest = templateStr.substring(index);
    if (startRegExp.test(rest)) {
      //遇到标签
      let tag = rest.match(startRegExp)[1];
      let attrsString = rest.match(startRegExp)[2];
      // console.log('开始', tag);
      // 将标签压栈
      label.push(tag);
      // 将空数组压栈
      text.push({ tag: tag, children: [], attrs: parseAttrs(attrsString) });
      const attrsStringLength = attrsString != null ? attrsString.length : 0;
      // 指针移动标签长度加2 <>占2 + 属性长度
      index += tag.length + 2 + attrsStringLength;
    } else if (endRegExp.test(rest)) {
      // 识别到 </ 时结束标签
      let tag = rest.match(endRegExp)[1];
      // console.log('结束', tag);
      let label_pop = label.pop();
      // 此时tag 一定是和标签栈栈顶一致
      if (tag == label_pop) {
        // 将标签弹栈
        let text_pop = text.pop();
        if (text.length > 0) {
          // 检查text是否有childr属性
          // if (!text[text.length - 1].hasOwnProperty('children')) {
          //   text[text.length - 1].children = [];
          // }
          text[text.length - 1].children.push(text_pop);
        }
      } else {
        throw new Error(label_pop + '标签没有闭合');
      }
      // 指针移动标签长度加3 </>占3
      index += tag.length + 3;
    } else if (wordRegExp.test(rest)) {
      // 遍历识别到文字且不能是全空
      let word = rest.match(wordRegExp)[1];
      // 判断是不是空
      if (!/^\s+$/.test(word)) {
        // console.log('文字', word);
        // 改变此时字符串栈元素顶中
        text[text.length - 1].children.push({ text: word, type: 3 });
      }
      // 指针移动文字长度
      index += word.length;
    } else {
      index++;
    }
  }
  return text[0].children[0];
}
