const HI = "sideAnchor/HI" as const;
const LO = "sideAnchor/LO" as const;

export const hi = () => ({
  type: HI,
});
export const lo = () => ({
  type: LO,
});

// 모듈타입 참고: https://react-etc.vlpt.us/07.typescript-redux.html
// type IncrementAction = ReturnType<typeof counterActions.increment>;
// type DecrementAction = ReturnType<typeof counterActions.decrement>;
// type Actions = IncrementAction | DecrementAction;
type Action = ReturnType<typeof hi | typeof lo>;

interface State {
  isHi: boolean;
}

const initialState = {
  isHi: false,
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
