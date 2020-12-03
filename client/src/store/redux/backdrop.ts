import { store } from "store";

const HI = "backdrop/HI" as const;
const LO = "backdrop/LO" as const;

export const hi = (recipient) => ({
  type: HI,
  payload: recipient.type,
});

export const lo = () => (dispatch) => {
  store.getState().backdropReducer["recipients"].map((x) => {
    dispatch({ type: x });
  });
  dispatch({ type: LO });
};

interface State {
  isHi: boolean;
  recipients: any[];
}

const initialState = {
  isHi: false,
  recipients: [],
};

export default function fun(state: State = initialState, action) {
  switch (action.type) {
    case HI:
      console.log(action.type);
      return {
        ...state,
        isHi: true,
        recipients: [...state.recipients, action.payload],
      };
    case LO:
      console.log(action.type);
      return {
        ...state,
        isHi: false,
        recipients: [],
      };
    default:
      return state;
  }
}
