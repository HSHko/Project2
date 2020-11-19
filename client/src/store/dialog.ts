import { Input } from "@material-ui/core";

const HI = "dialog/HI" as const;
const LO = "dialog/LO" as const;

export const hi = (input: string) => ({
  type: HI,
  payload: input,
});
export const lo = () => ({
  type: LO,
});

type Action = ReturnType<typeof hi | typeof lo>;

interface State {
  isHi: boolean;
  trgt: string;
}

const initialState = {
  isHi: false,
  trgt: undefined,
};

export default function fun(state: State = initialState, action: Action) {
  switch (action.type) {
    case HI:
      console.log(action.type);
      return {
        ...state,
        isHi: true,
        trgt: action.payload,
      };
    case LO:
      console.log(action.type);
      return {
        ...state,
        isHi: false,
        trgt: undefined,
      };
    default:
      return state;
  }
}
