import patchVnode from './patchVnode';
import createElement from './createElement';
//判断是不是同一个虚拟节点
function checkSameVonde(a, b) {
  return a.sel == b.sel && a.key == b.key;
}

export default function updateChildren(parentElm, oldCh, newCh) {
  console.log('updateChildren');
  console.log(oldCh, newCh);

  //旧前 新前 旧后 新后
  let oldStartIdx = 0;
  let newStartIdx = 0;
  let oldEndIdx = oldCh.length - 1;
  let newEndIdx = newCh.length - 1;
  //旧前 新前 旧后 新后节点
  let oldStartVnode = oldCh[0];
  let newStartVnode = newCh[0];
  let oldEndVnode = oldCh[oldEndIdx];
  let newEndVnode = newCh[newEndIdx];

  let keyMap = null;
  //条件
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    console.log('xing');
    //首先应该不是判断四种命中，而是略过已经加了undefined标记的项
    if (oldStartVnode === null || oldCh[oldStartIdx] === undefined) {
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (oldEndVnode === null || oldCh[oldEndIdx] === undefined) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (newStartVnode === null || newCh[newStartIdx] === undefined) {
      newStartVnode = newCh[++newStartIdx];
    } else if (newEndVnode === null || newCh[newEndIdx] === undefined) {
      newEndVnode = newCh[--newEndIdx];
    }
    //新前旧前
    else if (checkSameVonde(oldStartVnode, newStartVnode)) {
      console.log('命中1新前旧前');
      patchVnode(oldStartVnode, newStartVnode);
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    }
    //新后旧后
    else if (checkSameVonde(oldEndVnode, newEndVnode)) {
      console.log('命中2旧后新后');
      patchVnode(oldEndVnode, newEndVnode);
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    }
    //新后旧前
    else if (checkSameVonde(newEndVnode, oldStartVnode)) {
      console.log('命中3新后旧前');
      patchVnode(oldStartVnode, newEndVnode);
      //当命中3后，此时要移动节点。移动新前指向这个节点到老节点的旧后的后面
      //如何移动节点？只要插入一个已经在DOM树上的节点，它就会被移动
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    }
    //旧后新前
    else if (checkSameVonde(oldEndVnode, newStartVnode)) {
      console.log('命中4新前旧后');
      patchVnode(oldEndVnode, newStartVnode);
      //当命中4后，此时要移动节点。移动新前指向这个节点到老节点的旧后的前面
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    }
    //四种命中都没用匹配到
    else {
      // 寻找 keyMap 一个映射对象， 就不用每次都遍历old对象了
      if (!keyMap) {
        keyMap = {};
        // 记录oldVnode中的节点出现的key
        // 从oldStartIdx开始到oldEndIdx结束，创建keyMap
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
          const key = oldCh[i].key;
          if (key != undefined) {
            keyMap[key] = i;
          }
        }
      }
      console.log(keyMap);
      //寻找当前这项（newStartIdx）这项在keymap中的映射的位置序号
      const idxinOld = keyMap[newStartVnode.key];
      console.log(idxinOld);
      if (idxinOld == undefined) {
        //如果idxinOld是全新的项，则idxinOld为undefined
        //被加入的项 是虚拟dom
        parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm);
      } else {
        //表示不是全新的项 要移动
        const elmToMove = oldCh[idxinOld];
        patchVnode(elmToMove, newStartVnode);
        oldCh[idxinOld] = undefined;
        parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm);
      }
      newStartVnode = newCh[++newStartIdx];
    }
  }

  //继续看看有没有剩余的
  if (newStartIdx <= newEndIdx) {
    console.log('还有剩余');
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      // insertBefore方法可以自动识别null，如果是null就会自动排到队尾，和appendChild一致
      parentElm.insertBefore(createElement(newCh[i]), oldCh[oldStartIdx].elm);
    }
  } else if (oldStartIdx <= oldEndIdx) {
    console.log('old还有剩余节点');
    //批量删除oldStartIdx和oldEndIdx之间的项
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      if (oldCh[i]) {
        parentElm.removeChild(oldCh[i].elm);
      }
    }
  }
}
