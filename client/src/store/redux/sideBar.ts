const HI = "sidebar/HI" as const;
const LO = "sidebar/LO" as const;

export const hi = () => ({
  type: HI,
});
export const lo = () => ({
  type: LO,
});

type Action = ReturnType<typeof hi | typeof lo>;

interface State {
  isHi: boolean;
  isLo: any[];
}

const initialState = {
  isHi: false,
  isLo: [],
};

export default function fun(state: State = initialState, action: Action) {
  switch (action.type) {
    case HI:
      console.log(action.type);
      return {
        ...state,
        isHi: true,
      };
    case LO:
      console.log(action.type);
      return {
        ...state,
        isHi: false,
      };
    default:
      return state;
  }
}
