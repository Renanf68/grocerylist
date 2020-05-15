import toArray from "lodash.toarray";
import { convertMathToBRL } from "../../utils";

export const initialState = {
  isLoading: true,
  showNewItemForm: false,
  showCloseListForm: false,
  msg: {
    status: false,
    type: "",
    message: "",
  },
  editingAlias: {
    status: false,
    newAlias: "",
  },
  isEdit: {
    status: false,
    itemId: null,
    obj: {},
  },
  isRemoving: {
    status: false,
    itemId: null,
    category: "",
    product: "",
  },
  listId: "",
  listAlias: "",
  listStatus: "open",
  food: [],
  hygiene: [],
  cleaning: [],
  others: [],
  totalToDisplay: 0,
};

export const listCardReducer = (state, action) => {
  switch (action.type) {
    case "SET_LIST_ID":
      return {
        ...state,
        listId: action.payload,
      };
    case "GET_LIST":
      const listAlias = action.payload.alias;
      const listStatus = action.payload.status;
      const food = action.payload.items.food
        ? toArray(action.payload.items.food)
        : [];
      const hygiene = action.payload.items.hygiene
        ? toArray(action.payload.items.hygiene)
        : [];
      const cleaning = action.payload.items.cleaning
        ? toArray(action.payload.items.cleaning)
        : [];
      const others = action.payload.items.others
        ? toArray(action.payload.items.others)
        : [];
      const total =
        food.map((prod) => prod.ptotal.num).reduce((n1, n2) => n1 + n2, 0) +
        hygiene.map((prod) => prod.ptotal.num).reduce((n1, n2) => n1 + n2, 0) +
        cleaning.map((prod) => prod.ptotal.num).reduce((n1, n2) => n1 + n2, 0) +
        others.map((prod) => prod.ptotal.num).reduce((n1, n2) => n1 + n2, 0);
      const totalToDisplay = convertMathToBRL(total);
      return {
        ...state,
        isLoading: false,
        listAlias,
        listStatus,
        food,
        hygiene,
        cleaning,
        others,
        totalToDisplay,
      };
    case "HANDLE_NEWITEMFORM":
      return {
        ...state,
        showNewItemForm: !state.showNewItemForm,
      };
    case "HANDLE_CLOSELISTFORM":
      return {
        ...state,
        showCloseListForm: !state.showCloseListForm,
      };
    case "EDITING_ALIAS_TRUE":
      return {
        ...state,
        editingAlias: {
          status: true,
          newAlias: state.listAlias,
        },
      };
    case "SEND_EDITING_ALIAS":
      return {
        ...state,
        editingAlias: {
          status: true,
          newAlias: action.payload,
        },
      };
    case "EDIT_ALIAS_SUCCESS":
      return {
        ...state,
        editingAlias: {
          status: false,
          newAlias: "",
        },
      };
    case "CLEAR_MSG":
      return {
        ...state,
        msg: {
          status: false,
          type: "",
          message: "",
        },
      };
    case "SAVE_ITEM_SUCCESS":
      return {
        ...state,
        msg: {
          status: true,
          type: "success",
          message: "Item salvo!",
        },
      };
    case "EDITING_ITEM":
      const { id, category, product, qtd, punit } = action.payload;
      return {
        ...state,
        showNewItemForm: true,
        isEdit: {
          status: true,
          id: id,
          obj: {
            category,
            product,
            qtd,
            punit,
          },
        },
      };
    case "EXIT_EDIT":
      return {
        ...state,
        showNewItemForm: false,
        isEdit: {
          status: false,
          id: null,
          obj: {},
        },
      };
    case "IS_REMOVING":
      return {
        ...state,
        isRemoving: {
          status: true,
          itemId: action.payload.itemId,
          category: action.payload.category,
          product: action.payload.product,
        },
      };
    case "EXIT_REMOVING":
      return {
        ...state,
        isRemoving: {
          status: false,
          itemId: null,
          category: "",
          product: "",
        },
      };
    case "LOAD_DATA":
      return initialState;
    case "CHANGE_TYPE":
      return {
        ...state,
        typeInput: action.payload,
      };
    case "CHANGE_ATIV":
      return {
        ...state,
        ativInput: action.payload,
      };
    case "CHANGE_QTD":
      return {
        ...state,
        qtdInput: action.payload,
      };
    case "CHANGE_PC":
      return {
        ...state,
        pcInput: action.payload,
      };
    case "CHANGE_DOC":
      return {
        ...state,
        docInput: action.payload,
      };
    case "CHANGE_PV":
      return {
        ...state,
        pvInput: action.payload,
      };
    case "CHANGE_DOV":
      return {
        ...state,
        dovInput: action.payload,
      };
    case "SET_MESSAGE":
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};
