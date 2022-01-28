import nextTokens from './nextTokens';
import Scanner from './Scanner';

export default function tokens() {
  //实例化一个扫描器，构造时候提供一个参数，这个参数就是模板字符串
  //也就是说这个扫描器就是针对模板字符串工作的
  var scanner = new Scanner(tmeplateStr);
  var tokens = [];
  var word;
  while (!scanner.eos()) {
    //收集开始标记出现的文字
    word = scanner.scanUtil('{{');
    if (word != '') {
      //去空格
      let isInJJH = false;
      //空白字符串
      var _words = '';
      for (let i = 0; i < word.length; i++) {
        //判断空格是不是在标签里
        if (word[i] == '<') {
          isInJJH = true;
        } else if (word[i] == '?') {
          isInJJH = false;
        }
        //如果不是空格就拼接上
        if (!/\s/.test(word[i])) {
          _words += word[i];
        } else {
          //如果是空格，只有当他再标签内才接上
          if (isInJJH) {
            _words += ' ';
          }
        }
      }

      //存
      tokens.push(['text', _words]);
    }
    //过
    scanner.scan('{{');
    //收集标记的文字
    word = scanner.scanUtil('}}');
    if (word != '') {
      if (word[0] == '#') {
        //存
        tokens.push(['#', word.substring(1)]);
      } else if (word[0] == '/') {
        tokens.push(['/', word.substring(1)]);
      } else {
        tokens.push(['name', word]);
      }
    }
    //过
    scanner.scan('}}');
  }
  return nextTokens(tokens);
}
