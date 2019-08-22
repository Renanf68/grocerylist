export const initialState = {
  isLoading: false,
  isEdit: {
    is: false,
    id: '',
    obj: {}
  },
  food: [],
  hygiene: [],
  cleaning: [],
  total: 0
}

export const listCardReducer =  (state, action) => {
  switch (action.type) {
    case 'TO_EDIT':
        const { id, category, product, qtd, puni } = action.payload
      return {
        ...state,
        isEdit: {
          is: true,
          id: id,
          obj: {
            category,
            product,
            qtd,
            puni
          }
        }
      }
    case 'LOAD_DATA':
      return initialState
    case 'CHANGE_TYPE':
      return {
        ...state,
        typeInput: action.payload
      }
    case 'CHANGE_ATIV':
      return {
        ...state,
        ativInput: action.payload
      }
    case 'CHANGE_QTD':
      return {
        ...state,
        qtdInput: action.payload
      }
    case 'CHANGE_PC':
      return {
        ...state,
        pcInput: action.payload
      }
    case 'CHANGE_DOC':
      return {
        ...state,
        docInput: action.payload
      }
    case 'CHANGE_PV':
      return {
        ...state,
        pvInput: action.payload
      }
    case 'CHANGE_DOV':
      return {
        ...state,
        dovInput: action.payload
      }
    case 'SET_MESSAGE':
      return {
        ...state,
        message: action.payload
      }
    default:
      return state
  }
}