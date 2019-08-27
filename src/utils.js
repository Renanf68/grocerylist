import toArray from 'lodash.toarray'
import { database } from './firebaseApp'

export function handleAuthError(code) {
  console.log(code)
  if(code === 'auth/wrong-password') {
    return 'Senha incorreta.'
  } else if (code === 'auth/invalid-email') {
    return 'Formato de email inválido.'
  } else if (code === 'auth/user-not-found') {
    return 'Usuário não encontrado.'
  } else if (code === 'auth/email-already-in-use') {
    return 'Usuário já cadastrado.' 
  } else if (code === 'auth/weak-password') {
    return 'Senha fraca.' 
  } else {
    return 'Erro não identificado.'
  }
}
export function handleSignUpError(email, passwd, passwd2) {
  if(email !== '') {
    if(passwd !== ''){
      if(passwd === passwd2) {
        return { status: true, msg: null }
      } else {
        return { status: false, msg: 'As senhas não conferem.' }
      }
    } else {
      return { status: false, msg: 'É preciso criar uma senha.' }
    }
  } else {
    return { status: false, msg: 'Favor informar seu email.' }
  }
}

/*export function creatId() {
  const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  const newId =
    timestamp +
    "xxxxxxxxxxxxxxxx"
      .replace(/[x]/g, function() {
        return ((Math.random() * 16) | 0).toString(16);
      })
      .toLowerCase();
  return newId;
}*/
export function creatId(type, listId) {
  const user = localStorage.getItem('user')
  if(type === 'list'){
    const newListId = database.ref(user).child('/lists').push().key
    return newListId
  } else if (type === 'item') {
    const itemId = database.ref(`${user}/lists`).child(`/${listId}`).push().key
    return itemId
  }
}

export const formatToFloat = rawValue => {
  let str = String(rawValue);
  if (str.length < 2) {
    str = `0${str}`;
  }
  const len = str.length;
  const dis = len - 2;
  const arr = str.split("");
  arr.splice(dis, 0, ".");
  const result = parseFloat(arr.join(""));
  return result;
};

export function convertMathToBRL(math) {
  let newString = math.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    style: "currency",
    currency: "BRL"
  });
  return newString;
}

export function newItemFormValidation(product, qtd) {
  if(product === '') {
    if(qtd < 1) {
      return {status: false, msg: 'Favor informar o nome do produto e a quantidade desejada.'}
    } else {
      return {status: false, msg: 'Favor informar o nome do produto.'}
    } 
  } else {
    if(qtd < 1) {
      return {status: false, msg: 'Favor informar a quantidade desejada.'}
    } 
  }
  return {status: true, msg: ''}
}

export function formDateValidation(date) {
  const dateArr = date.split('', 10)
  if(dateArr.length > 0) {
    if(dateArr[4] !== '-') {
      return {status: false, msg: 'Favor informar uma data válida.' }
    } else {
      if(dateArr[0] !== '2' && dateArr[1] !== '0') {
        return {status: false, msg: 'Favor informar uma data válida.' }
      } else {
        return {status: true, msg: '' }
      }
    }
  } else {
    return {status: false, msg: 'Favor informar uma data válida.' }
  }
}

export function getCopyItemsObj(items, listId) {
  const itemsArr = toArray(items)
  let newItemsObj = {}
  itemsArr.map( item => {
    const itemId = creatId('item', listId)
    const { product, category, qtd, punit, ptotal } = item
    return newItemsObj[itemId] = {
      id: itemId,
      product,
      category,
      qtd,
      punit,
      ptotal,
      check: false
    }
  })
  return newItemsObj
}

export function getNewItemObj(listId, itemId, product, category, qtd, price) {
  let objItemId
  if(itemId) {
    objItemId = itemId 
  } else {
    objItemId = creatId('item', listId)
  }
  const pUnitNum = formatToFloat(price)
  const pUnitStr = convertMathToBRL(pUnitNum)
  const pTotalNum = pUnitNum * qtd
  const pTotalStr = convertMathToBRL(pTotalNum)
  return {
    id: objItemId,
    obj: {
      id: objItemId,
      product,
      category,
      qtd,
      punit: {
        edit: price,
        num: pUnitNum,
        str: pUnitStr
      },
      ptotal: {
        num: pTotalNum,
        str: pTotalStr
      },
      check: false
    }
  }
}

export function dateFormat(date) {
  if (date !== '') {
    const dateArr = date.split('-', 3)
    return `${dateArr[2]}/${dateArr[1]}/${dateArr[0]}`
  } else {
    return date
  }
}
