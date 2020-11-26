export const SET_ERRORS = "ui/SET_ERRORS" as const;
export const CLEAR_ERRORS = "ui/CLEAR_ERRORS" as const;
export const SET_LOADING = "ui/SET_LOADING" as const;
export const CLEAR_LOADING = "ui/CLEAR_LOADING" as const;

interface State {
  isLoading: boolean;
  errors: any;
}

const initialState = {
  isLoading: false,
  errors: null,
};

export default function fun(state: State = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      console.log(action.type);
      return {
        ...state,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      console.log(action.type);
      return {
        ...state,
        errors: null,
      };
    case SET_LOADING:
      console.log(action.type);
      return {
        ...state,
        isLoading: true,
      };
    case CLEAR_LOADING:
      console.log(action.type);
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
