//扫描类
export default class Scanner {
  constructor(tmeplateStr) {
    //将模板字符串写道实例上
    this.tmeplateStr = tmeplateStr;
    //指针
    this.pos = 0;
    //尾巴
    this.tail = tmeplateStr;
  }
  //走过{{,没有返回值
  scan(tag) {
    if (this.tail.indexOf(tag) == 0) {
      //比如跳过{{或}} 跳过2
      this.pos += tag.length;
      //改变尾巴，当前字指针这个字符开始，到最后的全部符号
      this.tail = this.tmeplateStr.substring(this.pos);
    }
  }
  // 让指针进行扫描，直到遇见指定内容结束，并且能够返回结束之前路过的内容
  scanUtil(stopTag) {
    //记录执行本方法的时候pos的值
    const pos_begin = this.pos;
    //当尾巴的开头不是stopTag时，就说明还没有扫描到stopTag
    //&&很有必要 否则会死循环
    while (!this.eos() && this.tail.indexOf(stopTag) != 0) {
      //当前指针的位置
      this.pos++;
      //改变尾巴为从当前指针这个字符开始，到最后全部的字符
      this.tail = this.tmeplateStr.substring(this.pos);
    }
    return this.tmeplateStr.substring(pos_begin, this.pos);
  }
  // 判断指针是否已经到头，返回布尔值 end  of
  eos() {
    return this.pos >= this.tmeplateStr.length;
  }
}
