import createElement from './createElement';
import updateChildren from './updateChildren';

export default function patchVnode(oldVnode, newVnode) {
  //判断新旧vnode是不是同一个对象
  if (oldVnode === newVnode) return;
  //判读viode有没有text属性
  if (
    newVnode.text != undefined &&
    (newVnode.children == undefined || newVnode.children.length == 0)
  ) {
    console.log('新vnode有text属性');
    if (newVnode.text != oldVnode.text) {
      //如果新的虚拟节点中的text和老的虚拟节点的text不同，写入
      console.log(newVnode.text);
      oldVnode.elm.innerText = newVnode.text;
    }
  } else {
    console.log('新vnode没有text属性');
    //判断老的有没有children
    if (oldVnode.children != undefined && oldVnode.children.length > 0) {
      //新老元素都有子元素
      updateChildren(oldVnode.elm, oldVnode.children, newVnode.children);
    } else {
      //老的没有子元素，新的有子元素
      oldVnode.elm.innerText = '';
      for (let i = 0; i < newVnode.children.length; i++) {
        let dom = createElement(newVnode.children[i]);
        oldVnode.elm.appendChild(dom);
      }
    }
  }
}
// let un = 0;
// for (let i = 0; i < newVnode.children.length; i++) {
// 	let ch = newVnode.children[i];
// 	let isExist = false;
// 	//再次遍历，查看oldnode中有没有节点的key和他一样
// 	for (let j = 0; j < oldVnode.children.length; j++) {
// 		if (
// 			oldVnode.children[j].sel == ch.sel &&
// 			oldVnode.children[j].key == ch.key
// 		) {
// 			isExist = true;
// 		}
// 	}
// 	if (!isExist) {
// 		console.log(ch);
// 		let dom = createElement(ch);
// 		ch.elm = dom;
// 		if (un < oldVnode.children.length) {
// 			oldVnode.elm.insertBefore(dom, oldVnode.children[un].elm);
// 		} else {
// 			oldVnode.elm.appendChild(dom);
// 		}
// 	} else {
// 		un++;
// 	}
// }
