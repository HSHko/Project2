import HomeIcon from "@material-ui/icons/Home";
import BookIcon from "@material-ui/icons/Book";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import LockOpenIcon from "@material-ui/icons/LockOpen";

interface Props {
  name: string;
  link?: string;
  event?: string;
  linkHelper?: string;
  label?: string;
  icon?: any;
}

const initialState: Props = {
  name: "",
};

const common: Props[] = [
  {
    ...initialState,
    name: "TEST",
    link: "/test",
    linkHelper: "/test",
    icon: <HomeIcon />,
  },
  {
    ...initialState,
    name: "HOME",
    link: "/home",
    linkHelper: "/home",
    icon: <HomeIcon />,
  },
  {
    ...initialState,
    name: "INTRODUCE",
    link: "/home?pos=introduce",
    linkHelper: "introduce",
    icon: <HomeIcon />,
  },
  {
    ...initialState,
    name: "SKILL",
    link: "/home?pos=skill",
    linkHelper: "skill",
    icon: <HomeIcon />,
  },
  {
    ...initialState,
    name: "DASH BOARD",
    link: "/community/list?page=1",
    linkHelper: "/community",
    icon: <HowToRegIcon />,
  },
];

const authenticated: Props[] = [
  {
    ...initialState,
    name: "LOGOUT",
    event: "logout",
    icon: <HomeIcon />,
  },
];

const unAuthenticated: Props[] = [
  {
    ...initialState,
    name: "LOGIN",
    link: "/join/signin",
    linkHelper: "/join/signin",
    icon: <LockOpenIcon />,
  },
  {
    ...initialState,
    name: "SIGN UP",
    link: "/join/signup",
    linkHelper: "/join/signup",
    icon: <LockOpenIcon />,
  },
];

export default {
  common,
  authenticated,
  unAuthenticated,
};
