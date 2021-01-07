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
    name: "BLOG",
    link: "/blog",
    linkHelper: "/blog",
    icon: <BookIcon />,
  },
  {
    ...initialState,
    name: "DASH BOARD",
    link: "/gallery/list?page=1",
    linkHelper: "/gallery",
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
