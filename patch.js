import vnode from './vnode';
import createElement from './createElement';
import patchVnode from './patchVnode';
export default function patch(oldVnode, newVnode) {
  //判断传入的第一个参数，是DOM节点还是虚拟节点
  if (oldVnode.sel == '' || oldVnode.sel == undefined) {
    //DOM节点
    oldVnode = vnode(
      oldVnode.tagName.toLowerCase(),
      {},
      [],
      undefined,
      oldVnode
    );
  }
  // 判断oldVnode和newVnode 是不是同一个节点
  if (oldVnode.key == newVnode.key && oldVnode.sel == newVnode.sel) {
    // console.log('同一个节点');
    patchVnode(oldVnode, newVnode);
  } else {
    console.log('暴力拆除,删除旧的，插入新的');
    let newVondeElm = createElement(newVnode);
    //插入老节点之前
    if (oldVnode.elm.parentNode && newVondeElm) {
      oldVnode.elm.parentNode.insertBefore(newVondeElm, oldVnode.elm);
    }
    oldVnode.elm.parentNode.removeChild(oldVnode.elm);
  }
}
